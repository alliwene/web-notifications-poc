import { PublishCommand } from "@aws-sdk/client-sns";
import { NextResponse } from "next/server";

import { snsClient } from "@/lib/sns-client";

export async function POST(request: Request) {
  try {
    const { title, body } = await request.json();

    const command = new PublishCommand({
      TopicArn: process.env.NEXT_PUBLIC_SNS_TOPIC_ARN,
      Message: JSON.stringify({
        default: body,
        GCM: JSON.stringify({
          fcmV1Message: {
            validate_only: false,
            message: {
              notification: {
                title,
                body,
              },
              webpush: {
                notification: {
                  title,
                  body,
                  badge: "1",
                },
              },
            },
          },
        }),
      }),
      MessageStructure: "json",
    });

    await snsClient.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
