// src/types/index.ts
// Type definitions for the application

export interface Student {
  _id: string;
  registrationNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  level: string;
  dateOfBirth: Date;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  student: Student;
}

export interface CourseEnrollment {
  _id: string;
  studentId: string;
  courseId: string;
  semester: string;
  status: "enrolled" | "completed" | "dropped";
  grade?: string;
  createdAt: Date;
}

export interface Grade {
  _id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  semester: string;
  grade: string;
  score: number;
  createdAt: Date;
}

export interface FeePayment {
  _id: string;
  studentId: string;
  amount: number;
  semester: string;
  status: "pending" | "paid" | "partial";
  paymentDate?: Date;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
