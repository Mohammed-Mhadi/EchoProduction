// components/SubscriberForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

export default function SubscriberForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    plan_type: "",
    start_date: "",
    end_date: "",
    subscription_status: "active",
    paid_amount: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.user_id.trim()) errors.user_id = "User ID is required";
    if (!formData.plan_type.trim()) errors.plan_type = "Plan type is required";
    if (!formData.paid_amount.trim()) errors.paid_amount = "Paid amount is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        user_id: formData.user_id,
        plan_type: formData.plan_type,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        subscription_status: formData.subscription_status,
        paid_amount: formData.paid_amount,
      };

      const response = await fetch("http://localhost:3000/subscription/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create subscription: ${response.status} - ${text}`);
      }

      alert("Subscription created successfully!");
      navigate("/subscription");
    } catch (err: any) {
      setError(err.message || "Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Subscription</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <>
          <div className="mb-4">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              value={formData.user_id}
              onChange={(e) => handleChange("user_id", e.target.value)}
              error={!!formErrors.user_id}
              placeholder="User ID"
            />
            {formErrors.user_id && (
              <p className="text-red-500 text-sm mt-1">{formErrors.user_id}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="plan_type">Plan Type</Label>
            <Input
              id="plan_type"
              value={formData.plan_type}
              onChange={(e) => handleChange("plan_type", e.target.value)}
              error={!!formErrors.plan_type}
              placeholder="Plan Type"
            />
            {formErrors.plan_type && (
              <p className="text-red-500 text-sm mt-1">{formErrors.plan_type}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => handleChange("end_date", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-md border-gray-300 dark:bg-slate-800 dark:border-slate-600 p-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="mb-4">
            <Label htmlFor="paid_amount">Paid Amount</Label>
            <Input
              id="paid_amount"
              type="number"
              value={formData.paid_amount}
              onChange={(e) => handleChange("paid_amount", e.target.value)}
              error={!!formErrors.paid_amount}
              placeholder="e.g. 100"
            />
            {formErrors.paid_amount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.paid_amount}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleCreate}>Create Subscription</Button>
            <Button variant="outline" onClick={() => navigate("/subscription")}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
