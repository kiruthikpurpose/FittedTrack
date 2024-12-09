'use client';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HealthData } from './types';

export async function generatePDF(data: HealthData) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('FittedTrack Health Report', 20, 20);
  
  // Add profile information
  doc.setFontSize(16);
  doc.text('Profile Information', 20, 40);
  doc.setFontSize(12);
  doc.text(`Name: ${data.profile.name}`, 20, 50);
  doc.text(`Age: ${data.profile.age}`, 20, 60);
  doc.text(`Height: ${data.profile.height} cm`, 20, 70);
  doc.text(`Weight: ${data.profile.weight} kg`, 20, 80);
  
  // Add goals
  doc.setFontSize(16);
  doc.text('Daily Goals', 20, 100);
  doc.setFontSize(12);
  doc.text(`Water Intake: ${data.goals.waterIntake}L`, 20, 110);
  doc.text(`Steps: ${data.goals.steps}`, 20, 120);
  doc.text(`Sleep Hours: ${data.goals.sleepHours}h`, 20, 130);
  
  // Add recent metrics
  doc.setFontSize(16);
  doc.text('Recent Metrics', 20, 150);
  doc.setFontSize(12);
  
  const recentMetrics = data.dailyMetrics.slice(-7);
  let y = 160;
  
  recentMetrics.forEach((metric) => {
    doc.text(`Date: ${new Date(metric.date).toLocaleDateString()}`, 20, y);
    doc.text(`Water: ${metric.waterIntake}L | Steps: ${metric.steps} | Sleep: ${metric.sleepHours}h`, 20, y + 10);
    y += 20;
  });
  
  return doc;
}