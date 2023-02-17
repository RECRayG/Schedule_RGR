import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute: React.FC = () => {
  return <Outlet />;
};
