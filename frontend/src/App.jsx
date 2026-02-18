import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = "https://task-manager-api-hy1t.onrender.com/tasks"

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setTasks(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Erro na API:", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <header className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-sky-400">Gerenciador de Tarefas</h1>
        <p className="text-zinc-400">Conectado ao backend no Render</p>
      </header>

      <main className="max-w-2xl mx-auto space-y-4">
        {loading ? (
          <p className="text-center animate-pulse">Carregando tarefas...</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-sky-500/50 transition-colors">
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-zinc-400 text-sm">{task.description}</p>
            </div>
          ))
        )}
      </main>
    </div>
  )
}

export default App