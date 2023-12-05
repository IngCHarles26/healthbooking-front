import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import "./PostDoctor.scss"
import { useAuth0 } from '@auth0/auth0-react'
//import axios from "axios"
import { healthApi } from '../../Api/HealthBookingApi';
import Loading from "../Loading/Loading"

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
        console.log(data.exist);
        if (data.exist) {
            navigate('/patient')
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

    return (
        isAuthenticated ? (<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ margin: '30px', width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '90%', height: '100%', padding: 40, background: 'white', borderRadius: 35, border: '1px #D7DEDD solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '600', wordWrap: 'break-word' }}>Ingresa tus datos</div>
                    <div style={{ height: 472, borderRadius: 16, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>

                        {/* Campo DNI */}
                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>DNI</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <input type="text" name="dni" style={{ outline: 'none', height: '100%', flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }} value={formData.dni} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {errors.dni && <p className="MessageError">{errors.dni}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Campo Nombre Completo */}
                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>Nombre Completo</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <input type="text" name="nombreCompleto" style={{ outline: 'none', height: '100%', flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }} value={formData.nombreCompleto} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {errors.nombreCompleto && <p className="MessageError">{errors.nombreCompleto}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Campo Altura */}
                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>Altura</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <input type="text" name="altura" style={{ outline: 'none', height: '100%', flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }} value={formData.altura} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {errors.altura && <p className="MessageError">{errors.altura}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Campo Peso */}
                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>Peso</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <input type="text" name="peso" style={{ outline: 'none', height: '100%', flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }} value={formData.peso} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {errors.peso && <p className="MessageError">{errors.peso}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Campo Teléfono */}
                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>Teléfono</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ width: 40, height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <select className="div46">
                                                {indicativos.map((ind, index) => (
                                                    <option key={index}>{ind}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ marginLeft: '12px', flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <input type="text" name="telefono" style={{ outline: 'none', height: '100%', flex: '1 1 0', color: 'black', fontSize: 20, fontFamily: 'Outfit', fontWeight: '500', wordWrap: 'break-word' }} value={formData.telefono} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {errors.telefono && <p className="MessageError">{errors.telefono}</p>}
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                            <div style={{ width: 105, height: 40, padding: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                                <div style={{ color: '#42A7C3', fontSize: 24, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }}>Obras sociales</div>
                            </div>
                            <div style={{ flex: '1 1 0', paddingLeft: 1, paddingRight: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                <div style={{ alignSelf: 'stretch', height: 72, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'inline-flex' }}>
                                        <div style={{ flex: '1 1 0', height: 40, padding: 8, background: 'linear-gradient(0deg, #EDF5F4 0%, #EDF5F4 100%), linear-gradient(0deg,  0%,  100%)', boxShadow: '0px -1px 0px #484747 inset', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex' }}>
                                            <select className="div46" onChange={handleSure}>
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
                            </div>
                        </div>

                        {/* Botón de Enviar */}
                        <button type="submit">Enviar</button>

                    </div>
                    <div style={{ alignSelf: 'stretch', height: 0, border: '1px #D7DEDD solid' }}></div>
                </div>
            </form>
        </div>) : navigate('/')
    );

};

export default UserForm;





