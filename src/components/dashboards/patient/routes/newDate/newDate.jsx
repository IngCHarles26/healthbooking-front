import "./style.scss";
import deleteOrder from '../../../../assets/brands/delete-order.svg';
import deleteFilter from '../../../../assets/brands/delete-filter.svg';
import orderCards from '../../../../assets/brands/order-cards.svg';
import searchDoctor from '../../../../assets/brands/search-doctor.svg';
import leftArrow from '../../../../assets/brands/arrow-left-newDate.svg';
import rightArrow from '../../../../assets/brands/arrow-right-newDate.svg';


const x = {
  id: "33326",
  name: "Alejandro Cruz",
  specialty: { id: 2 },
  profilePicture:
    "https://res.cloudinary.com/dvpo44a4q/image/upload/v1700189494/doctors/men/jdcch5dshqe6cupwdubx.jpg",
  arraySure: [],
}

function NewDate() {
  return ( 
    <main>
      <header>Dashboard &#62; Agendar Cita</header>

      <article className="forms-wrapper">
        <header>Agendar cita</header>

        <section className="select-doctor">
          <header>        
            <h1>Seleccione el doctor de su preferencia:</h1>

            <ul className="tabs-group">
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
              <SpecialtyOption name = 'Pediatría'/>
            </ul>

            <div className="filters-group">
              <div className="options">
                <div>{/*agregar aqui el evento on Click */}
                  <img src={deleteOrder} alt="delete " />
                </div>

                <form>
                  <label htmlFor="order">Sort <img src={orderCards} alt="orderCards" /></label>
                  <select id="order">
                    {/* <option value="unOrdered"></option>
                    <optgroup label='Por Nombre'>
                    </optgroup> */}
                      <option value="z-a">Descendente</option>
                      <option value="a-z">Ascendente</option>
                  </select>

                </form>
              </div>

              <form className="search-bar" id="searh-in-grid">
                <input type="text" />
                <div className="submit">
                  <img src={searchDoctor} alt="searchDoctor" />
                </div>
              </form>

              <div className="options">
                <form >
                  <label htmlFor="order">Obra Social <img src={orderCards} alt="orderCards" /></label>
                  <select name="" id="order">
                    <ObraSocial name='MOCA'/>
                    <ObraSocial name='MOCAa'/>
                  </select>
                </form>
                <div>{/*agregar aqui el evento on Click */}
                  <img src={deleteFilter} alt="delete " />
                </div>
              </div>
            </div>
          </header>
          
          <form action="">
            <fieldset className="select-doctor">
              <section className="cards-grid">
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
                <DoctorCard image={x.profilePicture} id={x.id} name={x.name} specialty={x.specialty.id}/>
              </section>
            </fieldset>
          </form>

          <footer>
            <nav aria-label='Navegación por páginas'>
              <ul className="pagination">
                <li className="page-item">
                  <a href="" className="prev">
                    <img src={leftArrow} alt="leftArrow" />
                  </a>
                </li>
                <NumberPage number='1'/>
                <NumberPage number='2'/>
                <NumberPage number='3'/>
                <li className="page-item">
                  <a href="" className="prev">
                    <img src={rightArrow} alt="rightArrow" />
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </section>
      </article>
    </main>
  );
}

export default NewDate;


function SpecialtyOption(props) {
  let {name} = props;
  return ( 
    <li className="tab">
      {name}
    </li>
  );
}

function ObraSocial(props) {
  let {name} = props
  return ( 
    <option>
      {name}
    </option>
  );
}

function NumberPage(props) {
  let {number} = props;
  return ( 
    <li className="page-item">
      <a href="">{number}</a>
    </li>
  );
}

function DoctorCard(props){
  let {image,id,name,specialty} = props;
  return(
    <article className="tile">
      <img src={image} alt="imageDoctor" />
      <section className="card-description">
        <h1>{name}</h1>
        <p className="specialization">{specialty}</p>
        <p className="licence">{id}</p>
      </section>
    </article>
  )
}