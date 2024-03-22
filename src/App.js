import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <QuizProvider>
          <AppRoutes />
        </QuizProvider>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
