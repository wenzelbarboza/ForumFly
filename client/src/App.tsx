import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LayOut } from "./Layout/LayOut";
import { ThemeProvider } from "./components/theme-provider";
import { SignUp } from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/Postpage";
import { LogIn } from "./pages/LogIn";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <FeedPage />,
      },
      {
        path: "login",
        element: (
          //<protectedRoute>
          <LogIn />
          //</ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          //<protectedRoute>
          <SignUp />
          //</ProtectedRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          //<protectedRoute>
          <PostPage />
          //</ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
