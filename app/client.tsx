"use client";

import {
  ConnectedWallet,
  PrivyProvider,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useClient, XMTPProvider } from "@xmtp/react-sdk";
import { App } from "konsta/react";
import { ThemeProvider } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { env } from "@/env.mjs";
import { APP_URL } from "@/lib/constants";
import { Notification, NotificationProvider } from "@/ui/common";
import { isiOS } from "@/utils/ios";

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  const [mounted, isMounted] = useState(false);
  const [theme, setTheme] = useState<"material" | "ios">("material");

  useEffect(() => {
    if (
      env.NEXT_PUBLIC_ONESIGNAL_APPID &&
      env.NEXT_PUBLIC_ONESIGNAL_APPID.length > 0
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      OneSignalDeferred.push(function (OneSignal) {
        OneSignal.init({
          appId: env.NEXT_PUBLIC_ONESIGNAL_APPID,
          safari_web_id:
            "web.onesignal.auto.5a2165c8-9d94-4308-bfd9-99a8484077b6",
        });
        OneSignal.Slidedown.promptPush();
      });
      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.OneSignalDeferred = undefined;
      };
    }
  }, []);

  useEffect(() => {
    isMounted(true);
    if (isiOS()) {
      setTheme("ios");
    }
  }, [isMounted]);

  return mounted ? (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          loginMethods: ["wallet", "email"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: true,
          },
          appearance: {
            theme: "light",
            logo: `${APP_URL}icons/icon-192x192.png`,
          },
        }}
      >
        <XMTPProvider>
          <NotificationProvider>
            <App theme={theme}>
              <ThemeProvider attribute="class" enableSystem={false}>
                <Notification />
                <XMTPClient>{children}</XMTPClient>
              </ThemeProvider>
            </App>
          </NotificationProvider>
        </XMTPProvider>
      </PrivyProvider>
    </QueryClientProvider>
  ) : (
    <></>
  );
}

function XMTPClient({ children }: { children: React.ReactNode }) {
  const { initialize } = useClient();
  const { wallets } = useWallets();
  const { authenticated, ready, user } = usePrivy();

  const connectedWallet = wallets.find(
    (wallet) => wallet.address === user?.wallet?.address
  );

  const handleConnect = useCallback(
    async (wallet: ConnectedWallet) => {
      const provider = await wallet.getEthersProvider();
      await initialize({
        signer: provider.getSigner(),
        options: { env: "production", persistConversations: false },
      });
    },
    [initialize]
  );

  useEffect(() => {
    if (ready && authenticated && connectedWallet) {
      console.log("XMTPClient:connecting");
      handleConnect(connectedWallet);
    }
  }, [ready, authenticated, connectedWallet, handleConnect]);

  return <>{children}</>;
}
