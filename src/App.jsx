import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar"; // Ajuste o caminho
import PaginaEstado from "./Components/PaginaEstado";
import Home from "./Pages/home"; // Sua página inicial
import PaginaReceita from "./Components/PaginaReceita";
import EstilosGlobais from "./EstilosGlobais/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <EstilosGlobais />
        <div style={{ display: "flex" }}>
          <SideBar />
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
