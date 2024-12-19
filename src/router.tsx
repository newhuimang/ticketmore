import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout";
import MobileSearchResult from "./components/Mobile/Search/Result";
import MobileMainTab from "./pages/Mobile";
import MobileEvent from "./pages/Mobile/event";

const router = (
  _isMobile: boolean,
  isOpen: boolean,
  content: React.ReactNode
) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
          {isOpen && content}
        </>
      ),
      children: [
        {
          index: true,
          element: <MobileMainTab />,
        },
        {
          path: "/search",
          element: <MobileSearchResult />,
        },
        {
          path: "/event",
          element: <MobileEvent />,
        },
      ],
    },
  ]);

export default router;
