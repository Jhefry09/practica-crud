import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
// ========================================
// INTERFACES Y TIPOS
// ========================================
export interface Employee {
  id: string;
  name: string;
  dni: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  hireDate?: string; // Fecha de contratación
}

interface EmployeeContextType {
  // Estados
  employees: Employee[];
  searchTerm: string;
  selectedDepartment: string;
  sortBy: string;
  
  // Funciones de filtrado
  setSearchTerm: (term: string) => void;
  setSelectedDepartment: (dept: string) => void;
  setSortBy: (sort: string) => void;
  
  // Funciones CRUD
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  
  // Datos computados
  filteredEmployees: Employee[];
  
  // Estadísticas
  totalEmployees: number;
  newThisMonth: number;
  departmentsCount: number;
  averageSalary: number;
}

// ========================================
// DATOS MOCK EXPANDIDOS (20 empleados)
// ========================================
const initialEmployees: Employee[] = [
  {
    id: 'CM',
    name: 'Carlos Mendoza',
    dni: '12345678',
    position: 'Lead Game Developer',
    department: 'Desarrollo',
    email: 'carlos.mendoza@gamehub.com',
    phone: '+51 999 888 777',
    salary: 6500,
    hireDate: '2024-09-15'
  },
  {
    id: 'AR',
    name: 'Ana Rodriguez',
    dni: '87654321',
    position: 'Diseñadora UI/UX',
    department: 'Diseño',
    email: 'ana.rodriguez@gamehub.com',
    phone: '+51 987 654 321',
    salary: 5800,
    hireDate: '2024-09-20'
  },
  {
    id: 'LP',
    name: 'Luis Paredes',
    dni: '23456789',
    position: 'Backend Developer',
    department: 'Desarrollo',
    email: 'luis.paredes@gamehub.com',
    phone: '+51 988 777 666',
    salary: 5500,
    hireDate: '2024-08-10'
  },
  {
    id: 'MV',
    name: 'María Vargas',
    dni: '34567890',
    position: 'Frontend Developer',
    department: 'Desarrollo',
    email: 'maria.vargas@gamehub.com',
    phone: '+51 977 666 555',
    salary: 5200,
    hireDate: '2024-07-05'
  },
  {
    id: 'JS',
    name: 'Jorge Salazar',
    dni: '45678901',
    position: 'Game Designer',
    department: 'Diseño',
    email: 'jorge.salazar@gamehub.com',
    phone: '+51 966 555 444',
    salary: 5000,
    hireDate: '2024-06-18'
  },
  {
    id: 'CT',
    name: 'Carla Torres',
    dni: '56789012',
    position: 'Marketing Manager',
    department: 'Marketing',
    email: 'carla.torres@gamehub.com',
    phone: '+51 955 444 333',
    salary: 6000,
    hireDate: '2024-05-22'
  },
  {
    id: 'RM',
    name: 'Roberto Morales',
    dni: '67890123',
    position: 'Community Manager',
    department: 'Marketing',
    email: 'roberto.morales@gamehub.com',
    phone: '+51 944 333 222',
    salary: 4200,
    hireDate: '2024-08-30'
  },
  {
    id: 'SF',
    name: 'Sandra Flores',
    dni: '78901234',
    position: 'HR Manager',
    department: 'RRHH',
    email: 'sandra.flores@gamehub.com',
    phone: '+51 933 222 111',
    salary: 5500,
    hireDate: '2024-04-12'
  },
  {
    id: 'DG',
    name: 'Daniel Gutiérrez',
    dni: '89012345',
    position: 'QA Tester',
    department: 'Desarrollo',
    email: 'daniel.gutierrez@gamehub.com',
    phone: '+51 922 111 000',
    salary: 4000,
    hireDate: '2024-09-25'
  },
  {
    id: 'PC',
    name: 'Patricia Castro',
    dni: '90123456',
    position: '3D Artist',
    department: 'Diseño',
    email: 'patricia.castro@gamehub.com',
    phone: '+51 911 000 999',
    salary: 5400,
    hireDate: '2024-07-18'
  },
  {
    id: 'AR2',
    name: 'Andrés Rojas',
    dni: '01234567',
    position: 'DevOps Engineer',
    department: 'Desarrollo',
    email: 'andres.rojas@gamehub.com',
    phone: '+51 900 999 888',
    salary: 6200,
    hireDate: '2024-06-05'
  },
  {
    id: 'LM',
    name: 'Laura Martínez',
    dni: '11223344',
    position: 'Content Writer',
    department: 'Marketing',
    email: 'laura.martinez@gamehub.com',
    phone: '+51 899 888 777',
    salary: 3800,
    hireDate: '2024-08-14'
  },
  {
    id: 'FH',
    name: 'Fernando Herrera',
    dni: '22334455',
    position: 'Sound Designer',
    department: 'Diseño',
    email: 'fernando.herrera@gamehub.com',
    phone: '+51 888 777 666',
    salary: 4800,
    hireDate: '2024-05-28'
  },
  {
    id: 'VC',
    name: 'Valeria Cruz',
    dni: '33445566',
    position: 'HR Specialist',
    department: 'RRHH',
    email: 'valeria.cruz@gamehub.com',
    phone: '+51 877 666 555',
    salary: 4500,
    hireDate: '2024-09-08'
  },
  {
    id: 'MP',
    name: 'Miguel Pérez',
    dni: '44556677',
    position: 'Unity Developer',
    department: 'Desarrollo',
    email: 'miguel.perez@gamehub.com',
    phone: '+51 866 555 444',
    salary: 5800,
    hireDate: '2024-07-22'
  },
  {
    id: 'GS',
    name: 'Gabriela Sánchez',
    dni: '55667788',
    position: 'Animator',
    department: 'Diseño',
    email: 'gabriela.sanchez@gamehub.com',
    phone: '+51 855 444 333',
    salary: 5100,
    hireDate: '2024-06-30'
  },
  {
    id: 'JL',
    name: 'Javier Luna',
    dni: '66778899',
    position: 'SEO Specialist',
    department: 'Marketing',
    email: 'javier.luna@gamehub.com',
    phone: '+51 844 333 222',
    salary: 4300,
    hireDate: '2024-08-01'
  },
  {
    id: 'ER',
    name: 'Elena Ríos',
    dni: '77889900',
    position: 'Recruiter',
    department: 'RRHH',
    email: 'elena.rios@gamehub.com',
    phone: '+51 833 222 111',
    salary: 4000,
    hireDate: '2024-09-12'
  },
  {
    id: 'RV',
    name: 'Ricardo Vega',
    dni: '88990011',
    position: 'Mobile Developer',
    department: 'Desarrollo',
    email: 'ricardo.vega@gamehub.com',
    phone: '+51 822 111 000',
    salary: 5600,
    hireDate: '2024-07-08'
  },
  {
    id: 'NB',
    name: 'Natalia Bravo',
    dni: '99001122',
    position: 'Concept Artist',
    department: 'Diseño',
    email: 'natalia.bravo@gamehub.com',
    phone: '+51 811 000 999',
    salary: 4900,
    hireDate: '2024-06-15'
  }
];

// Helper para colores de departamento
export const getDepartmentColor = (dept: string): string => {
  const colors: Record<string, string> = {
    'Desarrollo': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    'Diseño': 'bg-pink-500/20 text-pink-300 border-pink-500/50',
    'Marketing': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    'RRHH': 'bg-green-500/20 text-green-300 border-green-500/50'
  };
  return colors[dept] || 'bg-slate-500/20 text-slate-300 border-slate-500/50';
};

// ========================================
// CONTEXT
// ========================================
const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// ========================================
// PROVIDER
// ========================================
export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  // Estados principales
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem('gamehub_employees');
    return stored ? JSON.parse(stored) : initialEmployees;
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [sortBy, setSortBy] = useState('nombre');

  // Persistir en localStorage cuando cambian los empleados
  useEffect(() => {
    localStorage.setItem('gamehub_employees', JSON.stringify(employees));
  }, [employees]);

  // ========================================
  // FUNCIONES CRUD
  // ========================================
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: generateId(employee.name),
      hireDate: new Date().toISOString().split('T')[0]
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  // Generar ID a partir de iniciales del nombre
  const generateId = (name: string): string => {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
    
    // Si el ID ya existe, agregar un número
    let id = initials;
    let counter = 2;
    while (employees.some(emp => emp.id === id)) {
      id = `${initials}${counter}`;
      counter++;
    }
    return id;
  };

  // ========================================
  // EMPLEADOS FILTRADOS Y ORDENADOS
  // ========================================
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             emp.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'Todos' || emp.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
      })
      .sort((a, b) => {
        if (sortBy === 'nombre') return a.name.localeCompare(b.name);
        if (sortBy === 'salario') return b.salary - a.salary;
        return 0;
      });
  }, [employees, searchTerm, selectedDepartment, sortBy]);

  // ========================================
  // ESTADÍSTICAS
  // ========================================
  const totalEmployees = employees.length;

  const newThisMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return employees.filter(emp => {
      if (!emp.hireDate) return false;
      const hireDate = new Date(emp.hireDate);
      return hireDate.getMonth() === currentMonth && hireDate.getFullYear() === currentYear;
    }).length;
  }, [employees]);

  const departmentsCount = useMemo(() => {
    const uniqueDepts = new Set(employees.map(emp => emp.department));
    return uniqueDepts.size;
  }, [employees]);

  const averageSalary = useMemo(() => {
    if (employees.length === 0) return 0;
    const total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    return Math.round(total / employees.length);
  }, [employees]);

  // ========================================
  // VALOR DEL CONTEXTO
  // ========================================
  const value: EmployeeContextType = {
    employees,
    searchTerm,
    selectedDepartment,
    sortBy,
    setSearchTerm,
    setSelectedDepartment,
    setSortBy,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    filteredEmployees,
    totalEmployees,
    newThisMonth,
    departmentsCount,
    averageSalary
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};

// ========================================
// HOOK PERSONALIZADO
// ========================================
export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees debe usarse dentro de EmployeeProvider');
  }
  return context;
};