import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LayOut } from "./Layout/LayOut";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/Postpage";
import { LogIn } from "./pages/LogIn";
import MyPostsPage from "./pages/MyPostsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TabAdminPage } from "./pages/TabAdminPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <LayOut />,
    children: [
      {
        path: "/feed",
        element: (
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <LogIn />,
      },
      {
        path: "/my-posts",
        element: (
          <ProtectedRoute>
            <MyPostsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tab-admin",
        element: (
          // <ProtectedRoute>
          <TabAdminPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
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
