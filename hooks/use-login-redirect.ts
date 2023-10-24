import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLoginRedirect() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (ready && !authenticated) {
      console.log("hook:loginRedirect:redirecting");
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router, ready, authenticated]);

  return { isLoggedIn };
}
