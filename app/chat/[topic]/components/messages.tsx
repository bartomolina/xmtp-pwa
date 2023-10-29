"use client";

import {
  CachedConversation,
  DecodedMessage,
  useClient,
  useConversation,
  useStreamMessages,
} from "@xmtp/react-sdk";
import { Message, Messages as KonstaMessages } from "konsta/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface MessagesProps {
  conversation: CachedConversation;
}

export default function Messages({ conversation }: MessagesProps) {
  const { client } = useClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getByTopic } = useConversation();
  const [streamedMessages, setStreamedMessages] = useState<DecodedMessage[]>(
    []
  );
  const onMessage = useCallback((message: DecodedMessage) => {
    setStreamedMessages((prev) => {
      const messageExists = prev.some((msg) => msg.id === message.id);
      if (!messageExists) {
        console.log("messages:message:", message);
      }
      return messageExists ? prev : [...prev, message];
    });
  }, []);
  useStreamMessages(conversation, { onMessage });

  useEffect(() => {
    getByTopic(conversation.topic).then((_conversation) => {
      _conversation?.messages().then(setStreamedMessages);
    });
  }, [conversation, getByTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [streamedMessages]);

  return (
    <>
      <KonstaMessages className="mb-10">
        {streamedMessages?.map((message) => (
          <Message
            key={message.id}
            type={
              client?.address === message.senderAddress ? "sent" : "received"
            }
            name={
              client?.address === message.senderAddress
                ? undefined
                : message.senderAddress
            }
            text={message.content}
          />
        ))}
      </KonstaMessages>
      <div ref={messagesEndRef} />
    </>
  );
}
