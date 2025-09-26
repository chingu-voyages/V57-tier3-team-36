import { v4 as uuidv4 } from 'uuid';

export async function fetchRequest(url: string, options?: RequestInit) {
  // Generate a unique, short ID for each request
  const requestId = uuidv4().slice(0, 8);
  const fetchOptions = {
    ...options,
    headers: {
      ...options?.headers,
      'X-Mgf-Request-Id': requestId,
    },
  };

  // Make request
  const startTime = new Date();
  const response = await fetch(url, fetchOptions);
  const endTime = new Date();

  // Log request duration
  const duration = endTime.getTime() - startTime.getTime();
  console.log(`${url} (+${duration}ms)`);

  return response;
}
