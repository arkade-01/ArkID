import { useState } from "react";
import { Camera } from "lucide-react";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import Select from "react-select";

//component for social
const Socials = () => {
  const options = [
    { value: "telegram", label: "Telegram" },
    { value: "twitter", label: "Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "snapchat", label: "Snapchat" },
    { value: "pinterest", label: "Pinterest" },
    { value: "tiktok", label: "Tiktok" },
    { value: "substack", label: "Substack" },
  ];

  const [selected, setSelected] = useState<{
    value: string;
    label: string;
  } | null>(null);

  return (
    <section className="space-y-6 bg-[#F9FAFB] p-5 border border-[#A0ABC0] rounded-xl">
      <div className="flex gap-3 items-center">
        <img
          src={
            selected
              ? `https://logos.hunter.io/${selected.label}.com`
              : `https://placehold.co/10x10`
          }
          alt=""
          className="h-9"
        />
        <Select
          options={options}
          value={selected}
          onChange={setSelected}
          className="w-full"
        />
      </div>

      <input
        type="text"
        placeholder="link to your profile"
        className="p-5 border h-10 w-full bg-white rounded-md"
      />

      <div className="flex justify-between">
        <div className="border p-1 px-3 bg-[#EDF0F7] text-fadetext">Hidden</div>
        <Trash color="#717D96" />
      </div>
    </section>
  );
};

export const EditProfile = () => {
  const [textlength, setTextlength] = useState("");
  const [_image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <main className="p-7">
      <h1 className="text-3xl font-bold w-fit mx-auto">Edit Your Profile</h1>
      <p className="w-fit mx-auto mb-10">
        Customize your digital business card
      </p>

      <section className="mb-5">
        <h6 className="font-semibold text-[16px]">Profile Information</h6>
        <div className="w-fit mx-auto my-3 mb-7 relative">
          <img
            src={preview ?? "https://placehold.co/150x150"}
            alt=""
            className="rounded-full h-37.5 w-37.5 border-2 border-white shadow-xl"
          />
          <div className="bg-amber-400 p-3 w-fit rounded-full absolute right-0 -bottom-3">
            <label htmlFor="imageUpload">
              <Camera color="white" />
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
        </div>
        <p className="w-fit mx-auto text-fadetext text-sm">
          Click camera to upload photo
        </p>
      </section>

      <form
        action=""
        className="flex flex-col mb-10 [&>label]:font-semibold [&>label]:mb-2"
      >
        <label htmlFor="name" className="font-semibold">
          Display Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          className="border border-[#A0ABC0] p-4 rounded-xl outline-0 mb-4"
        />
        <label htmlFor="bio" className="font-semibold">
          Bio
        </label>
        <textarea
          value={textlength}
          onChange={(e) => setTextlength(e.target.value)}
          id="bio"
          placeholder="Tell people about yourself..."
          maxLength={200}
          className="border border-[#A0ABC0] p-4 rounded-xl outline-0 mb-2"
        ></textarea>
        <div className="text-sm text-fadetext">
          {textlength.length}/200 characters
        </div>
      </form>

      <section>
        <h4 className="font-semibold mb-4">Social Links</h4>
        <div className="space-y-6">
          <Socials />
          <Socials />
          <Socials />
          <button
            className="border-2 border-dashed border-[#A0ABC0] rounded-lg flex gap-3 w-full justify-center py-5 font-semibold"
            onClick={() => alert("it is not working yet")}
          >
            <Plus /> Add New Link
          </button>
        </div>
      </section>

      <button className="bg-[#FBBC05] my-6 p-4 w-full rounded-xl text-white font-semibold">
        Arktivate your card
      </button>
    </main>
  );
};
