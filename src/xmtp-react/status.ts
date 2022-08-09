export enum Status {
  disconnected = 'no signer available',
  idle = 'idle',
  waiting = 'waiting on signature',
  denied = 'signature denied',
  loading = 'loading messages',
  ready = 'ready',
  error = 'error',
}