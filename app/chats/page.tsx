"use client";

import { useConversations } from "@xmtp/react-sdk";
import { List, ListItem, Page } from "konsta/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";
import { truncateAddr } from "@/utils/truncate-address";

export default function Chats() {
  const router = useRouter();
  const { isLoggedIn } = useLoginRedirect();
  const { conversations } = useConversations();

  useEffect(() => {
    console.log("chats:conversations:", conversations);
  }, [conversations]);

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Chats" />
          <List className="mb-24" strongIos outlineIos nested>
            {conversations.map((conversation) => (
              <ListItem
                onClick={() =>
                  router.push(`/chat/${encodeURIComponent(conversation.topic)}`)
                }
                key={conversation.id}
                title={truncateAddr(conversation.peerAddress)}
                link
              />
            ))}
          </List>
          <Navigation activeTab="chats" />
        </>
      )}
    </Page>
  );
}
