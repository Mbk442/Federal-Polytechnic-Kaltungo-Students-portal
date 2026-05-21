// API Routes Documentation
// Backend API endpoints for the Student Portal

/*
AUTH ROUTES
===========
POST /api/auth/login
  Body: { email: string, password: string }
  Response: { token: string, student: Student }

POST /api/auth/register
  Body: { email: string, password: string, firstName: string, lastName: string, department: string }
  Response: { token: string, student: Student }

POST /api/auth/logout
  Response: { success: boolean }

STUDENT ROUTES
==============
GET /api/student/profile
  Headers: Authorization: Bearer {token}
  Response: { student: Student }

PUT /api/student/profile
  Headers: Authorization: Bearer {token}
  Body: { firstName?: string, lastName?: string, phoneNumber?: string }
  Response: { student: Student }

COURSE ROUTES
=============
GET /api/courses
  Headers: Authorization: Bearer {token}
  Response: { courses: Course[] }

POST /api/courses/enroll
  Headers: Authorization: Bearer {token}
  Body: { courseId: string }
  Response: { enrollment: CourseEnrollment }

GET /api/courses/enrolled
  Headers: Authorization: Bearer {token}
  Response: { enrollments: CourseEnrollment[] }

GRADE ROUTES
============
GET /api/grades
  Headers: Authorization: Bearer {token}
  Response: { grades: Grade[] }

FEE ROUTES
==========
GET /api/fees/status
  Headers: Authorization: Bearer {token}
  Response: { feePayment: FeePayment }

POST /api/fees/pay
  Headers: Authorization: Bearer {token}
  Body: { amount: number, paymentMethod: string }
  Response: { payment: FeePayment, reference: string }

ADMIN ROUTES
============
GET /api/admin/students
  Headers: Authorization: Bearer {token}
  Query: page=1&limit=20
  Response: { students: Student[], total: number }

PUT /api/admin/student/:id
  Headers: Authorization: Bearer {token}
  Body: { firstName?: string, level?: string, status?: string }
  Response: { student: Student }

GET /api/admin/grades/:studentId
  Headers: Authorization: Bearer {token}
  Response: { grades: Grade[] }

POST /api/admin/grades
  Headers: Authorization: Bearer {token}
  Body: { studentId: string, courseId: string, grade: string, score: number }
  Response: { grade: Grade }
*/
