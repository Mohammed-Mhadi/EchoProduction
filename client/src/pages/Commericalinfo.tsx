import React, { useState } from 'react';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import Button from '../components/ui/button/Button';

interface AdInfoProps {
  header: string;
  title: string;
  count: number;
  isActive?: boolean;
}

const ComInfo: React.FC<AdInfoProps> = ({ header, title, count, isActive }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: '',
    mediaUrl: '',
    duration: '',
    startDate: '',
    endDate: '',
    location: '',
    status: '',
    assignedMarkets: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarketSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prev) => ({ ...prev, assignedMarkets: selected }));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Commercial Ad Info - {header}</h1>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        <p className="text-xs text-gray-400">
          Total Ads: {count} | Status: {isActive ? 'Active' : 'Inactive'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Winter Sale Campaign" />
        </div>

        <div>
          <Label>Description</Label>
          <Input name="description" value={formData.description} onChange={handleChange} placeholder="Promotion for Winter 2025" />
        </div>

        <div>
          <Label>Media Type</Label>
          <Input name="mediaType" value={formData.mediaType} onChange={handleChange} placeholder="image / video" />
        </div>

        <div>
          <Label>Media URL</Label>
          <Input name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="https://example.com/ad.mp4" />
        </div>

        <div>
          <Label>Duration (seconds)</Label>
          <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="30" />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input name="startDate" value={formData.startDate} onChange={handleChange} placeholder="2025-06-01" />
        </div>

        <div>
          <Label>End Date</Label>
          <Input name="endDate" value={formData.endDate} onChange={handleChange} placeholder="2025-06-30" />
        </div>

        <div>
          <Label>Location</Label>
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Downtown, NY" />
        </div>

        <div>
          <Label>Status</Label>
          <Input name="status" value={formData.status} onChange={handleChange} placeholder="Pending / Approved / Rejected" />
        </div>

        <div>
          <Label>Assigned Markets</Label>
          <select
            name="assignedMarkets"
            multiple
            value={formData.assignedMarkets}
            onChange={handleMarketSelect}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Market 1">Market 1</option>
            <option value="Market 2">Market 2</option>
            <option value="Market 3">Market 3</option>
            <option value="Market 4">Market 4</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Ad</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Delete Ad</Button>
      </div>
    </div>
  );
};

export default ComInfo;
