import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "../configs/route.config";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import LoginPage from "../features/LoginPage";
import PublicRoute from "./PublicRoute";
import { UserPage } from "../features/users/UserPage";
import { CategoryPage } from "../features/category/CategoryPage";
import { DocumentPage } from "../features/document/DocumentPage";
import { ContentPages } from "../features/contentPages/ContentPages";
import { ProductPage } from "../features/product/ProductPage";
import { SettingPage } from "../features/settings/SettingPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.AUTH.LOGIN} />} />

      <Route element={<PublicRoute />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.APP.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.APP.USERS} element={<UserPage />} />
          <Route path={ROUTES.APP.CATEGORIES} element={<CategoryPage />} />
          <Route path={ROUTES.APP.PRODUCTS} element={<ProductPage />} />
          <Route path={ROUTES.APP.DOCUMENTS} element={<DocumentPage />} />
          <Route path={ROUTES.APP.PAGES} element={<ContentPages />} />
          <Route path={ROUTES.APP.SETTINGS} element={<SettingPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
