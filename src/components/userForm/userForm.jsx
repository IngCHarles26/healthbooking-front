import React, { useState } from 'react';
import validator from 'validator';
import "./PostDoctor.css"

const UserForm = () => {
    const [formData, setFormData] = useState({
        dni: '',
        nombreCompleto: '',
        altura: '',
        peso: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({});
    const indicativos = ["+1", "+54", "+57", "+51", "+52"];


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {

            console.log('Formulario válido, enviar datos:', formData);
        } else {
            console.log('Formulario no válido');
        }
    };

    const validateForm = () => {
        const { dni, nombreCompleto, altura, peso, telefono } = formData;
        const newErrors = {};

        if (!validator.isNumeric(dni) || !validator.isLength(dni, { min: 8, max: 8 })) {
            newErrors.dni = 'El DNI debe ser un número de 8 dígitos';
        }

        if (!validator.isLength(nombreCompleto, { max: 30 })) {
            newErrors.nombreCompleto = 'El nombre completo debe tener como máximo 30 caracteres';
        }

        if (!validator.isNumeric(altura) || !validator.isLength(altura, { max: 4 })) {
            newErrors.altura = 'La altura debe ser un número de máximo 4 dígitos';
        }

        if (!validator.isNumeric(peso) || !validator.isLength(peso, { max: 4 })) {
            newErrors.peso = 'El peso debe ser un número de máximo 4 dígitos';
        }

        if (!validator.isNumeric(telefono) || !validator.isLength(telefono, { max: 9 })) {
            newErrors.telefono = 'El teléfono debe ser un número de máximo 9 dígitos';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="formulario">
                <div className="div1">
                    <div className="div6">
                        <div className="div7"></div>
                        <div className="div8"></div>
                        <div className="div9"></div>
                        <div className="div10"></div>
                    </div>
                    <div>
                        <label>DNI:</label>
                        <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
                        {errors.dni && <p className="error">{errors.dni}</p>}
                    </div>

                    <div>
                        <label>Nombre Completo:</label>
                        <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} />
                        {errors.nombreCompleto && <p className="error">{errors.nombreCompleto}</p>}
                    </div>

                    <div>
                        <label>Altura:</label>
                        <input type="text" name="altura" value={formData.altura} onChange={handleChange} />
                        {errors.altura && <p className="error">{errors.altura}</p>}
                    </div>

                    <div>
                        <label>Peso:</label>
                        <input type="text" name="peso" value={formData.peso} onChange={handleChange} />
                        {errors.peso && <p className="error">{errors.peso}</p>}
                    </div>

                    <div>
                        <label>Teléfono:</label>
                        <select className="div46" >
                            {indicativos.map((ind, index) => (
                                <option key={index}>{ind}</option>
                            ))}
                        </select>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                        {errors.telefono && <p className="error">{errors.telefono}</p>}
                    </div>

                    <button type="submit">Enviar</button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;





