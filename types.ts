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