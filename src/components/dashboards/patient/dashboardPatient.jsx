import "./style.scss";
//_______________COMPONENTES
import InfoPaciente from "../../../../componentes jose/GENERAL/InfoPaciente/InfoPaciente";
import AsideLeft from "../general/asideLeft/asideLeft";
import HomePatient from "./routes/home/homePatient";



//_______________SVGS
import homeSVG from '../../assets/brands/home.svg';
import editSVG from '../../assets/brands/edit-profile.svg';
import newDateSVG from '../../assets/brands/make-date.svg';
import historySVG from '../../assets/brands/history.svg';
import NewDate from "./routes/newDate/newDate";


const navigationOptions = [
  {svg:homeSVG, text:'Home', link:''},
  {svg:editSVG, text:'Editar perfil', link:''},
  {svg:newDateSVG, text:'Nueva cita', link:''},
  {svg:historySVG, text:'Historial Medico', link:''},
]

function DashboardPatient() {
  return (
    <div className="wrapper-PatientHome">
      <AsideLeft menuData={navigationOptions}/>

      <div className="dashboard-main">
        <NewDate/>
        {/* <HomePatient/> */}
      </div>

      <aside className="user-menu">
        <InfoPaciente/>
      </aside>

      

    </div>
  );
}

export default DashboardPatient;


/*
      {/* <aside className="navigation-menu">
        <img className="site-logo" src={logoOscuro}></img>

        <nav className="navigation-bar">
          <a href="/patient">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M9.15722 21.2705V18.13C9.1572 17.3313 9.79312 16.6822 10.581 16.6768H13.4671C14.2587 16.6768 14.9005 17.3275 14.9005 18.13V18.13V21.2802C14.9003 21.9584 15.4343 22.5127 16.103 22.5286H18.0271C19.9451 22.5286 21.5 20.9523 21.5 19.0078V19.0078V10.0741C21.4898 9.30913 21.1355 8.59079 20.538 8.12351L13.9577 2.74963C12.8049 1.81393 11.1662 1.81393 10.0134 2.74963L3.46203 8.13326C2.86226 8.59865 2.50739 9.31818 2.5 10.0838V19.0078C2.5 20.9523 4.05488 22.5286 5.97291 22.5286H7.89696C8.58236 22.5286 9.13798 21.9653 9.13798 21.2705V21.2705"
                stroke="#352E5B"
                strokeWidth="1.5"
                strokeLinecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Home
          </a>

          <a href="/patient/edit_profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g clipPath="url(#clip0_257_4809)">
                <path
                  d="M8 7.57715C8 8.63801 8.42143 9.65543 9.17157 10.4056C9.92172 11.1557 10.9391 11.5771 12 11.5771C13.0609 11.5771 14.0783 11.1557 14.8284 10.4056C15.5786 9.65543 16 8.63801 16 7.57715C16 6.51628 15.5786 5.49887 14.8284 4.74872C14.0783 3.99858 13.0609 3.57715 12 3.57715C10.9391 3.57715 9.92172 3.99858 9.17157 4.74872C8.42143 5.49887 8 6.51628 8 7.57715Z"
                  stroke="#A5A2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 21.5771V19.5771C6 18.5163 6.42143 17.4989 7.17157 16.7487C7.92172 15.9986 8.93913 15.5771 10 15.5771H14C15.0609 15.5771 16.0783 15.9986 16.8284 16.7487C17.5786 17.4989 18 18.5163 18 19.5771V21.5771"
                  stroke="#A5A2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_257_4809">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.577148)"
                  />
                </clipPath>
              </defs>
            </svg>
            Editar perfil
          </a>

          <a href="/patient/new_appointment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <g clipPath="url(#clip0_257_4803)">
                <path
                  d="M8.25 11.5771H13.75"
                  stroke="#A5A2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 8.82715V14.3271"
                  stroke="#A5A2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.75 5.16048C2.75 4.67425 2.94315 4.20794 3.28697 3.86412C3.63079 3.5203 4.0971 3.32715 4.58333 3.32715H17.4167C17.9029 3.32715 18.3692 3.5203 18.713 3.86412C19.0568 4.20794 19.25 4.67425 19.25 5.16048V17.9938C19.25 18.48 19.0568 18.9464 18.713 19.2902C18.3692 19.634 17.9029 19.8271 17.4167 19.8271H4.58333C4.0971 19.8271 3.63079 19.634 3.28697 19.2902C2.94315 18.9464 2.75 18.48 2.75 17.9938V5.16048Z"
                  stroke="#A5A2B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_257_4803">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(0 0.577148)"
                  />
                </clipPath>
              </defs>
            </svg>
            Agendar Cita
          </a>
        </nav>

        <div className="actions">
          <a href="/patient/new_appointment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <g clipPath="url(#clip0_257_4638)">
                <path
                  d="M8.75 11H14.25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5 8.25V13.75"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.25 4.58333C3.25 4.0971 3.44315 3.63079 3.78697 3.28697C4.13079 2.94315 4.5971 2.75 5.08333 2.75H17.9167C18.4029 2.75 18.8692 2.94315 19.213 3.28697C19.5568 3.63079 19.75 4.0971 19.75 4.58333V17.4167C19.75 17.9029 19.5568 18.3692 19.213 18.713C18.8692 19.0568 18.4029 19.25 17.9167 19.25H5.08333C4.5971 19.25 4.13079 19.0568 3.78697 18.713C3.44315 18.3692 3.25 17.9029 3.25 17.4167V4.58333Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_257_4638">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Agendar Cita
          </a>
          
        </div>
      </aside> 
*/