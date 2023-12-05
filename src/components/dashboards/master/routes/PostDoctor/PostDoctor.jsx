import "./PostDoctor.css"
import validation from "./validations"
import axios from "axios"
import { useState } from "react"
import data from "./data.json"
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/brands/svgsCreateDoctor/logo.svg"
import { healthApi } from "../../../../../Api/HealthBookingApi"
// import AsideRight from "../../general/AsideRight/AsideRight"
// import fotoPerfil from "../../../../assets/img/doctor.avif"

const PostDoctor = () => {
  const [selectSure, setSelectSure] = useState('');
  const [selectSpecialty, setSelectSpecialty] = useState('');
  const [selectIndiPhone, setSelectIndiPhone] = useState('');
  const [foto, setFoto] = useState("");
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
  //console.log(doctor);

  const handleSpecialty = (event) => {
    const { name, value } = event.target;
    setSelectSpecialty(value)
    setDoctor({ ...doctor, [name]: value });
    setErrors(validation({ ...doctor, [name]: value }));
  }

  const handleSure = (event) => {
    const values = event.target.value;
    setSelectSure(values)
    if (!seguros.includes(values)) {
      setSeguros([...seguros, values]);
      setDoctor({ ...doctor, sure: [...doctor.sure, values] });
    }
  };


  const handlePhone = (event, codigoPais, numeroTelefono) => {
    setSelectIndiPhone(event.target.value)
    const telefonoCompleto = codigoPais + numeroTelefono;
    setDoctor({ ...doctor, phone: telefonoCompleto })
    setErrors(validation({ ...doctor, phone: telefonoCompleto }))
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


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      if (doctor.name === '' &&
        doctor.specialty === '' &&
        doctor.id === '' &&
        doctor.phone === '' &&
        doctor.email === '' &&
        doctor.price === '' &&
        doctor.sure.length === 0) {
        alert("Por Favor llena los campos");
      } else if (doctor.name === '') {
        alert("Falta el nombre. Por favor, completa el campo correspondiente.");
      } else if (doctor.specialty === '') {
        alert("Falta la especialidad. Por favor, completa el campo correspondiente.");
      } else if (doctor.profilePicture === '') {
        alert("Falta la foto de perfil. Por favor, completa el campo correspondiente.");
      } else if (doctor.id === '') {
        alert("Falta el ID. Por favor, completa el campo correspondiente.");
      } else if (doctor.phone === '') {
        alert("Falta el teléfono. Por favor, completa el campo correspondiente.");
      } else if (doctor.email === '') {
        alert("Falta el correo electrónico. Por favor, completa el campo correspondiente.");
      } else if (doctor.price === '') {
        alert('Falta la tarifa. Por favor, completa el campo correspondiente')
      } else if (doctor.sure.length === 0) {
        alert("Falta agregar seguros. Por favor, completa el campo correspondiente.");
      } else if (errors.id !== 'La licencia es requerida' && errors.id !== '') {
        alert('Licencia erronea, por favor corrige el campo correspondiente')
      } else if (errors.phone !== 'El telefono es requerido' && errors.phone !== '') {
        alert('Telefono erroneo, por favor corrige el campo correspondiente')
      } else if (errors.email !== 'El email es requerido' && errors.email !== '') {
        alert('Correo erroneo, por favor corrige el campo correspondiente')
      } else if (errors.price !== 'La tarifa es requerido' && errors.price !== '') {
        alert('Tarifa erronea, por favor corrige el campo correspondiente')
      }

      else {
        const { data } = await healthApi.post("/master/doctor", doctor);

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

        setErrors("")
        setSeguros([])
        setFoto("")
        setSelectSpecialty('')
        setSelectIndiPhone('')
        setSelectSure('')

        window.alert("Registro Exitoso!");
      }

    } catch (error) {
      window.alert(error.response.data.error);
    }
  };

  const seteo = () => {
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
    setErrors("")
    setSeguros([])
    setFoto("")
    setSelectSpecialty('')
    setSelectIndiPhone('')
    setSelectSure('')
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formulario">
          <div className="div1">
            <div className="div2">
              <div className="div3" />
              <div className="div4" />
              {foto && <img src={foto} alt="Not Found" className="div4" />}
              {foto ? <p></p> : <p className="fotoError">{errors.profilePicture}</p>}
            </div>

            <input id="input-file" className="inputFile" type="file" accept=".jpg, .jpeg, .png" values={doctor.profilePicture} onChange={mostrarVistaPrevia} />
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
              <button className="div14" type="button" onClick={() => seteo()}>Cancelar</button>

              <button type="submit" className="div14">Enviar</button>
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
                        <select name="specialty" className="div30" value={selectSpecialty} onChange={handleSpecialty}>
                          <option value="">Seleccionar</option>
                          {especialidad?.map((esp, index) => (
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
                        <select className="div46" id="codigoPais" value={selectIndiPhone} onChange={(e) => {
                          const codigoPais = e.target.value;
                          const numeroTelefono = document.getElementById('numeroTelefono').value;
                          handlePhone(codigoPais, numeroTelefono);
                        }}>
                          <option value=''> + </option>
                          {indicativos.map((ind, index) => (
                            <option key={index} value={ind}>{ind}</option>
                          ))}
                        </select>
                        <input type="text" name="phone" className="div30" placeholder="Ej. 12345678901" id="numeroTelefono" onChange={(e) => {
                          const codigoPais = document.getElementById('codigoPais').value;
                          const numeroTelefono = e.target.value;
                          handlePhone(codigoPais, numeroTelefono);
                        }}></input>
                      </div>
                      <p className="MessageError">{errors.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="div24">
                  <div className="div25">
                    <div className="div26">
                      Correo
                    </div>
                  </div>
                  <div className="div27">
                    <div className="div28">
                      <div className="div29">
                        <input type="email" name="email" className="div30" placeholder="Ej. ejemp@mail.com" value={doctor.email} onChange={handleChange}></input>
                      </div>
                      <p className="MessageError" >{errors.email}</p>
                    </div>
                  </div>
                </div>
                <div className="div24">
                  <div className="div25">
                    <h1 className="div26">Tarifa</h1>
                  </div>
                  <div className="div27">
                    <div className="div28">
                      <div className="div29">
                        <input type="text" name="price" className="div30" placeholder="Ej. 123456" value={doctor.price} onChange={handleChange}></input>
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
                        <select name="sure" className="div30" value={selectSure} onChange={handleSure}>
                          <option value="">Seleccionar</option>
                          {seguro?.map((sure, index) => (
                            <option key={index} value={sure}>
                              {sure}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p>
                        {seguros.map((seg, index) => (
                          <button key={index} type="button" className="butonDeletSure" value={seg} onClick={(event) => { setSeguros(seguros.filter((e) => e !== event.target.value)); setDoctor({ ...doctor, sure: doctor.sure.length ? doctor.sure.filter((e) => e !== event.target.value) : "" }) }}>{seg}</button>
                        ))}
                      </p>
                      {seguros.length === 0 && <p className="MessageError" name="Seguro">{errors.sure}</p>}
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