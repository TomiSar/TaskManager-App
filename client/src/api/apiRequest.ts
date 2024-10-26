type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function returnCorrectRequest(
  method: Method,
  data: unknown,
  options?: RequestInit,
): RequestInit {
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestConfig: RequestInit = {
    method,
    headers,
    credentials: 'include', // Ensure credentials (cookies) are included
    ...options, // Merge any additional options
  };

  if (method !== 'GET') {
    requestConfig.body =
      method === 'DELETE'
        ? undefined
        : JSON.stringify(data);
  }

  return requestConfig;
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    url,
    returnCorrectRequest(method, data, options),
  );

  console.log(response);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message =
      error?.message ||
      `An error occurred: ${response.status}`;
    console.debug(error);
    throw new Error(message);
  }

  return (await response.json()) as Promise<T>;
}
