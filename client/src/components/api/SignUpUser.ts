// src/api/users.ts

export interface SignUpData {
  firebase_uid: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string; // optional, defaulted if not passed
  profile_image?: string | null;
}

export async function signUpUser(data: SignUpData) {
  const payload = {
    ...data,
    role: data.role ?? "user", // assign default if not present
  };

  console.log("Sending payload to backend:", payload);

  try {
    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text(); // raw text in case it's not JSON

    console.log("Raw response text:", responseText);
    console.log("Response status:", res.status);

    if (!res.ok) {
      let errorMsg = "An error occurred while signing up.";
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
    console.error("Signup error:", err);
    throw err;
  }
}
