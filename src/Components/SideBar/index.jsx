import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [openRegion, setOpenRegion] = useState(null);

  const regions = [
    {
      name: "Norte",
      states: [
        "Acre",
        "Amapá",
        "Amazonas",
        "Pará",
        "Rondônia",
        "Roraima",
        "Tocantins",
      ],
    },
    {
      name: "Nordeste",
      states: [
        "Alagoas",
        "Bahia",
        "Ceará",
        "Maranhão",
        "Paraíba",
        "Pernambuco",
        "Piauí",
        "Rio Grande do Norte",
        "Sergipe",
      ],
    },
    {
      name: "Centro-Oeste",
      states: [
        "Distrito Federal",
        "Goiás",
        "Mato Grosso",
        "Mato Grosso do Sul",
      ],
    },
    {
      name: "Sudeste",
      states: ["Espírito Santo", "Minas Gerais", "Rio de Janeiro", "São Paulo"],
    },
    {
      name: "Sul",
      states: ["Paraná", "Rio Grande do Sul", "Santa Catarina"],
    },
  ];

  const toggleRegion = (regionName) => {
    setOpenRegion(openRegion === regionName ? null : regionName);
  };

  return (
    <Container>
      <Header>
        <img src="/imagem/mapa.svg" alt="Logo" />{" "}
        {/* Substitua por sua imagem */}
        <Title>Receitas do Meu Brasil</Title>
        <StateLink to="/">Voltar para a Home</StateLink>
      </Header>
      <RegionList>
        {regions.map((region) => (
          <RegionItem key={region.name}>
            <RegionTitle onClick={() => toggleRegion(region.name)}>
              {region.name}
              <Arrow $isOpen={openRegion === region.name}>&gt;</Arrow>
            </RegionTitle>
            <StateList $isOpen={openRegion === region.name}>
              {region.states.map((state) => (
                <StateItem key={state}>
                  <StateLink to={`/${state.replace(/\s+/g, "-")}`}>
                    {state}
                  </StateLink>
                </StateItem>
              ))}
            </StateList>
          </RegionItem>
        ))}
      </RegionList>
      <Footer>
        <h4>Obrigado por acessar</h4>
        <p>Ajude o desenvolvedor a melhorar</p>
        <SupportButton>
          <a href="https://livepix.gg/mxsgamejps">Fazer doacão</a>
        </SupportButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  width: 256px;
  padding: 20px;
  background: rgba(8, 70, 0, 0.56);
  height: 1100px;
  flex-shrink: 0;
  border-radius: 28px;
  box-shadow: 0px 64px 64px -32px rgba(41, 15, 0, 0.56);
  backdrop-filter: blur(80px);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 100px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  margin: 0 10px 5px 10px;
`;

const RegionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RegionItem = styled.li`
  margin-bottom: 10px;
`;

const RegionTitle = styled.h4`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.09);
  border-radius: 12px;

  &:hover {
    background: rgba(2, 9, 109, 0.09);
  }
`;

const StateList = styled.ul`
  list-style: none;
  padding-left: 20px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const StateItem = styled.li`
  padding: 8px 14px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.09);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(2, 9, 109, 0.09);
  }
`;

const StateLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
  display: inline-flex;
  padding: 24px 16px 16px 16px;
  flex-direction: column;
  gap: 0px;
  border-radius: 28px;
  background: rgba(56, 14, 36, 0.1);
  box-shadow: 0px 64px 64px -32px rgba(7, 4, 2, 0.39);
`;

const SupportButton = styled.button`
  display: flex;
  height: 48px;
  padding: 11px 24px 11px 20px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  background: linear-gradient(0deg, #028a09 0%, #d4e02d 100%), #ffffff;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(45deg, #028a09 0%, #d4e02d 100%), #ffffff;
  }

  a {
    text-decoration: none;
    color: #000000;
    font-weight: 600;

    &:hover {
      color: #ffffff;
    }
  }
`;

const Arrow = styled.span`
  font-size: 12px;
  transition: transform 0.3s;
  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;
