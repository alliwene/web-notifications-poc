# Web Notifications POC

A proof of concept project demonstrating web push notifications using Next.js with AWS SNS integration and Firebase Cloud Messaging (FCM).

## Features

- Web push notifications support via Firebase Cloud Messaging (FCM)
- AWS SNS integration for cross-platform message delivery
- User device token management
- Simple and clean UI for testing notifications

## Prerequisites

- Node.js (LTS version recommended)
- pnpm package manager
- AWS account with SNS configuration
- Firebase project setup

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
pnpm install
```

1. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase and AWS credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXT_PUBLIC_SNS_TOPIC_ARN=your_sns_topic_arn
NEXT_PUBLIC_SNS_PLATFORM_APP_ARN=your_sns_platform_app_arn
NEXT_PUBLIC_AWS_REGION=your_aws_region
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_aws_access_key_id
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key

NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
```

1. Start the development server:

```bash
pnpm dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. When you first open the application, you'll be prompted to allow notifications
2. Click the "Send Test Notification" button to trigger a test notification

## Project Structure

- `/src/app/` - Main application directory
  - `/components/` - React components including notification handling
  - `/api/` - API routes
    - `/register-endpoint/` - Endpoint for registering device tokens
    - `/send-notification/` - Endpoint for sending push notifications
  - `page.tsx` - Main application page
  - `layout.tsx` - Root layout component
- `/src/lib/` - Utility and configuration files
  - `firebase.ts` - Firebase configuration and initialization
  - `sns-client.ts` - AWS SNS client configuration
- `/public/` - Static files
  - `firebase-messaging-sw.js` - Firebase service worker
- `.env.local` - Environment variables configuration

## Environment Variables

### Firebase Configuration

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Your Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase application ID
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID

### AWS SNS Configuration

- `NEXT_PUBLIC_SNS_TOPIC_ARN` - AWS SNS topic ARN
- `NEXT_PUBLIC_SNS_PLATFORM_APP_ARN` - AWS SNS platform application ARN
- `NEXT_PUBLIC_AWS_REGION` - AWS region
- `NEXT_PUBLIC_AWS_ACCESS_KEY_ID` - AWS access key ID
- `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY` - AWS secret access key

### Web Push Configuration

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - VAPID public key for web push

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) - Push notification service
- [AWS SNS](https://aws.amazon.com/sns/) - Cross-platform notification service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```
