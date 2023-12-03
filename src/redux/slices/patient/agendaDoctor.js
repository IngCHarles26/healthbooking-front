import { createSlice } from "@reduxjs/toolkit";

export const weeksPlan = 2;
const initialState = getPlan([]);

const agendaDoctor = createSlice({
  name:'agendaDoctor',
  initialState,
  reducers:{
    addDataAgenda: (state,action)=> action.payload,
  }
})

export const {addDataAgenda} = agendaDoctor.actions;
export default agendaDoctor.reducer;


export function getPlan(annal, duration = 60, start = 8, end = 17, weeks = weeksPlan) {
  // const days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  const turnsPerDay = ((end - start) * 60) / duration;
  const today = new Date();
  const milsInSecond = 60 * 1000;
  const milsInHour = 60 * milsInSecond;
  const milsInDay = 24 * milsInHour;
  const startDay = new Date(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`).getTime();
  const startCalendar = startDay + start * milsInHour;

  let titles = [];
  let values = [];
  let hoursCol = [];
  annal = annal.map((el) => new Date(`${el.date} ${el.time}`).getTime());

  //Definicion de los valores horarios de la 1ra columna ej: 10:00 o 15:00
  let time = 0;
  for (let col = 0; col < turnsPerDay; col++) {
    let _mins = time % 60;
    let _hour = start + (time - _mins) / 60;
    let clock = `${_hour < 10 ? '0' + _hour : _hour}:${_mins < 10 ? '0' + _mins : _mins}`;
    hoursCol = [...hoursCol, clock];
    time += duration;
  }

  //Definicion de los valores de la 1ra fila ej: Lun 01/01
  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(startCalendar + milsInDay * i);
    let day = date.getDate();
    let ans = `${days[date.getDay()]} ${day < 10 ? '0' + day : day}/${date.getMonth() + 1}`;
    titles = [...titles, ans];
  }

  //Rellenado de los lugares disponibles y ocupados
  for (let hour = 0; hour < turnsPerDay; hour++) {
    let row = [];
    for (let day = 0; day < weeks * 7; day++) {
      if (!Boolean(day % 7)) row = [...row, hoursCol[hour]];
      const actual = startCalendar + hour * milsInHour + day * milsInDay;
      const actualDay = new Date(actual).getDay();
      const condition = Boolean(actualDay % 6) && actual > today && !annal.includes(actual);
      row = [...row, condition ? actual : 0];
    }
    values = [...values, row];
  }

  titles = [...titles].reduce((ac, el, ix) => (!Boolean(ix % 7) ? [...ac, 'HORA', el] : [...ac, el]), []);

  return [titles, values];
}