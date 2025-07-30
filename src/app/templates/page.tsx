import Link from "next/link"

import { TemplateDisplay } from "@/components/site/template-display"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"
export const revalidate = false

const FEATURED_TEMPLATES = [
  "dashboard-01",
  "sidebar-07",
  "sidebar-03",
  "login-03",
  "login-04",
]

export default async function TemplatesPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      {FEATURED_TEMPLATES.map((name) => (
        <TemplateDisplay name={name} key={name} />
      ))}
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button asChild variant="outline">
            <Link href="/templates/sidebar">Browse more templates</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}