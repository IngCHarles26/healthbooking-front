
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getWeekOfMonth } from 'date-fns';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';

import { healthApi } from "../../../Api/HealthBookingApi";

const Statistics = () => {

  const [data, setData] = useState([]);
  const [totalAmountPerSpecialty, setTotalAmountPerSpecialty] = useState([]);
  const [montoPorSemana, setMontoPorSemana] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await healthApi.get('/master/appointment');
        const filterData = response.data.filter(cita => cita.status === 'pendiente');
        setData(filterData);

        // Código para totalAmountPerSpecialty

        const chartData = {};
        filterData.forEach(cita => {
          const specialty = cita.Doctor.Specialty.name;
          const amount = cita.finalAmount;

          if (chartData[specialty]) {
            chartData[specialty] += amount;
          } else {
            chartData[specialty] = amount;
          }
        });

        const obj = Object.entries(chartData).map(([name, value]) => ({ name, value }));
        setTotalAmountPerSpecialty(obj);

        // Ingresos por semana
        const montosPorSemana = {};
        filterData.forEach(cita => {
          const fechaPago = cita.paymentDay;
          const date = new Date(fechaPago);

          const weekNumber = getWeekOfMonth(date);

          if (!montosPorSemana[`semana${weekNumber}`]) {
            montosPorSemana[`semana${weekNumber}`] = 0;
          }

          montosPorSemana[`semana${weekNumber}`] += cita.finalAmount || 0;
        });

        const montoPorSemanaArray = Object.keys(montosPorSemana).map(semana => ({
          semana,
          monto: montosPorSemana[semana],
        }));
        montoPorSemanaArray.sort((a, b) => parseInt(a.semana.slice(6)) - parseInt(b.semana.slice(6)));
        setMontoPorSemana(montoPorSemanaArray);
      } catch (error) {
        console.error({ message: 'Error al cargar los datos', error });
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const max = Math.ceil(data.length / perPage);

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
      {data.length > 0 ? (
        <>
          <h1>Ingresos por especialidad</h1>
          <ResponsiveContainer width="100%" aspect={2}>

            <BarChart
              data={totalAmountPerSpecialty}
              width={500}
              height={300}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="name" fill='#6b48ff' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill='#1ee3cf' />
            </BarChart>



            <h1>Ingresos por semana</h1>
            <BarChart
              data={montoPorSemana}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="semana" fill='#6b48ff' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill='#1ee3cf' />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (<p>Cargando datos...</p>)
      }

    </main>
  );
};

export default Statistics;