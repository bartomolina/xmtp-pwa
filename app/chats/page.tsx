"use client";

import { useConversations } from "@xmtp/react-sdk";
import { List, ListItem, Page } from "konsta/react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug, Navigation } from "@/ui/layout";
import { truncateAddr } from "@/utils/truncate-address";

export default function Chats() {
  const { isLoggedIn } = useLoginRedirect();
  const { conversations } = useConversations();

  return (
    <Page>
      {isLoggedIn && (
        <>
          <NavbarWithDebug title="Chats" />
          <List strongIos outlineIos nested>
            {conversations.map((conversation) => (
              <ListItem
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
