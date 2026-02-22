import { EllipsisVertical } from "lucide-react"
import { Share2 } from "lucide-react"

const PersonalLinks = () => {
    return (
        <a target="_blank" href="https://www.youtube.com" className="flex justify-between items-center border border-fadetext rounded-xl p-3">
            <img src="https://logos.hunter.io/gmail.com" alt="" className="w-8 h-8"/>
            <p>random link way</p>
            <EllipsisVertical/>
        </a>
    )
}

export const Profile = () => {
  return (
    <main className="p-7">
        <img src="" alt="" />
        <section>
            <img src="https://placehold.co/150x150" alt="" className="h-37.5 w-37.5 rounded-full mx-auto"/>
            <h4 className="text-center font-bold text-3xl">John Doe</h4>
            <p className="text-center text-fadetext">Creative Director & Photographer | Helping brands tell their story through visual content | Based in Lagos 🇳🇬</p>
            <button className="flex gap-3 border rounded-full p-4 mx-auto"> <Share2/> Share Profile</button>
        </section>

        <section>
            <PersonalLinks/>
        </section>
    </main>
  )
}
