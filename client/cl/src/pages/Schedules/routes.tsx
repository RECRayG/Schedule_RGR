import React from 'react';

import {SchedulesListFirst} from "./indexFirst";

export const routes = {
    list: '/schedules',
};

export const scheduleRoutes = [
    {
        path: routes.list,
        element: <SchedulesListFirst />,
    },
];