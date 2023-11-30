import React from "react";
import "./error404.scss";
const Error404 = () => {
  return (
    <div>
      <div class="container">
        <div class="image-container">
          <img
            src="https://images.pexels.com/photos/733533/pexels-photo-733533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Placeholder Image"
          ></img>
        </div>

        <div class="error-container">
          <div class="error-message-container">
            <div class="error-code">404</div>
            <div class="error-message">
              Sorry, we were unable to find that page
            </div>
          </div>

          <div class="menu-container">
            <div class="menu-items">
              <div class="menu-item">About</div>
              <div class="menu-item">Products</div>
              <div class="menu-item">Pricing</div>
              <div class="menu-item">Login</div>
            </div>
          </div>
        </div>

        <div class="logo-container">
          <div class="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="74"
              height="75"
              viewBox="0 0 74 75"
              fill="none"
            >
              <path
                opacity="0.98"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2025 10.0703C24.2431 8.8639 31.0453 11.0653 36.6079 16.6746C43.9785 9.83039 52.3618 8.41519 61.7587 12.429C69.4767 18.8238 71.3749 26.6857 67.4532 36.0157C59.8947 46.9892 50.7199 56.4238 39.9297 64.3197C38.0315 64.949 36.1333 64.949 34.2351 64.3197C23.3339 56.3125 14.0013 46.7203 6.23703 35.5439C2.28228 23.9468 5.60409 15.4556 16.2025 10.0703Z"
                fill="#42B8C3"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.1726 24.8428C47.1726 24.8428 48.003 25.6763 48.5625 26.5156C49.7188 28.25 52.0312 31.7187 52.0312 31.7187C52.0312 31.7187 59.5469 31.7187 64.2562 31.447C64.2562 32.7047 64.1719 32.7736 64.1719 34.0312C59.5469 33.8057 55.5 34.0312 50.875 34.0312C50.3331 32.8944 49.37 31.1101 48.6468 30.0459C48.7339 30.154 48.52 29.6696 48.1217 30.9753C47.0042 34.6385 45.8107 38.2768 44.3253 41.8252C43.0602 39.9383 41.8182 38.2922 40.5531 36.4053C38.6881 41.2698 37.3979 46.0614 36.7326 51.2599C35.6174 51.4665 34.6684 51.1523 33.8854 50.3164C32.4598 44.0273 29.9493 38.0447 27.6368 32.3839C26.4805 35.6298 25.8085 38.1383 24.8594 40.9687C21.3335 40.8961 17.4075 40.8817 13.875 40.8817C13.875 39.6241 13.9545 39.309 13.9545 38.0513C17.3438 38.1617 19.9161 38.0891 23.125 38.0513C23.7874 35.249 25.6158 31.779 26.5938 27.0937C27.1719 27.6719 27.7473 27.8601 28.3281 28.8281C31.7969 34.6094 35.309 44.6556 35.309 44.6556C35.309 44.6556 38.2406 35.8271 38.7344 31.8024C40.529 32.9365 43.8508 37.1079 43.8508 37.1079L47.1726 24.8428Z"
                fill="#E4F8F3"
              />
            </svg>
          </div>
          <div class="logo-text">HealthBooking</div>
        </div>
      </div>{" "}
    </div>
  );
};
export default Error404;
