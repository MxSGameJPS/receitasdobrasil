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
  margin: 50px auto; /* Reduzido de 150px */
  padding: 15px 20px; /* Reduzido de 35px 90px */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px; /* Reduzido de 30px */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Sombra reduzida */

  h1 {
    text-align: center;
    font-size: 24px; /* Reduzido de 50px */
    margin-bottom: 0.8rem; /* Reduzido de 1rem */
  }

  p {
    font-size: 14px; /* Reduzido de 20px */
    line-height: 1.4; /* Reduzido de 1.6 */
    margin-bottom: 1rem; /* Reduzido de 2rem */
  }

  /* 280px (ex.: Galaxy Fold) */
  @media (min-width: 280px) {
    margin: 60px auto;
    padding: 20px 25px;
    border-radius: 22px;
    h1 {
      font-size: 26px;
    }
    p {
      font-size: 15px;
    }
  }

  /* 320px (ex.: iPhone SE) */
  @media (min-width: 320px) {
    margin: 80px auto;
    padding: 25px 30px;
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 16px;
    }
  }

  /* 375px (ex.: iPhone 12) */
  @media (min-width: 375px) {
    padding: 30px 40px;
    border-radius: 25px;
    h1 {
      font-size: 34px;
    }
    p {
      font-size: 17px;
      line-height: 1.5;
    }
  }

  /* 468px (ex.: telas médias) */
  @media (min-width: 468px) {
    margin: 100px auto;
    padding: 35px 60px;
    border-radius: 28px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    h1 {
      font-size: 40px;
      margin-bottom: 1rem;
    }
    p {
      font-size: 18px;
      margin-bottom: 1.5rem;
    }
  }

  /* 768px (ex.: tablets pequenos) */
  @media (min-width: 768px) {
    padding: 35px 80px;
    h1 {
      font-size: 45px;
    }
    p {
      font-size: 19px;
    }
  }

  /* 1024px (ex.: tablets grandes) */
  @media (min-width: 1024px) {
    margin: 150px auto;
    padding: 35px 90px;
    border-radius: 30px;
    h1 {
      font-size: 50px;
    }
    p {
      font-size: 20px;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; /* Reduzido de 20px */

  @media (min-width: 280px) {
    margin-top: 12px;
  }

  @media (min-width: 320px) {
    margin-top: 14px;
  }

  @media (min-width: 375px) {
    margin-top: 16px;
  }

  @media (min-width: 468px) {
    margin-top: 20px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  width: 100%; /* Mantém fluido */
  max-width: 300px; /* Reduzido de 500px pra telas pequenas */
  gap: 6px; /* Reduzido de 10px */

  @media (min-width: 280px) {
    max-width: 320px;
    gap: 7px;
  }

  @media (min-width: 320px) {
    max-width: 350px;
    gap: 8px;
  }

  @media (min-width: 375px) {
    max-width: 400px;
    gap: 9px;
  }

  @media (min-width: 468px) {
    max-width: 450px;
    gap: 10px;
  }

  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px; /* Reduzido de 12px 20px */
  font-size: 12px; /* Reduzido de 16px */
  border: none;
  border-radius: 12px; /* Reduzido de 18px */
  outline: none;

  @media (min-width: 280px) {
    padding: 9px 14px;
    font-size: 13px;
  }

  @media (min-width: 320px) {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 14px;
  }

  @media (min-width: 375px) {
    padding: 11px 18px;
  }

  @media (min-width: 468px) {
    padding: 12px 20px;
    font-size: 15px;
    border-radius: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 18px;
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px; /* Reduzido de 12px 24px */
  font-size: 12px; /* Reduzido de 16px */
  background-color: #ff9c00;
  color: #ffffff;
  border: none;
  border-radius: 12px; /* Reduzido de 18px */
  cursor: pointer;

  &:hover {
    background-color: #aa6600;
  }

  @media (min-width: 280px) {
    padding: 9px 18px;
    font-size: 13px;
  }

  @media (min-width: 320px) {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 14px;
  }

  @media (min-width: 375px) {
    padding: 11px 22px;
  }

  @media (min-width: 468px) {
    padding: 12px 24px;
    font-size: 15px;
    border-radius: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 18px;
  }
`;