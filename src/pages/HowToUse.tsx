import { useState } from "react";
import droid1 from "../assets/android1.svg";
import droid2 from "../assets/android2.svg";
import droid3 from "../assets/android3.svg";
import ios1 from "../assets/ios1.svg";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NewNavBar } from "../components/NewNavBar";

type display = {
  img: string;
  yellow: string;
  h4: string;
  p: string;
};

const Comp = ({ img, yellow, h4, p }: display) => {
  return (
    <section className="*:w-fit *:mx-auto space-y-7">
      <img src={img} alt="" />
      <p className="text-[#FBBC05] text-sm">{yellow}</p>
      <h4 className="font-semibold text-2xl">{h4}</h4>
      <p className="text-center text-fadetext">{p}</p>
    </section>
  );
};

export const HowToUse = () => {
  const [display, setDisplay] = useState<boolean>(true);
  const [number, setNumber] = useState<number>(1);
  const navigate = useNavigate()

  const Android: display[] = [
    {
      img: droid1,
      yellow: "STEP 1",
      h4: "Enable NFC",
      p: "Open Settings and turn on the NFC toggle",
    },
    {
      img: droid2,
      yellow: "STEP 2",
      h4: "Position Card",
      p: "Tap your card to the back of your phone",
    },
    {
      img: droid3,
      yellow: "STEP 3",
      h4: "Hold Steady",
      p: "Hold for 1-2 seconds until the link opens",
    },
  ];

  const ios: display[] = [
    {
      img: ios1,
      yellow: "STEP 1",
      h4: "NFC Always On",
      p: "iPhone has NFC enabled automatically—no setup needed",
    },
    {
      img: droid2,
      yellow: "STEP 2",
      h4: "Position Card",
      p: "Tap your card to the back of your iphone",
    },
    {
      img: droid3,
      yellow: "STEP 3",
      h4: "Hold Steady",
      p: "Hold for 1-2 seconds until the link opens",
    },
  ];

  const add = () => {
    if (number === 3) {
        setNumber(3)
    } else {
        setNumber((prev) => prev + 1)
    }
  }

  const minus = () => {
    if (number === 1) {
        setNumber(1)
    } else {
        setNumber((prev) => prev - 1)
    }
  }

  return (
    <main className="p-5">
      <NewNavBar />
      <h1 className="text-center text-4xl font-black mt-9">
        Ready to use your card?
      </h1>
      <p className="text-center text-fadetext my-5">
        Follow these simple steps to get started
      </p>

      <div className="flex justify-evenly items-center h-12 py-1.5 px-1.5 gap-2 rounded-full bg-[#FEF9EC] shadow">
        <p
          className={`w-full h-full flex items-center justify-center rounded-full ${display ? "bg-white text-black shadow" : "text-fadetext"}`}
          onClick={() => setDisplay(true)}
        >
          Android
        </p>
        <p
          className={`w-full h-full flex items-center justify-center rounded-full ${display ? "text-fadetext" : "bg-white text-black shadow"}`}
          onClick={() => setDisplay(false)}
        >
          iOS
        </p>
      </div>

      <section className="mt-10">
        {display
          ? Android.map((item, i) =>
              i === number - 1 ? (
                <Comp
                  key={i}
                  img={item.img}
                  yellow={item.yellow}
                  h4={item.h4}
                  p={item.p}
                />
              ) : null,
            )
          : ios.map((item, i) =>
              i === number - 1 ? (
                <Comp
                  key={i}
                  img={item.img}
                  yellow={item.yellow}
                  h4={item.h4}
                  p={item.p}
                />
              ) : null,
            )}

            <div className="flex items-center justify-center mt-8 gap-3">
                <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#EDF0F7]" onClick={minus}><ChevronLeft /></div>
                <div className={`h-2.5 rounded-full ${number === 1 ? 'w-6 bg-[#FBBC05]' : 'w-2.5 bg-[#EDF0F7]'}`}></div>
                <div className={`h-2.5 rounded-full ${number === 2 ? 'w-6 bg-[#FBBC05]' : 'w-2.5 bg-[#EDF0F7]'}`}></div>
                <div className={`h-2.5 rounded-full ${number === 3 ? 'w-6 bg-[#FBBC05]' : 'w-2.5 bg-[#EDF0F7]'}`}></div>
                <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#EDF0F7]" onClick={add}><ChevronRight /></div>
            </div>
      </section>

      <button className="w-full flex justify-center text-white h-12 items-center bg-[#FBBC05] rounded-lg mt-16" onClick={() => navigate('/activate')}>
        Activate my card
      </button>
    </main>
  );
};
