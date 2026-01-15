
import React from 'react';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subText: string;
  color: 'blue' | 'amber' | 'emerald' | 'purple';
  icon: React.ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  active?: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  faculty: string;
  department: string;
  careerPath: string; 
  admissionYear: string;
  enrollmentTerm: string;
  status: 'Active' | 'Applicant' | 'On Leave' | 'Graduated' | 'Suspended';
  standing: 'Honor Roll' | 'Good' | 'Probation' | 'Warning';
  gpa: number;
  avatarColor: string;
  photo?: string;
  photoZoom: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Full-time' | 'Contract' | 'Part-time' | 'On Leave';
  category: 'Academic' | 'Administrative' | 'Management';
  specialization: string;
  avatarColor: string;
  joinDate: string;
  office: string;
  officeHours: string;
  photo?: string;
}

export interface Transaction {
  ref: string;
  name: string;
  desc: string;
  date: string;
  amt: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  faculty: string;
  department: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate';
  credits: number;
  status: 'Published' | 'Draft' | 'Archived';
  description: string;
  syllabus?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: 'Theology' | 'ICT' | 'Business' | 'Education' | 'General';
  type: 'PDF' | 'E-Book' | 'Hardcopy' | 'Journal' | 'Video';
  status: 'Available' | 'Borrowed' | 'Reserved' | 'Digital';
  location: string;
  year: string;
  isbn?: string;
  description: string;
  downloadUrl?: string;
  coverImage?: string;
}
