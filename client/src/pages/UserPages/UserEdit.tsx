// components/UserEdit.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_role: "",
    phone: "",
    profile_image_url: "",
    customer_location: "",
    // These two fields are fetched but not updated
    subscription_status: "",
    stores_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/user/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${res.status} - ${text}`);
        }
        const user = await res.json();

        setFormData({
          customer_name: user.customer_name || "",
          customer_role: user.customer_role || "",
          phone: user.phone || "",
          profile_image_url: user.profile_image_url || "",
          customer_location: user.customer_location || "",
          subscription_status: user.subscription_status || "",
          stores_number: user.stores_number ? user.stores_number.toString() : "",
        });
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.customer_name.trim()) errors.customer_name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      // Only send fields you want to update
      const payload: any = {
        customer_name: formData.customer_name,
        customer_role: formData.customer_role,
        phone: formData.phone,
        profile_image_url: formData.profile_image_url,
        customer_location: formData.customer_location,
      };

      const response = await fetch(`http://localhost:3000/user/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload ),
      });

      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update user: ${response.status} - ${text}`);
      }

      alert("User info updated successfully!");
      navigate("/usermanagement");
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete user: ${response.status} - ${text}`);
      }

      alert("User deleted!");
      navigate("/usermanagement");
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit User</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4 flex items-center gap-4">
            <img
              src={formData.profile_image_url}
              alt={formData.customer_name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const newImage = URL.createObjectURL(e.target.files[0]);
                  setFormData((prev) => ({ ...prev, profile_image_url: newImage }));
                }
              }}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Change Photo
            </Button>
          </div>

          <div className="mb-4">
            <Label htmlFor="customer_name">Name</Label>
            <Input
              id="customer_name"
              value={formData.customer_name}
              onChange={(e) => handleChange("customer_name", e.target.value)}
              error={!!formErrors.customer_name}
            />
            {formErrors.customer_name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.customer_name}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="customer_role">Role</Label>
            <Input
              id="customer_role"
              value={formData.customer_role}
              onChange={(e) => handleChange("customer_role", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!formErrors.phone}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="customer_location">Location</Label>
            <Input
              id="customer_location"
              value={formData.customer_location}
              onChange={(e) => handleChange("customer_location", e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={handleDelete} variant="outline">
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
