import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated, ready, logout, user } = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { wallets } = useWallets();

  useEffect(() => {
    if (ready && !authenticated) {
      console.log("hook:loginRedirect:redirecting");
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, ready, authenticated]);

  const ensureWallet = async () => {
    const connectedWallet = wallets.find(
      (wallet) => wallet.address === user?.wallet?.address
    );
    if (connectedWallet) {
      return connectedWallet;
    } else {
      await logout();
      router.push("/");
    }
  };

  return { isLoggedIn, ensureWallet };
}
