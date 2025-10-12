"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="">
        <input
          style={{
            padding: 10,
          }}
          type="text"
          placeholder="Room Id"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />

        <button
          style={{
            padding: 10,
          }}
          onClick={() => {
            router.push(`/room/${roomId}`);
          }}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
