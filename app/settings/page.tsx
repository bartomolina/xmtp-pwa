"use client";

import { Page } from "konsta/react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";

export default function Settings() {
  const { isLoggedIn } = useLoginRedirect();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Settings" />
          Settings
          <Navigation activeTab="settings" />
        </>
      )}
    </Page>
  );
}
