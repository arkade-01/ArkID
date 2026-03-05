import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentCallback from "./pages/PaymentCallback";
// import CardActivate from "./pages/CardActiviate";
import CardNotActivatedPage from "./pages/CardNotActivated";
import Dashboard from "./pages/Dashboard";
import ScanPage from "./pages/ScanPage";
import Preloader from "./components/Preloader";
import { PrivyProvider } from "@privy-io/react-auth";
import { ActivateCard2 } from "./pages/ActivateCard2";
import { EditProfile } from "./pages/EditProfile";
import { Profile } from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from 'sonner';
import { HowToUse } from "./pages/HowToUse";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      <PrivyProvider appId={import.meta.env.VITE_PRIVY_APP_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/payment/success" element={<PaymentCallback />} />
            <Route path="/payment/failed" element={<PaymentCallback />} />
            <Route path="/payment/error" element={<PaymentCallback />} />
            {/* <Route path="/activate" element={<CardActivate />} /> */}
            <Route path="/not-activated" element={<CardNotActivatedPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan/:username" element={<ScanPage />} />

            //gizzles implementations
            <Route element={<AuthContext />}>
              //auth checker
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/activate" element={<ActivateCard2 />} />
            </Route>
            {/* <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/activa2" element={<ActivateCard2 />} /> */}
            <Route path="/how_to_use" element={<HowToUse/>}/>
            <Route path="/profile/:name" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </PrivyProvider>
      <Toaster />
    </>
  );
}

export default App;
