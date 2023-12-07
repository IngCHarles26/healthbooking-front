import { useLocation } from "react-router-dom";
import "./confirmdate.scss";
useLocation;

const Confirmdate = () => {
  const location = useLocation();
  const ConfirmdateData = location.state
    ? location.state.ConfirmdateData
    : null;

  const {
    idPaciente,
    nombrePaciente,
    nombreDoctor,
    idDoctor,
    especialidadDoctor,
    fechaCita,
    horaCita,
    descuento,
    montoAPagar,
  } = ConfirmdateData || {};

  return (
    <div class="container">
      <div class="header">
        <svg
          width="142.1"
          height="40.6"
          viewBox="0 0 203 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.98"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.32018 14.9145C12.4492 14.295 15.9422 15.4254 18.7986 18.3059C22.5835 14.7913 26.8885 14.0646 31.7139 16.1257C35.6772 19.4095 36.652 23.4467 34.6382 28.2378C30.7567 33.8728 26.0453 38.7176 20.5044 42.7723C19.5297 43.0954 18.5549 43.0954 17.5802 42.7723C11.9823 38.6605 7.18988 33.7347 3.2028 27.9955C1.17198 22.0403 2.87777 17.6799 8.32018 14.9145Z"
            fill="#42B8C3"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.2238 22.5002C24.2238 22.5002 24.6502 22.9283 24.9375 23.3593C25.5312 24.2499 26.7188 26.0311 26.7188 26.0311C26.7188 26.0311 30.5781 26.0311 32.9964 25.8916C32.9964 26.5374 32.9531 26.5728 32.9531 27.2186C30.5781 27.1028 28.5 27.2186 26.125 27.2186C25.8467 26.6348 25.3522 25.7186 24.9808 25.1721C25.0255 25.2276 24.9157 24.9789 24.7111 25.6494C24.1373 27.5305 23.5244 29.3988 22.7617 31.2209C22.112 30.252 21.4742 29.4067 20.8245 28.4377C19.8669 30.9357 19.2043 33.3963 18.8627 36.0658C18.29 36.1719 17.8027 36.0105 17.4006 35.5813C16.6686 32.3517 15.3794 29.2796 14.1919 26.3727C13.5981 28.0395 13.253 29.3277 12.7656 30.7811C10.955 30.7438 8.93897 30.7365 7.125 30.7365C7.125 30.0906 7.16582 29.9288 7.16582 29.283C8.90625 29.3397 10.2272 29.3024 11.875 29.283C12.2152 27.844 13.154 26.0621 13.6562 23.6561C13.9531 23.953 14.2486 24.0497 14.5469 24.5468C16.3281 27.5155 18.1316 32.6744 18.1316 32.6744C18.1316 32.6744 19.637 28.1409 19.8906 26.0741C20.8122 26.6565 22.518 28.7985 22.518 28.7985L24.2238 22.5002Z"
            fill="#E4F8F3"
          />
          <path
            d="M50.76 22H54.72V36H50.76V22ZM45.36 36H41.4V22H45.36V36ZM51.04 30.54H45.08V27.26H51.04V30.54ZM63.1133 36.18C61.8333 36.18 60.7133 35.94 59.7533 35.46C58.8066 34.9667 58.0666 34.3 57.5333 33.46C57.0133 32.6067 56.7533 31.64 56.7533 30.56C56.7533 29.48 57.0066 28.52 57.5133 27.68C58.0333 26.8267 58.7466 26.1667 59.6533 25.7C60.5599 25.22 61.5799 24.98 62.7133 24.98C63.7799 24.98 64.7533 25.2 65.6333 25.64C66.5133 26.0667 67.2133 26.7 67.7333 27.54C68.2533 28.38 68.5133 29.4 68.5133 30.6C68.5133 30.7333 68.5066 30.8867 68.4933 31.06C68.4799 31.2333 68.4666 31.3933 68.4533 31.54H59.8733V29.54H66.4333L64.9933 30.1C65.0066 29.6067 64.9133 29.18 64.7133 28.82C64.5266 28.46 64.2599 28.18 63.9133 27.98C63.5799 27.78 63.1866 27.68 62.7333 27.68C62.2799 27.68 61.8799 27.78 61.5333 27.98C61.1999 28.18 60.9399 28.4667 60.7533 28.84C60.5666 29.2 60.4733 29.6267 60.4733 30.12V30.7C60.4733 31.2333 60.5799 31.6933 60.7933 32.08C61.0199 32.4667 61.3399 32.7667 61.7533 32.98C62.1666 33.18 62.6599 33.28 63.2333 33.28C63.7666 33.28 64.2199 33.2067 64.5933 33.06C64.9799 32.9 65.3599 32.66 65.7333 32.34L67.7333 34.42C67.2133 34.9933 66.5733 35.4333 65.8133 35.74C65.0533 36.0333 64.1533 36.18 63.1133 36.18ZM76.6923 36V33.98L76.4323 33.48V29.76C76.4323 29.16 76.2457 28.7 75.8723 28.38C75.5123 28.0467 74.9323 27.88 74.1323 27.88C73.6123 27.88 73.0857 27.9667 72.5523 28.14C72.019 28.3 71.5657 28.5267 71.1923 28.82L69.9123 26.24C70.5257 25.84 71.259 25.5333 72.1123 25.32C72.979 25.0933 73.839 24.98 74.6923 24.98C76.4523 24.98 77.8123 25.3867 78.7723 26.2C79.7457 27 80.2323 28.26 80.2323 29.98V36H76.6923ZM73.4923 36.18C72.6257 36.18 71.8923 36.0333 71.2923 35.74C70.6923 35.4467 70.2323 35.0467 69.9123 34.54C69.6057 34.0333 69.4523 33.4667 69.4523 32.84C69.4523 32.1733 69.619 31.6 69.9523 31.12C70.299 30.6267 70.8257 30.2533 71.5323 30C72.239 29.7333 73.1523 29.6 74.2723 29.6H76.8323V31.58H74.7923C74.179 31.58 73.7457 31.68 73.4923 31.88C73.2523 32.08 73.1323 32.3467 73.1323 32.68C73.1323 33.0133 73.259 33.28 73.5123 33.48C73.7657 33.68 74.1123 33.78 74.5523 33.78C74.9657 33.78 75.339 33.68 75.6723 33.48C76.019 33.2667 76.2723 32.9467 76.4323 32.52L76.9523 33.92C76.7523 34.6667 76.359 35.2333 75.7723 35.62C75.199 35.9933 74.439 36.18 73.4923 36.18ZM82.7309 36V21.16H86.5309V36H82.7309ZM95.0342 36.18C93.6476 36.18 92.5676 35.84 91.7942 35.16C91.0209 34.4667 90.6342 33.4267 90.6342 32.04V22.74H94.4342V32C94.4342 32.3867 94.5409 32.6933 94.7542 32.92C94.9676 33.1333 95.2409 33.24 95.5742 33.24C96.0276 33.24 96.4142 33.1267 96.7342 32.9L97.6742 35.56C97.3542 35.7733 96.9609 35.9267 96.4942 36.02C96.0276 36.1267 95.5409 36.18 95.0342 36.18ZM89.0542 28.4V25.56H96.9142V28.4H89.0542ZM106.3 24.98C107.14 24.98 107.9 25.1533 108.58 25.5C109.26 25.8333 109.793 26.3533 110.18 27.06C110.58 27.7667 110.78 28.68 110.78 29.8V36H106.98V30.42C106.98 29.6467 106.82 29.0867 106.5 28.74C106.193 28.38 105.76 28.2 105.2 28.2C104.8 28.2 104.433 28.2933 104.1 28.48C103.766 28.6533 103.506 28.9267 103.32 29.3C103.133 29.6733 103.04 30.16 103.04 30.76V36H99.2395V21.16H103.04V28.24L102.16 27.34C102.573 26.5533 103.14 25.9667 103.86 25.58C104.58 25.18 105.393 24.98 106.3 24.98ZM113.445 36V22H120.605C122.445 22 123.819 22.34 124.725 23.02C125.632 23.6867 126.085 24.5667 126.085 25.66C126.085 26.38 125.892 27.0133 125.505 27.56C125.132 28.0933 124.599 28.52 123.905 28.84C123.225 29.1467 122.412 29.3 121.465 29.3L121.865 28.34C122.852 28.34 123.712 28.4933 124.445 28.8C125.179 29.0933 125.745 29.5267 126.145 30.1C126.559 30.66 126.765 31.3467 126.765 32.16C126.765 33.3733 126.272 34.32 125.285 35C124.312 35.6667 122.885 36 121.005 36H113.445ZM117.365 33.14H120.685C121.365 33.14 121.879 33.0267 122.225 32.8C122.585 32.56 122.765 32.2 122.765 31.72C122.765 31.24 122.585 30.8867 122.225 30.66C121.879 30.42 121.365 30.3 120.685 30.3H117.085V27.56H120.085C120.752 27.56 121.252 27.4467 121.585 27.22C121.919 26.9933 122.085 26.6533 122.085 26.2C122.085 25.7467 121.919 25.4133 121.585 25.2C121.252 24.9733 120.752 24.86 120.085 24.86H117.365V33.14ZM134.176 36.18C132.99 36.18 131.936 35.94 131.016 35.46C130.096 34.98 129.37 34.32 128.836 33.48C128.316 32.6267 128.056 31.6533 128.056 30.56C128.056 29.4667 128.316 28.5 128.836 27.66C129.37 26.82 130.096 26.1667 131.016 25.7C131.936 25.22 132.99 24.98 134.176 24.98C135.363 24.98 136.416 25.22 137.336 25.7C138.27 26.1667 138.996 26.82 139.516 27.66C140.036 28.5 140.296 29.4667 140.296 30.56C140.296 31.6533 140.036 32.6267 139.516 33.48C138.996 34.32 138.27 34.98 137.336 35.46C136.416 35.94 135.363 36.18 134.176 36.18ZM134.176 33.16C134.616 33.16 135.003 33.06 135.336 32.86C135.683 32.66 135.956 32.3667 136.156 31.98C136.356 31.58 136.456 31.1067 136.456 30.56C136.456 30.0133 136.356 29.5533 136.156 29.18C135.956 28.7933 135.683 28.5 135.336 28.3C135.003 28.1 134.616 28 134.176 28C133.75 28 133.363 28.1 133.016 28.3C132.683 28.5 132.41 28.7933 132.196 29.18C131.996 29.5533 131.896 30.0133 131.896 30.56C131.896 31.1067 131.996 31.58 132.196 31.98C132.41 32.3667 132.683 32.66 133.016 32.86C133.363 33.06 133.75 33.16 134.176 33.16ZM147.597 36.18C146.41 36.18 145.357 35.94 144.437 35.46C143.517 34.98 142.79 34.32 142.257 33.48C141.737 32.6267 141.477 31.6533 141.477 30.56C141.477 29.4667 141.737 28.5 142.257 27.66C142.79 26.82 143.517 26.1667 144.437 25.7C145.357 25.22 146.41 24.98 147.597 24.98C148.783 24.98 149.837 25.22 150.757 25.7C151.69 26.1667 152.417 26.82 152.937 27.66C153.457 28.5 153.717 29.4667 153.717 30.56C153.717 31.6533 153.457 32.6267 152.937 33.48C152.417 34.32 151.69 34.98 150.757 35.46C149.837 35.94 148.783 36.18 147.597 36.18ZM147.597 33.16C148.037 33.16 148.423 33.06 148.757 32.86C149.103 32.66 149.377 32.3667 149.577 31.98C149.777 31.58 149.877 31.1067 149.877 30.56C149.877 30.0133 149.777 29.5533 149.577 29.18C149.377 28.7933 149.103 28.5 148.757 28.3C148.423 28.1 148.037 28 147.597 28C147.17 28 146.783 28.1 146.437 28.3C146.103 28.5 145.83 28.7933 145.617 29.18C145.417 29.5533 145.317 30.0133 145.317 30.56C145.317 31.1067 145.417 31.58 145.617 31.98C145.83 32.3667 146.103 32.66 146.437 32.86C146.783 33.06 147.17 33.16 147.597 33.16ZM158.737 34L158.837 29.46L163.257 25.16H167.757L162.857 30.22L160.917 31.78L158.737 34ZM155.577 36V21.16H159.377V36H155.577ZM163.537 36L160.217 31.84L162.577 28.92L168.137 36H163.537ZM169.388 36V25.16H173.188V36H169.388ZM171.288 23.96C170.595 23.96 170.035 23.7667 169.608 23.38C169.181 22.9933 168.968 22.5133 168.968 21.94C168.968 21.3667 169.181 20.8867 169.608 20.5C170.035 20.1133 170.595 19.92 171.288 19.92C171.981 19.92 172.541 20.1067 172.968 20.48C173.395 20.84 173.608 21.3067 173.608 21.88C173.608 22.48 173.395 22.98 172.968 23.38C172.555 23.7667 171.995 23.96 171.288 23.96ZM182.818 24.98C183.658 24.98 184.418 25.1533 185.098 25.5C185.778 25.8333 186.311 26.3533 186.698 27.06C187.098 27.7667 187.298 28.68 187.298 29.8V36H183.498V30.42C183.498 29.6467 183.338 29.0867 183.018 28.74C182.711 28.38 182.278 28.2 181.718 28.2C181.318 28.2 180.951 28.2933 180.618 28.48C180.284 28.6533 180.024 28.9267 179.838 29.3C179.651 29.6733 179.558 30.16 179.558 30.76V36H175.758V25.16H179.378V28.24L178.678 27.34C179.091 26.5533 179.658 25.9667 180.378 25.58C181.098 25.18 181.911 24.98 182.818 24.98ZM195.22 40.06C194.18 40.06 193.187 39.94 192.24 39.7C191.307 39.46 190.507 39.1067 189.84 38.64L191.22 35.98C191.673 36.34 192.233 36.62 192.9 36.82C193.58 37.0333 194.24 37.14 194.88 37.14C195.907 37.14 196.647 36.9133 197.1 36.46C197.553 36.02 197.78 35.3733 197.78 34.52V33.24L197.98 30.2L197.96 27.14V25.16H201.58V34.02C201.58 36.0733 201.027 37.5933 199.92 38.58C198.813 39.5667 197.247 40.06 195.22 40.06ZM194.56 35.44C193.6 35.44 192.713 35.2267 191.9 34.8C191.1 34.36 190.453 33.7533 189.96 32.98C189.48 32.1933 189.24 31.2667 189.24 30.2C189.24 29.1333 189.48 28.2133 189.96 27.44C190.453 26.6533 191.1 26.0467 191.9 25.62C192.713 25.1933 193.6 24.98 194.56 24.98C195.48 24.98 196.267 25.1667 196.92 25.54C197.573 25.9 198.067 26.4667 198.4 27.24C198.747 28.0133 198.92 29 198.92 30.2C198.92 31.4 198.747 32.3867 198.4 33.16C198.067 33.9333 197.573 34.5067 196.92 34.88C196.267 35.2533 195.48 35.44 194.56 35.44ZM195.46 32.42C195.913 32.42 196.313 32.3267 196.66 32.14C197.02 31.9533 197.3 31.6933 197.5 31.36C197.713 31.0267 197.82 30.64 197.82 30.2C197.82 29.76 197.713 29.3733 197.5 29.04C197.3 28.7067 197.02 28.4533 196.66 28.28C196.313 28.0933 195.913 28 195.46 28C195.007 28 194.6 28.0933 194.24 28.28C193.88 28.4533 193.593 28.7067 193.38 29.04C193.18 29.3733 193.08 29.76 193.08 30.2C193.08 30.64 193.18 31.0267 193.38 31.36C193.593 31.6933 193.88 31.9533 194.24 32.14C194.6 32.3267 195.007 32.42 195.46 32.42Z"
            fill="black"
          />
        </svg>

        <h1>Confirma tu Cita</h1>
      </div>
      <div class="content">
        <div class="card">
          <h2>Datos del paciente</h2>
          <p>Nombre: {nombrePaciente}</p>
          <p>Dni: {idPaciente}</p>
        </div>
        <div class="card">
          <h2>Datos del Médico</h2>
          <p>Nombre: {nombreDoctor}</p>
          <p>Licencia: {idDoctor}</p>
          <p>Especialidad: {especialidadDoctor}</p>
        </div>
        <div class="card">
          <h2>Datos de la cita</h2>
          <p>Fecha: {fechaCita}</p>
          <p>Hora: {horaCita}</p>
          <p>Descuento: {descuento}</p>
          <p>Monto a pagar: {montoAPagar}</p>
        </div>
      </div>
      <div class="footer">
        <div class="btn">
          <button>VOLVER</button>
          <button>REALIZAR PAGO</button>
        </div>
      </div>
    </div>
  );
};
export default Confirmdate;