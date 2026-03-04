import { EllipsisVertical } from "lucide-react";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditProfile } from "../hook/profile/useEditProfile";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
// import { getUserCards } from "../services/api/getUserCards"
// import { toast } from 'sonner';

type links = {
  platform: string;
  url: string;
};

const PersonalLinks = ({ platform, url }: links) => {
  return (
    <a
      target="_blank"
      href={url}
      className="flex justify-between items-center border border-fadetext rounded-xl p-3"
    >
      <img
        src={`https://logos.hunter.io/${platform}.com`}
        alt=""
        className="w-8 h-8 grayscale"
      />
      <p>random link way</p>
      <EllipsisVertical />
    </a>
  );
};

export const Profile = () => {
  const { mainProfile } = useEditProfile();
  const { name } = useParams();
  const location = useLocation();
  const [allInfo, setAllInfo] = useState<any>(null); //api info will be here after fetch

  useEffect(() => {
    const fetch = async () => {
      if (!name) return;
      const response = await mainProfile(name);
      setAllInfo(response);
    };

    fetch();
  }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast("copied to clipboard");
  };

  return (
    <main className="p-7">
      {/* <NewNavBar /> */}
      <img src="/ArkID logob.png" alt="" className="h-7.5 mb-5" />
      <section className="mb-15 space-y-4">
        <img
          src={
            allInfo
              ? allInfo.data.profile_photo
              : "https://placehold.co/150x150"
          }
          alt="profile photo"
          className="h-37.5 w-37.5 rounded-full mx-auto"
        />
        <h4 className="text-center font-bold text-3xl">
          {allInfo ? allInfo.data.display_name : "John Doe"}
        </h4>
        <p className="text-center text-fadetext">
          {allInfo
            ? allInfo.data.bio
            : "Creative Director & Photographer | Helping brands tell their story through visual content | Based in Lagos 🇳🇬"}
        </p>
        <button
          className="flex gap-3 border border-fadetext rounded-full p-4 mx-auto"
          onClick={() => copyToClipboard(location.pathname)}
        >
          <Share2 /> Share Profile
        </button>
      </section>

      <section className="space-y-5">
        {allInfo
          ? allInfo.data.social_links.map((item: any, i: number) =>
              item.visible === true ? (
                <PersonalLinks key={i} platform="hi" url="hi" />
              ) : (
                null
              ),
            )
          : "hi"}
      </section>
    </main>
  );
};
