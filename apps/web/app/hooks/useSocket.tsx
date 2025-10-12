import React, { useEffect, useState } from 'react'
import { WS_URL } from '../config';

const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQwYjAwNS0yNTdjLTRmMWUtYTcxNC1jZDJmNmU4ODVmMjAiLCJpYXQiOjE3NjAwMzkxMzZ9.-iB8G8hQyCaLcmEkbsHZg6GE1-8R208mqo9uhKzFFWo"

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    }
  }, [])
  return {
    socket,
    loading
  }
}

export default useSocket
