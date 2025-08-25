import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useNotificationSubscription = (userId, onNotification) => {
  const clientRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:8080/Hisab-Kitab/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          const notification = JSON.parse(message.body);
          onNotification(notification);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [userId, onNotification]);
};