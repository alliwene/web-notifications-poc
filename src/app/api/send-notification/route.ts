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
          notification: {
            title,
            body,
            click_action: process.env.NEXT_PUBLIC_APP_URL || ""
          }
        })
      }),
      MessageStructure: "json"
    });

    await snsClient.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}