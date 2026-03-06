import { useEffect, useState, type FormEvent } from "react";
import { Camera } from "lucide-react";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import Select from "react-select";
import { useEditProfile } from "../hook/profile/useEditProfile";
import { toast } from "sonner";
import { NewNavBar } from "../components/NewNavBar";

// type mainForm = {
//   bio?: string;
//   display_name?: string;
//   social_links?: Array<any>;
// };

type social = {
  platform: string;
  url: string;
  visibility: boolean;
  onDelete: () => void;
  update: (index: number, change: any) => void;
  index: number;
};

//component for social
const Socials = ({
  platform,
  url,
  visibility,
  onDelete,
  update,
  index,
}: social) => {
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
  } | null>(null); //editing platform
  const [link, setLink] = useState("");
  const [plat, setPlat] = useState<any>(); //from api platform
  const [visible, setVisible] = useState<boolean>(false); //manage visible

  //inital platform set
  const inital = (input: string) => {
    if (plat) {
      setPlat({
        value: input,
        label: input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(),
      });
    }
  };

  //initail useffect
  useEffect(() => {
    inital(platform);
    setLink(url);
    setVisible(visibility);
    console.log(visibility);
  }, [platform, url]);

  //on any change/editing of information useEffect
  useEffect(() => {
    update(index, {
      platform: selected?.value,
      url: link,
      visible: visible,
    });
  }, [selected, link, visible]);

  return (
    <section className="space-y-6 bg-[#F9FAFB] p-5 border border-[#A0ABC0] rounded-xl">
      <div className="flex gap-3 items-center">
        <img
          src={
            selected
              ? `https://logos.hunter.io/${selected.label}.com`
              : plat
                ? `https://logos.hunter.io/${plat.label}.com`
                : `https://placehold.co/10x10`
          }
          alt=""
          className="h-9"
        />
        <Select
          options={options}
          value={selected ?? plat}
          onChange={setSelected}
          className="w-full"
        />
      </div>

      <input
        type="text"
        value={link ?? url}
        onChange={(e) => setLink(e.target.value)}
        placeholder="link to your profile"
        className="p-5 border h-10 w-full bg-white rounded-md"
      />

      <div className="flex justify-between">
        <div
          className={`border p-1 px-3 ${visible ? "text-[#008B5D] bg-[#BCFFE9]" : "bg-[#EDF0F7] text-fadetext"}`}
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? "visible" : "Hidden"}
        </div>
        <Trash color="#717D96" onClick={onDelete} />
      </div>
    </section>
  );
};

export const EditProfile = () => {
  //bio
  const [textlength, setTextlength] = useState("");
  const [name, setName] = useState("");
  const [socialArray, setSocialArray] = useState<Array<any>>([]);

  //image management
  const [image, setImage] = useState<any>(null); //image file choosen
  const [preview, setPreview] = useState<any>(null); //if user choose image to change to this displays it
  const [apiImage, setApiImage] = useState<any>(null); //image given from the api

  //api
  //patch function
  const { editProfile, getProfile } = useEditProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }

    imageDisplay();
  };

  //priority image management display
  const imageDisplay = () => {
    if (preview && !apiImage) {
      return preview;
    } else if (!preview && apiImage) {
      return apiImage;
    } else if (preview && apiImage) {
      return preview;
    } else {
      return "https://placehold.co/150x150";
    }
  };

  //social link delete function
  const deleteItem = (index: number) => {
    setSocialArray((prev) => prev.filter((_, i) => i !== index));
  };

  //update social link data
  const updateItem = (index: number, change: any) => {
    setSocialArray((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, ...change } // 🔥 dynamic key
          : item,
      ),
    );
  };

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    const myform = new FormData();

    //check for image
    if (image) {
      myform.append("image", image);
    } else {
      toast.error("no image selected");
      return;
    }

    //check for bio
    if (textlength) {
      myform.append("bio", textlength);
    } else {
      toast.error("Bio field empty");
      return;
    }

    //check for name
    if (name) {
      myform.append("display_name", name);
    } else {
      toast.error("Name field empty");
      return;
    }

    //check for social links
    if (socialArray) {
      myform.append("social_links", JSON.stringify(socialArray));
    } else {
      toast.error("No social links");
      return;
    }

    await editProfile(myform);
  };

  //initial getting of data
  useEffect(() => {
    const initial = async () => {
      const res = await getProfile();

      setTextlength(res?.bio); //bio
      setName(res?.display_name); //dispplay name
      res?.social_links
        ? setSocialArray(res?.social_links)
        : setSocialArray([]); //social links
      setApiImage(res?.profile_photo); //profile photo
    };

    initial();
  }, []);

  return (
    <main className="p-7">
      <NewNavBar />
      <h1 className="text-3xl font-bold w-fit mx-auto">Edit Your Profile</h1>
      <p className="w-fit mx-auto mb-10">
        Customize your digital business card
      </p>

      <section className="mb-5">
        <h6 className="font-semibold text-[16px]">Profile Information</h6>
        <div className="w-fit mx-auto my-3 mb-7 relative">
          <img
            src={imageDisplay()}
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
              onChange={handleImageChange}
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
        onSubmit={Submit}
      >
        <label htmlFor="name" className="font-semibold">
          Display Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          className="border border-[#A0ABC0] p-4 rounded-xl outline-0 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {textlength?.length ? textlength?.length : 0}/200 characters
        </div>

        <section className="mt-10">
          <h4 className="font-semibold mb-4">Social Links</h4>
          <div className="space-y-6">
            {socialArray.length === 0 || socialArray === undefined ? (
              <p>No Social Media Available</p>
            ) : (
              socialArray.map((item, i) => (
                <Socials
                  key={i}
                  platform={item.platform}
                  url={item.url}
                  visibility={item.visible}
                  onDelete={() => deleteItem(i)}
                  update={updateItem}
                  index={i}
                />
              ))
            )}

            <button
              className="border-2 border-dashed border-[#A0ABC0] rounded-lg flex gap-3 w-full justify-center py-5 font-semibold"
              type="button"
              onClick={() =>
                setSocialArray((prev) => [
                  ...prev,
                  {
                    platform: "",
                    url: "",
                    visible: true,
                  },
                ])
              }
            >
              <Plus /> Add New Link
            </button>
          </div>
        </section>

        <button
          type="submit"
          className="bg-[#FBBC05] my-6 p-4 w-full rounded-xl text-white font-semibold"
        >
          Arktivate your card
        </button>
      </form>
    </main>
  );
};
