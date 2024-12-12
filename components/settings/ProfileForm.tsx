import React from 'react';
import { UserProfile } from '@/lib/types';
import { MetricInput } from '@/components/metrics/MetricInput';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProfilePhoto } from '@/components/settings/ProfilePhoto';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ProfileFormProps {
  profile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  onProfileChange: (profile: UserProfile) => void;
}

export function ProfileForm({ profile, onSubmit, onProfileChange }: ProfileFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfilePhoto
          photoUrl={profile.photoUrl}
          name={profile.name}
          onPhotoChange={(url) => onProfileChange({ ...profile, photoUrl: url })}
        />

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
            placeholder="Enter your name"
          />
        </div>

        <MetricInput
          label="Age"
          id="age"
          value={profile.age}
          onChange={(value) => onProfileChange({ ...profile, age: value })}
          placeholder="Enter your age"
        />

        <MetricInput
          label="Height (cm)"
          id="height"
          value={profile.height}
          onChange={(value) => onProfileChange({ ...profile, height: value })}
          placeholder="Enter your height"
        />

        <MetricInput
          label="Weight (kg)"
          id="weight"
          value={profile.weight}
          onChange={(value) => onProfileChange({ ...profile, weight: value })}
          placeholder="Enter your weight"
        />

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={profile.gender}
            onValueChange={(value: 'male' | 'female' | 'other') =>
              onProfileChange({ ...profile, gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </Card>
  );
}