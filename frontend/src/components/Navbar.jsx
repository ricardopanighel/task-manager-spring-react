import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-zinc-950 border-b border-green-400 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-400 shadow-sm shadow-green-500/20 shrink-0"></div>
        <span className="hidden md:block md:text-xl font-bold tracking-tight text-white">TaskManager</span>
      </div>

      <div className="flex gap-4 md:gap-8 items-center">
        <Link 
          to="/tarefas" 
          className="text-zinc-400 hover:text-green-400 transition-colors text-sm md:text-base font-medium"
        >
          Tarefas
        </Link>
        
        <Link 
          to="/cadastrar" 
          className="border-green-400 border hover:bg-green-400 text-zinc-400 px-4 md:px-5 py-2 text-sm md:text-base font-semibold transition-all hover:text-zinc-800 hover:scale-105 active:scale-95 shadow-md shadow-green-500/20"
        >
          Adicionar +
        </Link>
      </div>
    </nav>
  );
}