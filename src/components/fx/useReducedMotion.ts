"use client"

import { useEffect, useState } from "react"

/**
 * SSR-safe media-query hook. Returns `false` on the server and during the
 * first client render, then updates after mount so animations never cause
 * hydration mismatches.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [query])

  return matches
}

/** True when the user has requested reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}

/** True on devices with a precise pointer (mouse/trackpad), false on touch. */
export function useIsPointerFine(): boolean {
  return useMediaQuery("(pointer: fine)")
}
