"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

function LandingContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="form-box">
        {/* BAGIAN KIRI: AREA VISUAL KAMPUS */}
        <div className="univ-identity-box">
          <div className="univ-identity-content">
            <span className="welcome-text">SELAMAT DATANG</span>
            <h1 className="univ-name">
              Sistem Informasi Magang <br />
              Prodi TRPL PNC
            </h1>
          </div>
        </div>

        {/* BAGIAN KANAN: FORMULIR LOGIN */}
        <div className="form-container">
          <div className="form-wrapper">
            {/* Logo Kampus */}
            <div className="logo-container">
              <img
                src="https://assets.siakadcloud.com/uploads/pnc/logoaplikasi/1877.jpg?1768381018"
                alt="Logo Politeknik Negeri Cilacap"
                className="campus-logo"
              />
            </div>

            <div className="form-header">
              <h2 className="form-title">Masuk dan Verifikasi</h2>
              <p className="form-subtitle">
                <span className="badge-new">Baru!</span> Nikmati kemudahan sistem autentikasi tunggal untuk mengakses modul magang dengan satu akun.
              </p>
            </div>

            {error && (
              <div className="alert alert-error" style={{
                background: "#f8d7da",
                border: "1px solid #f5c6cb",
                color: "#721c24",
                padding: "10px 14px",
                borderRadius: "4px",
                fontSize: "12.5px",
                marginBottom: "15px"
              }}>
                <div className="alert-message">
                  {error === "oidc_not_initialized" && "Server SSO bermasalah. Silakan gunakan password login dibawah."}
                  {error === "auth_failed" && "Proses autentikasi gagal. Silakan coba kembali."}
                  {error !== "oidc_not_initialized" && error !== "auth_failed" && "Terjadi kesalahan sistem saat login."}
                </div>
              </div>
            )}

            {/* Google SSO Button */}
            <a href="/api/auth/login" className="btn-google" id="login-btn">
              <img
                src="https://quantum.sevima.com/assets/images/logo-google.svg"
                alt="Google Logo"
                className="google-icon"
              />
              Google
            </a>

            <div className="divider">
              <span>atau lanjutkan dengan</span>
            </div>

            {/* Traditional Form Login */}
            <form action="/api/auth/form-login" method="POST" className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Email/akun pengguna<span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    placeholder="Masukkan email/NIM/NIP/username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password<span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <a href="#" className="forgot-password-link">Lupa kata sandi?</a>
              </div>

              <button type="submit" className="btn-submit">Masuk</button>
            </form>

            <div className="form-footer" style={{ marginTop: "32px", fontSize: "11px", color: "#888", display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
              <ShieldCheck size={14} style={{ color: "#0067bd" }} />
              <span>Sistem Autentikasi Terintegrasi</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div className="login-page">
        <div className="form-box" style={{ justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <div style={{ color: "#333", fontSize: "14px", fontWeight: "600" }}>Memuat...</div>
        </div>
      </div>
    }>
      <LandingContent />
    </Suspense>
  );
}
