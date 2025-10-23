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
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      {page.description && (
        <p className="text-muted-foreground mb-6">{page.description}</p>
      )}
      {page.content?.length ? <CMSPortableText value={page.content} /> : null}
    </div>
  )
}
