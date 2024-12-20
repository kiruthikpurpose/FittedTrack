import { useState, useRef } from 'react';
import { Upload, Dumbbell } from 'lucide-react';
import type { UserProfile } from '../../types/user';
import { calculateBMI, getBMICategory } from '../../types/user';

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export default function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bmi = calculateBMI(formData.height, formData.weight);
  const bmiCategory = getBMICategory(bmi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-navy-900 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">Profile Information</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-navy-800 flex items-center justify-center">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Dumbbell className="w-12 h-12 text-green-400" />
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-green-400 rounded-full text-navy-900 hover:bg-green-500"
          >
            <Upload size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
              />
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                placeholder="Age"
                className="bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
              />
              <input
                type="number"
                value={formData.height || ''}
                onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                placeholder="Height (cm)"
                className="bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
              />
              <input
                type="number"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                placeholder="Weight (kg)"
                className="bg-navy-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-400 text-navy-900 rounded-lg hover:bg-green-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="text-white">{profile.name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-400">Age</p>
                <p className="text-white">{profile.age ? `${profile.age} years` : 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-400">Height</p>
                <p className="text-white">{profile.height ? `${profile.height} cm` : 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-400">Weight</p>
                <p className="text-white">{profile.weight ? `${profile.weight} kg` : 'Not set'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="bg-navy-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">BMI</p>
            <p className="text-2xl font-bold text-white">{bmi}</p>
          </div>
          <div>
            <p className="text-gray-400">Category</p>
            <p className="text-lg text-green-400">{bmiCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
}