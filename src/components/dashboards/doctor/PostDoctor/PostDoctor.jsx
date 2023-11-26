import "./PostDoctor.css"
import validation from "./validations"
import axios from "axios"
import { useState } from "react"
import data from "./data.json"
import { NavLink } from "react-router-dom";
import logo from "./svgs/logo.svg";
//import AsideRight from "../../general/AsideRight/asideRight";
import fotoPerfil from "../../../assets/img/doctor.avif"

const PostDoctor = () => {
  const [foto, setFoto] = useState("");
  const [aux, setAux] = useState([]);
  const [aux1, setAux1] = useState([]);
  const [errors, setErrors] = useState({});
  const [seguros, setSeguros] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    profilePicture: "",
    id: "",
    phone: "",
    email: "",
    price: "",
    sure: [],
  });

  const indicativos = ["+1", "+54", "+57", "+51", "+52"];
  let especialidad = [...new Set(data.doctors.map((esp) => esp.specialty))];
  let seguro = [
    ...new Set(
      data.doctors.flatMap((sur) => sur.arraySure.map((sure) => sure))
    ),
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doctor, [name]: value });
    setErrors(validation({ ...doctor, [name]: value }));
  };

  // const handlePhone = (event) => {
  //   const { name, value } = event.target;
  //   setAux(value)
  //   setAux1(value)
  //   setDoctor({ ...doctor, [name]: aux + aux1 });
  //   setErrors(validation({ ...doctor, [name]: value }));
  // };

  //console.log(doctor);

  const handleSure = (event) => {
    const values = event.target.value;
    if (!seguros.includes(values)) {
      setSeguros([...seguros, values]);
      setDoctor({ ...doctor, sure: [...doctor.sure, values] });
    }
  };

  //const { name, id, email, phone, profilePicture, sure, specialty } = newDoc

  const changeUploadImage = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
      data.append("file", file);
    data.append("upload_preset", "postDoctorPf");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvpo44a4q/upload",
        data
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  const mostrarVistaPrevia = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    if (file) reader.readAsDataURL(file);

    const imageUrl = await changeUploadImage(event);
    setDoctor({ ...doctor, profilePicture: imageUrl });
  };

  //console.log(doctor);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const { data } = await axios.post("http://localhost:3001/doctor", doctor);

      setDoctor({
        name: "",
        specialty: "",
        profilePicture: "",
        id: "",
        phone: "",
        email: "",  
        price: "",
        sure: [],
      });

      window.alert("Registro Exitoso!");

      //console.log(doctor);
    } catch (error) {
      window.alert(error.response.data.error);
    }
  };

  const informacion = [
    { text: "Altura", info:"190cm (74.8in)"},
    { text: "Peso", info:"79kg (39,5Lb)"},
    { text: "Cumpleaños", info:"Sep 04, 1996"},
    { text: "RH", info:"O+"},
  ]

  const perfil = { rol: 'Paciente', img: fotoPerfil, name: "Fabio Catrillon"}


  return (
    <div>
      <AsideRight parametros={informacion} perfil={perfil}></AsideRight>
    <form onSubmit={handleSubmit}>
      <div className="formulario">
      <div className="div1">
        <div className="div2">
          <div className="div3"/>
          <div className="div4"/>
        {foto && <img src={foto} alt="Not Found" className="div4" />}
        {foto ? <p></p> : <p className="fotoError">{errors.profilePicture}</p> }
        </div>

        <input id="input-file" className="inputFile" type="file" accept=".jpg, .jpeg, .png" values={doctor.profilePicture}onChange={mostrarVistaPrevia} />
        <label htmlFor="input-file" className="div5">
          <div className="div6">
            <div className="div7"></div>
            <div className="div8"></div>
            <div className="div9"></div>
            <div className="div10"></div>
          </div>
          <div className="div11">Agregar Foto</div>
        </label>

        <div className="div12">
            <button className="div14">Cancelar</button>
            <button className="div14">Enviar</button>
        </div>
        <div className="div21">
        <h1 className="div22">FORMULARIO</h1>
          <div className="div23">
            <div className="div24">
              <div className="div25">
              <h1 className="div26">Nombre</h1>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                  <input type="text" className="div30" placeholder="Ingresa nombre" name="name" value={doctor.name} onChange={handleChange}></input>
                  </div>
                  <p className="MessageError">{errors.name}</p>
                </div>
              </div>
            </div>
            <div className="div24">
              <div className="div25">
              <h1 className="div26">Licencia</h1>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                  <input type="text" name="id" className="div30" placeholder="Ej. 12345" value={doctor.id} onChange={handleChange} ></input>
                  </div>
                  <p className="MessageError">{errors.id}</p>
                </div>
              </div>
            </div>

            <div className="div24">
              <div className="div25">
                <h1 className="div26">Especialidad</h1>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                  <select  name="specialty" className="div30" value={doctor.specialty} onChange={handleChange}> 
                    <option value="">Seleccionar</option>
                    {especialidad?.map((esp, index)=>(
                      <option key={index}>{esp}</option> 
                    ))}
                  </select>
                  </div>
                  <p className="MessageError">{errors.specialty}</p>
                </div>
              </div>
            </div>

            <div className="div24">
              <div className="div25">
                <div className="div26">
                  Telefono
                </div>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                    <select className="div46" >
                      {indicativos.map((ind, index)=>(
                       <option key={index}>{ind}</option>
                      ))}
                    </select>
                    <input type="text" name="phone" className="div30" placeholder="Ej. 1234567890" value={doctor.phone} onChange={handleChange}></input>
                  </div>
                  <p className="MessageError">{errors.phone}</p>
                </div>
              </div>
            </div>
            <div className="div24">
              <div className="div25">
                <div className="div26">
                  Email
                </div>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                  <input type="email" name="email" className="div30"  placeholder="Ej. ejemp@mail.com" value={doctor.email} onChange={handleChange}></input>
                  </div>
                  <p className="MessageError" >{errors.email}</p>
                </div>
              </div>
            </div>
            <div className="div24">
              <div className="div25">
                <h1 className="div26">Price</h1>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                  <input type="text" name="price" className="div30"  placeholder="Ej. 123456" value={doctor.price} onChange={handleChange}></input>
                  </div>
                  <p className="MessageError" >{errors.price}</p>
                </div>
              </div>
            </div>
            <div className="div24">
              <div className="div25">
                <div className="div26">
                  Seguro
                </div>
              </div>
              <div className="div27">
                <div className="div28">
                  <div className="div29">
                <select name="sure" className="div30" value={doctor.sure} onChange={handleSure}>
                  <option value="">Seleccionar</option>
                  {seguro?.map((sure, index)=>(
                 <option key={index} value={sure}>
                  {sure}
                 </option> 
                  ))}
               </select>
                  </div>
                  <p> 
              {seguros.map((seg)=>(
              <button className="butonDeletSure" value={seg} onClick={(event)=> {setSeguros(seguros.filter((e)=> e !== event.target.value));setDoctor({...doctor, sure: doctor.sure.length ? doctor.sure.filter((e)=> e !== event.target.value) : ""} )}}>{seg}</button> 
                ))}
            </p> 
                  {!seguros.length && <p className="MessageError" name="Seguro">{errors.sure}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="div75"></div>
        </div>
        <div className="div76">
          <div className="div77">
            <img alt="" src={logo} className="div78"></img>
          </div>
          <div className="div80">
            HealthBooking
          </div>
        </div>
      </div>
    </div>
  </form>
  </div>
  );
};

export default PostDoctor;
{
  /* <form onSubmit={handleSubmit}>
  <div className="formulario">
      <div>
      <input className="subirFoto" type="file" accept=".jpg, .jpeg, .png" values={doctor.profilePicture}onChange={mostrarVistaPrevia} />
      {foto && <img src={foto} alt="Not Found" className="foto" />}
    </div>
    <p className="fotoError">{errors.profilePicture}</p>

    <div class="cuadrado"></div>

      <div className="frame">
        <input type="text" className="Nombre" placeholder="Ingresa nombre" name="name" value={doctor.name} onChange={handleChange}></input>
      </div>
      <p className="NombreError">{errors.name}</p>
      <div className="datos">
        <div className="group">
          <label className="div">Formulario</label>
        </div>
        <div className="frame-2">
          <label className="text-wrapper-2">Especialidad</label>
          <select  name="specialty" className="Especialidad" value={doctor.specialty} onChange={handleChange}> 
            <option value="">Seleccionar</option>
            {especialidad?.map((esp, index)=>(
              <option key={index}>
                {esp}
              </option> 
            ))}
          </select>
        </div>
          <p className="EspecialidadError">{errors.specialty}</p>
        <hr />

        <div className="group-2">
          <label className="text-wrapper-4">Licencia</label>
          <input type="number" name="id" className="licencia" placeholder="Ej. 12345" value={doctor.id} onChange={handleChange} ></input>
        </div>
          <p className="licenciaError">{errors.id}</p>
        <hr />

        <div className="group-2">
          <label className="text-wrapper-6">Telefono</label>
          <select className="indicativo" >
            {indicativos.map((ind, index)=>(
              <option key={index}>{ind}</option>
            ))}
          </select>
          <input type="number" name="phone" className="licencia" placeholder="Ej. 1234567890" value={doctor.phone} onChange={handleChange}></input>
        </div>
          <p className="TelefonoError">{errors.phone}</p>
        <hr />

        <div className="group-2">
          <div  className="text-wrapper-7">email</div>
          <input type="email" name="email" className="licencia"  placeholder="Ej. ejemp@mail.com" value={doctor.email} onChange={handleChange}></input>
        </div>
          <p className="CorreoError" >{errors.email}</p>
        <hr />

        <div className="group-2">
          <div className="text-wrapper-7">Seguro</div>
            <select name="sure" className="licencia" value={doctor.sure} onChange={handleSure}>
              <option value="">Seleccionar</option>
              {seguro?.map((sure, index)=>(
                <option key={index} value={sure}>
                {sure}
                </option> 
              ))}
            </select>
            <p className="seleccionados">
              {seguros.map((seg)=>(
              <button className="butonDeletSure" value={seg} onClick={(event)=> {setSeguros(seguros.filter((e)=> e !== event.target.value));setDoctor({...doctor, sure: doctor.sure.length ? doctor.sure.filter((e)=> e !== event.target.value) : ""} )}}>{seg} </button> 
                ))}
            </p> 
          </div>
          {!seguros.length && <p className="SeguroError" name="Seguro">{errors.sure}</p>}
        </div>

        <div className="Footer" style={{position: "relative", top: 60, borderRadius: 20, width: 430, height: 60, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#f8f7ffbb', borderTop: '1px #E6E6E6 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div className="Frame53" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 2, paddingBottom: 2, background: 'white', borderRadius: 4, overflow: 'hidden', border: '1px #E6E6E6 solid', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <NavLink to={"/patient/new_appointment"}>
            <button className="Cancel" style={{width: 88, height: 29, textAlign: 'center', color: 'black', fontSize: 13, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Cancelar</button>
          </NavLink>
        </div>
        <div className="Frame52" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 2, paddingBottom: 2, background: '#42A7C3', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)', borderRadius: 4, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <button type="submit" className="enviar" style={{width: 88, height: 29, textAlign: 'center', color: 'white', fontSize: 13, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Enviar</button>
        </div>
      </div>
    </div>
  </form> */
}