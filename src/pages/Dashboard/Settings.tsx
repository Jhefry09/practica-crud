import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

const Settings = () => {
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
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              <h1 className="text-3xl font-bold text-slate-200">Configuración</h1>
            </div>
            <p className="text-slate-400">Ajusta las configuraciones del sistema</p>
          </div>

          {/* Settings Content */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-200 mb-4">Configuraciones Generales</h2>
            <p className="text-slate-400">Esta página está en desarrollo...</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Settings;