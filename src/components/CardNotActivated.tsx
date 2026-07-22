import { useNavigate, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect, useRef } from "react";

interface CardData {
  username: string;
  isActivated: boolean;
}

const CardNotActivated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticated, ready, login } = usePrivy();
  const [cardData] = useState<CardData | null>(location.state?.cardData || null);
  const [cardNotFound] = useState<boolean>(location.state?.cardNotFound || false);
  const loginTriggered = useRef(false);

  // Redirect to activate page after successful login
  useEffect(() => {
    if (authenticated && ready && loginTriggered.current) {
      navigate("/activate", { state: { cardData } });
    }
  }, [authenticated, ready, navigate, cardData]);

  const handleActivate = () => {
    if (!ready) {
      return;
    }

    // If not authenticated, trigger login first
    if (!authenticated) {
      loginTriggered.current = true;
      login();
      return;
    }

    // User is authenticated, navigate to activate page
    navigate("/activate", { state: { cardData } });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-fade-in">
          <img src="/Logo (2).png" alt="ArkID Logo" className="h-12 w-auto" />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-[28px] font-bold text-white">
            {cardNotFound ? "Card Not Found" : "Card Not Activated"}
          </h1>
          
          <p className="text-gray-400 text-base max-w-sm">
            Tap the button below to setup your redirectlink
          </p>

          <button
            onClick={handleActivate}
            className="mt-6 rounded-[10px] bg-[#d4af37] px-8 py-4 text-base font-bold text-black transition-all hover:bg-[#c29f2f] hover:shadow-lg"
          >
            Activate Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardNotActivated;
