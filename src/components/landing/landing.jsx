import "./style.scss";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/img/hero-cover.png";
import logoClaro from "../assets/full-logo-white.svg";
import logoOscuro from "../assets/full-logo-black.svg";
import linkSVG from "../assets/util/link-clip.svg";
import linkedInSVG from "../assets/brands/linkedin.svg";
import { useAuth0, } from "@auth0/auth0-react";
import { arrowRight } from "../assets/svgs";
// import gitHubSVG from "../assets/brands/github.svg";

const aboutInfo = [
  { link: "#", text: "Codigo fuente (frontend)" },
  { link: "#", text: "Codigo fuente (backend)" },
  { link: "#", text: "Henry Bootcamp" },
];
const infoParticipants = [
  { linkedin: "", github: "", name: "Andres Soria" },
  { linkedin: "", github: "", name: "El Aldo" },
  { linkedin: "", github: "", name: "Carlos Condori" },
  {
    linkedin: "http://www.linkedin.com/in/jose-abel-aguilar-cepeda-8a3924284",
    github: "https://github.com/JAAC2023",
    name: "José Aguilar",
  },
  { linkedin: "", github: "", name: "Cristian Capobianco" },
  { linkedin: "", github: "", name: "Santi Paz" },
  { linkedin: "", github: "", name: "Santi Chaparro" },
];

function Landing() {
  const navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  console.log(user);
  console.log(isAuthenticated);

  if (isAuthenticated) {
    console.log("localstorage");
    localStorage.setItem("bool", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user.email));
  }

  const loginAuthenticate = () => {
    if (isAuthenticated) {
      navigate("/patient");
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="wrapper-LandingPage">
      <header className="landing-header">
        <div className="logo">
          <img className="landings-logo-img" src={logoClaro} alt="logoClaro" />
        </div>
        <nav className="actions">
          <a className="landing-a-tag" onClick={() => {}}>
            Iniciar sesión
          </a>
          <a className="landing-a-tag" href="/signup">
            UNETE <img className="landings-logo-img" src={arrowRight}></img>
          </a>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-desc">
            <div className="description">
              <span className="slogan">Conecta con tu salud</span>
              <span className="title">
                {" "}
                HealthBooking es la web que te facilita la salud
                
              </span>
              <span className="comment">
                {" "}
                Regístrate ya y conecta con tu salud
              </span>
            </div>

            <div className="actions">
              {isAuthenticated ? (
                <button className="login" onClick={() => loginAuthenticate()}>
                  {" "}
                  ingresar
                </button>
              ) : (
                <button className="login" onClick={() => loginWithRedirect()}>
                  Unirse
                </button>
              )}
            </div>
          </div>
          <img className="hero-logo" src={heroImg} />
        </section>

        <section className="about-doctors">
          {/* aqui va Sección 2: about-doctors */}
        </section>

        <section className="about-clinic">
          {/* aqui va Seccion 3: about-clinic */}
        </section>
      </main>

      <footer className="landing-footer">
        <div className="menu">
          <div className="banner">
            <img
              className="landings-logo-img"
              src={logoOscuro}
              alt="logoClaroOscuro"
            />
            <span>
              {" "}
              <strong>HealthBooking</strong> es un proyecto desarrollado por
              estudiantes del bootcamp Henry, una academia online que forma
              desarrolladores web full stack.{" "}
            </span>
          </div>
          <div className="links-group about">
            <h1 className="landing-h1">Sobre este proyecto</h1>
            <nav>
              {aboutInfo.map((el) => (
                <LinkAbout
                  key={"about_" + el.text}
                  link={el.link}
                  text={el.text}
                />
              ))}
            </nav>
          </div>

          <div className="links-group contact">
            <h1 className="landing-h1">Integrantes</h1>
            <nav>
              {infoParticipants.map((el) => (
                <LinkParticipants
                  key={"participant_" + el.name}
                  name={el.name}
                  linkedin={el.linkedin}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="copyright">
          ©2023 <strong>HealthBooking.</strong> Henry Bootcamp

        </div>
      </footer>
    </div>
  );
}

export default Landing;

function LinkAbout(props) {
  const { link, text } = props;
  return (
    <a className="landing-a-tag" href={link} target="_blank">
      <img className="landings-logo-img" src={linkSVG} alt="imageLink" />
      {text}
    </a>
  );
}

function LinkParticipants(props) {
  const { linkedin, github, name } = props;
  return (
    <a className="landing-a-tag" href={linkedin}>
      <img className="landings-logo-img" src={linkedInSVG} />
      {name}
    </a>
  );
}
