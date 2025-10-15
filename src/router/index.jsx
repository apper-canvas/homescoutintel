import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Root from "@/layouts/Root";
import Layout from "@/components/organisms/Layout";

// Lazy load pages
const BrowseListings = lazy(() => import("@/components/pages/BrowseListings"));
const PropertyDetail = lazy(() => import("@/components/pages/PropertyDetail"));
const Favorites = lazy(() => import("@/components/pages/Favorites"));
const SearchResults = lazy(() => import("@/components/pages/SearchResults"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const Login = lazy(() => import("@/components/pages/Login"));
const Signup = lazy(() => import("@/components/pages/Signup"));
const Callback = lazy(() => import("@/components/pages/Callback"));
const ErrorPage = lazy(() => import("@/components/pages/ErrorPage"));
const ResetPassword = lazy(() => import("@/components/pages/ResetPassword"));
const PromptPassword = lazy(() => import("@/components/pages/PromptPassword"));
const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <BrowseListings />
      </Suspense>
    ),
  },
  {
    path: "property/:id",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <PropertyDetail />
      </Suspense>
    ),
  },
  {
    path: "favorites",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Favorites />
      </Suspense>
    ),
  },
  {
    path: "search",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <SearchResults />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

const authRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "callback",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Callback />
      </Suspense>
    ),
  },
  {
    path: "error",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "reset-password/:appId/:fields",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "prompt-password/:appId/:emailAddress/:provider",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <PromptPassword />
      </Suspense>
    ),
  },
];

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [...mainRoutes],
      },
      ...authRoutes,
    ],
  },
];

export const router = createBrowserRouter(routes);