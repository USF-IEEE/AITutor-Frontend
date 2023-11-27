import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import SlidesPage from './pages/SlidesPage.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/slides',
		element: <SlidesPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);
