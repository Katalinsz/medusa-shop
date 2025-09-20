import React, { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import SideMenu from "@modules/layout/components/side-menu"
import ClientNavWithMedusa from "./clientNav"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <header className="relative h-[110px] w-full sticky top-0 inset-x-0 z-50">
      <ClientNavWithMedusa />
      
      {/* SideMenu for regions - positioned absolutely to avoid client/server mixing */}
      <div className="absolute top-[20px] left-[20px] z-20 hidden md:block">
        <SideMenu regions={regions} />
      </div>
    </header>
  )
}