"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

function LandingContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

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
                  {error === "oidc_not_initialized" && "Server SSO bermasalah. Silakan hubungi administrator."}
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
              Google SSO PNC
            </a>

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
      <div className="landing-container">
        <div className="landing-card" style={{ justifyContent: "center", alignItems: "center", minHeight: "500px" }}>
          <div style={{ color: "#333", fontSize: "14px", fontWeight: "600" }}>Memuat...</div>
        </div>
      </div>
    }>
      <LandingContent />
    </Suspense>
  );
}
