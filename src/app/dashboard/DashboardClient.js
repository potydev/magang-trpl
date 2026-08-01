"use client";

import { useState } from "react";
import { 
  LogOut, Plus, CheckCircle2, Clock, XCircle, FileText, 
  User, ClipboardList, BookOpen, Send, Calendar, Award, Building, 
  MapPin, Check, GraduationCap, ChevronRight, Home 
} from "lucide-react";

export default function DashboardClient({ user }) {
  // Parse name and NIM if student name contains digits
  let parsedName = user.name || "";
  let parsedNim = "";
  const isStudent = user.role === "mahasiswa";

  if (user.name) {
    const match = user.name.match(/^(\d+)\s+(.+)$/);
    if (match) {
      parsedNim = match[1];
      parsedName = match[2];
    } else {
      parsedNim = isStudent ? "250215010" : "198204122010121002";
    }
  }

  // Active Tab State
  const [activeTab, setActiveTab] = useState(isStudent ? "logbook" : "review");

  // ---- MAHASISWA STATES ----
  const [logbooks, setLogbooks] = useState([
    {
      id: 1,
      date: "2026-08-01",
      activity: "Melakukan integrasi Single Sign-On (SSO) menggunakan protol OIDC/Keycloak pada aplikasi portal utama.",
      status: "approved",
      notes: "Bagus, lanjutkan pengembangan modul lainnya."
    },
    {
      id: 2,
      date: "2026-07-31",
      activity: "Membuat desain antarmuka dashboard 'Daftar Modul' berbasis glassmorphism dan melakukan slicing CSS.",
      status: "approved",
      notes: ""
    },
    {
      id: 3,
      date: "2026-07-30",
      activity: "Menganalisis skema database relasional untuk menampung logbook mahasiswa dan plotting pembimbing.",
      status: "pending",
      notes: ""
    }
  ]);

  const [newDate, setNewDate] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddLogbook = (e) => {
    e.preventDefault();
    if (!newDate || !newActivity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        date: newDate,
        activity: newActivity,
        status: "pending",
        notes: ""
      };
      setLogbooks([newEntry, ...logbooks]);
      setNewDate("");
      setNewActivity("");
      setIsSubmitting(false);
      setSuccessMsg("Jurnal harian berhasil dikirim!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }, 800);
  };

  // ---- DOSEN STATES ----
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 101,
      studentName: "Dapot Matthew Tampubolon",
      studentNim: "250215010",
      date: "2026-07-30",
      activity: "Menganalisis skema database relasional untuk menampung logbook mahasiswa dan plotting pembimbing."
    },
    {
      id: 102,
      studentName: "Amelia Putri",
      studentNim: "250215018",
      date: "2026-07-30",
      activity: "Menyusun dokumen software requirements specification (SRS) bab 1 dan bab 2 untuk modul TA."
    }
  ]);

  const [approvedReviews, setApprovedReviews] = useState([]);
  const [dosenNotes, setDosenNotes] = useState("");

  const handleApproveLogbook = (id) => {
    const entryToApprove = pendingReviews.find(item => item.id === id);
    if (!entryToApprove) return;

    // Remove from pending
    setPendingReviews(pendingReviews.filter(item => item.id !== id));
    // Add to approved
    setApprovedReviews([{
      ...entryToApprove,
      status: "approved",
      notes: dosenNotes || "Disetujui"
    }, ...approvedReviews]);
    setDosenNotes("");
  };

  // Student grades state
  const [studentsGrades, setStudentsGrades] = useState([
    { nim: "250215010", name: "Dapot Matthew Tampubolon", companyGrade: 88, campusGrade: 90, finalGrade: 89 },
    { nim: "250215018", name: "Amelia Putri", companyGrade: 85, campusGrade: 87, finalGrade: 86 },
    { nim: "250215022", name: "Budi Cahyono", companyGrade: 92, campusGrade: 88, finalGrade: 90 }
  ]);

  const [editGradeNim, setEditGradeNim] = useState("");
  const [inputCampusGrade, setInputCampusGrade] = useState("");

  const handleSaveGrade = (nim) => {
    setStudentsGrades(studentsGrades.map(s => {
      if (s.nim === nim) {
        const campus = parseFloat(inputCampusGrade) || 0;
        const final = Math.round((s.companyGrade + campus) / 2);
        return { ...s, campusGrade: campus, finalGrade: final };
      }
      return s;
    }));
    setEditGradeNim("");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="menu-container magang-dashboard">
        
        {/* HEADER PANEL */}
        <header className="menu-header">
          <div className="menu-header-left">
            <div className="logo-circle">
              <img
                src="https://assets.siakadcloud.com/uploads/pnc/logoaplikasi/1877.jpg?1768381018"
                alt="Logo PNC"
                className="logo-circle-img"
              />
            </div>
            <div className="menu-header-titles">
              <span className="menu-header-sub">SIM Magang TRPL</span>
              <h1 className="menu-header-main">POLITEKNIK NEGERI CILACAP</h1>
            </div>
          </div>
          
          <div className="menu-header-right">
            <span className="user-role-badge">
              <User size={12} />
              <span>{isStudent ? "Mahasiswa" : "Dosen Pembimbing"}</span>
            </span>
            <a href={process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3000"} className="btn-header">
              <Home size={14} />
              <span>Portal SSO</span>
            </a>
            <a href="/api/auth/logout" className="btn-header btn-header-logout">
              <LogOut size={14} />
              <span>Keluar</span>
            </a>
          </div>
        </header>

        {/* PROFILE WELCOME CARD */}
        <div className="welcome-banner">
          <div className="welcome-banner-info">
            <h2>Selamat Datang Kembali, {parsedName}</h2>
            <p>
              {isStudent 
                ? `Program Studi Teknologi Rekayasa Perangkat Lunak | NIM: ${parsedNim}`
                : `Dosen Pembimbing Akademik | NIP: ${parsedNim}`
              }
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="tabs-container">
          {isStudent ? (
            <>
              <button 
                className={`tab-btn ${activeTab === "logbook" ? "active" : ""}`}
                onClick={() => setActiveTab("logbook")}
              >
                <ClipboardList size={16} />
                <span>Logbook Harian</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === "mitra" ? "active" : ""}`}
                onClick={() => setActiveTab("mitra")}
              >
                <Building size={16} />
                <span>Informasi Industri</span>
              </button>
            </>
          ) : (
            <>
              <button 
                className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
                onClick={() => setActiveTab("review")}
              >
                <BookOpen size={16} />
                <span>Review Logbook ({pendingReviews.length})</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === "nilai" ? "active" : ""}`}
                onClick={() => setActiveTab("nilai")}
              >
                <Award size={16} />
                <span>Penilaian Magang</span>
              </button>
            </>
          )}
        </div>

        {/* MAIN BODY AREA */}
        <main className="menu-body magang-body">
          
          {/* ======================================================== */}
          {/* TAB MAHASISWA: LOGBOOK HARIAN */}
          {/* ======================================================== */}
          {isStudent && activeTab === "logbook" && (
            <div className="logbook-section">
              <div className="logbook-grid">
                
                {/* Form Input Logbook */}
                <div className="logbook-card form-card">
                  <h3>Tambah Jurnal Baru</h3>
                  <p className="card-subtitle">Laporkan aktivitas harian magang Anda secara jujur dan berkala.</p>
                  
                  {successMsg && <div className="success-toast">{successMsg}</div>}

                  <form onSubmit={handleAddLogbook} className="logbook-form-element">
                    <div className="input-group">
                      <label htmlFor="log-date">Tanggal Kegiatan</label>
                      <input 
                        type="date" 
                        id="log-date" 
                        required 
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="form-input-element"
                      />
                    </div>
                    
                    <div className="input-group">
                      <label htmlFor="log-activity">Uraian Aktivitas</label>
                      <textarea 
                        id="log-activity" 
                        rows="4" 
                        required 
                        placeholder="Jelaskan secara rinci tugas atau pekerjaan yang Anda lakukan hari ini..."
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        className="form-input-element textarea-element"
                      ></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-submit-logbook">
                      <Send size={14} />
                      <span>{isSubmitting ? "Mengirim..." : "Kirim Jurnal"}</span>
                    </button>
                  </form>
                </div>

                {/* List Riwayat Logbook */}
                <div className="logbook-card list-card">
                  <h3>Riwayat Jurnal Harian</h3>
                  <p className="card-subtitle">Daftar logbook harian Anda yang telah terkirim.</p>
                  
                  <div className="logbook-history-list">
                    {logbooks.length === 0 ? (
                      <p className="empty-message">Belum ada jurnal yang dilaporkan.</p>
                    ) : (
                      logbooks.map((log) => (
                        <div key={log.id} className="logbook-history-item">
                          <div className="item-header">
                            <span className="item-date">
                              <Calendar size={12} />
                              {log.date}
                            </span>
                            <span className={`status-badge-magang ${log.status}`}>
                              {log.status === "approved" ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  <span>Disetujui</span>
                                </>
                              ) : (
                                <>
                                  <Clock size={12} />
                                  <span>Menunggu</span>
                                </>
                              )}
                            </span>
                          </div>
                          <p className="item-activity">{log.activity}</p>
                          {log.notes && (
                            <div className="item-feedback">
                              <strong>Catatan Dosen:</strong> "{log.notes}"
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB MAHASISWA: INFORMASI MITRA */}
          {/* ======================================================== */}
          {isStudent && activeTab === "mitra" && (
            <div className="mitra-section">
              <div className="mitra-card">
                <div className="mitra-header-info">
                  <div className="mitra-icon-large">
                    <Building size={32} />
                  </div>
                  <div>
                    <h3>PT. Telkom Indonesia (Persero) Tbk</h3>
                    <p className="mitra-sub">Divisi Digital Business & Technology (DBT)</p>
                  </div>
                </div>

                <div className="mitra-details-grid">
                  <div className="mitra-detail-box">
                    <span className="mitra-label">Alamat Instansi</span>
                    <span className="mitra-val">
                      <MapPin size={14} />
                      <span>Gedung Telkom Landmark Tower, Jakarta Selatan</span>
                    </span>
                  </div>
                  
                  <div className="mitra-detail-box">
                    <span className="mitra-label">Pembimbing Industri</span>
                    <span className="mitra-val">Supriyadi, S.Kom. (Senior Web Developer)</span>
                  </div>

                  <div className="mitra-detail-box">
                    <span className="mitra-label">Durasi Magang</span>
                    <span className="mitra-val">1 Agustus 2026 - 31 Januari 2027 (6 Bulan)</span>
                  </div>

                  <div className="mitra-detail-box">
                    <span className="mitra-label">Status Penempatan</span>
                    <span className="mitra-val text-success">
                      <CheckCircle2 size={14} />
                      <span>Aktif Terverifikasi</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB DOSEN: REVIEW LOGBOOK MAHASISWA */}
          {/* ======================================================== */}
          {!isStudent && activeTab === "review" && (
            <div className="review-section">
              <div className="review-layout">
                
                {/* List Pending Jurnal */}
                <div className="review-card">
                  <h3>Jurnal Menunggu Review ({pendingReviews.length})</h3>
                  <p className="card-subtitle">Periksa laporan harian yang diisi oleh mahasiswa bimbingan Anda.</p>

                  <div className="pending-reviews-list">
                    {pendingReviews.length === 0 ? (
                      <div className="all-reviewed">
                        <CheckCircle2 size={36} className="all-done-icon" />
                        <h4>Semua Logbook Telah Di-review</h4>
                        <p>Tidak ada jurnal harian baru yang perlu diperiksa saat ini.</p>
                      </div>
                    ) : (
                      pendingReviews.map((rev) => (
                        <div key={rev.id} className="review-item">
                          <div className="review-item-header">
                            <div>
                              <span className="student-name">{rev.studentName}</span>
                              <span className="student-nim">NIM: {rev.studentNim}</span>
                            </div>
                            <span className="review-date">
                              <Calendar size={12} />
                              {rev.date}
                            </span>
                          </div>
                          <div className="review-activity-box">
                            <p>"{rev.activity}"</p>
                          </div>
                          
                          <div className="review-action-area">
                            <input 
                              type="text" 
                              placeholder="Beri catatan/feedback (opsional)..."
                              value={dosenNotes}
                              onChange={(e) => setDosenNotes(e.target.value)}
                              className="feedback-input"
                            />
                            <button 
                              onClick={() => handleApproveLogbook(rev.id)}
                              className="btn-approve"
                            >
                              <Check size={14} />
                              <span>Setujui</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* List Jurnal Baru Disetujui */}
                <div className="review-card">
                  <h3>Baru Saja Disetujui ({approvedReviews.length})</h3>
                  <p className="card-subtitle">Logbook mahasiswa bimbingan yang baru saja Anda verifikasi.</p>

                  <div className="approved-reviews-list">
                    {approvedReviews.length === 0 ? (
                      <p className="empty-message">Belum ada jurnal yang disetujui dalam sesi ini.</p>
                    ) : (
                      approvedReviews.map((appr) => (
                        <div key={appr.id} className="approved-item">
                          <div className="appr-item-top">
                            <strong>{appr.studentName}</strong>
                            <span className="appr-badge">
                              <CheckCircle2 size={12} />
                              <span>Selesai</span>
                            </span>
                          </div>
                          <p className="appr-desc">"{appr.activity}"</p>
                          <span className="appr-feedback">Feedback: "{appr.notes}"</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB DOSEN: PENILAIAN MAGANG */}
          {/* ======================================================== */}
          {!isStudent && activeTab === "nilai" && (
            <div className="grades-section">
              <div className="grades-card">
                <h3>Form Penilaian Mahasiswa Magang</h3>
                <p className="card-subtitle">Input nilai bimbingan magang. Nilai akhir dihitung otomatis dari rata-rata nilai industri dan nilai kampus.</p>

                <div className="table-responsive">
                  <table className="grades-table">
                    <thead>
                      <tr>
                        <th>NIM</th>
                        <th>Nama Lengkap</th>
                        <th>Nilai Industri (50%)</th>
                        <th>Nilai Kampus (50%)</th>
                        <th>Nilai Akhir</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsGrades.map((stud) => (
                        <tr key={stud.nim}>
                          <td><strong>{stud.nim}</strong></td>
                          <td>{stud.name}</td>
                          <td>
                            <span className="grade-badge industry">{stud.companyGrade}</span>
                          </td>
                          <td>
                            {editGradeNim === stud.nim ? (
                              <input 
                                type="number" 
                                min="0" 
                                max="100"
                                value={inputCampusGrade}
                                onChange={(e) => setInputCampusGrade(e.target.value)}
                                className="grade-edit-input"
                              />
                            ) : (
                              <span className="grade-badge campus">{stud.campusGrade}</span>
                            )}
                          </td>
                          <td>
                            <strong className="grade-final">{stud.finalGrade}</strong>
                          </td>
                          <td>
                            {editGradeNim === stud.nim ? (
                              <div className="grade-edit-actions">
                                <button 
                                  onClick={() => handleSaveGrade(stud.nim)}
                                  className="btn-grade-save"
                                >
                                  Simpan
                                </button>
                                <button 
                                  onClick={() => setEditGradeNim("")}
                                  className="btn-grade-cancel"
                                >
                                  Batal
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  setEditGradeNim(stud.nim);
                                  setInputCampusGrade(stud.campusGrade);
                                }}
                                className="btn-grade-edit"
                              >
                                Edit Nilai
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
