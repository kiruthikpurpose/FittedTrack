'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getStoredData, updateProfile, updateGoals, calculateBMI, exportData } from '@/lib/storage';
import { toast } from 'sonner';
import { UserProfile, Goals } from '@/lib/types';

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    gender: 'other',
  });

  const [goals, setGoals] = useState<Goals>({
    waterIntake: 3,
    steps: 10000,
    sleepHours: 8,
  });

  useEffect(() => {
    const data = getStoredData();
    setProfile(data.profile);
    setGoals(data.goals);
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    toast.success('Profile updated successfully!');
  };

  const handleGoalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoals(goals);
    toast.success('Goals updated successfully!');
  };

  const handleExport = () => {
    const dataStr = exportData();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fittedtrack-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const bmi = calculateBMI(profile.height, profile.weight);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and goals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={profile.gender}
                onValueChange={(value: 'male' | 'female' | 'other') =>
                  setProfile({ ...profile, gender: value })
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

          {profile.height > 0 && profile.weight > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">BMI: {bmi.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">
                {bmi < 18.5
                  ? 'Underweight'
                  : bmi < 25
                  ? 'Normal weight'
                  : bmi < 30
                  ? 'Overweight'
                  : 'Obese'}
              </p>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
            <form onSubmit={handleGoalsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waterGoal">Water Intake Goal (L)</Label>
                <Input
                  id="waterGoal"
                  type="number"
                  step="0.1"
                  value={goals.waterIntake}
                  onChange={(e) =>
                    setGoals({ ...goals, waterIntake: parseFloat(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stepsGoal">Steps Goal</Label>
                <Input
                  id="stepsGoal"
                  type="number"
                  value={goals.steps}
                  onChange={(e) =>
                    setGoals({ ...goals, steps: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleepGoal">Sleep Goal (hours)</Label>
                <Input
                  id="sleepGoal"
                  type="number"
                  value={goals.sleepHours}
                  onChange={(e) =>
                    setGoals({ ...goals, sleepHours: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <Button type="submit" className="w-full">Save Goals</Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Management</h2>
            <Button onClick={handleExport} className="w-full">
              Export Data
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}