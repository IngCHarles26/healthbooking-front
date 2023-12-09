/*
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import leftArrow from "../../../../assets/brands/left-arrow.svg";
import rightArrow from '../../../../assets/brands/right-arrow.svg'



const HistorialPagos = () => {
 const [data,setData] = useState([]);
 const [totalAmountPerSpecialty, setTotalAmountPerSpecialty] = useState([]);

    useEffect(()=>{
        try {
            const fetchAppointments  = async() => {
                const response = await axios.get('http://localhost:3001/master/appointment');

                //const url = 'https://healtbooking-backend.onrender.com/master/appointment'
                const filterData = response.data.filter(cita => cita.status === "pending")
                setData(filterData);
                console.log(response.data)

                const chartData = {};
                data.forEach(cita => {
                    const specialty = cita.Doctor.Specialty.name;
                    const amount = cita.finalAmount;
                    //  console.log(cita.specialty)
                    if(chartData[specialty]){
                        chartData[specialty] += amount;
                    }else{
                        
                        chartData[specialty] = amount;
                    }
                });
                const obj = Object.entries(chartData).map(([name, value]) => ({ name, value }));
                
                //console.log(obj)
                await setTotalAmountPerSpecialty(obj)
                console.log(JSON.stringify(totalAmountPerSpecialty))

         }
         fetchAppointments();
        } catch (error) {
            console.error({message:'Error al cargar las citas',error})
        };
           
    },[totalAmountPerSpecialty])

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const max = Math.ceil(data.length / perPage)

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    setCurrentPage(currentPage - 1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  

  return (
    <main>
      <header>Dashboard &#62; Home</header>

      <article className="summary">
        <header>Historial de pagos</header>

        <article className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Transacciones</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>

              {data?.slice(
                (currentPage - 1) * perPage,
                (currentPage - 1) * perPage + perPage
              ).map((cita) => (
                <tr key={cita.id}>
                  <td>Pago turno médico</td>
                  <td>{cita.finalAmount}</td>
                  <td>{cita.status}</td>
                  <td>{formatDate(cita.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

      </article>

      <footer className="navigation">
        <button disabled={currentPage === 1} onClick={previous}>
          <img src={leftArrow} alt="leftArrow" />
        </button>
        <button className="pageButton">
          {currentPage}
        </button>
        <button disabled={currentPage === max} onClick={next}>
          <img src={rightArrow} alt="rightArrow" />
        </button>

      </footer>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart 
            data={totalAmountPerSpecialty} 
            width={500} 
            height={300} 
            margin={{
                top:5,
                right:30,
                left:20,
                bottom:5
            }}>
            <CartesianGrid strokeDasharray="4 1 2"/>
            <XAxis dataKey="name" fill='#6b48ff'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="value" fill='#1ee3cf'/>

        </BarChart>
      </ResponsiveContainer>

    </main>
    
  );


};
export default HistorialPagos;
*/

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useEffect } from 'react';
import { useState } from 'react';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

import axios from 'axios';

const HistorialPagos = () => {

    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{

           try {
            
            const response = await axios.get('http://localhost:3001/master/appointment');
            
            setData(response.data);
           

           } catch (error) {
            console.error('Error al obtener los datos',error);
           }
          
            
        }
        fetchData(); 
    },[])
  
    const sumasPorSemana = {};

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    };

    data.forEach(cita => {
      const fechaPago = formatDate(cita.createdAt)
      console.log(cita.createdAt)
    })
    
      return (
        <LineChart width={600} height={300} data={sumasPorSemana}>
          <XAxis dataKey="semana" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="monto" stroke="#8884d8" />
        </LineChart>
      );
};

export default HistorialPagos;

