'use client'
import Link from 'next/link'
import { useApp } from './Providers'
// Link that plays the curtain transition before opening the page
export default function TLink({ href, children, ...p }) {
  const { go } = useApp()
  return <Link href={href} {...p} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); go(href) }}>{children}</Link>
}
