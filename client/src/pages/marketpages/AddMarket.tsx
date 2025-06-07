import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { useUserContext } from "../../components/context/UserContext/UserContext";

export default function AddMarket() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    market_name: "",
    location: "",
    description: "",
    contact_info: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.market_name.trim()) errors.market_name = "Market name is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        user_id: user?.id || user?.userId,  // send user_id to backend
        name: formData.market_name,          // backend expects "name" not "market_name"
        location: formData.location,
        description: formData.description,
        contact_info: formData.contact_info,
      };

      const response = await fetch(`http://localhost:3000/markets/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to add market: ${response.status} - ${text}`);
      }

      alert("Market added successfully!");
      navigate("/MarketManagment");
    } catch (err: any) {
      setError(err.message || "Failed to add market");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Market</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4">
            <Label htmlFor="market_name">Market Name</Label>
            <Input
              id="market_name"
              value={formData.market_name}
              onChange={(e) => handleChange("market_name", e.target.value)}
              error={!!formErrors.market_name}
            />
            {formErrors.market_name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.market_name}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={!!formErrors.location}
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="contact_info">Contact Info</Label>
            <Input
              id="contact_info"
              value={formData.contact_info}
              onChange={(e) => handleChange("contact_info", e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleAdd}>Add Market</Button>
            <Button variant="outline" onClick={() => navigate("/MarketManagment")}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
