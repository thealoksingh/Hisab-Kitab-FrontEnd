import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useFriendRequestSubscription = (userId, onUpdate) => {
  const clientRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/friend-requests/${userId}`, (message) => {
          const data = JSON.parse(message.body);
          onUpdate(data);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [userId, onUpdate]);
};