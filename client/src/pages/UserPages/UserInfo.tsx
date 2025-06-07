import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import Button from '../../components/ui/button/Button';
import { Redirection } from '../../components/transaction/Redirection';

interface UserInfoProps {
  header: string;
}

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation?: string;
  subscriptionStatus: 'active' | 'pending' | 'cancelled'| '';
  profilePicturePreview: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN' | ''; 
}
interface FormErrors {
  [key: string]: string | undefined;
}

const UserInfo: React.FC<UserInfoProps> = ({ header }) => {
  const Redirectto = Redirection();

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    location: '',
    occupation: '',
    subscriptionStatus: '',
    profilePicturePreview: null,
    role: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isDragging, setIsDragging] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = 'Name should contain only letters and spaces';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-]+$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }

    if (formData.location && !/^[a-zA-Z\s]+$/.test(formData.location)) {
      errors.location = 'City should contain only letters and spaces';
    }

    if (!formData.subscriptionStatus) {
      errors.subscriptionStatus = 'Subscription status is required';
    }

    if (!formData.role) {
      errors.role = 'Role is required';
    }

    if (!selectedFile) {
      errors.profilePicturePreview = 'Profile picture is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, profilePicturePreview: reader.result as string }));
      setFormErrors(prev => ({ ...prev, profilePicturePreview: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleAddNewAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to add a new account?');
    if (!confirmed) return;

    if (!validate()) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    const requestFormData = new FormData();
    requestFormData.append('name', formData.name);
    requestFormData.append('email', formData.email);
    requestFormData.append('phone', formData.phone);
    requestFormData.append('role', formData.role);
    requestFormData.append('subscription_status', formData.subscriptionStatus);

    if (formData.occupation) {
      requestFormData.append('occupation', formData.occupation);
    }
    if (formData.location) {
      requestFormData.append('location', formData.location);
    }
    if (selectedFile) {
      requestFormData.append('profile_image', selectedFile);
    }

    try {
      setShowNotification(true);
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: requestFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Failed to add new user');
      }

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        occupation: '',
        subscriptionStatus: '',
        profilePicturePreview: null,
        role: '',
      });
      setSelectedFile(null);

      setTimeout(() => {
        setShowNotification(false);
        Redirectto('/usermanagement');
      }, 2000);
    } catch (error) {
      setShowNotification(false);
      console.error("Error adding user:", error);
      alert(`Error adding user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">User Management - {header}</h1>
      </div>

      {showNotification && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-md shadow-md text-center">
          Process is done
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Image Upload */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
          className={`border-2 border-dashed rounded-md cursor-pointer p-4 flex flex-col items-center justify-center min-h-[150px] ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
          }`}
        >
          {formData.profilePicturePreview ? (
            <img
              src={formData.profilePicturePreview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-500">Drag & drop or click to upload profile picture</p>
          )}
          <p className="text-gray-500 text-sm mt-1">Image file (JPG, PNG, etc.) required</p>
          {formErrors.profilePicturePreview && (
            <p className="text-red-600 mt-1 text-sm">{formErrors.profilePicturePreview}</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileInputChange}
          />
        </div>

        {/* Customer Name */}
        <div>
          <Label htmlFor="name">Customer Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          {formErrors.name && <p className="text-red-600 text-sm">{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
          {formErrors.email && <p className="text-red-600 text-sm">{formErrors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 123 456 7890" />
          {formErrors.phone && <p className="text-red-600 text-sm">{formErrors.phone}</p>}
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location (City)</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="New York" />
          {formErrors.location && <p className="text-red-600 text-sm">{formErrors.location}</p>}
        </div>

        {/* Occupation */}
        <div>
          <Label htmlFor="occupation">Occupation (optional)</Label>
          <Input id="occupation" name="occupation" value={formData.occupation || ''} onChange={handleChange} placeholder="Engineer" />
        </div>

        {/* Role */}
        <div>
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select role</option>
            <option value="user">CUSTOMER</option>
            <option value="admin">ADMIN</option>
          </select>
          {formErrors.role && <p className="text-red-600 text-sm">{formErrors.role}</p>}
        </div>

        {/* Subscription Status */}
        <div>
          <Label htmlFor="subscriptionStatus">Subscription Status</Label>
          <select
            id="subscriptionStatus"
            name="subscriptionStatus"
            value={formData.subscriptionStatus}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {formErrors.subscriptionStatus && (
            <p className="text-red-600 text-sm">{formErrors.subscriptionStatus}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleAddNewAccount}>Add New Account</Button>
      </div>
    </div>
  );
};

export default UserInfo;
