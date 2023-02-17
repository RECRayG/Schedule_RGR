import React from 'react';

import { GroupsList } from './index';

export const routes = {
    list: '/groups',
};

export const groupsRoutes = [
    {
        path: routes.list,
        element: <GroupsList />,
    },
];