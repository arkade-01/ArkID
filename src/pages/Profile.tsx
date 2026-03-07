import { EllipsisVertical } from "lucide-react";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditProfile } from "../hook/profile/useEditProfile";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

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
      <p>{platform}</p>
      <EllipsisVertical />
    </a>
  );
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ""}`} />
);

export const Profile = () => {
  const { mainProfile } = useEditProfile();
  const { name } = useParams();
  const location = useLocation();
  const [allInfo, setAllInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!name) return;
      const response = await mainProfile(name);
      setAllInfo(response);
      setLoading(false);
    };

    fetch();
  }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast("copied to clipboard");
  };

  return (
    <main className="p-7">
      <img src="/ArkID logob.png" alt="" className="h-7.5 mb-5" />
      <section className="mb-15 space-y-4">
        {loading ? (
          <Skeleton className="h-37.5 w-37.5 rounded-full mx-auto" />
        ) : (
          <img
            src={allInfo?.data.profile_photo}
            alt="profile photo"
            className="h-37.5 w-37.5 rounded-full mx-auto object-cover"
          />
        )}

        {loading ? (
          <Skeleton className="h-8 w-48 mx-auto rounded-lg" />
        ) : (
          <h4 className="text-center font-bold text-3xl">
            {allInfo?.data.display_name}
          </h4>
        )}

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-64 mx-auto rounded" />
            <Skeleton className="h-4 w-48 mx-auto rounded" />
          </div>
        ) : (
          <p className="text-center text-fadetext">{allInfo?.data.bio}</p>
        )}

        <button
          className="flex gap-3 border border-fadetext rounded-full p-4 mx-auto"
          onClick={() => copyToClipboard(location.pathname)}
        >
          <Share2 /> Share Profile
        </button>
      </section>

      <section className="space-y-5">
        {loading ? (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : (
          allInfo?.data.social_links.map((item: any, i: number) =>
            item.visible === true ? (
              <PersonalLinks key={i} platform={item.platform} url={item.url} />
            ) : null
          )
        )}
      </section>
    </main>
  );
};
