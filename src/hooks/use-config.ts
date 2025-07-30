import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { BaseColor } from "@/components/solancn/registry/registry-base-colors"
import { Style } from "@/components/solancn/registry/registry-styles"

type Config = {
    style: Style["name"]
    theme: BaseColor["name"]
    radius: number
    packageManager: "npm" | "yarn" | "pnpm" | "bun"
    installationType: "cli" | "manual"
}

const configAtom = atomWithStorage<Config>("config", {
    style: "new-york",
    theme: "zinc",
    radius: 0.5,
    packageManager: "pnpm",
    installationType: "cli",
})

export function useConfig() {
    return useAtom(configAtom)
}
