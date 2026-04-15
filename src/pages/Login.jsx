import bg from "../assets/foto/background.png";
import logo from "../assets/foto/logo.png";
import { Link } from "react-router-dom";

export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Login berhasil (dummy)");
    };

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
                        <h1>Selamat Datang!</h1>
                        <div className="line"></div>

                        <p className="desc">
                            Silakan masuk untuk melanjutkan ke sistem presensi dan penjadwalan.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <div className="input-box">
                                <i className="ti ti-user icon"></i>
                                <input type="email" placeholder="Masukkan Email Anda" />
                            </div>

                            <label>Password</label>
                            <div className="input-box">
                                <i className="ti ti-lock icon"></i>
                                <input type="password" placeholder="Masukkan Password Anda" />
                            </div>

                            <button type="submit">
                                <span>Masuk</span>
                            </button>

              <Link to="/reset-password" className="forgot">
                Lupa Password?
              </Link>
            </form>
          </div>

                    {/* RIGHT */}
                    <div className="right">
                        <div className="right-content">
                            <img src={logo} alt="logo" />
                            <h2>
                                Sistem Presensi dan<br />
                                Penjadwalan SD GMIM 12
                            </h2>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}