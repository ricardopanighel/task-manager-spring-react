import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateTask from './pages/CreateTask';
import ListTasks from './pages/ListTasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        
        <Routes>
          {/* Se o usuário entrar no "/", ele é jogado direto para a lista */}
          <Route path="/" element={<Navigate to="/tarefas" />} />
          
          <Route path="/tarefas" element={<ListTasks />} />
          <Route path="/cadastrar" element={<CreateTask />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;