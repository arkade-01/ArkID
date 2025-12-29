import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handlePaymentStatus = () => {
      // Check if this is a free order (from navigation state)
      const isFreeOrder = location.state?.isFreeOrder;
      const freeOrderSuccess = location.state?.success;

      if (isFreeOrder && freeOrderSuccess) {
        // Free order with discount code - no payment needed
        console.log('Free order detected, showing success');
        setStatus("success");
        setMessage("Order confirmed! Your discount code has been applied successfully.");
        return;
      }

      // Check the current path to determine status (from backend redirect)
      const currentPath = window.location.pathname;

      if (currentPath === "/payment/success") {
        const reference = searchParams.get("reference");
        const orderId = searchParams.get("order");
        console.log('Payment successful:', { reference, orderId });
        setStatus("success");
        setMessage("Payment successful! Your order has been confirmed.");
        return;
      }

      if (currentPath === "/payment/failed") {
        const reference = searchParams.get("reference");
        console.log('Payment failed:', { reference });
        setStatus("failed");
        setMessage("Payment was not completed. Please try again or contact support.");
        return;
      }

      if (currentPath === "/payment/error") {
        const errorMessage = searchParams.get("message") || "An error occurred while processing your payment.";
        console.log('Payment error:', errorMessage);
        setStatus("failed");
        setMessage(errorMessage);
        return;
      }

      // Default case for /payment/callback (shouldn't normally reach here)
      setStatus("loading");
      setMessage("Verifying payment...");
    };

    handlePaymentStatus();
  }, [searchParams, location.state]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/Logo (1).png" alt="ArkID Logo" className="h-12 w-auto mx-auto mb-8" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          {status === "loading" && (
            <>
              <div className="mb-6">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#d4af37]"></div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Verifying Payment...
              </h2>
              <p className="text-gray-600">Please wait while we confirm your payment</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Payment Successful!
              </h2>
              <p className="mb-6 text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">
                You have completed payment, you can now close this tab.
              </p>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="mb-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Payment Failed
              </h2>
              <p className="mb-6 text-gray-600">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/checkout")}
                  className="flex-1 rounded-lg border-2 border-[#d4af37] px-6 py-3 text-base font-semibold text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 rounded-lg bg-[#d4af37] px-6 py-3 text-base font-semibold text-black transition-all hover:bg-[#c29f2f]"
                >
                  Go Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
