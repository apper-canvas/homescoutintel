import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

// Lazy load pages
const BrowseListings = lazy(() => import("@/components/pages/BrowseListings"));
const PropertyDetail = lazy(() => import("@/components/pages/PropertyDetail"));
const Favorites = lazy(() => import("@/components/pages/Favorites"));
const SearchResults = lazy(() => import("@/components/pages/SearchResults"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

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

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes],
  },
];

export const router = createBrowserRouter(routes);