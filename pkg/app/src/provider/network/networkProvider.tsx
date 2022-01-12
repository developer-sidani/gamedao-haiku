import { useEffect, useRef, useState } from 'react';
import { NetworkContext } from './modules/_context';
import { ApiProvider } from '../../types/network';
import types from './modules/types.json';
import { initializeApi } from './modules/_network';

// TODO: Data should be retrieved from GraphQL or another interface.
// @2075
// Are there already ideas here should the types come also from GraphQL or rather
// be pulled from the chain itself
const API_PROVIDER_CONFIG = {
	wsProviderUrl: 'wss://alphaville.zero.io',
	types: types,
};

export function NetworkProvider({ children }) {
	const [apiProviderState, setApiProviderState] = useState<ApiProvider>(null);
	const isMountedRef = useRef<null | boolean>(null);

	useEffect(() => {
		isMountedRef.current = true;

		// Create and connect to Api
		initializeApi(API_PROVIDER_CONFIG).then((provider: ApiProvider) => {
			if (isMountedRef.current) {
				setApiProviderState(provider);
			}
		});

		return () => {
			isMountedRef.current = false;
		};
	}, []);

	return <NetworkContext.Provider value={{ apiProvider: apiProviderState }}>{children}</NetworkContext.Provider>;
}