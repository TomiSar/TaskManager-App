type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function returnCorrectRequest(
  method: Method,
  data: unknown,
): RequestInit {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (method === 'GET') {
    return {
      method: method,
      headers,
    };
  }

  const body =
    method === 'DELETE' ? undefined : JSON.stringify(data);

  return {
    method: method,
    body: body,
    headers,
  };
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(
    url,
    returnCorrectRequest(method, data),
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const message =
      error?.message ||
      `An error occurred: ${response.status}`;
    throw new Error(message);
  }

  return (await response.json()) as Promise<T>;
}
