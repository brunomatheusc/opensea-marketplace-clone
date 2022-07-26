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

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>		
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}