import "./style.scss";
import deleteOrder from '../../../../assets/brands/delete-order.svg';
import deleteFilter from '../../../../assets/brands/delete-filter.svg';
import orderCards from '../../../../assets/brands/order-cards.svg';
import searchDoctor from '../../../../assets/brands/search-doctor.svg';
import leftArrow from '../../../../assets/brands/arrow-left-newDate.svg';
import rightArrow from '../../../../assets/brands/arrow-right-newDate.svg';

//import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MERCADOPAGO
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { healthApi } from "../../../../../Api/HealthBookingApi";

const cardsPerPage = 14;

const x = {
  id: "33326",
  name: "Alejandro Cruz",
  specialty: { id: 2 },
  profilePicture:
    "https://res.cloudinary.com/dvpo44a4q/image/upload/v1700189494/doctors/men/jdcch5dshqe6cupwdubx.jpg",
  arraySure: [],
}

const routes = {
  getDetail: 'detailDoctor/',
}

function NewDate(props) {
  let { sures, doctors, specialtys } = props;
  const [filtSure, setFiltSure] = useState('');
  const [filtSpecialty, setFiltSpecialty] = useState('');
  const [filtName, setFiltName] = useState('');
  const [orderName, setOrderName] = useState('');

  const [maxPage, setMaxPage] = useState(Math.ceil(doctors.length / cardsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const [doctorSelected, setDoctorSelected] = useState(0);
  const [preference, setPreference] = useState({});

  initMercadoPago('TEST-a343d129-f780-4d77-8de3-0cbccf82c334');


  console.log({ filtSure })


  const filterDoctors = () => {
    let aux = [...doctors]
    if (filtSpecialty) aux = [...aux].filter(doctor => +doctor.Specialty === +filtSpecialty);
    if (filtSure) aux = [...aux].filter(doctor => doctor.Sures.includes(+filtSure));
    aux = [...aux].filter(doctor => doctor.name.toLowerCase().includes(filtName.toLowerCase()));
    if (orderName) {
      aux = [...aux].sort((a, b) =>
        orderName === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    let maxPages = Math.ceil(aux.length / cardsPerPage);
    if (!maxPages) maxPages = 1;
    if (maxPage != maxPages) setMaxPage(maxPages);
    if (currentPage > maxPages) setCurrentPage(1)
    // console.log({currentPage,maxPage})
    return aux;
  }
  const filtered = filterDoctors()
  const handlePage = (one) => {
    let newPage = currentPage + one;
    if (0 < newPage && newPage <= maxPage) setCurrentPage(newPage);
  }

  const handleSendInfo = async (buyDate) => {
    const response = await healthApi.post(
      "/pay",
      buyDate
    );
    console.log(response)

    window.location.href = response.data;
  }

  return (
    <main>
      <header>Dashboard &#62; Agendar Cita</header>

      <article className="forms-wrapper">
        <header>Agendar cita</header>

        <section className="select-doctor">
          <header>
            <h1>Seleccione el doctor de su preferencia:</h1>

            <ul className="tabs-group">
              {specialtys.slice(1).map((el, ix) =>
                <SpecialtyOption
                  key={'spec_' + ix}
                  name={el}
                  index={ix + 1}
                  filtSpecialty={filtSpecialty}
                  setFiltSpecialty={setFiltSpecialty}
                />)}
            </ul>

            <div className="filters-group">
              <div className="options">
                <div onClick={() => setOrderName('')}>{/*agregar aqui el evento on Click */}
                  <img src={deleteOrder} alt="delete " />
                </div>

                <form>
                  <label htmlFor="order">Sort <img src={orderCards} alt="orderCards" /></label>
                  <select id="order" value={orderName} onChange={(e) => { e.preventDefault(); setOrderName(e.target.value) }}>
                    <option value="a-z">Ascendente</option>
                    <option value="z-a">Descendente</option>
                  </select>

                </form>
              </div>

              <form className="search-bar" id="searh-in-grid">
                <input type="text" value={filtName} onChange={(e) => { e.preventDefault(); setFiltName(e.target.value) }} />
                <div className="submit">
                  <img src={searchDoctor} alt="searchDoctor" />
                </div>
              </form>

              <div className="options">
                <form >
                  <select name="" id="order" value={filtSure} onChange={(e) => { setFiltSure(e.target.value) }}>
                    {sures.slice(1).map((el, ix) =>
                      <ObraSocial
                        key={'sure_' + ix}
                        name={el}
                        ix={ix + 1}
                        setFiltSure={setFiltSure}
                      />)}
                  </select>
                </form>
                <div onClick={() => setFiltSure('')}>{/*agregar aqui el evento on Click */}
                  <img src={deleteFilter} alt="delete " />
                </div>
              </div>
            </div>
          </header>

          <form action="">
            <fieldset className="select-doctor">
              <section className="cards-grid">
                {filterDoctors().slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map(doctor =>
                  <DoctorCard
                    key={'doctor-card-' + doctor.id}
                    image={doctor.profilePicture}
                    name={doctor.name}
                    specialty={specialtys[doctor.Specialty]}
                    id={doctor.id}
                    price={doctor.price}
                    doctorSelected={doctorSelected}
                    setDoctorSelected={setDoctorSelected}
                    setPreference={setPreference}
                  />)}
              </section>
            </fieldset>
          </form>

          <footer>
            <nav aria-label='Navegación por páginas'>
              <ul className="pagination">
                <li className="page-item">
                  <a href="" className="prev" onClick={(e) => { e.preventDefault(); handlePage(-1) }}>
                    <img src={leftArrow} alt="leftArrow" />
                  </a>
                </li>
                <p className="pageButton">{filtered.length ? currentPage + ' de ' + maxPage : 'Sin coincidencias'}</p>
                <li className="page-item">
                  <a href="" className="prev" onClick={(e) => { e.preventDefault(); handlePage(+1) }}>
                    <img src={rightArrow} alt="rightArrow" />
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </section>
      </article>

      <section>
        {/* <Wallet initialization={{ preferenceId: preference.id }} /> */}
        {/* {console.log(preference)} */}
        <button className="btnBuy" onClick={() => { handleSendInfo(preference) }}>Generar Cita</button>

      </section>
    </main>
  );
}

export default NewDate;


function SpecialtyOption(props) {
  let { name, index, setFiltSpecialty, filtSpecialty } = props;
  let style = 'tab' + (index == filtSpecialty ? ' specialty-selected' : '');
  return (
    <li className={style} onClick={() => setFiltSpecialty(index == filtSpecialty ? '' : index)}>
      {name}
    </li>
  );
}

function ObraSocial(props) {
  let { name, setFiltSure, ix } = props
  return (
    <option value={ix}>
      {name}
    </option>
  );
}

function NumberPage(props) {
  let { number } = props;
  return (
    <li className="page-item">
      <a href="">{number}</a>
    </li>
  );
}

function DoctorCard(props) {
  let { image, id, name, specialty, price, doctorSelected, setDoctorSelected, setPreference } = props;

  const handleDoctorSelection = (id) => {
    setDoctorSelected(id == doctorSelected ? 0 : id);

    setPreference({
      date: "2020-09-11",
      time: "08:00",
      idPatient: 39421857,
      idDoctor: id
    });
  };

  const navigate = useNavigate();

  let style = 'tile' + (id == doctorSelected ? ' doctor-selected' : '');
  return (
    <article className={style}>
      <img src={image} alt="imageDoctor" onClick={() => { navigate(routes.getDetail + id) }} />
      <section className="card-description" onClick={() => { handleDoctorSelection(id) }}>
        <h1>{name}</h1>
        <p className="specialization">{specialty}</p>
        <p className="licence">{id}</p>
        <p className="specialization">${price}</p>
      </section >
    </article >
  )
}
