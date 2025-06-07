import React, { useState } from 'react';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import Button from '../components/ui/button/Button';

interface TicketInfoProps {
  header: string;
  title: string;
  count: number;
  isActive?: boolean;
}

const TicketInfo: React.FC<TicketInfoProps> = ({ header, title, count, isActive }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: '',
    status: '',
    createdAt: '',
    resolvedAt: '',
    assignedAgent: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Ticket Info - {header}</h1>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        <p className="text-xs text-gray-400">Tickets: {count} | Status: {isActive ? 'Active' : 'Inactive'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Subject</Label>
          <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Login Issue" />
        </div>

        <div>
          <Label>Description</Label>
          <Input name="description" value={formData.description} onChange={handleChange} placeholder="Customer can't log in to the dashboard" />
        </div>

        <div>
          <Label>Priority</Label>
          <Input name="priority" value={formData.priority} onChange={handleChange} placeholder="Low / Medium / High / Critical" />
        </div>

        <div>
          <Label>Status</Label>
          <Input name="status" value={formData.status} onChange={handleChange} placeholder="Open / In Progress / Resolved / Closed" />
        </div>

        <div>
          <Label>Created At</Label>
          <Input name="createdAt" value={formData.createdAt} onChange={handleChange} placeholder="2025-05-18" />
        </div>

        <div>
          <Label>Resolved At</Label>
          <Input name="resolvedAt" value={formData.resolvedAt} onChange={handleChange} placeholder="2025-05-20" />
        </div>

        <div>
          <Label>Assigned Agent</Label>
          <Input name="assignedAgent" value={formData.assignedAgent} onChange={handleChange} placeholder="Agent #7 - Sarah" />
        </div>
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Ticket</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Delete Ticket</Button>
      </div>
    </div>
  );
};

export default TicketInfo;
