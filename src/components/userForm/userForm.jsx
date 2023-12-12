import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import "./PostDoctor.scss"
import { useAuth0 } from '@auth0/auth0-react'
//import axios from "axios"
import { healthApi } from '../../Api/HealthBookingApi';
import Loading from "../Loading/Loading"
import logo from "../assets/full-logo-black.svg";
import Swal from "sweetalert2";
import "animate.css";

const UserForm = () => {

  const navigate = useNavigate();
  const [sures, setSures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [userExist, setUserExist] = useState(false)
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    dni: '',
    nombreCompleto: '',
    altura: '',
    peso: '',
    telefono: '',
    obrasocial: '',
  });
  const boolstorage = localStorage.getItem('bool');
  const bool = JSON.parse(boolstorage);
  const userstorage = localStorage.getItem('user');
  const users = JSON.parse(userstorage);
  const getSure = async () => {
    const { data } = await healthApi.get('/doctor/sure')
    setSures(data)
  }
  const getUser = async () => {
    const { data } = await healthApi.get('/logging', { params: { email: users } })
    // console.log(data.exist);

    // console.log(user);
    const { user } = data
    if (data.exist) {
      navigate(`/${user.rol}`)
    }
  }


  useEffect(() => {
    getUser()
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getSure()
    return () => clearTimeout(timeoutId);
  }, [])

  const [errors, setErrors] = useState({});
  const indicativos = ["+1", "+54", "+57", "+51", "+52"];


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSure = (event) => {
    const values = event.target.value;
    setFormData({
      ...formData,
      obrasocial: values
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const createuser = { id: formData.dni, name: formData.nombreCompleto, phone: formData.telefono, email: user.email, sure: formData.obrasocial }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
    if (validateForm()) {
      const newUser = await healthApi.post('/patient/register', createuser)
      navigate('/patient');
    } else {
      console.log('Formulario no válido');
    }
  };

  const validateForm = () => {
    const { dni, nombreCompleto, altura, peso, telefono } = formData;
    const newErrors = {};

    if (!dni) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (!validator.isNumeric(dni) || !validator.isLength(dni, { min: 8, max: 8 })) {
      newErrors.dni = 'El DNI debe ser un número de 8 dígitos';
    }

    if (!nombreCompleto) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    } else if (!validator.isLength(nombreCompleto, { max: 30 })) {
      newErrors.nombreCompleto = 'El nombre completo debe tener como máximo 30 caracteres';
    }

    if (!altura) {
      newErrors.altura = 'La altura es obligatoria';
    } else if (!validator.isNumeric(altura) || !validator.isLength(altura, { max: 4 })) {
      newErrors.altura = 'La altura debe ser un número de máximo 4 dígitos';
    }

    if (!peso) {
      newErrors.peso = 'El peso es obligatorio';
    } else if (!validator.isNumeric(peso) || !validator.isLength(peso, { max: 4 })) {
      newErrors.peso = 'El peso debe ser un número de máximo 4 dígitos';
    }

    if (!telefono) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!validator.isNumeric(telefono) || !validator.isLength(telefono, { max: 10 })) {
      newErrors.telefono = 'El teléfono debe ser un número de máximo 10 dígitos';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return isAuthenticated ? (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <div className="form-wrapper">
          <div className="sectionUserForm">
            <label for="dni" className="label">
              <p className="label-text">DNI</p>{" "}
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <input
                  type="text"
                  name="dni"
                  className="input-field"
                  value={formData.dni}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.dni && <p className="message-error">{errors.dni}</p>}
          </div>

          <div className="sectionUserForm">
            <label className="label">
              <p className="label-text">Nombre Completo</p>
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <input
                  type="text"
                  name="nombreCompleto"
                  className="input-field"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.nombreCompleto && (
              <p className="message-error">{errors.nombreCompleto}</p>
            )}
          </div>

          <div className="sectionUserForm">
            <label className="label">
              <p className="label-text">Altura</p>{" "}
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <input
                  type="text"
                  name="altura"
                  className="input-field"
                  value={formData.altura}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.altura && (
              <p className="message-error">{errors.altura}</p>
            )}
          </div>

          <div className="sectionUserForm">
            <label className="label">
              <p className="label-text">Peso</p>{" "}
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <input
                  type="text"
                  name="peso"
                  className="input-field"
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.peso && <p className="message-error">{errors.peso}</p>}
          </div>

          <div className="sectionUserForm">
            <label className="label">
              <p className="label-text">Teléfono</p>{" "}
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <div className="userForm-select">
                  <select onChange={handleSure}>
                    {indicativos.map((ind, index) => (
                      <option key={index}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="userForm-input">
                  <input
                    type="text"
                    name="telefono"
                    className="input-field"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {errors.telefono && (
              <p className="message-error">{errors.telefono}</p>
            )}
          </div>

          <div className="sectionUserForm">
            <label className="label">
              <p className="label-text">Obras sociales</p>
            </label>
            <div className="input-container">
              <div className="userForm-input">
                <select className="userForm-select" onChange={handleSure}>
                  <option>Obra social</option>
                  {sures.map((opcion) => (
                    <option key={opcion.id} value={opcion.name}>
                      {opcion.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="userform-submit-button">
            Enviar
          </button>
        </div>
      </form>
    </div>
  ) : (
    navigate("/")
  );

};

export default UserForm;





