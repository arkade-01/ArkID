import { useState } from "react";
import { Camera } from "lucide-react";

const Socials = () => {
  //https://logos.hunter.io/hunter.io
  return <section>instagram</section>;
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
            className="rounded-full h-37.5 w-37.5"
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
        <h4 className="font-semibold">Social Links</h4>
        <div>
          <Socials />
        </div>
      </section>
    </main>
  );
};
