import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    );
}

export default App;
