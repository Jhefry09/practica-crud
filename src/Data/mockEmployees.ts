// Tipos para TypeScript
export interface Employee {
    id: string;
    name: string;
    dni: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    salary: number;
  }
  
  // Datos simulados de empleados
  export const mockEmployees: Employee[] = [
    {
      id: 'CM',
      name: 'Carlos Mendoza',
      dni: '12345678',
      position: 'Lead Game Developer',
      department: 'Desarrollo',
      email: 'carlos.mendoza@gamehub.com',
      phone: '+51 999 888 777',
      salary: 6500
    },
    {
      id: 'AR',
      name: 'Ana Rodriguez',
      dni: '87654321',
      position: 'Diseñadora UI/UX',
      department: 'Diseño',
      email: 'ana.rodriguez@gamehub.com',
      phone: '+51 987 654 321',
      salary: 5800
    }
  ];
  
  // Función helper para colores de departamento
  export const getDepartmentColor = (dept: string): string => {
    const colors: Record<string, string> = {
      'Desarrollo': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      'Diseño': 'bg-pink-500/20 text-pink-300 border-pink-500/50',
      'Marketing': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      'RRHH': 'bg-green-500/20 text-green-300 border-green-500/50'
    };
    return colors[dept] || 'bg-slate-500/20 text-slate-300 border-slate-500/50';
  };