import { useState } from "react";

interface SocialLinkItemProps {
  platform: string;
  url: string;
  visible: boolean;
  onToggle?: (visible: boolean) => void;
  onEdit?: () => void;
}

const platformDisplayNames: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
  snapchat: "Snapchat",
  telegram: "Telegram",
  pinterest: "Pinterest",
  substack: "Substack",
  whatsapp: "WhatsApp",
  email: "Email",
};

const SocialLinkItem = ({ platform, url, visible, onToggle, onEdit }: SocialLinkItemProps) => {
  const [isEnabled, setIsEnabled] = useState(visible);

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggle?.(newValue);
  };

  const displayName = platformDisplayNames[platform.toLowerCase()] || platform;

  // Truncate URL for display
  const truncatedUrl = url.length > 22 ? url.substring(0, 22) + "..." : url;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-[#1E2A3A]">{displayName}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] text-[#717D96]">{truncatedUrl}</span>
          <button
            onClick={onEdit}
            className="text-[#717D96] hover:text-[#1E2A3A] transition-colors"
            aria-label={`Edit ${displayName} link`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={handleToggle}
        className={`relative h-[28px] w-[50px] rounded-full transition-colors duration-200 ${
          isEnabled ? "bg-[#1E2A3A]" : "bg-[#D1D5DB]"
        }`}
        aria-label={`Toggle ${displayName}`}
      >
        <span
          className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-white transition-transform duration-200 shadow-sm ${
            isEnabled ? "translate-x-[22px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SocialLinkItem;
