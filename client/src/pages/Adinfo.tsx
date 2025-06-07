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

const AdInfo: React.FC<AdInfoProps> = ({ header, title, count, isActive }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaType: '',
    mediaUrl: '',
    duration: '',
    status: '',
    assignedMarket: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Ad Info - {header}</h1>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        <p className="text-xs text-gray-400">Ads Count: {count} | Status: {isActive ? 'Active' : 'Inactive'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Summer Sale Ad" />
        </div>

        <div>
          <Label>Description</Label>
          <Input name="description" value={formData.description} onChange={handleChange} placeholder="Ad for summer campaign" />
        </div>

        <div>
          <Label>Media Type</Label>
          <Input name="mediaType" value={formData.mediaType} onChange={handleChange} placeholder="image / video" />
        </div>

        <div>
          <Label>Media URL</Label>
          <Input name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="https://example.com/media.mp4" />
        </div>

        <div>
          <Label>Duration (in seconds)</Label>
          <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="30" />
        </div>

        <div>
          <Label>Status</Label>
          <Input name="status" value={formData.status} onChange={handleChange} placeholder="Pending / Approved / Rejected" />
        </div>

        <div>
          <Label>Assigned Market</Label>
          <Input name="assignedMarket" value={formData.assignedMarket} onChange={handleChange} placeholder="Market #12" />
        </div>
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update Ad Info</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Delete Ad</Button>
      </div>
    </div>
  );
};

export default AdInfo;
