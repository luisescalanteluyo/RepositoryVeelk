
import { createBrowserRouter } from "react-router-dom";
import NotFound from '../security/NotFound';
import { LoginPage, DashboardPage, UsersPage, UsersFormPage, VehiclesPage, OrganizationsPage, ProfilesPage, VehiclesFormPage, VehiclesGalleryPage } from "../../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <NotFound />
  },
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
        errorElement: <NotFound />,
      },
      {
        path: "/users/add",
        element: <UsersFormPage is="add" />,
        errorElement: <NotFound />,
      },
      {
        path: "/users/edit/:_id",
        element: <UsersFormPage is="edit" />,
        errorElement: <NotFound />,
      },
    ]
  },
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/vehicles",
        element: <VehiclesPage />,
        errorElement: <NotFound />,
      },
      {
        path: "/vehicles/add",
        element: <VehiclesFormPage is="add" />,
        errorElement: <NotFound />,
      },
      {
        path: "/vehicles/edit/:_id",
        element: <VehiclesFormPage is="edit" />,
        errorElement: <NotFound />,
      },
      {
        path: "/vehicles/gallery/:_id",
        element: <VehiclesGalleryPage is="edit" />,
        errorElement: <NotFound />,
      },
    ]
  },
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/profiles",
        element: <ProfilesPage />,
        errorElement: <NotFound />,
      }
    ]
  },
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/organizations",
        element: <OrganizationsPage />,
        errorElement: <NotFound />,
      }
    ]
  },
]);

export default router;