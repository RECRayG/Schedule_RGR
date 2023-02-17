import React from 'react';

import { ProfessorView } from './PageProfessorsView';

import { ProfessorsList } from './index';

export const routes = {
    list: '/professors',
    view: '/professors/view/:id',
};

export const professorsRoutes = [
    {
        path: routes.list,
        element: <ProfessorsList />,
    },
    {
        path: routes.view,
        element: <ProfessorView />,
    },
];
