import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { getCardStatus } from "../services/api/getCardStatus";
import Preloader from "../components/Preloader";

const ScanPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { authenticated, ready } = usePrivy();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkCard = async () => {
      if (!username) {
        navigate("/");
        return;
      }

      try {
        const response = await getCardStatus(username);
        
        if (response.success) {
          const data = response.data;

          // If card is activated, go to the user's profile page
          if (data.isActivated) {
            navigate(`/profile/${data.username}`);
            return;
          }

          // Not activated — prompt to activate
          navigate("/not-activated", { state: { cardData: data, needsAuth: !authenticated } });
        } else {
          navigate("/not-activated", {
            state: {
              cardData: { username, isActivated: false },
              needsAuth: !authenticated,
              cardNotFound: true,
            },
          });
        }
      } catch (err) {
        // Better error handling
        let errorMessage = "Failed to load card data";
        
        if (err && typeof err === 'object') {
          if ('response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
            // Axios error with response
            const axiosError = err as { response: { data?: { message?: string }; status: number } };
            errorMessage = axiosError.response.data?.message || 
                          `Server error: ${axiosError.response.status}`;
          } else if ('message' in err && typeof (err as { message?: unknown }).message === 'string') {
            // Standard Error object
            errorMessage = `Error: ${(err as { message: string }).message}`;
          }
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (ready) {
      checkCard();
    }
  }, [username, navigate, authenticated, ready]);

  if (loading || !ready) {
    return <Preloader onComplete={() => {}} />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default ScanPage;