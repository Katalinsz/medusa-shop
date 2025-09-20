import React from "react"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className="content-wrapper">
      <main className="relative">{children}</main>
    </div>
  )
}

export default Layout
