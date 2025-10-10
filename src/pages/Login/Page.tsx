import { Link, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Credenciales simuladas
    const CREDENTIALS = {
      email: 'admin@hotmail.com',
      password: '123456'
    };

    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      // Redirigir al dashboard si las credenciales son correctas
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="space-background flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animación de estrellas/partículas */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="game-card backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          
          {/* Título con gradiente */}
          <h1 className="text-4xl font-bold text-center mb-8 game-title">
            GAMEHUB STUDIOS
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email con icono */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Usuario"
                  required
                />
              </div>
            </div>

            {/* Password con icono */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Contraseña"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-slate-400 mt-6 text-sm">
            ¿No tienes una cuenta?{' '}
            <Link 
              to="/register" 
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;