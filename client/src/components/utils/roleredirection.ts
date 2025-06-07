import { NavigateFunction } from "react-router";

export async function redirectByUserRole(firebaseUid: string, navigate: NavigateFunction) {
  try {
    const response = await fetch(`/users/${firebaseUid}`);
    if (!response.ok) throw new Error("Failed to fetch user role");

    const data = await response.json();
    const role = data.role;

    switch (role) {
      case "admin":
        navigate("/users");
        break;
      case "market_owner":
        navigate("/markets");
        break;
      case "user":
        navigate("/usermanagement");
        break;
      default:
        navigate("/usermanagement"); // fallback route
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    navigate("/"); // fallback route on error
  }
}
