import { Mail } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import useCard from "../hook/card/useCard";
import { NewNavBar } from "../components/NewNavBar";

type form = {
  cardId: string;
};

export const ActivateCard2 = () => {
  //to track value of input     DON'T TOUCH
  const [value, setValue] = useState("");
  const { activateCard } = useCard();

  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<form>();

  //React hook form submitter function
  const OnSubmit: SubmitHandler<form> = async (data) => {
    await activateCard(data.cardId);
  };

  return (
    <main className="bg-white p-7">
      <NewNavBar />
      <h1 className="mx-auto w-fit mb-5 text-4xl font-bold text-center">
        Activate Your Card
      </h1>
      <p className="mx-auto w-fit mb-5 text-fadetext">
        Let's get you set up in seconds
      </p>

      <div className="bg-[#FEF9EC] mb-5 flex items-center gap-5 p-3 rounded-xl">
        <div className="w-fit">
          <Mail color="#FBBC05" />
        </div>
        <p className="text-[12px] text-fadetext">
          Your unique Card ID was sent to your email when you ordered. Check
          your inbox to find it.
        </p>
      </div>

      <form
        action=""
        className="flex flex-col border-b border-b-[#EDF0F7] pb-9 mb-9"
        onSubmit={handleSubmit(OnSubmit)}
      >

        <label htmlFor="cardid" className="font-semibold mb-3">
          Card ID
        </label>

        <input
          type="text"
          {...register("cardId", {
            required: "cardId is required",
            minLength: {
              value: 3,
              message: "Card ID must be at least 3 characters",
            },
          })}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="cardid"
          placeholder="e.g., ABC123XYZ"
          className="border border-fadetext rounded-xl outline-0 p-3 mb-2"
        />
        {errors.cardId && (
          <div className="text-red-500 mb-2">{errors.cardId.message}</div>
        )}
        
        <p className="text-sm mb-5 text-fadetext">
          Card IDs are case-insensitive and typically 8-12 characters long
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl p-2 py-3  font-bold ${value.length > 3 ? "text-white bg-[#FBBC05]" : "text-fadetext bg-[#CBD2E0]"}`}
        >
          Activate my card
        </button>
      </form>

      <p className="mb-3 mx-auto w-fit text-sm">Can’t find your Card ID</p>

      <button className="bg-[#EDF0F7] w-full rounded-xl p-2 py-3">
        Resend Email
      </button>
    </main>
  );
};
