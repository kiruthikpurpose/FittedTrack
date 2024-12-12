'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getStoredData, updateProfile, updateGoals, exportData, calculateBMI } from '@/lib/storage';
import { generatePDF } from '@/lib/pdf';
import { toast } from 'sonner';
import { UserProfile, Goals } from '@/lib/types';
import { ProfileForm } from '@/components/settings/ProfileForm';
import { GoalsForm } from '@/components/settings/GoalsForm';
import { FileText, Download } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: null,
    height: null,
    weight: null,
    gender: 'other',
  });

  const [goals, setGoals] = useState<Goals>({
    waterIntake: null,
    steps: null,
    sleepHours: null,
  });

  useEffect(() => {
    const data = getStoredData();
    setProfile(data.profile);
    setGoals(data.goals);
  }, []);

  const handleProfileSubmit = (updatedProfile: UserProfile) => {
    updateProfile(updatedProfile);
    toast.success('Profile updated successfully!');
  };

  const handleGoalsSubmit = (updatedGoals: Goals) => {
    const validGoals = {
      waterIntake: updatedGoals.waterIntake ?? 0,
      steps: updatedGoals.steps ?? 0,
      sleepHours: updatedGoals.sleepHours ?? 0,
    };
    updateGoals(validGoals);
    toast.success('Goals updated successfully!');
  };

  const handleExportJSON = () => {
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
    toast.success('Data exported as JSON successfully!');
  };

  const handleExportPDF = () => {
    const data = getStoredData();
    const doc = generatePDF(data);
    doc.save('fittedtrack-report.pdf');
    toast.success('Report exported as PDF successfully!');
  };

  const bmi = profile.height && profile.weight ? calculateBMI(profile.height, profile.weight) : null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and goals</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ProfileForm
            profile={profile}
            onSubmit={handleProfileSubmit}
            onProfileChange={setProfile}
          />

          {bmi !== null && (
            <Card className="p-4 bg-muted">
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
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <GoalsForm
            goals={goals}
            onSubmit={handleGoalsSubmit}
            onGoalsChange={setGoals}
          />

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Management</h2>
            <div className="space-y-3">
              <Button onClick={handleExportPDF} className="w-full flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Export as PDF
              </Button>
              <Button onClick={handleExportJSON} variant="outline" className="w-full flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export as JSON
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}