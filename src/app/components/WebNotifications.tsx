"use client";

import { useEffect, useState } from "react";

import { getFCMToken, firebaseConfig } from "@/lib/firebase";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const setupNotifications = async () => {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
            registration.active?.postMessage({
              type: 'FIREBASE_CONFIG',
              config: firebaseConfig
            });
            const token = await getFCMToken();
            console.log('FCM Token:', token);

            try {
              const response = await fetch('/api/register-endpoint', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: token
                })
              });

              const data = await response.json();
              
              if (data.endpointArn) {
                setFcmToken(token);
                console.log('Successfully registered with SNS:', data.endpointArn);
              } else if (data.error) {
                throw new Error(data.error);
              } else {
                throw new Error('Failed to create SNS endpoint');
              }
            } catch (apiError: any) {
              throw new Error(`Registration failed: ${apiError.message}`);
            }
          }
        } catch (err) {
          console.error("Failed to setup notifications:", err);
          setError("Failed to setup notifications");
        }
      };

      setupNotifications();
    }
  }, []);

  const sendTestNotification = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "Test Notification",
          body: "This is a test notification!"
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to send notification');
      }

      console.log("Notification sent successfully");
      
    } catch (err: any) {
      setError(
        err.message || "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Web Notifications Demo</h1>
      <button
        onClick={sendTestNotification}
        disabled={loading || !fcmToken}
        className={`px-4 py-2 rounded-md text-white ${
          loading || !fcmToken ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Sending..." : "Send Test Notification"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {!fcmToken && !error && (
        <p className="text-yellow-500">Please allow notifications to continue</p>
      )}
    </div>
  );
}
