"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

function LandingContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="landing-container">
      <div className="landing-card">
        
        {/* Visual Brand Area */}
        <div className="landing-brand-panel">
          <div className="brand-overlay"></div>
          <div className="brand-content">
            <div className="icon-badge">
              <Briefcase size={28} />
            </div>
            <span className="brand-tag">PORTAL AKADEMIK TRPL</span>
            <h1 className="brand-title">
              SIM MAGANG <br />
              <span>Politeknik Negeri Cilacap</span>
            </h1>
            <p className="brand-desc">
              Sistem Informasi Manajemen Magang terintegrasi untuk mahasiswa, dosen pembimbing, dan mitra industri Program Studi Teknologi Rekayasa Perangkat Lunak.
            </p>
          </div>
        </div>

        {/* Login Area */}
        <div className="landing-login-panel">
          <div className="login-panel-wrapper">
            
            {/* Logo Kampus */}
            <div className="landing-logo">
              <img
                src="https://assets.siakadcloud.com/uploads/pnc/logoaplikasi/1877.jpg?1768381018"
                alt="Logo PNC"
                className="logo-img"
              />
            </div>

            <div className="login-header">
              <h2 className="login-title">Akses Layanan Magang</h2>
              <p className="login-subtitle">
                Masuk menggunakan akun Single Sign-On (SSO) resmi Politeknik Negeri Cilacap.
              </p>
            </div>

            {error && (
              <div className="error-box">
                {error === "oidc_not_initialized" && "Konfigurasi SSO server sedang bermasalah. Silakan hubungi administrator."}
                {error === "auth_failed" && "Proses autentikasi gagal. Silakan coba kembali."}
                {error !== "oidc_not_initialized" && error !== "auth_failed" && "Terjadi kesalahan sistem saat login."}
              </div>
            )}

            {/* SSO Action Button */}
            <a href="/api/auth/login" className="btn-sso-login">
              <span>Lanjutkan dengan SSO PNC</span>
              <ArrowRight size={18} />
            </a>

            <div className="login-footer">
              <ShieldCheck size={14} />
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
