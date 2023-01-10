export async function verifyEmail(userEmail: string): Promise<Response>{
  
  const res = await fetch('http://localhost:3000/api/emailVerification', {
    method: 'POST',
    body: JSON.stringify({
      userEmail,
      redirectUrl: 'http://localhost:3000'
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  return res
}

/**
 * Sends an email to the user to reset his password
 * @param userEmail the user's email
 * @returns Promise<Response> that describes if the sending was successful or not
 */
export async function resetPassword(userEmail: string): Promise<Response> {
  const res = await fetch('http://localhost:3000/api/passwordReset', {
    method: 'POST',
    body: JSON.stringify({
      userEmail,
      redirectUrl: 'http://localhost:3000/profile'
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  return res
}

