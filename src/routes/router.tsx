import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import Home from '../pages/home';
import Building from '../pages/building';
import SearchClassroom from '../pages/searchClassroom';
import Timetable from '../pages/timetable';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/building',
                element: <Building></Building>,
            },
            {
                path: '/classroom/:id',
                element: <Timetable></Timetable>,
            },
            {
                path: '/search',
                element: <SearchClassroom></SearchClassroom>,
            },
        ],
    },
]);

export default router;
