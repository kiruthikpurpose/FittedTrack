'use client';

import { jsPDF } from 'jspdf';
import { HealthData } from './types';
import { format } from 'date-fns';

export function generatePDF(data: HealthData) {
  const doc = new jsPDF();
  
  // Add title and logo
  doc.setFontSize(24);
  doc.setTextColor(46, 125, 50); // Green color
  doc.text('FittedTrack', 20, 20);
  
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Health Report', 20, 30);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on ${format(new Date(), 'PPP')}`, 20, 40);
  
  // Profile Section
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Profile Information', 20, 60);
  
  doc.setFontSize(12);
  doc.text(`Name: ${data.profile.name || 'Not set'}`, 20, 70);
  doc.text(`Age: ${data.profile.age || 'Not set'}`, 20, 80);
  doc.text(`Height: ${data.profile.height ? `${data.profile.height} cm` : 'Not set'}`, 20, 90);
  doc.text(`Weight: ${data.profile.weight ? `${data.profile.weight} kg` : 'Not set'}`, 20, 100);
  doc.text(`Gender: ${data.profile.gender}`, 20, 110);
  
  // Goals Section
  doc.setFontSize(16);
  doc.text('Daily Goals', 20, 130);
  
  doc.setFontSize(12);
  doc.text(`Water Intake: ${data.goals.waterIntake ? `${data.goals.waterIntake}L` : 'Not set'}`, 20, 140);
  doc.text(`Steps: ${data.goals.steps?.toLocaleString() || 'Not set'}`, 20, 150);
  doc.text(`Sleep: ${data.goals.sleepHours ? `${data.goals.sleepHours} hours` : 'Not set'}`, 20, 160);
  
  // Recent Metrics Section
  doc.setFontSize(16);
  doc.text('Recent Metrics (Last 7 Days)', 20, 180);
  
  const recentMetrics = data.dailyMetrics.slice(-7);
  let y = 190;
  
  recentMetrics.forEach((metric) => {
    doc.setFontSize(12);
    doc.text(format(new Date(metric.date), 'PPP'), 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.text(`Water: ${metric.waterIntake || 0}L | Steps: ${metric.steps?.toLocaleString() || 0}`, 30, y);
    y += 7;
    doc.text(`Sleep: ${metric.sleepHours || 0}h | Calories: ${metric.caloriesBurned?.toLocaleString() || 0}`, 30, y);
    y += 12;
  });
  
  return doc;
}