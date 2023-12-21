import { Link } from "react-router-dom";

import LogoUnicamp from "./../../../images/logo-unicamp.svg";
import LogoInstitutoFederal from "./../../../images/logo-instituto-federal-sao-paulo-campus-campinas.svg";
import LogoUnesp from "./../../../images/logo-unesp.svg";
import LogoLaddem from "./../../../images/logo-laddem.png";
import LogoNepo from "./../../../images/logo-nepo.svg";
import LogoFuncamp from "./../../../images/logo-funcamp.svg";
import LogoFiotec from "./../../../images/logo-fiotec.svg";
import LogoIFCH from "./../../../images/logo-ifch.png";
import LogoBilleMelindaGates from "./../../../images/logo-bill-melinda-gates-foundation.svg";
import LogoCNPq from "./../../../images/logo-cnpq.svg";
import LogoSUS from "./../../../images/logo-sus-ministerio-da-saude.svg";
import LogoInovia from "./../../../images/logo-inovia.png";

import "./styles.css";

function Footer() {
  const titlesData = [
    {
      title: "Execução",
      itens: [
        { text: "Laddem", logo: LogoLaddem },
        { text: "Inovia", logo: LogoInovia },
        { text: "Nepo", logo: LogoNepo },
        { text: "Instituto Federal", logo: LogoInstitutoFederal },
        { text: "Unesp", logo: LogoUnesp },
        { text: "Unicamp", logo: LogoUnicamp },
      ],
    },
    {
      title: "Apoio",
      itens: [
        { text: "Funcamp", logo: LogoFuncamp },
        { text: "Fiotec", logo: LogoFiotec },
        { text: "IFCH", logo: LogoIFCH },
      ],
    },
    {
      title: "Financiamento",
      itens: [
        { text: "Bill & Melinda Gates", logo: LogoBilleMelindaGates },
        { text: "CNPq", logo: LogoCNPq },
        { text: "SUS", logo: LogoSUS },
      ],
    },
  ];
  return (
    <footer id="footer">
      <div className="container">
        {titlesData.map((titleData) => (
          <section>
            <div className="info">
              <span className="title">{titleData.title}</span>
            </div>
            <div
              className="items"
              style={{
                //align all images & width & height
                display: "flex",
                justifyContent: "left",
                alignItems: "start",
                width: "100%",
                //permit break line
                flexWrap: "wrap",
              }}
            >
              {titleData.itens.map((item) => (
                <Link to="/">
                  <img
                    src={item.logo}
                    height={120}
                    style={{
                      height: "60px",
                      objectFit: "cover",
                      //adjust width
                      width: "auto",
                      maxWidth: "100%",
                    }}
                    alt={item.text}
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
        {/* <div className="items">
          <Link to="/">
            <img src={LogoLaddem} alt="Laddem" />
          </Link>
          <a href="https://www.inoviacorp.com/">
            <img src={LogoInovia} alt="Inovia" />
          </a>
          <Link to="/">
            <img src={LogoNepo} alt="Nepo" />
          </Link>
          <Link to="/">
            <img src={LogoInstitutoFederal} alt="Instituto Federal" />
          </Link>
          <Link to="/">
            <img src={LogoUnesp} alt="Unesp" />
          </Link>
          <Link to="/">
            <img src={LogoUnicamp} alt="Unicamp" />
          </Link>
        </div>

        <section>
          <div className="info">
            <span className="title">Apoio</span>
          </div>
          <div className="items">
            <Link to="/">
              <img src={LogoFuncamp} alt="Funcamp" />
            </Link>
            <Link to="/">
              <img src={LogoFiotec} alt="Fiotec" />
            </Link>
            <Link to="/">
              <img src={LogoIFCH} alt="IFCH" />
            </Link>
          </div>
        </section>

        <section>
          <div className="info">
            <span className="title">Financiamento</span>
          </div>
          <div className="items">
            <Link to="/">
              <img src={LogoBilleMelindaGates} alt="Bill & Melinda Gates" />
            </Link>
            <Link to="/">
              <img src={LogoCNPq} alt="CNPq" />
            </Link>
            <Link to="/">
              <img src={LogoSUS} alt="SUS" className="logoSus" />
            </Link>
          </div>
        </section> */}
      </div>
    </footer>
  );
}

export default Footer;
