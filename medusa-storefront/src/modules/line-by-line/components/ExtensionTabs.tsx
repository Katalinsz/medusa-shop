"use client"
import React, { useState } from "react"
import ColorPicker from "./ColorPicker"

interface ExtensionTabsProps {
  colors: string[]
  onHandleColorChange: (color: string, index: number) => void
  onSortEnd: (oldIndex: number, newIndex: number) => void
}

const ExtensionTabs: React.FC<ExtensionTabsProps> = ({
  colors,
  onHandleColorChange,
  onSortEnd,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: "Play With Color", component: PlayWithColorTab },
    { name: "Embed", component: EmbedTab },
  ]

  function PlayWithColorTab() {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Color Palette
        </h3>
        <div className="flex flex-wrap gap-3 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          {colors.map((color, index) => (
            <ColorPicker
              key={index}
              color={color}
              onColorChange={onHandleColorChange}
              ind={index}
            />
          ))}
        </div>
      </div>
    )
  }

  function EmbedTab() {
    return (
      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-700 mb-4">
            Use the code below to insert the motif on your website.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`<iframe width="100%" height="2320" src="/api/motif-embed" frameBorder="0" title="Your motif to embed"></iframe>`}
          </pre>
          <p className="text-xs text-gray-500 mt-4">
            By embedding the motif on your site, you are agreeing to our API
            Terms of Service.
          </p>
        </div>
      </div>
    )
  }

  const ActiveComponent = tabs[activeTab].component

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === index
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <ActiveComponent />
    </div>
  )
}

export default ExtensionTabs
