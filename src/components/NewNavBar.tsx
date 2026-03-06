import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

//only mobile screen is done
export const NewNavBar = () => {
  const [open, setOpen] = useState<boolean>();
  const navigate = useNavigate();
  const { login } = usePrivy();

  const linkFunction = (page: string) => {
    setOpen((prev) => !prev);
    navigate(`${page}`); //e.g '/checkout'
  };

  const handleLogin = () => {
    setOpen((prev) => !prev);
    login();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <img src="/ArkID logob.png" alt="" className="h-[30px]" />
      {/* mobile nav */}
      <div className="md:hidden">
        <Menu
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        />
        {open && (
          <nav className="border absolute right-7 bg-white [&>p]:text-right [&>p]:py-2 p-3 rounded-lg">
            <p onClick={() => linkFunction("/")}>Home</p>
            <p onClick={() => linkFunction("/how_to_use")}>How it Works</p>
            <p onClick={() => linkFunction("/checkout")}>Pricing/Shop</p>
            <p onClick={handleLogin}>Sign Up/Login In</p>
            {/* <p onClick={() => linkFunction('/')}>Contact Us</p> */}
          </nav>
        )}
      </div>

      {/* desktop nav */}
      <nav className="hidden items-center gap-8 md:flex">
        <a
          href="#home"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-[#d4af37]"
        >
          Home
        </a>
        <a
          href="#how-it-works"
          className="text-sm font-medium text-gray-900 transition-colors hover:text-[#d4af37]"
        >
          How It Works
        </a>
        <a
          href="#pricing"
          onClick={() => navigate("/checkout")}
          className="text-sm font-medium text-gray-900 transition-colors hover:text-[#d4af37] cursor-pointer"
        >
          Pricing/Shop
        </a>
      </nav>

      {/* desktop nav*/}
      <div className="hidden items-center gap-3 md:flex">
        <button
          onClick={handleLogin}
          className="rounded-md border-2 border-[#d4af37] px-5 py-2 text-sm font-semibold text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="rounded-md bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-[#c29f2f]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
