import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/authentication/logIn/LogIn";
import Register from "../pages/authentication/register/Register";
import PrivateRoute from "./PrivateRoute";
import Coverage from "../pages/coverage/Coverage";
import DashboardLayout from "../layouts/DashboardLayout";
import ParcelBooking from "../pages/sendPercel/ParcelBooking";
import MyBookingParcels from "../pages/dashboard/myparcels/MyBookingParcels";
import ParcelDetails from "../pages/dashboard/myparcels/ParcelDetails";
import PaymentPage from "../pages/dashboard/payment/stripePayment/PaymentPage";
import Users from "../pages/dashboard/users/Users";
import Rider from "../pages/dashboard/rider/Rider";
import PendingRiders from "../pages/dashboard/rider/PendingRiders";
import ApprovedRiders from "../pages/dashboard/rider/ApprovedRiders";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: 'coverage',
        element: <PrivateRoute><Coverage /></PrivateRoute>
      },
      {
        path: 'sendPercel',
        element: <PrivateRoute><ParcelBooking /></PrivateRoute>,
        loader: () => fetch('../../public/data/serviceCenter.json')
      }
      ,
      {
        path: 'rider',
        element: <PrivateRoute><Rider /></PrivateRoute>,
        loader: () => fetch('../../public/data/serviceCenter.json')
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'logIn',
        Component: LogIn
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'myParcels',
        Component: MyBookingParcels
      },
      {
        path: 'details/:id',
        Component: ParcelDetails
      },
      {
        path: 'payment/:parcelId',
        Component: PaymentPage
      },
      {
        path: 'users',
        Component: Users
      },
      {
        path: 'riders/pending',
        Component: PendingRiders
      },
      {
        path: 'riders/approved',
        Component: ApprovedRiders
      },
    ]
  }
]);