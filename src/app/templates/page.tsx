import Link from "next/link"

import { TemplateDisplay } from "@/components/site/template-display"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"
export const revalidate = false

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24">
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button asChild variant="outline">
            <Link href="/templates/defi-dashboard">Browse more templates</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}