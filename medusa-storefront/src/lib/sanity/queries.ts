import groq from 'groq'

export const PAGE_BY_SLUG = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  content
}`

export const ALL_PAGE_SLUGS = groq`*[_type == "page" && defined(slug.current)].slug.current`
