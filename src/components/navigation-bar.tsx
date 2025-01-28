"use client";

import * as React from "react";

import { usePathname } from "next/navigation";
import { MobileNav } from "./navigation/mobile/mobile-nav";
import DesktopNav from "./navigation/desktop/desktop-nav";

export function NavBar() {
  const pathname = usePathname();

  return (
    <>
      <DesktopNav
        pathname={pathname}
      />

      <MobileNav
        pathname={pathname}
      />
    </>
  );
}
