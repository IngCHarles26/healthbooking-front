import "./editProfile.scss";
//_____________SVGs
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";
import logo from "../../../../assets/full-logo-black.svg";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { healthApi } from "../../../../../Api/HealthBookingApi";
import he from "date-fns/esm/locale/he/index.js";
import Swal from "sweetalert2";

function EditProfile() {
  //analizar si traer el id por parametro y realizar la busqueda en la base de datos o si existe un estado global que almacena esa informacion
  const { id } = useSelector((state) => state.user);
  const [patient, setPatient] = useState({}); //esto puede ser un estado global o cargalo a traves del useEffect
  const [edit, setEdit] = useState(false);
  const [editPatient, setEditPatient] = useState({});

  useEffect(() => {
    const searchPatient = healthApi.get(`/patient/${id}`).then(
      ({ data }) => {
        setPatient(data);
        setEditPatient(data);
      }
    );
  }, [id]);

  // console.log("Paciente ", patient);
  // console.log("A Editar", editPatient);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setEditPatient(patient);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditPatient({ ...editPatient, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await healthApi.put(`/patient/${id}`, editPatient);
      Swal.fire({
        title: "Datos actualizados",
        text: "",
        icon: "success"
      });

      setEdit(false);

    } catch (error) {
      throw alert(error.message);
    }
  };

  const sureString = () => {
    switch (Number(editPatient.sureId)) {
      case 1:
        return "OSDE";

      case 2:
        return "Swiss Medical";

      case 3:
        return "Medifé";

      case 4:
        return "Galeno";

      case 5:
        return "Sancor Salud";

      default:
        return "None";
    }
  };

  return (
    <section className="editprofileMain">
      <header>Dashboard &#62; Editar Perfil</header>

      <article className="editprofile-summary">
        {!edit ? <img src={logo} alt="Logo" className="logo-edit-profile" /> : null}

        <header>Editar perfil</header>
        {patient && (
          <div className="editProfile-info">
            <div className="divider">
              <label className="editProfilelabel" htmlFor="name">
                Nombre:{" "}
              </label>
              {edit ? (
                <input
                  className="inputedit inputedit-field"
                  type="text"
                  name="name"
                  value={editPatient.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{editPatient.name}</span>
              )}
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="id">
                DNI:{" "}
              </label>
              <span>{editPatient.id}</span>
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="email">
                EMAIL:{" "}
              </label>
              <span>{editPatient.email}</span>
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="phone">
                Telefono:{" "}
              </label>
              {edit ? (
                <input
                  className="inputedit inputedit-field"
                  type="text"
                  name="phone"
                  value={editPatient.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{editPatient.phone}</span>
              )}
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="sure">
                Obra social:{" "}
              </label>
              {edit ? (
                <select
                  className="selecteditProfile"
                  type="text"
                  name="sureId"
                  value={editPatient.sureId}
                  onChange={handleInputChange}
                >
                  <option default value>
                    Seleccione una opcion
                  </option>
                  <option value="1">OSDE</option>
                  <option value="2">Sweet Medical</option>
                  <option value="3">Medifé</option>
                  <option value="4">Galeno</option>
                  <option value="5">Sancor Salud</option>
                  <option value="">Ninguna</option>
                </select>
              ) : (
                <span>{sureString()}</span>
              )}
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="height">
                Altura:{" "}
              </label>
              {edit ? (
                <input
                  className="inputedit inputedit-field"
                  type="text"
                  name="height"
                  value={editPatient.height}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{editPatient.height}</span>
              )}
            </div>
            <div className="divider">
              <label className="editProfilelabel" htmlFor="weight">
                Peso:
              </label>
              {edit ? (
                <input
                  className="inputedit inputedit-field"
                  type="text"
                  name="weight"
                  value={editPatient.weight}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{editPatient.weight}</span>
              )}
            </div>
            <div className="divider">
              {edit ? (
                <div className="double-button-editprofile">
                  <button
                    className="editprofileBtn"
                    onClick={handleSaveChanges}
                  >
                    Guardar cambios
                  </button>
                  <button className="editprofileBtn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button className="editprofileBtn" onClick={handleEdit}>
                  Editar
                </button>
              )}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}

export default EditProfile;
