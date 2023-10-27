"use client";

import { Gear, Globe } from "@phosphor-icons/react";
import { Icon, Tabbar, TabbarLink } from "konsta/react";
import { useRouter } from "next/navigation";

export function Navigation({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  return (
    <Tabbar className="fixed bottom-0 left-0 h-24 pt-6">
      <TabbarLink
        active={activeTab === "chats"}
        onClick={() => router.push("/chats")}
        icon={<Icon ios={<Globe size={28} />} material={<Globe size={28} />} />}
        label={"Chats"}
      />
      <TabbarLink
        active={activeTab === "settings"}
        onClick={() => router.push("/settings")}
        icon={<Icon ios={<Gear size={28} />} material={<Gear size={28} />} />}
        label={"Settings"}
      />
    </Tabbar>
  );
}
