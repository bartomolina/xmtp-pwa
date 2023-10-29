"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import {
  BlockTitle,
  List,
  ListButton,
  ListItem,
  Page,
  Toggle,
} from "konsta/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";

export default function Settings() {
  const { user, logout } = usePrivy();
  const { wallets } = useWallets();
  const { theme, setTheme } = useTheme();
  const { isLoggedIn } = useLoginRedirect();
  const [connectedWallet, setConnectedWallet] = useState<
    ConnectedWallet | undefined
  >();

  useEffect(() => {
    const wallet = wallets.find(
      (wallet) => wallet.address === user?.wallet?.address
    );
    setConnectedWallet(wallet);
  }, [wallets, user]);

  useEffect(() => {
    console.log("settings:user:", user);
  }, [user]);

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Settings" />
          <BlockTitle>Profile</BlockTitle>
          <List strong inset>
            <ListButton onClick={() => logout()}>Log out</ListButton>
          </List>
          <BlockTitle>Theme</BlockTitle>
          <List strong inset>
            <ListItem
              label
              title="Dark Mode"
              after={
                <Toggle
                  checked={theme === "light" ? false : true}
                  onChange={() =>
                    theme === "light" ? setTheme("dark") : setTheme("light")
                  }
                />
              }
            />
          </List>
          <BlockTitle>Wallet</BlockTitle>
          <List strong inset>
            <ListItem
              header="User Wallet Address"
              title={user?.wallet?.address}
              titleWrapClassName="font-mono text-xs"
            />
            <ListItem
              header="Connected Wallet"
              title={connectedWallet?.address}
              titleWrapClassName="font-mono text-xs"
            />
          </List>
          <Navigation activeTab="settings" />
        </>
      )}
    </Page>
  );
}
