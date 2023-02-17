import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import {professorsRoutes} from "./pages/Professors/routes";
import {groupsRoutes} from "./pages/Groups/routes";
import {scheduleRoutes} from "./pages/Schedules/routes";
import {ProtectedRoute} from "./components/ProtectedRoute";

export const App = () => {
  return useRoutes([
    {
      element: <ProtectedRoute />,
      children: [
        ...professorsRoutes,
        ...groupsRoutes,
        ...scheduleRoutes
      ],
    },
    {
      element: <Navigate to={'/schedules'} />,
      path: '*',
    },
  ]);
}