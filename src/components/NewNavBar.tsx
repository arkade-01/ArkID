import { Menu } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

//only mobile screen is done
export const NewNavBar = () => {

  const [open, setOpen] = useState<boolean>()
  const navigate = useNavigate()

  const linkFunction = (page : string) => {
    setOpen((prev) => !prev)
    navigate(`${page}`) //e.g '/checkout'
  }

  return (
    <div className="flex items-center justify-between mb-6"> 
        <img src="/ArkID logob.png" alt="" className="h-[30px]"/>
        <div>
            <Menu className="cursor-pointer" onClick={() => setOpen((prev) => !prev)} />
              {open && (
                <nav className="border absolute right-7 bg-white [&>p]:text-right [&>p]:py-2 p-3 rounded-lg">
                  <p onClick={() => linkFunction('/')}>Home</p>
                  <p onClick={() => linkFunction('/how_to_use')}>How it Works</p>
                  <p onClick={() => linkFunction('/')}>Pricing/Shop</p>
                  <p onClick={() => linkFunction('/')}>Sign Up/Login In</p>
                  <p onClick={() => linkFunction('/')}>Contact Us</p>
                </nav>
              )}
        </div>
    </div>
  )
}
