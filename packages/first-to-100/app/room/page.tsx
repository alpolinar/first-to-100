"use client";
import { useRoomProvider } from "@/src/hooks/room";
import React, { useState } from "react";

const RoomPage = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useRoomProvider();

    return (
        <div>
            <input
                type="text"
                onChange={(e) => {
                    setMessage(e.currentTarget.value);
                }}
            />
            <button
                type="button"
                onClick={() => {
                    sendMessage({ message });
                }}
            >
                send
            </button>
        </div>
    );
};

export default RoomPage;
