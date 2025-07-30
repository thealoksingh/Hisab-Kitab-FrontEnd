// src/hooks/useCommentSubscription.js
import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useCommentSubscription = (transactionId, onCommentReceived) => {
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/Hisab-Kitab/ws');

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/transaction/${transactionId}`, (message) => {
          const comment = JSON.parse(message.body);
          onCommentReceived(comment);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [transactionId, onCommentReceived]);
};
