import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useEffect } from 'react';
import { useState } from 'react';
import { startOfMonth, addWeeks, isWithinInterval } from 'date-fns';
import axios from 'axios';

const Statistics = () => {

    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{

           try {
            
            const response = await axios.get('http://localhost:3001/master/appointment');
            console.log(response);
            setData(response.data);
            console.log(data)

           } catch (error) {
            console.error('Error al obtener lod datos',error);
           }
           fetchData();
        }
    },[])
    console.log(data);
    
    const sumasPorSemana = {};

    // Iterar sobre cada cita y sumar los precios por semana
data.forEach(cita => {
  // Obtener la fecha de creación de la cita
  const fechaCreacion = new Date(cita.createdAt);

  // Obtener la semana correspondiente a la fecha de creación
  const startOfWeekDate = new Date(fechaCreacion);
  startOfWeekDate.setDate(fechaCreacion.getDate() - fechaCreacion.getDay());
  const endOfWeekDate = new Date(startOfWeekDate);
  endOfWeekDate.setDate(startOfWeekDate.getDate() + 6);

  // Verificar si la fecha de creación está dentro de la semana
  if (fechaCreacion >= startOfWeekDate && fechaCreacion <= endOfWeekDate) {
    // Obtener la cadena de la semana en formato 'yyyy-MM-dd'
    const weekString = startOfWeekDate.toISOString().split('T')[0];

    // Sumar el precio para la semana
    sumasPorSemana[weekString] = (sumasPorSemana[weekString] || 0) + cita.precio;
  }
});

// Mostrar el resultado
console.log('Suma de precios por semana:', sumasPorSemana);


      return (
        <LineChart width={600} height={300} data={datosProcesados}>
          <XAxis dataKey="semana" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="monto" stroke="#8884d8" />
        </LineChart>
      );
};

export default Statistics;