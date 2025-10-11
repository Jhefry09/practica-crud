import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import { useEmployees } from '../../Contexts/EmployeeContext';
import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graphics = () => {
  const { employees } = useEmployees();

  // Calcular datos para el gráfico de barras (Sueldos por Departamento)
  const salaryByDepartment = useMemo(() => {
    const deptMap: Record<string, { total: number; count: number }> = {};
    
    employees.forEach(emp => {
      if (!deptMap[emp.department]) {
        deptMap[emp.department] = { total: 0, count: 0 };
      }
      deptMap[emp.department].total += emp.salary;
      deptMap[emp.department].count += 1;
    });

    return Object.entries(deptMap).map(([dept, data]) => ({
      department: dept,
      promedio: Math.round(data.total / data.count)
    }));
  }, [employees]);

  // Calcular datos para el gráfico circular (Distribución de Empleados)
  const employeeDistribution = useMemo(() => {
    const deptMap: Record<string, number> = {};
    
    employees.forEach(emp => {
      deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
    });

    return Object.entries(deptMap).map(([dept, count]) => ({
      name: dept,
      value: count,
      percentage: Math.round((count / employees.length) * 100)
    }));
  }, [employees]);

  // Colores para el gráfico circular
  const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#10b981'];

  return (
    <div className="flex min-h-screen" style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}>
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="p-8 space-y-8">
          
          {/* Header */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <h1 className="text-3xl font-bold text-slate-200">Gráficos y Estadísticas</h1>
            </div>
            <p className="text-slate-400">Visualiza los datos del equipo de GameHub Studios</p>
          </div>

          {/* Gráfico de Barras: Sueldo Promedio por Departamento */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-200 mb-2">Sueldo Promedio por Departamento</h2>
              <p className="text-sm text-slate-400">Comparación de salarios promedio entre departamentos</p>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salaryByDepartment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="department" 
                  stroke="#94a3b8"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  style={{ fontSize: '14px' }}
                  tickFormatter={(value) => `S/ ${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                  formatter={(value: number) => [`S/ ${value.toLocaleString('es-PE')}`, 'Promedio']}
                />
                <Legend 
                  wrapperStyle={{ color: '#94a3b8' }}
                />
                <Bar 
                  dataKey="promedio" 
                  fill="#a855f7" 
                  name="Sueldo Promedio"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            {/* Estadísticas adicionales */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {salaryByDepartment.map((dept) => (
                <div key={dept.department} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                  <p className="text-xs text-slate-400 mb-1">{dept.department}</p>
                  <p className="text-xl font-bold text-slate-200">S/ {dept.promedio.toLocaleString('es-PE')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico Circular: Distribución de Empleados */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-200 mb-2">Distribución de Empleados por Departamento</h2>
              <p className="text-sm text-slate-400">Porcentaje de empleados en cada área</p>
            </div>
            
            <div className="flex items-center justify-center gap-8">
              {/* Gráfico */}
              <ResponsiveContainer width="50%" height={400}>
                <PieChart>
                  <Pie
                    data={employeeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employeeDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Leyenda personalizada */}
              <div className="space-y-3">
                {employeeDistribution.map((dept, index) => (
                  <div key={dept.name} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{dept.name}</p>
                      <p className="text-xs text-slate-400">{dept.value} empleados ({dept.percentage}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tarjetas de Resumen */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Total Empleados</h3>
              </div>
              <p className="text-3xl font-bold text-slate-200">{employees.length}</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-pink-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Departamentos</h3>
              </div>
              <p className="text-3xl font-bold text-slate-200">{employeeDistribution.length}</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Salario Promedio</h3>
              </div>
              <p className="text-3xl font-bold text-slate-200">
                S/ {Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length).toLocaleString('es-PE')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Graphics;