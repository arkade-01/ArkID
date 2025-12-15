import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";

const CardNotActivated = () => {
  const navigate = useNavigate();
  const { login, authenticated, ready } = usePrivy();

  // Redirect to activation form after successful login
  useEffect(() => {
    if (ready && authenticated) {
      navigate("/");
    }
  }, [authenticated, ready, navigate]);

  const handleActivate = () => {
    login();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-fade-in">
          <img src="/arkid-logo.svg" alt="ArkID Logo" className="h-12 w-auto" />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-[28px] font-bold text-white">
            Card Not Activated
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
