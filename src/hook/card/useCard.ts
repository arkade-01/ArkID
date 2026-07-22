import apis from "../authAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCard = () => {
  const navigate = useNavigate();

  //imported in activateCard2.tsx
  const activateCard = async (cardId: string) => {
    try {
      const res = await apis.post("/api/card/activate", {
        card_id: cardId,
      });

      toast.success(res.data.message);
      navigate("/edit-profile");
    } catch (err: any) {
      console.error("Card activation failed:", err);
      if (err.response) {
        toast.error(`${err?.response?.data?.message}`); // server responded with an error
      } else {
        toast.error(`${err?.message}`); // no response at all
      }
    }
  };

  return { activateCard };
};

export default useCard;
