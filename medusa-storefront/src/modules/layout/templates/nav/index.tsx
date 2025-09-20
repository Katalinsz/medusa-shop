"use client"

import React, { useState, useRef, useEffect, Suspense } from "react"
//import { Menu, X } from "lucide-react"

//import { listRegions } from "@lib/data/regions"
//import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!

type Region = { id: string; name?: string; iso_2?: string }


export default async function Nav() {
  const bgPattern = "https://motif.knittedforyou.com/1598-knitting_chart/o.jpg"   //"/images/img.webp"
  const logo = "/images/logo.png"
  const [regions, setRegions] = useState<string[]>([]) // or Region[]

   const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
  
  const toggleMenu = () => setIsOpen((prev) => !prev)
  const toggleDropdown = () => setDropdownOpen((prev) => !prev)
  
  useEffect(() => {

    let aborted = false
      const run = async () => {
        try {
          const res = await fetch(`${MEDUSA_URL}/store/regions`, {
              headers: { "x-publishable-api-key": PUB_KEY },
              cache: "no-store",
          })
          if (!res.ok) throw new Error(`regions ${res.status}`)
          const data = await res.json() as { regions: Region[] }
          if (!aborted) setRegions(data.regions?.map(r => r.iso_2 || r.name || ""))
        } catch (e) {
          console.error("Failed to load regions:", e)
          if (!aborted) setRegions([])
        }
        //run()
        
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
        
      run(); 
      return () => { aborted = true }
    }
    
  }, [])
  
  const handleLinkClick = () => {
      setIsOpen(false)
      setDropdownOpen(false)
  }
  
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          
  {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPattern})` }}
      />

      <div className="container mx-auto px-4 relative z-10 h-full w-full">
        {/* Desktop Layout  */ }
        <div className="hidden md:flex h-full w-full">
          <div className="h-[70px] flex items-center bg-[#fafafa]/90 pl-6 pr-8 rounded-br-[100px] shadow-sm backdrop-blur-sm min-w-[200px] fixed top-0 left-0">
            <LocalizedClientLink href="/">
              <img src={logo} alt="Logo" className="h-[32px]" />
            </LocalizedClientLink>
          </div>

          <div className="flex-grow" />

          <nav
            className="h-[70px] flex items-center bg-[#fafafa]/90 pl-10 pr-8 rounded-bl-[100px] shadow-sm backdrop-blur-sm min-w-[300px] fixed top-0 right-0"
            ref={dropdownRef}
          >
            <ul className="flex gap-8 text-gray-800 font-medium items-center">
              {["Home", "Library", "Create Motive"].map((item) => (
                <li key={item}>
                  <LocalizedClientLink
                    href="/"
                    className="hover:text-green-600 transition-colors"
                  >
                    {item}
                  </LocalizedClientLink>
                </li>
              ))}
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    {["Account", "Orders"].map((item, index) => (
                      <li key={index}>
                        <LocalizedClientLink
                          href="/account"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={handleLinkClick}
                        >
                          {item}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      href="/"
                      className="hover:text-ui-fg-base flex gap-2"
                    >
                      Cart (0)
                    </LocalizedClientLink>
                  }
                >
                 
                </Suspense>
              </li>
            </ul>
          </nav>
        </div> 
        </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Knitted for You header
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
             
            </Suspense>
          </div>
        </nav>
      </header>
      <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
      </div>
    </div>
  )
}