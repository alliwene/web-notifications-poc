# Web Notifications POC

A proof of concept project demonstrating web push notifications using Next.js and OneSignal integration.

## Features

- Web push notifications support
- OneSignal integration
- Multi-language notification content (English and Portuguese)
- User identification with external IDs (Relates to how you identify users in database)
- Simple and clean UI for testing notifications

## Prerequisites

- Node.js (LTS version recommended)
- pnpm package manager
- OneSignal account and application setup

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
pnpm install
```

1. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your OneSignal credentials:
  
```env
NEXT_PUBLIC_ONESIGNAL_API_KEY=your_api_key
NEXT_PUBLIC_ONESIGNAL_APP_ID=your_app_id
```

1. Start the development server:

```bash
pnpm dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. When you first open the application, you'll be prompted to allow notifications
2. Click the "Send Test Notification" button to trigger a test notification
3. The notification will be sent in both English and Portuguese

## Project Structure

- `/src/app/components/WebNotifications.tsx` - Main component handling notification logic
- `/public/OneSignalSDKWorker.js` - OneSignal service worker
- `.env.local` - Environment variables configuration

## Environment Variables

- `NEXT_PUBLIC_ONESIGNAL_API_KEY` - Your OneSignal API key
- `NEXT_PUBLIC_ONESIGNAL_APP_ID` - Your OneSignal application ID

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [OneSignal](https://onesignal.com/) - Push notification service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client

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

## Notes

- The project uses OneSignal's web SDK version 16
- Notifications are supported in modern browsers that implement the Push API
- The demo is configured to work on localhost for development purposes
