import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null); // Guarda o ID da tarefa que está sendo editada
  const [editForm, setEditForm] = useState({ title: "", description: "", completed: false }); // Guarda os dados digitados

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditForm({ 
      title: task.title, 
      description: task.description || "", 
      completed: task.completed 
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`, editForm);
      // Atualiza a lista com os novos dados devolvidos pelo Java
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      setEditingId(null); // Sai do modo de edição
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      alert("Erro ao alterar a tarefa. Verifique se todos os campos estão corretos.");
    }
  };

  const handleToggleStatus = async (task) => {
    if (editingId === task.id) return;

    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await api.put(`/tasks/${task.id}`, updatedTask);
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-zinc-400 mt-20 text-xl font-medium animate-pulse min-h-[82vh]">Carregando tarefas do servidor...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-[82vh]">
      <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-3">
        Minhas Tarefas
        <span className="text-white text-md md:text-2xl py-1 px-3">{tasks.length}</span>
      </h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-zinc-950 border border-zinc-800">
          <p className="text-zinc-500 text-lg">Nenhuma tarefa encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-5 border transition-all ${
                editingId === task.id 
                  ? 'bg-zinc-950 border-green-400 shadow-lg shadow-green-500/10'
                  : task.completed 
                    ? 'bg-zinc-950/40 border-zinc-800/50 opacity-60' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >

              {editingId === task.id ? (
                /* --- MODO EDIÇÃO --- */
                <div className="flex flex-col gap-3">
                  <input 
                    type="text"
                    className="w-full bg-zinc-950 border border-zinc-700 p-3 text-white focus:outline-none focus:border-green-400 rounded-lg"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  />
                  <textarea 
                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-lg text-white focus:outline-none focus:border-green-400 resize-none"
                    rows="4"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  />
                  
                  {/* Checkbox de status dentro da edição */}
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="checkbox"
                      checked={editForm.completed}
                      onChange={(e) => setEditForm({...editForm, completed: e.target.checked})}
                      className="w-5 h-5 accent-green-500 bg-zinc-950 rounded cursor-pointer"
                    />
                    <span className="text-zinc-400 text-sm">Tarefa concluída</span>
                  </div>

                  <div className="flex gap-3 mt-2 justify-end">
                    <button 
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={() => handleSaveEdit(task.id)}
                      className="w-auto p-4 border-green-400 text-white font-bold py-4 rounded-xl transition-colors hover:shadow-lg shadow-green-500/10"
                    > 
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              ) : (
                /* --- MODO NORMAL --- */
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 w-full">
                    <input 
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleStatus(task)}
                      className="mt-1.5 w-5 h-5 accent-green-500 bg-zinc-950 border-zinc-800 cursor-pointer shrink-0"
                    />
                    <div className="w-full">
                      <h3 className={`font-bold text-lg transition-all break-all ${task.completed ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 break-all ${task.completed ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Botões de Ação (Editar e Excluir) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={() => handleStartEdit(task)}
                      className="text-zinc-600 hover:text-green-500 transition-colors p-2"
                      title="Editar Tarefa"
                    >
                      {/* Ícone de Lápis (Editar) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(task.id)}
                      className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                      title="Excluir Tarefa"
                    >
                      {/* Ícone de Lixeira */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}