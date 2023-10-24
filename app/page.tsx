"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { BlockTitle, List, ListButton, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { env } from "@/env.mjs";
import {
  AddToHomeScreenAndroid,
  AddToHomeScreeniOS,
  NavbarWithDebug,
} from "@/ui/layout";
import { Login } from "@/ui/login";

export default function Home() {
  const router = useRouter();
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();

  const primaryWallet = wallets && wallets[0] ? wallets[0] : undefined;

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/explore");
    }
  }, [router, ready, authenticated]);

  return (
    <Page>
      {ready && !authenticated && (
        <>
          <NavbarWithDebug title="Login" />
          {env.NEXT_PUBLIC_ONESIGNAL_APPID &&
            env.NEXT_PUBLIC_ONESIGNAL_APPID.length > 0 && (
              <>
                <AddToHomeScreenAndroid />
                <AddToHomeScreeniOS />
              </>
            )}
          <BlockTitle>Account</BlockTitle>
          <List strong inset>
            <ListButton onClick={() => (authenticated ? logout() : login())}>
              {authenticated ? "Disconnect" : "Connect"}
            </ListButton>
          </List>
          {authenticated && primaryWallet && (
            <Login address={primaryWallet.address} />
          )}
        </>
      )}
    </Page>
  );
}
