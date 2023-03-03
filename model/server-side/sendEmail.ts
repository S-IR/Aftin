export async function verifyEmail(userEmail: string): Promise<Response> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_server}/api/emailVerification`,
    {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        redirectUrl: `${process.env.NEXT_PUBLIC_server}`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  return res;
}

/**
 * Sends an email to the user to reset his password
 * @param userEmail the user's email
 * @returns Promise<Response> that describes if the sending was successful or not
 */
export async function resetPassword(userEmail: string): Promise<Response> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_server}/api/passwordReset`,
    {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        redirectUrl: `${process.env.NEXT_PUBLIC_server}/profile`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  return res;
}

export async function changeUsername(userEmail: string): Promise<Response> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_server}/api/changeUsername`,
    {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        redirectUrl: `${process.env.NEXT_PUBLIC_server}/profile`,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  return res;
}
