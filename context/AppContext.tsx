import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Student {
  id: string;
  name: string;
  level: string;
  group: string;
  status: 'present' | 'absent' | 'late';
  grades: Grade[];
  attendance: AttendanceRecord[];
  homeworkSubmissions: HomeworkSubmission[];
}

export interface Grade {
  id: string;
  homework: string;
  grade: number;
  maxGrade: number;
  date: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  submitted: boolean;
  submissionDate?: string;
  grade?: number;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  group: string;
  dueDate: string;
  status: 'assigned' | 'submitted' | 'graded';
  attachments?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  group: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  color: string;
}

interface AppContextType {
  students: Student[];
  homework: Homework[];
  lessons: Lesson[];
  addStudent: (student: Omit<Student, 'id' | 'grades' | 'attendance' | 'homeworkSubmissions'>) => void;
  addHomework: (homework: Omit<Homework, 'id'>) => void;
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateHomeworkStatus: (id: string, status: Homework['status']) => void;
  gradeHomework: (homeworkId: string, studentId: string, grade: number) => void;
  updateAttendance: (studentId: string, date: string, status: AttendanceRecord['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Données fictives
const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    level: 'Terminale S',
    group: 'Groupe 1',
    status: 'present',
    grades: [
      { id: '1', homework: 'Équations différentielles', grade: 16, maxGrade: 20, date: '2024-01-15' },
      { id: '2', homework: 'Fonctions logarithmes', grade: 14, maxGrade: 20, date: '2024-01-08' },
    ],
    attendance: [
      { id: '1', date: '2024-01-15', status: 'present' },
      { id: '2', date: '2024-01-08', status: 'present' },
    ],
    homeworkSubmissions: [
      { id: '1', homeworkId: '1', submitted: true, submissionDate: '2024-01-14', grade: 16 },
    ],
  },
  {
    id: '2',
    name: 'Thomas Martin',
    level: 'Première S',
    group: 'Groupe 1',
    status: 'late',
    grades: [
      { id: '3', homework: 'Dérivées', grade: 12, maxGrade: 20, date: '2024-01-10' },
    ],
    attendance: [
      { id: '3', date: '2024-01-15', status: 'late' },
      { id: '4', date: '2024-01-08', status: 'present' },
    ],
    homeworkSubmissions: [
      { id: '2', homeworkId: '2', submitted: false },
    ],
  },
  {
    id: '3',
    name: 'Sophie Leroy',
    level: 'Terminale S',
    group: 'Groupe 2',
    status: 'present',
    grades: [
      { id: '4', homework: 'Intégrales', grade: 18, maxGrade: 20, date: '2024-01-12' },
    ],
    attendance: [
      { id: '5', date: '2024-01-15', status: 'present' },
    ],
    homeworkSubmissions: [
      { id: '3', homeworkId: '3', submitted: true, submissionDate: '2024-01-11', grade: 18 },
    ],
  },
  {
    id: '4',
    name: 'Lucas Moreau',
    level: 'Première S',
    group: 'Groupe 2',
    status: 'absent',
    grades: [],
    attendance: [
      { id: '6', date: '2024-01-15', status: 'absent' },
    ],
    homeworkSubmissions: [],
  },
];

const initialHomework: Homework[] = [
  {
    id: '1',
    title: 'Équations différentielles',
    description: 'Résoudre les exercices 1 à 5 du chapitre 8',
    group: 'Groupe 1',
    dueDate: '2024-01-20',
    status: 'graded',
  },
  {
    id: '2',
    title: 'Dérivées et primitives',
    description: 'Exercices sur les dérivées composées',
    group: 'Groupe 1',
    dueDate: '2024-01-25',
    status: 'assigned',
  },
  {
    id: '3',
    title: 'Intégrales par parties',
    description: 'Méthode d\'intégration par parties - exercices 10 à 15',
    group: 'Groupe 2',
    dueDate: '2024-01-22',
    status: 'submitted',
  },
];

const initialLessons: Lesson[] = [
  {
    id: '1',
    title: 'Fonctions exponentielles',
    group: 'Groupe 1',
    subject: 'Mathématiques',
    date: '2024-01-16',
    time: '09:00',
    duration: 120,
    color: '#3B82F6',
  },
  {
    id: '2',
    title: 'Géométrie dans l\'espace',
    group: 'Groupe 2',
    subject: 'Mathématiques',
    date: '2024-01-16',
    time: '14:00',
    duration: 90,
    color: '#10B981',
  },
  {
    id: '3',
    title: 'Probabilités conditionnelles',
    group: 'Groupe 1',
    subject: 'Mathématiques',
    date: '2024-01-17',
    time: '10:30',
    duration: 120,
    color: '#3B82F6',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [homework, setHomework] = useState<Homework[]>(initialHomework);
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  const addStudent = (studentData: Omit<Student, 'id' | 'grades' | 'attendance' | 'homeworkSubmissions'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      grades: [],
      attendance: [],
      homeworkSubmissions: [],
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const addHomework = (homeworkData: Omit<Homework, 'id'>) => {
    const newHomework: Homework = {
      ...homeworkData,
      id: Date.now().toString(),
    };
    setHomework(prev => [...prev, newHomework]);
  };

  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: Date.now().toString(),
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const updateHomeworkStatus = (id: string, status: Homework['status']) => {
    setHomework(prev => prev.map(hw => hw.id === id ? { ...hw, status } : hw));
  };

  const gradeHomework = (homeworkId: string, studentId: string, grade: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const homework = homework.find(hw => hw.id === homeworkId);
        if (homework) {
          return {
            ...student,
            grades: [...student.grades, {
              id: Date.now().toString(),
              homework: homework.title,
              grade,
              maxGrade: 20,
              date: new Date().toISOString().split('T')[0],
            }],
          };
        }
      }
      return student;
    }));
  };

  const updateAttendance = (studentId: string, date: string, status: AttendanceRecord['status']) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const existingRecord = student.attendance.find(record => record.date === date);
        if (existingRecord) {
          return {
            ...student,
            attendance: student.attendance.map(record => 
              record.date === date ? { ...record, status } : record
            ),
          };
        } else {
          return {
            ...student,
            attendance: [...student.attendance, {
              id: Date.now().toString(),
              date,
              status,
            }],
          };
        }
      }
      return student;
    }));
  };

  return (
    <AppContext.Provider value={{
      students,
      homework,
      lessons,
      addStudent,
      addHomework,
      addLesson,
      updateHomeworkStatus,
      gradeHomework,
      updateAttendance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}