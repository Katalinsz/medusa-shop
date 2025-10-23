import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer className="bg-white text-left w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-start space-y-4">
          <img
            className="w-32 md:w-48 lg:w-56"
            src="/images/logo.png"
            alt="Knitted for You logo"
          />
        </div>

        {/* About */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#12725c]">About</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Knitted motif is a platform for knitting, engaging sharing, and
            community-driven projects.
          </p>
          <ul className="space-y-2">
            <li>
              <LocalizedClientLink
                href="/content/about"
                className="text-gray-600 text-sm hover:underline"
              >
                About
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="text-gray-600 text-sm hover:underline"
              >
                Privacy Policy
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/content/cookie-policy"
                className="text-gray-600 text-sm hover:underline"
              >
                Cookie Policy
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#12725c]">Follow Us</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a
                href="https://www.facebook.com/groups/motif.knittedforyou/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#12725c] transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/knittedforyou/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#12725c] transition-colors"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
