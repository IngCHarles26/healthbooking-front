import "./userForm.scss"
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { useAuth0 } from '@auth0/auth0-react'
//import axios from "axios"
import { healthApi } from '../../Api/HealthBookingApi';
import Loading from "../Loading/Loading"
import logo from "../assets/full-logo-black.svg";
import Swal from "sweetalert2";
import "animate.css";
import { useDispatch } from 'react-redux';
import { adduser } from '../../redux/slices/user/user';


const UserForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  if (isAuthenticated) {
    // console.log("localstorage");
    localStorage.setItem("bool", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", user.email);
  }

  const getSure = async () => {
    const { data } = await healthApi.get('/doctor/sure')
    setSures(data)
  }
  const getUser = async () => {
    if (user) {

      const { data } = await healthApi.get('/logging', { params: { email: user.email } })
      // console.log(data);
      if (data.user) {
        dispatch(adduser(data.user))
        localStorage.setItem("id", data.user.id);
        if (data.user.state === "inactivo") {
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
            icon: "error",
            title: "Su cuenta ha sido desactivada"
          });
          return navigate("/")
        }

      }
      if (data.exist) {
        navigate(`/${data.user.rol}`)
      }
    }
  }


  useEffect(() => {
    getUser()
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getSure()
    return () => clearTimeout(timeoutId);
  }, [user])

  const [errors, setErrors] = useState({});
  const indicativos = ["+1", "+54", "+57", "+51", "+52"];


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors(validateForm({ ...formData, [e.target.name]: e.target.value, }))
  };

  const handleSure = (event) => {
    const values = event.target.value;
    setFormData({
      ...formData,
      obrasocial: values
    })
    //setErrors(validateForm({[e.target.name]: e.target.value,}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const createuser = { id: formData.dni, name: formData.nombreCompleto, phone: formData.telefono, email: user.email, sure: formData.obrasocial, weight: formData.peso, height: formData.altura }

    if (validateForm()) {
      const newUser = await healthApi.post('/patient/register', createuser)

      if (newUser.data === true) {
        setIsLoading(false)
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
          icon: "error",
          title: "Usuario ya registrado"
        });
      } else {
        dispatch(adduser(createuser))
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
          title: "Registro completado"
        });
        navigate('/patient');
      }
    } else {
      // clearTimeout(timeoutId);
      setIsLoading(false)
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
        icon: "error",
        title: "No se ha podido registrar"
      });
    }
  };

  const validateForm = () => {
    const { dni, nombreCompleto, altura, peso, telefono } = formData;
    const newErrors = {};
    let rxNoLet = /^\d+$/;
    let rxNoSimNum = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/

    if (dni) {
      if (!rxNoLet.test(dni)) {
        newErrors.dni = 'El DNI debe contener solo numeros'
      } else if (!validator.isNumeric(dni) || !validator.isLength(dni, { min: 8, max: 8 })) {
        newErrors.dni = 'El DNI debe ser un número de 8 dígitos';
      }
    } else newErrors.dni = 'El DNI es obligatorio';

    if (nombreCompleto) {
      if (!rxNoSimNum.test(nombreCompleto)) {
        newErrors.nombreCompleto = 'El nombre no debe contener numeros ni simbolos'
      } else if (!validator.isLength(nombreCompleto, { max: 30 })) {
        newErrors.nombreCompleto = 'El nombre completo debe tener como máximo 30 caracteres';
      }
    } else newErrors.nombreCompleto = 'El nombre completo es obligatorio';

    if (altura) {
      if (!rxNoLet.test(altura)) {
        newErrors.altura = 'La altura debe contener solo numeros'
      } else if (!validator.isNumeric(altura) || !validator.isLength(altura, { max: 4 })) {
        newErrors.altura = 'La altura debe ser un número de máximo 4 dígitos';
      }
    } else newErrors.altura = 'La altura es obligatoria';

    if (peso) {
      if (!rxNoLet.test(peso)) {
        newErrors.peso = 'El peso debe contener solo numeros'
      } else if (!validator.isNumeric(peso) || !validator.isLength(peso, { max: 4 })) {
        newErrors.peso = 'El peso debe ser un número de máximo 4 dígitos';
      }
    } else newErrors.peso = 'El peso es obligatorio';

    if (telefono) {
      if (!rxNoLet.test(telefono)) {
        newErrors.telefono = 'El telefono debe contener solo numeros'
      }
      else if (!validator.isNumeric(telefono) || !validator.isLength(telefono, { max: 10 })) {
        newErrors.telefono = 'El teléfono debe ser un número de máximo 10 dígitos';
      }
    } else newErrors.telefono = 'El teléfono es obligatorio';

    //setErrors(newErrors);
    if (!dni && !nombreCompleto && !altura && !peso && !telefono) {
      return Object.keys(newErrors).length === 0;
    } else return newErrors
  };


  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (

    isAuthenticated && (
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" />
          <div className="form-wrapper">
            <div className="sectionUserForm">
              <label className="label">
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
                {errors.dni && <p className="message-error">{errors.dni}</p>}
              </div>
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
                {errors.nombreCompleto && (
                  <p className="message-error">{errors.nombreCompleto}</p>
                )}
              </div>
            </div>

            <div className="sectionUserForm">
              <label className="label">
                <p className="label-text">Estatura</p>{" "}
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
                {errors.altura && (
                  <p className="message-error">{errors.altura}</p>
                )}
              </div>
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
                {errors.peso && <p className="message-error">{errors.peso}</p>}
              </div>
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
                {errors.telefono && (
                  <p className="message-error">{errors.telefono}</p>
                )}
              </div>
            </div>

            <div className="sectionUserForm">
              <label className="label">
                <p className="label-text">Obra social</p>
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
    )

  )

};

export default UserForm;





