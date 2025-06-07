// components/MarketEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function MarketEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    market_name: "",
    location: "",
    description: "",
    contact_info: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMarket = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/markets/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${res.status} - ${text}`);
        }
        const data = await res.json();

        setFormData({
          market_name: data.market_name || "",
          location: data.location || "",
          description: data.description || "",
          contact_info: data.contact_info || "",
          created_at: data.created_at
            ? new Date(data.created_at).toISOString().substring(0, 10)
            : "",
        });
      } catch (err: any) {
        setError(err.message || "Failed to load market");
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.market_name.trim()) errors.market_name = "Market name is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        market_name: formData.market_name,
        location: formData.location,
        description: formData.description,
        contact_info: formData.contact_info,
        // Usually created_at is not updated, but sending anyway if you want
        created_at: formData.created_at || null,
      };

      const response = await fetch(`http://localhost:3000/markets/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update market: ${response.status} - ${text}`);
      }

      alert("Market updated successfully!");
      navigate("/MarketManagment");
    } catch (err: any) {
      setError(err.message || "Failed to update market");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Market</h1>

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

          <div className="mb-4">
            <Label htmlFor="created_at">Created At</Label>
            <Input
              id="created_at"
              type="date"
              value={formData.created_at}
              onChange={(e) => handleChange("created_at", e.target.value)}
              disabled // Usually not editable, but can remove if you want editable date
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="outline" onClick={() => navigate("/MarketManagment")}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
