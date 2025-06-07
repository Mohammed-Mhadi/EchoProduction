// Define types for better TypeScript support
interface User {
  image: string;
  name: string;
  role: string;
}

interface Location {
  city?: string;
  state?: string;
  address?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  postal_code?: string;
}

interface Order {
  id: string;
  user: User;
  location: Location | null;
  subscription_status: string;
  status: "Active" | "Pending" | "Inactive";
  store_no: number;
  phonenumber: string;
  action: string;
}

export default async function FetchUserData(url: string): Promise<Order[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any[] = await response.json();

    return data.map((item): Order => {
      const statusStr = (item.subscription_status ?? "unknown").toLowerCase();
      let status: "Active" | "Pending" | "Inactive" = "Inactive";

      if (statusStr === "active") status = "Active";
      else if (statusStr === "pending") status = "Pending";

      return {
        id: item.customer_id,
        user: {
          image: item.profile_image_url || "/images/default-user.png",
          name: item.customer_name,
          role: item.customer_role,
        },
        location: item.location || null,
        subscription_status: item.subscription_status || "Unknown",
        status: status,
        store_no: Number(item.stores_number) || 0,
        phonenumber: item.phone || "N/A",
        action: "Edit",
      };
    });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}

// Usage example:
// FetchUserData("http://localhost:3000/user")
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Unexpected error:", error));
