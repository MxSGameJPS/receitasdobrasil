import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";

export default function PaginaReceita() {
  const { estado, receita } = useParams();
  const [dadosReceita, setDadosReceita] = useState(null);
  const [proximaReceita, setProximaReceita] = useState(null);
  const [curtida, setCurtida] = useState(false);

  const normalizarString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[\s-]+/g, ""); // Remove espaços e hífens

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const responseBrasil = await fetch("/receitas/pais/brasil.json");
        if (!responseBrasil.ok)
          throw new Error(`Erro HTTP: ${responseBrasil.status}`);
        const brasilData = await responseBrasil.json();

        const estadoNormalizado = normalizarString(estado);
        const estadoData = brasilData.find(
          (item) => normalizarString(item.estado) === estadoNormalizado
        );
        if (!estadoData) throw new Error("Estado não encontrado");

        console.log(`Carregando ${estadoData.json}...`);

        const responseEstado = await fetch(estadoData.json);
        if (!responseEstado.ok)
          throw new Error(`Erro HTTP: ${responseEstado.status}`);
        const data = await responseEstado.json();

        const receitaAtualIndex = data.receitas.findIndex(
          (r) => r.nome.replace(/\s+/g, "-").toLowerCase() === receita
        );
        if (receitaAtualIndex === -1)
          throw new Error(`Receita ${receita} não encontrada`);

        const receitaEncontrada = data.receitas[receitaAtualIndex];
        setDadosReceita(receitaEncontrada);

        // Carrega o estado de curtida do localStorage
        const chaveCurtida = `${estadoNormalizado}-${receita}`;
        const curtidaSalva = localStorage.getItem(chaveCurtida);
        setCurtida(curtidaSalva === "true");

        // Define a próxima receita (circular: volta pro início se for a última)
        const proximaIndex = (receitaAtualIndex + 1) % data.receitas.length;
        const proxima = data.receitas[proximaIndex];
        setProximaReceita(proxima.nome.replace(/\s+/g, "-").toLowerCase());
      } catch (error) {
        console.error("Erro ao carregar receita:", error);
      }
    };
    carregarReceita();
  }, [estado, receita]);

  const gerarPDF = () => {
    if (!dadosReceita) return; // Evita erro se dadosReceita ainda não carregou
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(dadosReceita.nome, 10, 10); // Usa dadosReceita
    doc.setFontSize(12);
    doc.text("Descrição:", 10, 20);
    doc.text(dadosReceita.descricao, 10, 30, { maxWidth: 180 });
    doc.text("Ingredientes:", 10, 50);
    dadosReceita.ingredientes.forEach((ing, index) => {
      doc.text(`- ${ing}`, 10, 60 + index * 10);
    });
    doc.text(
      "Modo de Preparo:",
      10,
      60 + dadosReceita.ingredientes.length * 10 + 10
    );
    dadosReceita.modo_de_preparo.forEach((passo, index) => {
      doc.text(
        `${index + 1}. ${passo}`,
        10,
        60 + dadosReceita.ingredientes.length * 10 + 20 + index * 10
      );
    });
    doc.save(`${dadosReceita.nome}.pdf`);
  };

  const toggleCurtida = () => {
    const novaCurtida = !curtida;
    setCurtida(novaCurtida);
    const chaveCurtida = `${normalizarString(estado)}-${receita}`;
    localStorage.setItem(chaveCurtida, novaCurtida);
  };

  const compartilharReceita = async () => {
    if (!dadosReceita) return;
    const url = `${window.location.origin}/${estado}/${receita}`;
    const texto = `Confira essa receita incrível: ${dadosReceita.nome} do estado ${estado}!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: dadosReceita.nome,
          text: texto,
          url: url,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link da receita copiado para o clipboard!");
    }
  };

  if (!dadosReceita) return <p>Carregando receita...</p>;

  return (
    <ContainerCard>
      <ContainerLink>
        <StateLinkReceita to={`/${estado}`}>Voltar</StateLinkReceita>
        <StateLinkReceita to={`/${estado}/${proximaReceita}`}>
          Próxima Receita
        </StateLinkReceita>
      </ContainerLink>
      <div>
        <img src={dadosReceita.imagem} alt={dadosReceita.nome} />
        <div>
          <h2>{dadosReceita.nome}</h2>
          <p>{dadosReceita.descricao}</p>
          <ul>
            <li>Tempo de Preparo: {dadosReceita.tempo_de_preparo}</li>
            <li>Rendimento: {dadosReceita.rendimento}</li>
            <li>Dificuldade: {dadosReceita.dificuldade}</li>
          </ul>
          <div>
            <h3>Ingredientes</h3>
            <ul>
              {dadosReceita.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Modo de Preparo</h3>
            <p>{dadosReceita.modo_de_preparo.join(" ")}</p>
          </div>
          <ButtonContainer>
            <Botao onClick={gerarPDF}>Baixar Receita em PDF</Botao>
            <BotaoCurtir curtida={curtida} onClick={toggleCurtida}>
              {curtida ? "Curtido" : "Curtir"}
            </BotaoCurtir>
            <Botao onClick={compartilharReceita}>Compartilhar</Botao>
          </ButtonContainer>
        </div>
      </div>
    </ContainerCard>
  );
}

const ContainerCard = styled.section`
  display: flex;
  margin: 50px auto; /* Reduzido de 150px */
  width: 100%; /* Mudado de 800px fixo pra se ajustar à tela */
  max-width: 800px; /* Mantém o limite máximo */
  padding: 12px; /* Reduzido de 24px */
  flex-direction: column;
  align-items: flex-start;
  gap: 12px; /* Reduzido de 24px */
  border-radius: 16px; /* Reduzido de 24px */
  background-color: #f0e8c2;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25); /* Sombra reduzida */

  img {
    width: 100%;
    object-fit: cover;
    min-width: 0; /* Removido 800px fixo pra se adaptar */
    height: 200px; /* Reduzido de 400px */
    align-self: center;
    border-radius: 10px; /* Reduzido de 16px */
  }

  /* 280px (ex.: Galaxy Fold) */
  @media (min-width: 280px) {
    margin: 60px auto;
    padding: 14px;
    gap: 14px;
    border-radius: 18px;
    img {
      height: 220px;
    }
  }

  /* 320px (ex.: iPhone SE) */
  @media (min-width: 320px) {
    margin: 80px auto;
    padding: 16px;
    gap: 16px;
    img {
      height: 240px;
      border-radius: 12px;
    }
  }

  /* 375px (ex.: iPhone 12) */
  @media (min-width: 375px) {
    padding: 18px;
    gap: 18px;
    border-radius: 20px;
    img {
      height: 280px;
    }
  }

  /* 468px (ex.: telas médias) */
  @media (min-width: 468px) {
    margin: 100px auto;
    padding: 20px;
    gap: 20px;
    border-radius: 22px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    img {
      height: 320px;
      border-radius: 14px;
    }
  }

  /* 768px (ex.: tablets pequenos) */
  @media (min-width: 768px) {
    padding: 22px;
    gap: 22px;
    img {
      height: 360px;
    }
  }

  /* 1024px (ex.: tablets grandes) */
  @media (min-width: 1024px) {
    margin: 150px auto;
    padding: 24px;
    gap: 24px;
    border-radius: 24px;
    img {
      height: 400px;
      border-radius: 16px;
    }
  }
`;

const Botao = styled.button`
  padding: 6px 12px; /* Reduzido de 10px 20px */
  font-size: 12px; /* Reduzido de 16px */
  border-radius: 10px; /* Reduzido de 15px */
  background-color: #ff9c00;
  color: #ffffff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ac6803;
  }

  @media (min-width: 280px) {
    padding: 7px 14px;
    font-size: 13px;
  }

  @media (min-width: 320px) {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 12px;
  }

  @media (min-width: 375px) {
    padding: 9px 18px;
  }

  @media (min-width: 468px) {
    padding: 10px 20px;
    font-size: 15px;
    border-radius: 14px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    border-radius: 15px;
  }
`;

const BotaoCurtir = styled(Botao)`
  background-color: ${(props) => (props.curtida ? "#4CAF50" : "#ff9c00")};
  &:hover {
    background-color: ${(props) => (props.curtida ? "#388E3C" : "#ac6803")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 6px; /* Reduzido de 10px */
  margin-top: 12px; /* Reduzido de 20px */
  justify-content: end;
  width: 100%; /* Garante que ocupe a largura total */

  @media (min-width: 280px) {
    gap: 7px;
    margin-top: 14px;
  }

  @media (min-width: 320px) {
    gap: 8px;
    margin-top: 16px;
  }

  @media (min-width: 375px) {
    gap: 9px;
  }

  @media (min-width: 468px) {
    gap: 10px;
    margin-top: 20px;
  }
`;

const ContainerLink = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StateLinkReceita = styled(Link)`
  text-decoration: none;
  border-radius: 8px; /* Reduzido de 12px */
  padding: 8px 16px; /* Reduzido de 12px 24px */
  background-color: #ff9c00;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 280px) {
    padding: 9px 18px;
    border-radius: 9px;
  }

  @media (min-width: 320px) {
    padding: 10px 20px;
    border-radius: 10px;
  }

  @media (min-width: 375px) {
    padding: 11px 22px;
  }

  @media (min-width: 468px) {
    padding: 12px 24px;
    border-radius: 12px;
  }
`;
