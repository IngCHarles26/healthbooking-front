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
    const [filterRol, setfilterRol] = useState("all")
    const [filterStatus, setfilterStatus] = useState("all")
    const [searchTerm, setSearchTerm] = useState('');

    // paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const max = Math.ceil(filterUsers.length / perPage);

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    const previous = () => {
        setCurrentPage(currentPage - 1);
    };

    const fetchData = () => {
        healthApi.get('/master')
            .then(({ data }) => {
                setDataUsers(data);
                setfilterUsers(data.filter(user =>
                    (filterRol === "all" || user.rol === filterRol) &&
                    (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase())) && (filterStatus === "all" || user.state === filterStatus)))
                setCurrentPage(1)
                console.log(data)
            });
    };

    useEffect(() => {
        fetchData();
    }, [filterRol, aux, aux2, searchTerm, filterStatus]);

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
        <section className="homemaster-main">
            <header>Dashboard &#62; Adminiastracion de usuarios</header>

            <article className="homemaster-summary">
                <header className="homeMaster-header">Administrar usuarios</header>
                <div className="masterFilters">
                    <div className="typeFilters">
                        <label>Filtrar por rol: </label>
                        <select value={filterRol} name="name" onChange={(e) => setfilterRol(e.target.value)} >
                            <option value="all">Sin filtrar</option>
                            <option value="patient" >Paciente</option>
                            <option value="doctor" >Doctor</option>
                        </select>
                    </div>
                    <div className="typeFilters">
                        <label>Filtrar por estado: </label>
                        <select value={filterStatus} name="name" onChange={(e) => setfilterStatus(e.target.value)} >
                            <option value="all">Sin filtrar</option>
                            <option value="activo" >Activo</option>
                            <option value="inactivo" >Inactivo</option>
                        </select>
                    </div>
                    <div className="typeFilters">
                        <label>Búsqueda: </label>
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button onClick={(e) => setSearchTerm("")}>
                            x
                        </button>
                    </div>
                </div>
                <table className="table-wrapper">
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
                        {filterUsers?.slice(
                            (currentPage - 1) * perPage,
                            (currentPage - 1) * perPage + perPage
                        )
                            .map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.id}</td>
                                    <td>{user.rol === 'patient' ? 'Paciente' : user.rol}</td>
                                    <td>{user.state}</td>
                                    <td>
                                        {user.state === "activo" ? (
                                            <button
                                                className="isActive"
                                                onClick={() =>
                                                    disable(user.id)
                                                }>
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button
                                                className="isDesactive"
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

            <footer className="homemaster-footer">
                <button disabled={currentPage === 1} onClick={previous}>
                    <img src={leftArrow} alt="leftArrow" />
                </button>
                <p className="pageButton">{currentPage}</p>
                <button disabled={currentPage === max} onClick={next}>
                    <img src={rightArrow} alt="rightArrow" />
                </button>
            </footer>
        </section >
    );
}

export default AdminUsers;