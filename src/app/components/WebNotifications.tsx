"use client";

import { useEffect, useState } from "react";

export default function WebNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showManagement, setShowManagement] = useState(false);

  useEffect(() => {
    (function (w: Window & typeof globalThis, d: Document) {
      w.PushEngage = w.PushEngage || [];
      w._peq = w._peq || [];
      w.PushEngage.push([
        "init",
        {
          appId: "915f6022-c9da-4c72-9b8b-6f64491f355f",
        },
      ]);

      const e = d.createElement("script");
      e.src = "https://clientcdn.pushengage.com/sdks/pushengage-web-sdk.js";
      e.async = true;
      e.type = "text/javascript";
      d.head.appendChild(e);

      e.onload = () => {
        setSdkLoaded(true);
        w.PushEngage.push(function () {
          w.PushEngage.getSubscriberId()
            .then(function (subscriberId: string) {
              console.log(subscriberId);
              setIsSubscribed(!!subscriberId);
            })
            .catch(function (error: any) {
              console.error(
                "Error getting subscriber ID:",
                error.message,
                error.details
              );
              setIsSubscribed(false);
            });
        });
      };

      w.addEventListener("pushengageSubscriptionChange", (event: any) => {
        setIsSubscribed(event.detail.isSubscribed);
        if (event.detail.isSubscribed) {
          setNotification("Successfully subscribed to notifications!");
        } else {
          setNotification("Unsubscribed from notifications.");
        }
        setTimeout(() => setNotification(null), 3000);
      });

      w.addEventListener("pushengageSubscriptionError", (event: any) => {
        setNotification("Failed to subscribe: " + event.detail.error);
        setTimeout(() => setNotification(null), 3000);
      });
    })(window, document);
  }, []);

  const checkSdkLoaded = () => {
    if (!sdkLoaded) {
      setNotification("SDK is still loading. Please wait...");
      setTimeout(() => setNotification(null), 3000);
      return false;
    }
    return true;
  };

  const handleSubscribe = () => {
    if (!checkSdkLoaded()) return;
    window.PushEngage?.push(function() {});
  };

  const handleUnsubscribe = () => {
    if (!checkSdkLoaded()) return;
    window.PushEngage?.push(function () {
      window.PushEngage.unsubscribe()
        .then(function (response) {
          console.log(response);
          setNotification("Successfully unsubscribed from notifications!");
          setTimeout(() => setNotification(null), 3000);
        })
        .catch(function (error: any) {
          console.log(error.message, error.details);
          setNotification("Failed to unsubscribe: " + error.message);
          setTimeout(() => setNotification(null), 3000);
        });
    });
  };

  const sendTestNotification = () => {
    console.log("Sending Notification!!!");

    fetch("https://api.pushengage.com/apiv1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Api-Key": "9b85889d-0f2d-4a2f-a540-699b480edbdb",
      },
      body: JSON.stringify({
        notification_title: "Test Notification",
        notification_message: "This is a test notification from our web app!",
        notification_url: window.location.origin,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setNotification("Notification sent successfully!");
        setTimeout(() => setNotification(null), 3000);
      })
      .catch((error) => {
        setNotification("Failed to send notification: " + error.message);
        setTimeout(() => setNotification(null), 3000);
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Web Push Notifications Demo</h1>
      <div className="notification-controls flex flex-col gap-4">
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            disabled={!sdkLoaded}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Subscribe to Notifications
          </button>
        ) : (
          <>
            <button
              onClick={() => setShowManagement(!showManagement)}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {showManagement ? "Hide Management" : "Manage Notifications"}
            </button>
            {showManagement && (
              <div className="management-controls flex flex-col gap-4">
                <button
                  onClick={handleUnsubscribe}
                  disabled={!sdkLoaded}
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Unsubscribe from Notifications
                </button>
                <button
                  onClick={sendTestNotification}
                  disabled={!sdkLoaded}
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Test Notification
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* {notification && (
        <div className="notification bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p>{notification}</p>
        </div>
      )} */}
      <div className="status text-sm text-gray-600 dark:text-gray-400">
        <p>
          Subscription Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
        </p>
      </div>
    </div>
  );
}
