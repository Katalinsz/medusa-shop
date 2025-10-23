import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAllCmsPageSlugs, getCmsPageBySlug } from "@lib/data/cms"
import { listRegions } from "@lib/data/regions"
import CMSPortableText from "../../../../../components/cms/PortableText"
import { StoreRegion } from "@medusajs/types"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllCmsPageSlugs()

  if (!slugs?.length) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      slugs.map((slug: string) => ({
        countryCode,
        slug,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const page = await getCmsPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return {
    title: `${page.title} | Knitted for You`,
    description: page.description || undefined,
  }
}

export default async function CmsPage(props: Props) {
  const params = await props.params
  const page = await getCmsPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="w-full">
      {/* Hero header */}
      <section className="bg-gradient-to-b from-[#12725c] to-[#0e5b49] text-white">
        <div className="container max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{page.title}</h1>
          {page.description && (
            <p className="mt-2 text-white/80 max-w-3xl">{page.description}</p>
          )}
        </div>
      </section>

      {/* Article card */}
      <section className="container max-w-4xl mx-auto px-4 py-10">
        <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
          {page.content?.length ? (
            <div className="space-y-4">
              <CMSPortableText value={page.content} />
            </div>
          ) : (
            <p className="text-gray-500">No content found.</p>
          )}
        </article>
      </section>
    </div>
  )
}
