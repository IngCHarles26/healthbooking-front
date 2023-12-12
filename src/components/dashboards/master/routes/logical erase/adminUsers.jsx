import { useEffect, useState } from "react";
import { healthApi } from "../../../../../Api/HealthBookingApi";
import "./style.scss";

//_____________SVGs
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from "../../../../assets/brands/right-arrow.svg";

function AdminUsers(props) {

    const [dataUsers, setDataUsers] = useState([])
    const [filterUsers, setfilterUsers] = useState([]);
    const [aux, setAux] = useState(false)
    const [aux2, setAux2] = useState(false)
    const [filterRol, setfilterRol] = useState()

    // paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const max = Math.ceil(dataUsers.length / perPage);

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    const previous = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        healthApi.get('/master')
            .then(({ data }) => {
                setDataUsers(data);
                setfilterUsers(data)
            })
    }, [])

    useEffect(() => {
        healthApi.get('/master')
            .then(({ data }) => {
                setDataUsers(data);
            })
    }, [aux, aux2])

    // let dataPatients = dataUsers.filter((item) => item.id.toString().length > 5).sort((a, b) => a.name.localeCompare(b.name))
    let dataPatients = dataUsers.sort((a, b) => a.name.localeCompare(b.name))

    const disable = (id) => {

        if (aux) setAux(false)

        let patient = dataPatients.find((item) => item.id === id)

        if (patient.state === "activo") {
            healthApi.patch(`/master/toggle/${id}`)
                .then(({ data }) => {
                    alert(data.mensaje);
                    setAux(true)
                })
        }
    }

    const enable = (id) => {
        if (aux2) setAux2(false)

        let patient = dataPatients.find((item) => item.id === id)

        if (patient.state === "inactivo") {
            healthApi.patch(`/master/toggle/${id}`)
                .then(({ data }) => {
                    alert(data.mensaje);
                    setAux2(true)
                })
        }
    }

    return (
        // <div className="ContenedorM">
        //     <ol>
        //         {dataPatients?.map((item) => (
        //             <li>{item.name}:
        //                 ...|<button onClick={() => enable(item.id)} className={item.state === 'active' ? "ButonActive" : "ButonNotActive"}>✔</button>|...|
        //                 <button onClick={() => disable(item.id)} className={item.state === 'inactive' ? "ButonDisabled" : "ButonNotDisabled"}>❌</button>|</li>
        //         ))}
        //     </ol>
        // </div>
        <main className="homemaster-main">
            <header>Dashboard &#62; Adminiastracion de usuarios</header>

            <article className="homemaster-summary">
                <header className="homeMaster-header">Administrar usuarios</header>
                <div >
                    <label>Filtrar por rol: </label>
                    <select value={filterRol} name="name" >
                        <option value="all">Sin filtrar</option>
                        <option value="Paciente" >Paciente</option>
                        <option value="Medico" >Medico</option>
                    </select>
                </div>

                <article className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuarios</th>
                                <th>ID</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Cambiar</th>
                            </tr>
                        </thead>
                        {/* {console.log(dataPatients)} */}
                        <tbody>
                            {dataUsers?.slice(
                                (currentPage - 1) * perPage,
                                (currentPage - 1) * perPage + perPage
                            )
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.id}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.state}</td>
                                        <td>
                                            {user.state === "activo" ? (
                                                <button
                                                    // className="botonHC"
                                                    onClick={() =>
                                                        disable(user.id)
                                                    }>
                                                    Desactivar
                                                </button>
                                            ) : (
                                                <button
                                                    // className="botonHC"
                                                    onClick={() =>
                                                        enable(user.id)
                                                    }>
                                                    Activar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </article>
            </article>

            <footer className="homemaster-footer">
                <button disabled={currentPage === 1} onClick={previous}>
                    <img src={leftArrow} alt="leftArrow" />
                </button>
                <button className="pageButton">{currentPage}</button>
                <button disabled={currentPage === max} onClick={next}>
                    <img src={rightArrow} alt="rightArrow" />
                </button>
            </footer>
        </main >
    );
}

export default AdminUsers;