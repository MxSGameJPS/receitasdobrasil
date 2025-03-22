import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";

export default function PaginaReceita() {
  const { estado, receita } = useParams();
  const [dadosReceita, setDadosReceita] = useState(null);
  const [proximaReceita, setProximaReceita] = useState(null);

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
          <Botao onClick={gerarPDF}>Baixar Receita em PDF</Botao>
        </div>
      </div>
    </ContainerCard>
  );
}

const ContainerCard = styled.section`
  display: flex;
  margin: 150px auto;
  width: 800px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 24px;
  background-color: #f0e8c2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    object-fit: cover;
    min-width: 800px;
    height: 400px;
    align-self: center;
    border-radius: 16px;
  }  
`;

const Botao = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  background-color: #ff9c00;
  color: #ffffff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ac6803;
  }
`;

const ContainerLink = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StateLinkReceita = styled(Link)`
  text-decoration: none;
  border-radius: 12px;
  padding: 12px 24px;
  background-color: #ff9c00;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
  }
`;
