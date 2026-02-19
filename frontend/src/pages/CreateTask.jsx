import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false); 
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTask = { 
      title, 
      description,
      completed 
    };

    try {
      await api.post('/tasks', newTask);
      navigate('/tarefas'); // Volta para a lista após guardar
    } catch (error) {
      console.error("Erro ao registar:", error);
      alert("Houve um erro ao salvar a tarefa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-zinc-950 md:pt-30 min-h-[82vh]">
      <h2 className="text-2xl font-bold mb-6 text-green-400">Nova Tarefa</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Título</label>
          <input 
            type="text"
            required
            className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all text-xs md:text-sm"
            placeholder="O que precisa de ser feito?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Descrição</label>
          <textarea 
            rows="4"
            className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all resize-none text-xs md:text-sm"
            placeholder="Detalhes adicionais (opcional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 p-2">
          <input 
            type="checkbox"
            id="completed"
            className="w-5 h-5 accent-green-500 bg-zinc-950 border-zinc-800 rounded cursor-pointer"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label htmlFor="completed" className="text-sm font-medium text-zinc-400 cursor-pointer select-none">
            Marcar tarefa como concluída
          </label>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full border-green-400 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg shadow-green-500/10"
        >
          {loading ? "Salvando..." : "Criar Tarefa"}
        </button>
      </form>
    </div>
  );
}