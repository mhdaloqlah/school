import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { dashboard, homePath, loginPath, rootPath } from "./routePaths";

import Loader from "../components/loader";
import ProtectedRoute from "./protectedRoute";

// import route paths

const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const RouteNotFound = lazy(() => import("../pages/pageNotFound"));

const DashboardComponent = lazy(() => import("../pages/dashboard/"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={rootPath} element={<Outlet />}>
            //--------------gives access to child component
            <Route index element={<Login />} /> //------------showing / route
            component
            <Route path={loginPath} element={<Login />} />
            {/* <Route path={accessErrorPage} element={<AccessErrorPage />} /> */}
            <Route element={<ProtectedRoute />}>
              <Route path={homePath} element={<Home />} />
              <Route path={dashboard} element={<DashboardComponent />} />
            </Route>
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AllRoutes;
