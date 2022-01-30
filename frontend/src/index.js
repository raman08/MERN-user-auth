import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<ChakraProvider>
			<CSSReset />
			<App />
		</ChakraProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

reportWebVitals();
