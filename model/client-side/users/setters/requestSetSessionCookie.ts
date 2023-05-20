export const requestSetSessionCookie = async (token: string): Promise<void> => {
  const res = await fetch("/api/users/set-session-cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  console.log("response from setSession", res.statusText);

  if (!res.ok) {
    throw new Error(`Failed to set tier: ${res.statusText}`);
  }
};
