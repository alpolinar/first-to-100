"use client";
import { useEffect, useState } from "react";

export const useRoomProvider = (): Readonly<{
    socket: WebSocket | null;
    sendMessage: (input: Readonly<{ message: string }>) => void;
}> => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3001/sub/room?id=1234");
        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            console.log("message", event.data);
        };

        ws.onerror = (error) => {
            console.log("error", error);
        };

        ws.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        setSocket(ws);

        return () => ws.close();
    }, []);

    const sendMessage = (input: Readonly<{ message: string }>) => {
        socket?.send(JSON.stringify(input));
    };
    return { socket, sendMessage };
};
