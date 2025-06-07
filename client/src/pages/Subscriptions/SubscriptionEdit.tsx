// components/SubscriptionEdit.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function SubscriptionEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    user_name: "",
    user_role: "",
    user_occupation: "",
    subscription_plan_type: "", // added!
    subscription_start_date: "",
    subscription_end_date: "",
    subscription_status: "",
    subscription_paid_amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSubscription = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/subscription/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error: ${res.status} - ${text}`);
        }
        const data = await res.json();

        setFormData({
          user_name: data.user_name || "",
          user_role: data.user_role || "",
          user_occupation: data.user_occupation || "",
          subscription_plan_type: data.subscription_plan_type || "", // added!
          subscription_start_date: data.subscription_start_date
            ? new Date(data.subscription_start_date).toISOString().substring(0, 10)
            : "",
          subscription_end_date: data.subscription_end_date
            ? new Date(data.subscription_end_date).toISOString().substring(0, 10)
            : "",
          subscription_status: data.subscription_status || "",
          subscription_paid_amount: data.subscription_paid_amount || "",
        });
      } catch (err: any) {
        setError(err.message || "Failed to load subscription");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.user_name.trim()) errors.user_name = "Customer name is required";
    if (!formData.subscription_paid_amount.trim()) errors.subscription_paid_amount = "Paid amount is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    try {
      const payload = {
        user_name: formData.user_name,
        user_role: formData.user_role,
        user_occupation: formData.user_occupation,
        subscription_plan_type: formData.subscription_plan_type, // added!
        subscription_start_date: formData.subscription_start_date,
        subscription_end_date: formData.subscription_end_date,
        subscription_status: formData.subscription_status,
        subscription_paid_amount: formData.subscription_paid_amount,
      };

      const response = await fetch(`http://localhost:3000/subscription/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update subscription: ${response.status} - ${text}`);
      }

      alert("Subscription updated successfully!");
      navigate("/subscriptions");
    } catch (err: any) {
      setError(err.message || "Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Subscription</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4">
            <Label htmlFor="user_name">Customer</Label>
            <Input
              id="user_name"
              value={formData.user_name}
              onChange={(e) => handleChange("user_name", e.target.value)}
              error={!!formErrors.user_name}
            />
            {formErrors.user_name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.user_name}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="user_role">User Role</Label>
            <Input
              id="user_role"
              value={formData.user_role}
              onChange={(e) => handleChange("user_role", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="user_occupation">Occupation</Label>
            <Input
              id="user_occupation"
              value={formData.user_occupation}
              onChange={(e) => handleChange("user_occupation", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subscription_plan_type">Plan Type</Label>
            <Input
              id="subscription_plan_type"
              value={formData.subscription_plan_type}
              onChange={(e) => handleChange("subscription_plan_type", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subscription_start_date">Start Date</Label>
            <Input
              id="subscription_start_date"
              type="date"
              value={formData.subscription_start_date}
              onChange={(e) => handleChange("subscription_start_date", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subscription_end_date">End Date</Label>
            <Input
              id="subscription_end_date"
              type="date"
              value={formData.subscription_end_date}
              onChange={(e) => handleChange("subscription_end_date", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subscription_status">Subscription Status</Label>
            <Input
              id="subscription_status"
              value={formData.subscription_status}
              onChange={(e) => handleChange("subscription_status", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="subscription_paid_amount">Paid Amount</Label>
            <Input
              id="subscription_paid_amount"
              type="number"
              value={formData.subscription_paid_amount}
              onChange={(e) => handleChange("subscription_paid_amount", e.target.value)}
              error={!!formErrors.subscription_paid_amount}
            />
            {formErrors.subscription_paid_amount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.subscription_paid_amount}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleUpdate}>Update</Button>
            <Button variant="outline" onClick={() => navigate("/subscriptions")}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
