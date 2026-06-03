"use client"

import { MockDataProvider } from "@/lib/mock-data"

export default function OperadorAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MockDataProvider>
      {children}
    </MockDataProvider>
  )
}
