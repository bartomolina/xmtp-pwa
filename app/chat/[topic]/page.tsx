"use client";

import {
  CachedConversation,
  useClient,
  useConversation,
} from "@xmtp/react-sdk";
import { Page } from "konsta/react";
import { useEffect, useState } from "react";

import { useLoginRedirect } from "@/hooks";
import { NavbarWithDebug } from "@/ui/layout";

import Messages from "./components/messages";
import SendMessage from "./components/send-message";

export default function Chat({ params }: { params: { topic: string } }) {
  const { isLoggedIn } = useLoginRedirect();
  const { getCachedByTopic } = useConversation();
  const { client } = useClient();
  const [conversation, setConversation] = useState<
    CachedConversation | undefined
  >();

  useEffect(() => {
    if (client) {
      console.log(
        "test:getting conversation:topic:",
        decodeURIComponent(params.topic)
      );
      getCachedByTopic(decodeURIComponent(params.topic)).then(
        (conversation) => {
          setConversation(conversation);
        }
      );
    }
  }, [client, params.topic, getCachedByTopic]);

  return (
    <Page>
      {isLoggedIn && conversation && (
        <>
          <NavbarWithDebug backLink="/chats" title="Messages" />
          <Messages conversation={conversation} />
          <SendMessage conversation={conversation} />
        </>
      )}
    </Page>
  );
}
