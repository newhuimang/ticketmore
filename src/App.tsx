import { RouterProvider } from "react-router-dom";
import router from "./router";
import useDevice from "./store/useDevice";
import { useLatestOverlay } from "./store/useOverlay";

function App() {
  const isMobile = useDevice();
  const { isOpen, content } = useLatestOverlay();

  return (
    <>
      <RouterProvider router={router(isMobile, isOpen, content)} />
    </>
  );
}

export default App;
