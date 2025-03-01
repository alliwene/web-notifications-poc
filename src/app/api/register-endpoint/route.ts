import { CreatePlatformEndpointCommand } from "@aws-sdk/client-sns";
import { NextResponse } from "next/server";

import { snsClient } from "@/lib/sns-client";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const createEndpointCommand = new CreatePlatformEndpointCommand({
      PlatformApplicationArn: process.env.NEXT_PUBLIC_SNS_PLATFORM_APP_ARN,
      Token: token,
      CustomUserData: "Web Push Subscription",
    });

    const { EndpointArn } = await snsClient.send(createEndpointCommand);

    if (!EndpointArn) {
      throw new Error("Failed to create SNS endpoint");
    }

    return NextResponse.json({ endpointArn: EndpointArn });
  } catch (error) {
    console.error("Error creating platform endpoint:", error);
    return NextResponse.json(
      { error: "Failed to create platform endpoint" },
      { status: 500 }
    );
  }
}
