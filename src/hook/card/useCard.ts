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

      toast.success("Card Arktivated");
      navigate("/edit-profile");

      return res.data;
    } catch (err: any) {
      console.log(`an error happened: ${err?.message}`);
      toast.error("An error happened");
    }
  };

  return { activateCard };
};

export default useCard;
