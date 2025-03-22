import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SideBarMobile() {
  const [openRegion, setOpenRegion] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Novo estado pra controlar abertura

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar} $isOpen={isOpen}>
        {isOpen ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
      </ToggleButton>
      <Container $isOpen={isOpen}>
        <Header>
          <img src="/imagem/mapa.svg" alt="Logo" />
          <Title>Receitas do Meu Brasil</Title>
          <IconHome to="/">
            <FaHome size={20} />
          </IconHome>
        </Header>
        <RegionList>
          {regions.map((region) => (
            <RegionItem key={region.name}>
              <RegionTitle onClick={() => toggleRegion(region.name)}>
                {region.name}
                <Arrow $isOpen={openRegion === region.name}>></Arrow>
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
            <a href="https://livepix.gg/mxsgamejps">Fazer doação</a>
          </SupportButton>
        </Footer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 80px;
  padding: 10px;
  background: rgba(8, 70, 0, 0.56);
  height: 100vh;
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0px 32px 32px -16px rgba(41, 15, 0, 0.56);
  backdrop-filter: blur(40px);
  position: fixed;
  top: 0;
  left: 0;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (min-width: 280px) {
    width: 90px;
    padding: 12px;
    border-radius: 22px;
  }

  @media (min-width: 320px) {
    width: 100px;
    padding: 15px;
  }

  @media (min-width: 375px) {
    width: 110px;
    padding: 18px;
    border-radius: 24px;
  }

  @media (min-width: 468px) {
    width: 120px;
    padding: 20px;
    border-radius: 28px;
    box-shadow: 0px 64px 64px -32px rgba(41, 15, 0, 0.56);
    backdrop-filter: blur(80px);
  }

  @media (min-width: 768px) {
    width: 140px;
  }

  @media (min-width: 1024px) {
    width: 160px;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: ${({ $isOpen }) => ($isOpen ? "calc(80px + 10px)" : "10px")}; /* Ajusta com a largura mínima */
  background: rgba(8, 70, 0, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  z-index: 1001;
  transition: left 0.3s ease-in-out;

  &:hover {
    background: rgba(8, 70, 0, 1);
  }

  @media (min-width: 280px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(90px + 10px)" : "10px")};
  }

  @media (min-width: 320px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(100px + 10px)" : "10px")};
  }

  @media (min-width: 375px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(110px + 10px)" : "10px")};
  }

  @media (min-width: 468px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(120px + 10px)" : "10px")};
  }

  @media (min-width: 768px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(140px + 10px)" : "10px")};
  }

  @media (min-width: 1024px) {
    left: ${({ $isOpen }) => ($isOpen ? "calc(160px + 10px)" : "10px")};
  }
`;

const IconHome = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 24px;
  background-color: #000dc971;
  padding: 8px;
  cursor: pointer;
  margin: 8px 0;

  @media (min-width: 280px) {
    padding: 9px;
    border-radius: 26px;
  }

  @media (min-width: 320px) {
    padding: 10px;
    border-radius: 28px;
  }

  @media (min-width: 375px) {
    border-radius: 30px;
  }

  @media (min-width: 468px) {
    border-radius: 32px;
    margin: 10px 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }

  @media (min-width: 280px) {
    margin-bottom: 16px;
    img {
      width: 42px;
      height: 42px;
    }
  }

  @media (min-width: 320px) {
    margin-bottom: 18px;
    img {
      width: 45px;
      height: 45px;
    }
  }

  @media (min-width: 375px) {
    img {
      width: 48px;
      height: 48px;
    }
  }

  @media (min-width: 468px) {
    margin-bottom: 20px;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
  }
`;

const Title = styled.h3`
  font-size: 12px;
  text-align: center;
  color: #ffffff;
  margin: 0 8px 4px 8px;

  @media (min-width: 280px) {
    font-size: 13px;
  }

  @media (min-width: 320px) {
    font-size: 14px;
    margin: 0 9px 5px 9px;
  }

  @media (min-width: 375px) {
    font-size: 15px;
  }

  @media (min-width: 468px) {
    margin: 0 10px 5px 10px;
  }
`;

const RegionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RegionItem = styled.li`
  margin-bottom: 8px;

  @media (min-width: 280px) {
    margin-bottom: 9px;
  }

  @media (min-width: 320px) {
    margin-bottom: 10px;
  }
`;

const RegionTitle = styled.h4`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.09);
  border-radius: 10px;

  &:hover {
    background: rgba(2, 9, 109, 0.09);
  }

  @media (min-width: 280px) {
    font-size: 11px;
    padding: 9px 11px;
  }

  @media (min-width: 320px) {
    font-size: 12px;
    padding: 10px 12px;
    border-radius: 11px;
  }

  @media (min-width: 375px) {
    padding: 10px 13px;
  }

  @media (min-width: 468px) {
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 12px;
  }
`;

const StateList = styled.ul`
  list-style: none;
  padding-left: 15px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  @media (min-width: 280px) {
    padding-left: 16px;
  }

  @media (min-width: 320px) {
    padding-left: 18px;
  }

  @media (min-width: 468px) {
    padding-left: 20px;
  }
`;

const StateItem = styled.li`
  padding: 3px 8px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.09);
  font-size: 9px;
  cursor: pointer;

  &:hover {
    background: rgba(2, 9, 109, 0.09);
  }

  @media (min-width: 280px) {
    font-size: 10px;
    padding: 4px 9px;
  }

  @media (min-width: 320px) {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 6px;
  }

  @media (min-width: 375px) {
    font-size: 12px;
  }

  @media (min-width: 468px) {
    padding: 4px 10px;
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
  margin: 15px auto;
  text-align: center;
  display: inline-flex;
  padding: 10px 4px 4px 4px;
  flex-direction: column;
  gap: 4px;
  color: #ffffff;
  border-radius: 20px;
  background: rgba(56, 14, 36, 0.1);
  box-shadow: 0px 32px 32px -16px rgba(7, 4, 2, 0.39);
  font-size: 10px;

  @media (min-width: 280px) {
    margin: 16px auto;
    padding: 11px 5px 5px 5px;
    font-size: 11px;
  }

  @media (min-width: 320px) {
    margin: 18px auto;
    padding: 12px 6px 6px 6px;
    font-size: 12px;
    border-radius: 24px;
  }

  @media (min-width: 375px) {
    gap: 5px;
  }

  @media (min-width: 468px) {
    margin: 20px auto;
    padding: 14px 6px 6px 6px;
    border-radius: 28px;
    box-shadow: 0px 64px 64px -32px rgba(7, 4, 2, 0.39);
  }
`;

const SupportButton = styled.button`
  display: flex;
  font-size: 10px;
  height: 32px;
  padding: 1px 10px 1px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  background: linear-gradient(0deg, #028a09 0%, #d4e02d 100%), #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.3);

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

  @media (min-width: 280px) {
    font-size: 11px;
    padding: 1px 11px 1px 9px;
  }

  @media (min-width: 320px) {
    font-size: 12px;
    height: 34px;
    padding: 1px 12px 1px 10px;
    border-radius: 11px;
  }

  @media (min-width: 375px) {
    height: 36px;
  }

  @media (min-width: 468px) {
    height: 38px;
    padding: 1px 14px 1px 10px;
    border-radius: 12px;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.3);
  }
`;

const Arrow = styled.span`
  font-size: 10px;
  transition: transform 0.3s;
  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(0deg)")};

  @media (min-width: 280px) {
    font-size: 11px;
  }

  @media (min-width: 320px) {
    font-size: 12px;
  }
`;