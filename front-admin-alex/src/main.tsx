import "./index.css"
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/carousel/styles.css';
import { createRoot } from "react-dom/client"
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { AuthGuard } from "./features/auth-guard"
import { Layout } from "./app/components/layout/layout";
import { Auth } from "./pages/auth";
import { Users } from "./pages/users";
import { Statuses } from "./pages/statuses";
import { Messages } from "./pages/messages";
import { Consultation } from "./pages/consultation";
import { ServiceType } from "./pages/service-type";
import { SelectDateTime } from "./pages/selectDateTime";

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Users />
      },
      {
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/consultation",
        element: <Consultation />
      },
      {
        path: "/statuses",
        element: <Statuses />
      },
      {
        path: "/service-type",
        element: <ServiceType />
      },
      {
        path: "/select-date-time",
        element: <SelectDateTime />
      },

    ],
  },
])


if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <MantineProvider >
        <AuthGuard>
          <Notifications />
          <RouterProvider router={router} />
        </AuthGuard>
      </MantineProvider>
    </Provider>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
