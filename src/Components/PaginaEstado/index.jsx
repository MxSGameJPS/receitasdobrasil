import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

export default function PaginaEstado() {
  const { estado } = useParams(); // Pega o estado da URL (ex.: "Acre")
  const [dadosEstado, setDadosEstado] = useState(null);

  const normalizarString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[\s-]+/g, ""); // Remove espaços e hífens

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseBrasil = await fetch("/receitas/pais/brasil.json");
        const brasilData = await responseBrasil.json();
        const estadoNormalizado = normalizarString(estado);
        const estadoData = brasilData.find(
          (item) => normalizarString(item.estado) === estadoNormalizado
        );
        if (!estadoData) throw new Error("Estado não encontrado");
        const responseEstado = await fetch(estadoData.json);
        const data = await responseEstado.json();
        setDadosEstado(data);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    };
    carregarDados();
  }, [estado]);

  const formBaseUrl = "https://forms.gle/WZ57fVjbAfZWAWD48"; // Exemplo, troque pelo seu link
  const sugestaoUrl = `${formBaseUrl}?usp=pp_url&entry.123456789=${encodeURIComponent(
    estado
  )}`;

  if (!dadosEstado) return <p>Carregando...</p>;

  return (
    <Container>
      <h1>Bem-vindo ao {dadosEstado.nome}</h1>
      <Historia>
        <p>{dadosEstado.historia}</p>
      </Historia>
      <ThumbnailList>
        {dadosEstado.receitas.map((receita, index) => (
          <ThumbnailCard
            key={index}
            to={`/${estado}/${receita.nome.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <img src={receita.imagem} alt={receita.nome} />
            <h3>{receita.nome}</h3>
          </ThumbnailCard>
        ))}
      </ThumbnailList>
      <BotaoSugerir href={sugestaoUrl} target="_blank">
        Sugerir uma Receita
      </BotaoSugerir>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto; /* Reduzido de 150px pra telas menores */
  padding: 15px 20px; /* Reduzido de 35px 90px */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px; /* Menor em telas pequenas */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Sombra reduzida */

  h1 {
    text-align: center;
    font-size: 24px; /* Reduzido de 50px */
    margin-bottom: 0.8rem;
  }
  h3 {
    margin-bottom: 4px; /* Reduzido de 5px */
    font-size: 14px; /* Adicionado pra consistência */
  }
  p {
    font-size: 12px; /* Reduzido de 16px */
    line-height: 1.4; /* Ajustado de 1.5 */
    margin-bottom: 8px; /* Reduzido de 10px */
  }

  /* 280px (ex.: Galaxy Fold) */
  @media (min-width: 280px) {
    margin: 60px auto;
    padding: 20px 25px;
    border-radius: 22px;
    h1 {
      font-size: 26px;
    }
    h3 {
      font-size: 15px;
    }
    p {
      font-size: 13px;
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
      font-size: 14px;
    }
  }

  /* 375px (ex.: iPhone 12) */
  @media (min-width: 375px) {
    padding: 30px 40px;
    border-radius: 25px;
    h1 {
      font-size: 34px;
    }
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 15px;
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
    h3 {
      margin-bottom: 5px;
    }
    p {
      font-size: 16px;
    }
  }

  /* 768px (ex.: tablets pequenos) */
  @media (min-width: 768px) {
    padding: 35px 80px;
    h1 {
      font-size: 45px;
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
  }
`;

const Historia = styled.div`
  margin-bottom: 20px; /* Reduzido de 30px */
  font-size: 12px; /* Alinhado com Container p */
  line-height: 1.4;

  @media (min-width: 280px) {
    margin-bottom: 22px;
    font-size: 13px;
  }

  @media (min-width: 320px) {
    margin-bottom: 25px;
    font-size: 14px;
  }

  @media (min-width: 375px) {
    font-size: 15px;
    line-height: 1.5;
  }

  @media (min-width: 468px) {
    margin-bottom: 30px;
    font-size: 16px;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px; /* Reduzido de 20px pra telas menores */

  @media (min-width: 280px) {
    gap: 12px;
  }

  @media (min-width: 320px) {
    gap: 15px;
  }

  @media (min-width: 375px) {
    gap: 18px;
  }

  @media (min-width: 468px) {
    gap: 20px;
  }
`;

const ThumbnailCard = styled(Link)`
  width: 140px; /* Reduzido de 200px pra caber em telas menores */
  text-decoration: none;
  color: #000;
  text-align: center;

  img {
    width: 100%;
    height: 100px; /* Reduzido de 150px */
    object-fit: cover;
    border-radius: 8px; /* Reduzido de 10px */
  }

  h3 {
    margin-top: 8px; /* Reduzido de 10px */
    font-size: 12px; /* Reduzido de 14px */
  }

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 280px) {
    width: 150px;
    img {
      height: 110px;
    }
    h3 {
      font-size: 13px;
    }
  }

  @media (min-width: 320px) {
    width: 160px;
    img {
      height: 120px;
      border-radius: 9px;
    }
    h3 {
      font-size: 14px;
    }
  }

  @media (min-width: 375px) {
    width: 180px;
    img {
      height: 130px;
    }
  }

  @media (min-width: 468px) {
    width: 200px;
    img {
      height: 150px;
      border-radius: 10px;
    }
    h3 {
      margin-top: 10px;
    }
  }
`;

const BotaoSugerir = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%; /* Aumentado de 50% pra telas menores */
  text-align: center;
  cursor: pointer;
  margin: 20px auto 0; /* Reduzido de 30px */
  padding: 8px 15px; /* Reduzido de 10px 20px */
  background-color: #ff9c00;
  color: #fff;
  text-decoration: none;
  border-radius: 12px; /* Reduzido de 15px */
  font-size: 14px; /* Reduzido de 16px */

  &:hover {
    background-color: #ac6803;
  }

  @media (min-width: 280px) {
    width: 70%;
    padding: 9px 16px;
    font-size: 15px;
  }

  @media (min-width: 320px) {
    width: 60%;
    padding: 10px 18px;
    border-radius: 13px;
  }

  @media (min-width: 375px) {
    font-size: 16px;
  }

  @media (min-width: 468px) {
    width: 50%;
    padding: 10px 20px;
    border-radius: 15px;
  }
`;
