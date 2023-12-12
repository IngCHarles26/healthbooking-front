import "./ClinicalHistory.css";
import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import { useDispatch } from "react-redux";
import { changePage } from "../../../../../redux/slices/pageNav";

const ClinicalHistory = () => {

  const dispatch = useDispatch();

  const [patients, setPatients] = useState([])
  const [selectName, setSelectName] = useState('')
  const [errors, setErrors] = useState({});
  const [medicalHistory, setMedicalHistory] = useState({
    idPatient: '',
    clinicalHistory: ''
  })
  console.log(medicalHistory);
  useEffect(() => {
    healthApi.get(`/doctor/appointment/${45289}`)
      .then(({ data }) => {
        setPatients(data);
      })
  }, [])

  let names = patients.map((it) => ({ id: it.patientId, name: it.Patient.name }))

  let patientsDoctor = names.filter((elemento, indice, self) =>
    indice === self.findIndex((e) => e.name === elemento.name)
  );

  let alphabetically = patientsDoctor.sort((a, b) => a.name.localeCompare(b.name))

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === "idPatient") setSelectName(value)
    setMedicalHistory({ ...medicalHistory, [name]: value })
    setErrors(validatios({ ...medicalHistory, [name]: value }))
  }

  const seteo = () => {
    setErrors('')
    setSelectName('')
    setMedicalHistory({
      idPatient: '',
      clinicalHistory: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (medicalHistory.idPatient === '' && medicalHistory.clinicalHistory === '') {
        alert("Por Favor llena los campos")
      } else if (medicalHistory.idPatient === '') {
        alert("Falta el paciente, por favor seleccione un nombre")
      } else if (medicalHistory.clinicalHistory === '') {
        alert("Falta el historial clinico, por favor ingrese el valor correspondiente")
      } else if (errors.clinicalHistory === "El Link no cumple con el formato requerido.") {
        alert("Datos erroneos en historial clinico, por favor revise el campo")
      } else {
        const { data } = await healthApi.patch("/doctor/clinicalHistory", medicalHistory);
        setSelectName('')
        setMedicalHistory({
          idPatient: '',
          clinicalHistory: ''
        })

        alert('Registro Exitoso!')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formHC">
      <div className="containerHC">
        <div className="headerHC">
          <p className="titleHC">Historial Clinico del Paciente</p>
        </div>
        <div className="contentHC">
          <div className="sectionHC">
            <p className="labelHC">Paciente</p>
            <select name="idPatient" className="selectorHC" value={selectName} onChange={handleChange}>
              <option value="">Seleccionar</option>
              {alphabetically?.map((pat, index) => (
                <option key={index} value={pat.id}>{pat.name}</option>
              ))}
            </select>
            {errors.idPatient ? <p className="MessageError">{errors.idPatient}</p> : <h5>...</h5>}

          </div>
          <div className="sectionHC">
            <p className="labelHC">Historia Clinica</p>
            <input
              type="text"
              name="clinicalHistory"
              className="inputHC"
              placeholder="https://docs.google.com..."
              value={medicalHistory.clinicalHistory} onChange={handleChange} />
            {errors.clinicalHistory ? <p className="MessageError">{errors.clinicalHistory}</p> : <h5>...</h5>}
          </div>
        </div>
        <div className="footerHC">
          <button type="button" className="botonesHC" onClick={() => seteo() || dispatch(changePage(0))}>
            Cancelar
          </button>
          <button type="submit" className="botonesHC">
            Enviar
          </button>
        </div>
      </div>

    </form>
  );
}

export default ClinicalHistory





const validatios = ({ idPatient, clinicalHistory }) => {

  let error = {};
  let googleSheetsRegex = /^https:\/\/docs\.google\.com\/spreadsheets\/.+$/;


  if (!idPatient) error.idPatient = "Debe seleccionar un paciente"
  else error.idPatient = ""

  if (!clinicalHistory) error.clinicalHistory = "Este campo no puede estar vacio"
  else if (!googleSheetsRegex.test(clinicalHistory)) error.clinicalHistory = "El Link no cumple con el formato requerido."
  else error.clinicalHistory = ""


  return error
}