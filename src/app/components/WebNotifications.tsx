"use client";

import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import axios from "axios";

export default function Page() {
  const [externalId] = useState("user_1_id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });

      function pushSubscriptionChangeListener(event: any) {
        if (event.current.token) {
          console.log(`The push subscription has received a token!`);

          OneSignal.login(externalId);
        }
      }

      OneSignal.User.PushSubscription.addEventListener(
        "change",
        pushSubscriptionChangeListener
      );
    }
  }, [externalId]);

  const sendTestNotification = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "https://api.onesignal.com/notifications?c=push",
        {
          app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || "",
          contents: {
            en: "This is a test notification!",
            pt: "Este é um teste de notificação!",
          },
          include_aliases: {
            external_id: [externalId],
          },
          target_channel: "push",
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Key ${process.env.NEXT_PUBLIC_ONESIGNAL_API_KEY}`,
            "content-type": "application/json",
          },
        }
      );
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.[0] ||
          err.response?.data?.message ||
          err.message ||
          "Failed to send notification"
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
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Sending..." : "Send Test Notification"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
