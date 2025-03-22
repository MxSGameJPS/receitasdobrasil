import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Adicionado pra redirecionar
import styled from "styled-components";

export default function Home() {
  const [estados, setEstados] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado pra barra de pesquisa
  const navigate = useNavigate(); // Hook pra navegação

  useEffect(() => {
    const carregarEstados = async () => {
      try {
        const response = await fetch("/receitas/pais/brasil.json");
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };
    carregarEstados();
  }, []);

  // Função pra lidar com o submit da pesquisa
  const handleSearch = (e) => {
    e.preventDefault();
    const estadoEncontrado = estados.find(
      (estado) => estado.estado.toLowerCase() === searchTerm.toLowerCase()
    );
    if (estadoEncontrado) {
      navigate(`/${estadoEncontrado.estado}`);
    } else {
      alert("Estado não encontrado. Tente novamente!");
    }
    setSearchTerm(""); // Limpa a barra após a busca
  };

  return (
    <ContainerHome>
      <h1>Bem-vindo ao Sabor do Brasil!</h1>
      <p>
        A culinária brasileira é um verdadeiro caldeirão de sabores, reflexo de
        uma história rica e diversa. Desde os tempos indígenas, com pratos à
        base de mandioca, milho e peixes, até a chegada dos portugueses no
        século XVI, que trouxeram o açúcar, o trigo e técnicas como o cozimento
        em panelas de barro, nossa comida foi ganhando camadas. Os africanos,
        com seus temperos marcantes, como o dendê e a pimenta, e os imigrantes
        europeus e asiáticos, com receitas que se misturaram ao cotidiano,
        completaram essa festa gastronômica. Cada estado do Brasil carrega um
        pedaço dessa história, transformando ingredientes simples em pratos que
        contam tradições, lutas e celebrações.
      </p>
      <p>
        É aí que o <strong>Receitas do meu Brasil</strong> entra! Nosso site reúne receitas típicas de
        todos os 27 estados brasileiros, dos doces que adoçam a alma às delícias
        salgadas que aquecem o coração. Aqui você encontra o passo a passo para
        trazer esses pratos à sua mesa, com ingredientes, modos de preparo e até
        o rendimento pra saber quantas pessoas vão se deliciar com você. Seja
        pra explorar a cultura do país, resgatar memórias de família ou
        simplesmente cozinhar algo novo, este é o lugar pra descobrir o Brasil
        pelo paladar. Vamos juntos nessa viagem de sabores?
      </p>
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Receita de qual estado você procura?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchForm>
      </SearchContainer>
    </ContainerHome>
  );
}

const ContainerHome = styled.div`
  max-width: 800px;
  margin: 150px auto;
  padding: 35px 90px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    font-size: 50px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 500px;
  gap: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 18px;
  outline: none;  
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #ff9c00;
  color: #ffffff;
  border: none;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: #aa6600;
  }
`;