import { useState, useMemo } from 'react';
import { mockEmployees } from '../Data/mockEmployees';

export const useEmployees = () => {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [sortBy, setSortBy] = useState('nombre');

  // Filtrar y ordenar empleados usando useMemo para optimización
  const filteredEmployees = useMemo(() => {
    return mockEmployees
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
  }, [searchTerm, selectedDepartment, sortBy]);

  return {
    // Estados
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    setSortBy,
    // Datos procesados
    filteredEmployees
  };
};