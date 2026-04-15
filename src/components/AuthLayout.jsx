import "../styles/authLayout.css";
import bg from "../assets/foto/background.png";
import logo from "../assets/foto/logo.png";

export default function AuthLayout({ children }) {
  return (
    <>
      {/* BACKGROUND */}
      <div
        className="bg"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="overlay"></div>

      {/* MAIN */}
      <div className="wrapper">
        <div className="card">

          {/* LEFT */}
          <div className="left">
            {children}
          </div>

          {/* RIGHT */}
          <div className="right">
            <div className="right-content">
              <img src={logo} alt="logo" />

              <h2>
                Sistem Presensi dan
                <br />
                Penjadwalan SD GMIM 12
              </h2>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}