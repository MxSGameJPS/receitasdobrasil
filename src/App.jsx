import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaEstado from "./Components/PaginaEstado";
import Home from "./Pages/home"; // Sua página inicial
import PaginaReceita from "./Components/PaginaReceita";
import EstilosGlobais from "./EstilosGlobais/index";
import SidebarSwitcher from "./Components/SidebarSwitcher";


function App() {
  return (
    <>
      <BrowserRouter>
        <EstilosGlobais />
        <div style={{ display: "flex" }}>
          <SidebarSwitcher />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:estado" element={<PaginaEstado />} />
            <Route path="/:estado/:receita" element={<PaginaReceita />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
