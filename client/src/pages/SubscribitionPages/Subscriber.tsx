import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';

interface UserInfoProps {
  header: string;
  title: string;
  count: number;
  isActive?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ header }) => {
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    location: '',
    phone: '',
    subscriptionStatus: '',
    storeNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">User Info - {header}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Customer Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>

        <div>
          <Label>Profile Picture URL</Label>
          <Input name="profilePicture" onChange={handleChange} placeholder="https://example.com/image.jpg" />
        </div>

        <div>
          <Label>Occupation</Label>
          <Input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Engineer" />
        </div>

        <div>
          <Label>Location</Label>
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="New York" />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 123 456 7890" />
        </div>

        <div>
          <Label>Subscription Status</Label>
          <Input name="subscriptionStatus" value={formData.subscriptionStatus} onChange={handleChange} placeholder="Active" />
        </div>

        <div>
          <Label>Store Number</Label>
          <Input name="storeNumber" value={formData.storeNumber} onChange={handleChange} placeholder="12345" />
        </div>
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Update User Information</Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Delete User</Button>
      </div>
    </div>
  );
};

export default UserInfo;