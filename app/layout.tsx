/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body><main>
        {/* <nav>
          <Link href="/">Home</Link>
          <Link href="/WebGLExample">WebGL2 Example</Link>
        </nav> */}
        {children}
      </main></body>
    </html>
  )
}
