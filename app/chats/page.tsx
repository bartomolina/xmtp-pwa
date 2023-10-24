"use client";

import { Page } from "konsta/react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug } from "@/ui/layout";

export default function Chats() {
  const { isLoggedIn } = useLoginRedirect();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Chats" />
          Chats
        </>
      )}
    </Page>
  );
}
