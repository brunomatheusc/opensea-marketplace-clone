import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import '../styles/globals.css';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import type { AppProps } from 'next/app';

import GlobalStyle from '../src/styles/GlobalStyle';

const theme: DefaultTheme = {
	colors: {
		primary: '#111',
		secondary: '#0070f3'
	}
};

/**
 * The chain ID 4 represents the Rinkeby network 
 * The `injected` connector is a web3 connection method used by Metamask
*/
const supportedChainIds = [4];
const connectors = {
	injected: {},
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
			<ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
				<ThemeProvider theme={theme}>
					<GlobalStyle />		
					<Component {...pageProps} />
				</ThemeProvider>
			</ThirdwebProvider>
		</ThirdwebWeb3Provider>
	);
}