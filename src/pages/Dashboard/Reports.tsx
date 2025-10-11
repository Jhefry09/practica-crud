import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import { useEmployees, getDepartmentColor } from '../../Contexts/EmployeeContext';
import * as XLSX from 'xlsx';

const Reports = () => {
  const { 
    filteredEmployees,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    setSortBy,
    averageSalary
  } = useEmployees();

  // Exportar a Excel
  const exportToExcel = () => {
    const data = filteredEmployees.map(emp => ({
      'ID': emp.id,
      'Nombre': emp.name,
      'DNI': emp.dni,
      'Puesto': emp.position,
      'Departamento': emp.department,
      'Email': emp.email,
      'Teléfono': emp.phone,
      'Salario (S/)': emp.salary
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Empleados');
    
    // Ajustar anchos de columna
    const colWidths = [
      { wch: 10 }, // ID
      { wch: 25 }, // Nombre
      { wch: 12 }, // DNI
      { wch: 25 }, // Puesto
      { wch: 15 }, // Departamento
      { wch: 30 }, // Email
      { wch: 15 }, // Teléfono
      { wch: 12 }  // Salario
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `Empleados_GameHub_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Exportar a CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Nombre', 'DNI', 'Puesto', 'Departamento', 'Email', 'Teléfono', 'Salario'];
    const data = filteredEmployees.map(emp => [
      emp.id,
      emp.name,
      emp.dni,
      emp.position,
      emp.department,
      emp.email,
      emp.phone,
      emp.salary
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Empleados_GameHub_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Exportar a PDF (usando window.print con estilos)
  const exportToPDF = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reporte de Empleados - GameHub Studios</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #1e293b;
          }
          h1 {
            color: #7c3aed;
            border-bottom: 2px solid #7c3aed;
            padding-bottom: 10px;
          }
          .info {
            margin: 20px 0;
            padding: 15px;
            background: #f1f5f9;
            border-radius: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 10px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #7c3aed;
            color: white;
          }
          tr:nth-child(even) {
            background: #f8fafc;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>🎮 GameHub Studios - Reporte de Empleados</h1>
        <div class="info">
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-PE')}</p>
          <p><strong>Total de empleados:</strong> ${filteredEmployees.length}</p>
          <p><strong>Filtro aplicado:</strong> ${selectedDepartment}</p>
          <p><strong>Salario promedio:</strong> S/ ${averageSalary.toLocaleString('es-PE')}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Puesto</th>
              <th>Departamento</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            ${filteredEmployees.map(emp => `
              <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.dni}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>S/ ${emp.salary.toLocaleString('es-PE')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Generado por GameHub Studios - Sistema de Gestión de Empleados</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

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
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
              </svg>
              <h1 className="text-3xl font-bold text-slate-200">Reportes y Exportación</h1>
            </div>
            <p className="text-slate-400">Exporta los datos de empleados en diferentes formatos</p>
          </div>

          {/* Opciones de Exportación */}
          <div className="grid grid-cols-3 gap-6">
            {/* Excel */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200">Excel (.xlsx)</h3>
                  <p className="text-sm text-slate-400">Microsoft Excel</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Exporta todos los datos en formato Excel con columnas formateadas y listas para análisis.
              </p>
              <button
                onClick={exportToExcel}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-green-500/50"
              >
                Descargar Excel
              </button>
            </div>

            {/* CSV */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200">CSV (.csv)</h3>
                  <p className="text-sm text-slate-400">Valores Separados</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Formato universal compatible con Excel, Google Sheets y otras herramientas de análisis.
              </p>
              <button
                onClick={exportToCSV}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/50"
              >
                Descargar CSV
              </button>
            </div>

            {/* PDF */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-red-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-all">
                  <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200">PDF (.pdf)</h3>
                  <p className="text-sm text-slate-400">Documento Portable</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Genera un reporte imprimible en formato PDF con toda la información de empleados.
              </p>
              <button
                onClick={exportToPDF}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/50"
              >
                Generar PDF
              </button>
            </div>
          </div>

          {/* Filtros y Vista Previa */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-200 mb-4">Vista Previa de Datos</h2>
            
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Departamento:</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>Todos</option>
                  <option>Desarrollo</option>
                  <option>Diseño</option>
                  <option>Marketing</option>
                  <option>RRHH</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Ordenar por:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="nombre">Nombre</option>
                  <option value="salario">Salario</option>
                </select>
              </div>

              <div className="ml-auto text-sm text-slate-400">
                Se exportarán <span className="font-semibold text-slate-200">{filteredEmployees.length}</span> empleados
              </div>
            </div>

            {/* Table Preview */}
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-800">
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Empleado</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Puesto</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Departamento</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-purple-400 uppercase tracking-wider">Salario</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-xs font-bold text-slate-300">
                          {emp.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-200 text-sm">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.email}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-300 text-sm">{emp.position}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getDepartmentColor(emp.department)}`}>
                          {emp.department}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-200 text-sm">S/ {emp.salary.toLocaleString('es-PE')}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">ℹ️ Información sobre los Reportes</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-purple-400">Excel (.xlsx):</strong> Ideal para análisis de datos avanzados. Incluye formato de columnas y es compatible con Microsoft Excel y LibreOffice Calc.
              </p>
              <p>
                <strong className="text-blue-400">CSV (.csv):</strong> Formato ligero y universal. Compatible con cualquier software de hoja de cálculo y fácil de importar en bases de datos.
              </p>
              <p>
                <strong className="text-red-400">PDF (.pdf):</strong> Perfecto para reportes oficiales e impresión. Los datos se exportan en un formato profesional y no editable.
              </p>
              <p className="text-slate-400 text-xs mt-4">
                💡 Tip: Los reportes respetan los filtros activos. Ajusta el departamento y el orden antes de exportar.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;