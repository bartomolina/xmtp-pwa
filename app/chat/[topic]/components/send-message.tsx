"use client";

import { PaperPlaneRight } from "@phosphor-icons/react";
import { CachedConversation, useSendMessage } from "@xmtp/react-sdk";
import { Link, Messagebar } from "konsta/react";
import { useCallback, useState } from "react";

interface SendMessageProps {
  conversation: CachedConversation;
}

export default function SendMessage({ conversation }: SendMessageProps) {
  const [messageText, setMessageText] = useState("");
  const { sendMessage } = useSendMessage();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (conversation?.peerAddress && messageText) {
        console.log("sendMessage:sending message:", messageText);
        await sendMessage(conversation, messageText);
        console.log("sendMessage:message sent");
      }
    },
    [messageText, conversation, sendMessage]
  );

  const inputOpacity = messageText ? 1 : 0.3;
  const isClickable = messageText.trim().length > 0;

  return (
    <Messagebar
      placeholder="Message"
      value={messageText}
      onInput={(e) => setMessageText(e.target.value)}
      right={
        <Link
          onClick={isClickable ? handleSendMessage : undefined}
          toolbar
          style={{
            opacity: inputOpacity,
            cursor: isClickable ? "pointer" : "default",
          }}
        >
          <PaperPlaneRight size={32} weight="fill" />
        </Link>
      }
    />
  );
}
