'use client'

import { SidebarIcon } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'
// import { WalletButton } from '@/components/solana/solana-provider'
// import { ClusterButton } from '@/components/solana/solana-provider'
import { ThemeSelect } from '@/components/theme-select'

export function SiteHeader({ page }: { page: string }) {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b px-2">
      <div className="flex h-(--header-height) w-full items-center gap-2">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Escrow</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <SearchForm className="" /> */}
      </div>
      <div className="flex justify-end items-center gap-4">
        {/* <WalletButton size="sm" />
        <ClusterButton size="sm" /> */}
        <ThemeSelect />
      </div>
    </header>
  )
}
