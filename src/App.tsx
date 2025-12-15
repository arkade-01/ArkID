import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import CardActivate from "./pages/CardActiviate";
import CardNotActivatedPage from "./pages/CardNotActivated";
import Dashboard from "./pages/Dashboard";
import Preloader from "./components/Preloader";
import { PrivyProvider } from "@privy-io/react-auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <PrivyProvider 
    appId={import.meta.env.VITE_PRIVY_APP_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardActivate />} />
          <Route path="/not-activated" element={<CardNotActivatedPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </PrivyProvider>
  );
}

export default App;
