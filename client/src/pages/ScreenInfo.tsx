import React, { useState } from 'react';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import Button from '../components/ui/button/Button';
import { Redirection } from '../components/transaction/Redirection';

interface ScreenInfoProps {
  header: string;
  title: string;
  count: number;
  isActive?: boolean;
}

const ScreenInfo: React.FC<ScreenInfoProps> = ({ header, title, count, isActive }) => {
  const [formData, setFormData] = useState({
    screenName: '',
    resolution: '',
    location: '',
    screenType: '',
    ipAddress: '',
    status: '',
    assignedStore: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const redirectTo = Redirection();

  const handleUpdate = () => {
    console.log('Screen info updated:', formData);
    redirectTo('/ScreenManagment'); // Redirect after update
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Screen Info - {header}</h1>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        <p className="text-xs text-gray-400">
          Screens Online: {count} | Status: {isActive ? 'Active' : 'Inactive'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Screen Name</Label>
          <Input
            name="screenName"
            value={formData.screenName}
            onChange={handleChange}
            placeholder="Main Lobby Screen"
          />
        </div>
        {/* Add other inputs here similarly */}
      </div>

      <div className="flex justify-between mt-10 gap-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleUpdate}
        >
          Update Screen Info
        </Button>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          Remove Screen
        </Button>
      </div>
    </div>
  );
};

export default ScreenInfo;
