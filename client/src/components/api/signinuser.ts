// src/api/users.ts

export interface SignInByIdTokenData {
  idToken: string;
}

/**
 * Sends Firebase ID token to backend to verify and sign in the user.
 * Backend should verify the token and return user info or session data.
 */
export async function signInUserWithIdToken(data: SignInByIdTokenData) {
  const payload = {
    idToken: data.idToken,
  };

  console.log("Sending ID token payload to backend:", payload);

  try {
    const res = await fetch("http://localhost:3000/user/signin", {  // Adjust endpoint as needed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      
    });


    const responseText = await res.text();
    console.log("Response from backend:", responseText);
    console.log()

    if (!res.ok) {
      let errorMsg = "An error occurred during sign-in.";
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error) errorMsg = errorData.error;
      } catch {
        errorMsg = responseText || errorMsg;
      }
      throw new Error(errorMsg);
    }

    return JSON.parse(responseText);
  } catch (err) {
    console.error("Sign-in error:", err);
    throw err;
  }
}
