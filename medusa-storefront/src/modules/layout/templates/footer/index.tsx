import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-white border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Logo and Brand Column */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {/* Replace with your actual logo */}
                  <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
                  <LocalizedClientLink
                    href="/"
                    className="text-lg font-medium text-gray-800 hover:text-ui-fg-base"
                  >
                    Knitted for You
                  </LocalizedClientLink>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Medusa mediq is a community for</p>
                  <p>discussing, sharing inspiring needs</p>
                  <p>and finding creative people worldwide.</p>
                </div>
                <div className="space-y-1 text-sm">
                  <LocalizedClientLink 
                    href="/about" 
                    className="text-teal-500 hover:underline block"
                  >
                    About us
                  </LocalizedClientLink>
                  <LocalizedClientLink 
                    href="/contact" 
                    className="text-teal-500 hover:underline block"
                  >
                    Contact us
                  </LocalizedClientLink>
                </div>
              </div>

              {/* Categories Column */}
              {productCategories && productCategories?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    CATEGORIES
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600" data-testid="footer-categories">
                    {productCategories?.slice(0, 6).map((c) => {
                      if (c.parent_category) {
                        return
                      }

                      return (
                        <li key={c.id}>
                          <LocalizedClientLink
                            className="hover:text-gray-800 transition-colors"
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Collections Column */}
              {collections && collections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    COLLECTIONS
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-gray-800 transition-colors"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow Us Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  FOLLOW US
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <a href="#" className="hover:text-blue-600 cursor-pointer block transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-blue-400 cursor-pointer block transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-pink-500 cursor-pointer block transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-red-500 cursor-pointer block transition-colors">
                    YouTube
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Optional: Add MedusaCTA if you want to keep it */}
        {/* <MedusaCTA /> */}
        
      </div>
    </footer>
  )
}