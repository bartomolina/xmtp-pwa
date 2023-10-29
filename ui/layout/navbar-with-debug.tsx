import { Link, Navbar, NavbarBackLink } from "konsta/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DebuggerIcon, DebuggerLogs } from "@/ui/layout";

interface NavbarWithDebugProps {
  title: string;
  backLink?: string;
  closeAction?: () => void;
}

export function NavbarWithDebug({
  title,
  backLink,
  closeAction,
}: NavbarWithDebugProps) {
  const [popupOpened, setPopupOpened] = useState(false);
  const router = useRouter();

  return (
    <>
      <Navbar
        title={title}
        left={
          backLink && (
            <NavbarBackLink text="Back" onClick={() => router.push(backLink)} />
          )
        }
        right={
          <div className="flex gap-3">
            {closeAction && (
              <Link navbar onClick={closeAction}>
                Close
              </Link>
            )}
            <DebuggerIcon setPopupOpened={setPopupOpened}></DebuggerIcon>
          </div>
        }
      />
      <DebuggerLogs
        popupOpened={popupOpened}
        setPopupOpened={setPopupOpened}
      ></DebuggerLogs>
    </>
  );
}
