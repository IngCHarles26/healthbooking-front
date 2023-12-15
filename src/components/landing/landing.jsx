import "./style.scss";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/img/hero-cover.png";
import logoClaro from "../assets/full-logo-white.svg";
import logoOscuro from "../assets/full-logo-black.svg";
import linkSVG from "../assets/util/link-clip.svg";
import linkedInSVG from "../assets/brands/linkedin.svg";
import { useAuth0, } from "@auth0/auth0-react";
import { ArrowRight } from "../assets/svgs";
import gitHubSVG from "../assets/brands/github.svg";

const aboutInfo = [
  { link: "https://github.com/IngCHarles26/healthbooking-front", text: "Front-end" },
  { link: "https://github.com/cristiancapobianco/HealtBooking-Back-end", text: "Back-end" },
  { link: "https://www.soyhenry.com", text: "Soy Henry" },
];
const infoParticipants = [
  { linkedin: "", github: "https://github.com/AndSoria", name: "Andres S." },
  { linkedin: "", github: "https://github.com/baldo8", name: "Aldo" },
  { linkedin: "", github: "https://github.com/IngCHarles26", name: "Carlos C." },
  {
    linkedin: "http://www.linkedin.com/in/jose-abel-aguilar-cepeda-8a3924284",
    github: "https://github.com/JAAC2023",
    name: "José A.",
  },
  { linkedin: "", github: "https://github.com/cristiancapobianco", name: "Cristian C." },
  { linkedin: "", github: "https://github.com/santipaz19", name: "Santi P." },
  { linkedin: "", github: "https://github.com/SantiChaparro", name: "Santi C." },
];

function Landing() {
  const navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  // console.log(user);
  // console.log(isAuthenticated);
  console.log(user);
  if (isAuthenticated) {
    // console.log("localstorage");
    localStorage.removeItem('user');
    localStorage.setItem("bool", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", user.email);
  }

  const loginAuthenticate = () => {
    if (isAuthenticated) {
      navigate("/patientForm");
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
          <a className="landing-a-tag" style={{ cursor: "pointer" }} onClick={() => loginWithRedirect()}>
            Iniciar sesión
          </a>
          {/* <a className="landing-a-tag" href="/signup">
            UNETE
            
          </a> */}
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-desc">
            <div className="description">
              <span className="slogan">Conecta con tu salud</span>
              <span className="title">
                HealthBooking es la web que te facilita la salud

              </span>
              <span className="comment">
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
              <strong>HealthBooking</strong> es un proyecto desarrollado por
              estudiantes del bootcamp Henry, una academia online que forma
              desarrolladores web full stack.
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
                  github={el.github}
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
    <a className="landing-a-tag" href={github} target='_blank'>
      <img className="landings-logo-img" src={linkedInSVG} />
      {name}
    </a>
  );
}
