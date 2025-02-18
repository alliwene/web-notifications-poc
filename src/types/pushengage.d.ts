type PushEngageCommand = ['init', { appId: string }] | ['subscribe'] | ['unsubscribe'] | (() => void);

interface PushEngageInterface {
  push(command: PushEngageCommand): void;
  getSubscriberId(): Promise<string>;
  unsubscribe(): Promise<any>;
}

interface PushEngageQueue {
  (command: 'getSubscriptionStatus', callback: (status: boolean) => void): void;
}

declare global {
  interface Window {
    PushEngage: PushEngageInterface;
    _peq: PushEngageQueue[];
  }
}

export {};