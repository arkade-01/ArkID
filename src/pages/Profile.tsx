import { EllipsisVertical, Share2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useEditProfile } from "../hook/profile/useEditProfile";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";

type links = {
  platform: string;
  url: string;
};

const PersonalLinks = ({ platform, url }: links) => {
  const formattedUrl = url.match(/^https?:\/\//i) ? url : `https://${url}`;
  return (
    <a
      target="_blank"
      href={formattedUrl}
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
  const navigate = useNavigate();
  const { login, authenticated } = usePrivy();
  
  const [allInfo, setAllInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clickedEdit, setClickedEdit] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!name) return;
      const response = await mainProfile(name);
      setAllInfo(response);
      setLoading(false);
    };

    fetch();
  }, []);

  useEffect(() => {
    // Redirect to dashboard after successful login if they clicked Edit Profile
    if (authenticated && clickedEdit) {
      navigate('/dashboard');
    }
  }, [authenticated, clickedEdit, navigate]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast("copied to clipboard");
  };

  const handleEditProfile = () => {
    if (authenticated) {
      navigate('/dashboard');
    } else {
      setClickedEdit(true);
      login();
    }
  };

  const isEmpty = allInfo?.data && 
                  !allInfo.data.bio && 
                  (!allInfo.data.social_links || allInfo.data.social_links.length === 0);

  return (
    <main className="p-7">
      <div className="flex items-center justify-between mb-5">
        <img src="/ArkID logob.png" alt="" className="h-7.5" />
        <button
          onClick={handleEditProfile}
          className="flex items-center gap-1.5 p-2 rounded-full text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Pencil size={14} />
          <span>{authenticated ? "Edit profile" : "Login to edit profile"}</span>
        </button>
      </div>
      <section className="mb-15 space-y-4">
        {loading ? (
          <Skeleton className="h-37.5 w-37.5 rounded-full mx-auto" />
        ) : (
          <img
            src={allInfo?.data.profile_photo || "/profile-placeholder.jpg"}
            alt="profile photo"
            className="h-37.5 w-37.5 rounded-full mx-auto object-cover"
          />
        )}

        {loading ? (
          <Skeleton className="h-8 w-48 mx-auto rounded-lg" />
        ) : (
          <h4 className="text-center font-bold text-3xl">
            {allInfo?.data.display_name || `@${name}`}
          </h4>
        )}

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-64 mx-auto rounded" />
            <Skeleton className="h-4 w-48 mx-auto rounded" />
          </div>
        ) : (
          allInfo?.data.bio && <p className="text-center text-fadetext">{allInfo?.data.bio}</p>
        )}

        {!isEmpty && (
          <button
            className="flex gap-3 border border-fadetext rounded-full p-4 mx-auto"
            onClick={() => copyToClipboard(location.pathname)}
          >
            <Share2 /> Share Profile
          </button>
        )}
      </section>

      <section className="space-y-5">
        {loading ? (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : isEmpty ? (
          <div className="text-center mt-10">
            <p className="text-lg font-semibold text-gray-700 mb-6">Your profile looks empty</p>
            <button
              onClick={handleEditProfile}
              className="bg-[#D4AF37] px-8 py-4 rounded-xl text-black font-semibold text-[15px] shadow-sm hover:bg-[#c29f2f] transition-colors"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          allInfo?.data.social_links?.map((item: any, i: number) =>
            item.visible === true ? (
              <PersonalLinks key={i} platform={item.platform} url={item.url} />
            ) : null
          )
        )}
      </section>
    </main>
  );
};
