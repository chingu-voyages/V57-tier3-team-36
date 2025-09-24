const options = { onUnhandledRequest: 'warn' } as const;

async function initMocks() {
  if (typeof window === 'undefined') {
    // Server-side: set up the server
    const { server } = await import('./server');
    server.listen(options);
  } else {
    // Client-side: set up the worker
    const { worker } = await import('./browser');
    worker.start(options);
  }
}

initMocks();

export {};
