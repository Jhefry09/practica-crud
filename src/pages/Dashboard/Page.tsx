import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {/* Header */}
      <header className="bg-white rounded-lg shadow-sm p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
        <nav>
          <Link
            to="/login"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Bienvenido al Dashboard
          </h2>
          <p className="text-gray-600">
            Aquí puedes ver un resumen de tu actividad.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;