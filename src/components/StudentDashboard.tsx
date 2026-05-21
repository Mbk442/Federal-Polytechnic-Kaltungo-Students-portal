// src/components/StudentDashboard.tsx
// Main student dashboard component

'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const { student, logout, isAuthenticated } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesRes, gradesRes] = await Promise.all([
        apiClient.getCourses(),
        apiClient.getGrades(),
      ]);
      setCourses(coursesRes.data);
      setGrades(gradesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Federal Polytechnic Kaltungo - Student Portal</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {student.firstName} {student.lastName}!
          </h2>
          <p className="text-gray-600">Reg Number: {student.registrationNumber}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200 flex">
            {['profile', 'courses', 'grades', 'fees'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                    <p><strong>Level:</strong> {student.level}</p>
                    <p><strong>Phone:</strong> {student.phoneNumber}</p>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">Enrolled Courses</h3>
                    {courses.length > 0 ? (
                      <ul className="list-disc list-inside space-y-2">
                        {courses.map((course: any) => (
                          <li key={course._id}>{course.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No courses enrolled</p>
                    )}
                  </div>
                )}

                {activeTab === 'grades' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="border p-2 text-left">Course</th>
                          <th className="border p-2 text-left">Grade</th>
                          <th className="border p-2 text-left">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.length > 0 ? (
                          grades.map((grade: any) => (
                            <tr key={grade._id} className="hover:bg-gray-100">
                              <td className="border p-2">{grade.courseName}</td>
                              <td className="border p-2">{grade.grade}</td>
                              <td className="border p-2">{grade.score}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="border p-2 text-center">
                              No grades available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'fees' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">School Fees Status</h3>
                    <p>Status information will be displayed here</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
