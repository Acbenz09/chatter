import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Chat, SignIn, SignUp } from "@/pages";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
