"use client"

import {PortableText, PortableTextComponents} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h1: ({children}: {children: React.ReactNode}) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({children}: {children: React.ReactNode}) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    h3: ({children}: {children: React.ReactNode}) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
    normal: ({children}: {children: React.ReactNode}) => <p className="my-2 leading-7 text-muted-foreground">{children}</p>,
  },
  list: {
    bullet: ({children}: {children: React.ReactNode}) => <ul className="list-disc pl-6 my-2">{children}</ul>,
    number: ({children}: {children: React.ReactNode}) => <ol className="list-decimal pl-6 my-2">{children}</ol>,
  },
  marks: {
    link: ({children, value}: {children: React.ReactNode; value: any}) => {
      const href = (value && (value as any).href) || '#'
      return (
        <a href={href} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    },
  },
  types: {
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
        {children}
      </blockquote>
    ),
  },
}

export default function CMSPortableText({value}: {value: any[]}) {
  return <PortableText value={value} components={components} />
}
