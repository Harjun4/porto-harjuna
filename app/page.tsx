"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import KineticGrid from "@/components/ui/kinetic-grid";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { InteractiveLanyard } from "@/components/ui/interactive-lanyard";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import fotoImg from "@/image/Foto.jpeg";
import kbecImg from "@/image/kbec-system.png";
import biImg from "@/image/bi-pipeline.png";
import kuyFitrahImg from "@/image/kuy-fitrah.png";
import dapurLodhoImg from "@/image/dapur-lodho.png";

import {
  GraduationCap,
  Building2,
  LineChart,
  Code2,
  MapPin,
  ArrowRight,
  Mail,
  Copy,
  ExternalLink,
  Briefcase,
  UserCheck,
  Laptop,
  Database,
  Bot,
  Brain,
  X,
  Check,
  Sparkles,
  Menu,
  FileText,
  MousePointer2,
  TrendingUp,
} from "lucide-react";

// High quality Unsplash placeholders & local images for 3D Coverflow Carousel
const showcaseSlides = [
  {
    src: kbecImg.src,
    alt: "KBEC Management System",
    title: "KBEC Management System",
    subtitle: "Web Development",
    keterangan: "Sistem manajemen operasional & keuangan Yayasan Ar-Rasyid Bintaro dengan RBAC dan secure dynamic SQL querying.",
    meta: [
      { label: "Tahun", value: "2026" },
      { label: "Role / Tech Stack", value: "Fullstack (Node.js, PostgreSQL)" },
      { label: "Status / Platform", value: "Active Project" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop&q=80",
    alt: "AI Workflow Automation n8n",
    title: "AI Workflow Automation n8n",
    subtitle: "AI & Automation",
    keterangan: "Automasi alur kerja bisnis multi-channel mengintegrasikan WhatsApp API, Telegram, dan AI API via Webhook.",
    meta: [
      { label: "Tahun", value: "2026" },
      { label: "Role / Tech Stack", value: "AI Developer (n8n, Webhook)" },
      { label: "Status / Platform", value: "Production Ready" },
    ],
  },
  {
    src: biImg.src,
    alt: "BI & Data Warehouse Pipeline",
    title: "BI & Data Warehouse Pipeline",
    subtitle: "Business Intelligence",
    keterangan: "Pipeline ETL Pentaho Data Integration (Spoon) & dashboard visualisasi KPI interaktif pada Power BI.",
    meta: [
      { label: "Tahun", value: "2025" },
      { label: "Role / Tech Stack", value: "BI Engineer (Pentaho, Power BI)" },
      { label: "Status / Platform", value: "Completed" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&fit=crop&q=80",
    alt: "Pelatihan BI Data Analyst",
    title: "Pelatihan BI Data Analyst",
    subtitle: "Event & Workshop",
    keterangan: "Asisten fasilitator & pemateri workshop Business Intelligence, mengajarkan end-to-end data cleaning, EDA, dan dashboard Excel.",
    meta: [
      { label: "Tahun", value: "2025 - 2026" },
      { label: "Role / Tech Stack", value: "Pemateri / Fasilitator" },
      { label: "Status / Platform", value: "GEN-BI Kediri" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&fit=crop&q=80",
    alt: "Diabetes Prediction ML Model",
    title: "Diabetes Prediction ML Model",
    subtitle: "Machine Learning",
    keterangan: "Model Machine Learning klasifikasi dengan Python (Pandas, Scikit-learn) & Exploratory Data Analysis.",
    meta: [
      { label: "Tahun", value: "2026" },
      { label: "Role / Tech Stack", value: "Data Scientist (Python, ML)" },
      { label: "Status / Platform", value: "Completed" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&fit=crop&q=80",
    alt: "Program Kerja Divisi Pendidikan",
    title: "Program Kerja Divisi Pendidikan",
    subtitle: "Event & Organization",
    keterangan: "Penyelenggaraan workshop persiapan kerja & pendampingan akademik mahasiswa Sistem Informasi UMB.",
    meta: [
      { label: "Tahun", value: "2025 - 2026" },
      { label: "Role / Tech Stack", value: "Divisi Pendidikan" },
      { label: "Status / Platform", value: "HIMSI UMB" },
    ],
  },
  {
    src: dapurLodhoImg.src,
    alt: "Dapur Lodho Ordering System",
    title: "Dapur Lodho Ordering System",
    subtitle: "Web Development",
    keterangan: "Aplikasi pemesanan online berbasis JavaServer Pages (JSP) dengan manajemen transaksi real-time & laporan keuangan.",
    meta: [
      { label: "Tahun", value: "2025" },
      { label: "Role / Tech Stack", value: "Web Developer (JSP, Java, MySQL)" },
      { label: "Status / Platform", value: "Completed" },
    ],
  },
  {
    src: kuyFitrahImg.src,
    alt: "Kuy Fitrah - Online Zakat System",
    title: "Kuy Fitrah - Online Zakat System",
    subtitle: "System Design",
    keterangan: "Perancangan sistem zakat online berbasis Object-Oriented Analysis (OOA), UML diagrams, dan UI Prototyping.",
    meta: [
      { label: "Tahun", value: "2025" },
      { label: "Role / Tech Stack", value: "System Analyst (UML, OOA)" },
      { label: "Status / Platform", value: "Design Prototype" },
    ],
  },
];

// Project Data
const projectData = [
  {
    id: "kbec",
    title: "KBEC Management System (kbec-admin)",
    category: "fullstack",
    role: "Fullstack Engineer | Node.js • Express • PostgreSQL / Supabase",
    badge: "ACTIVE FULLSTACK PROJECT",
    badgeClass: "bg-purple-950/50 text-purple-300 border-purple-500/30",
    desc: "Sistem manajemen operasional dan keuangan Yayasan Ar-Rasyid Bintaro. Dilengkapi arsitektur RBAC (Super Admin, Admin, Pengajar), modul akademik (siswa, jadwal, presensi), serta modul keuangan (SPP, non-SPP, voucher, payment ledgers) dengan penerapan parameterized dynamic SQL querying untuk keamanan data terjamin.",
    details: [
      "Arsitektur RBAC: Pembagian role Super Admin, Admin, dan Pengajar secara terisolasi.",
      "Modul Akademik: Manajemen data siswa, pembuatan jadwal pengajaran, dan presensi otomatis.",
      "Modul Keuangan: Pembayaran SPP, transaksi non-SPP, pengelolaan voucher diskon, dan otomatisasi payment ledgers.",
      "Keamanan Database: Menggunakan parameterized dynamic SQL querying untuk mencegah SQL Injection & kebocoran data."
    ],
    tags: ["Node.js", "Express.js", "PostgreSQL", "Supabase", "RBAC", "Ledger System"]
  },
  {
    id: "n8n",
    title: "AI Workflow Automation using n8n",
    category: "ai",
    role: "AI Developer | Maret 2026",
    badge: "AI & AUTOMATION",
    badgeClass: "bg-indigo-950/50 text-indigo-300 border-indigo-500/30",
    desc: "Merancang alur automasi bisnis berbasis AI menggunakan n8n. Mengintegrasikan trigger multi-channel seperti WhatsApp, Telegram, dan Webhook API untuk efisiensi komunikasi & pemrosesan data otomatis.",
    details: [
      "Multi-Channel Webhook: Menghubungkan bot WhatsApp dan Telegram untuk pemrosesan pesan masuk.",
      "AI Agent Integration: Memanfaatkan AI API untuk ekstraksi informasi otomatis dari dokumen dan pesan.",
      "Workflow Efficiency: Memangkas waktu respons layanan pelanggan hingga 80% secara otomatis."
    ],
    tags: ["n8n", "AI Workflow", "Webhook", "WhatsApp API", "Telegram API"]
  },
  {
    id: "bi",
    title: "BI & Data Warehouse Pipeline",
    category: "bi",
    role: "BI Engineer | Agustus 2025",
    badge: "BI & ETL PIPELINE",
    badgeClass: "bg-purple-950/50 text-purple-300 border-purple-500/30",
    desc: "Mengembangkan pipeline ETL (Extract, Transform, Load) menggunakan Pentaho Data Integration (Spoon) dan merancang interactive dashboard laporan bisnis di Power BI untuk mendukung keputusan manajemen.",
    details: [
      "Pentaho ETL: Ekstraksi data dari berbagai sumber database, transformasi format, dan loading ke Data Warehouse.",
      "Power BI Dashboard: Merancang visualisasi KPI penjualan, pertumbuhan revenue, dan tren operasional.",
      "Data Integrity: Data validation & automated cleaning untuk menjamin akurasi laporan hingga 99%."
    ],
    tags: ["Pentaho PDI", "Power BI", "ETL Pipeline", "Data Warehouse", "SQL"]
  },
  {
    id: "ml",
    title: "Diabetes Prediction ML Model",
    category: "bi",
    role: "Data Scientist | Maret 2026",
    badge: "MACHINE LEARNING",
    badgeClass: "bg-indigo-950/50 text-indigo-300 border-indigo-500/30",
    desc: "Melakukan preprocessing, cleaning, Exploratory Data Analysis (EDA), dan membangun model klasifikasi Machine Learning dengan Python. Evaluasi menggunakan accuracy score, confusion matrix, dan classification report.",
    details: [
      "Exploratory Data Analysis (EDA): Visualisasi matriks korelasi dan penanganan outlier dataset.",
      "Feature Engineering: Scaler & normalisasi variabel kesehatan utama.",
      "Model Training & Evaluation: Pengujian algoritma klasifikasi (Scikit-learn) dengan metriks Accuracy Score & Confusion Matrix."
    ],
    tags: ["Python", "Pandas", "Scikit-learn", "EDA", "Machine Learning"]
  },
  {
    id: "jsp",
    title: "Dapur Lodho Ordering System",
    category: "fullstack",
    role: "Web Developer | Agustus 2025",
    badge: "WEB APP ENTERPRISE",
    badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
    desc: "Platform pemesanan online berbasis JavaServer Pages (JSP). Mengintegrasikan modul pembeli & admin penjual untuk mengelola transaksi real-time serta pembuatan laporan keuangan otomatis.",
    details: [
      "Sistem Pemesanan Real-time: Pelanggan dapat memilih menu dan memantau status pesanan.",
      "Dashboard Penjual: Pengelolaan stok makanan, laporan penjualan harian, dan ringkasan omset.",
      "Teknologi: Dibangun berbasis JavaServer Pages (JSP), Servlet, & MySQL."
    ],
    tags: ["JSP", "Java", "MySQL", "Financial Reports"]
  },
  {
    id: "zakat",
    title: "Kuy Fitrah - Online Zakat System",
    category: "system",
    role: "System Analyst | Juli 2025",
    badge: "SYSTEM DESIGN",
    badgeClass: "bg-purple-950/50 text-purple-300 border-purple-500/30",
    desc: "Perancangan sistem manajemen zakat online dengan metode Object-Oriented Analysis (OOA). Memodelkan bisnis dengan Use Case, Activity, & Sequence Diagram serta membuat UI Prototyping.",
    details: [
      "Object-Oriented Analysis (OOA): Pemodelan proses bisnis zakat dengan standar UML.",
      "Diagram Komprehensif: Use Case Diagram, Activity Diagram, dan Sequence Diagram.",
      "UI Prototyping: Perancangan wireframe dan antarmuka pengguna yang ramah pengguna."
    ],
    tags: ["UML", "OOA", "System Analysis", "UI/UX Prototyping"]
  }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("harjunaadiputra3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredProjects = activeFilter === "all"
    ? projectData
    : projectData.filter(p => p.category === activeFilter);

  return (
    <KineticGrid className="min-h-screen bg-[#0a0d14] text-slate-200 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden touch-pan-y">
      {/* Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-950/30 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Pill Glassmorphism Navbar */}
      <MiniNavbar />

      {/* SECTION 1: HERO COVER BANNER */}
      <section id="home" className="pt-20 md:pt-24 pb-8 min-h-[85vh] flex flex-col justify-between items-center relative z-10 px-4 sm:px-6 max-w-7xl mx-auto overflow-x-hidden touch-pan-y">
        
        {/* DESKTOP LAYOUT (lg: and above) */}
        <div className="hidden lg:block absolute top-1 left-4 lg:left-20 z-20 pointer-events-none">
          <InteractiveLanyard fotoUrl={fotoImg.src} />
        </div>

        {/* Desktop Left Side Badges */}
        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block absolute top-64 left-6 lg:left-16 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-purple-200 border border-purple-500/40 shadow-xl text-xs font-bold cursor-grab active:cursor-grabbing touch-none select-none whitespace-nowrap"
        >
          🐍 Python & ML
        </motion.div>

        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block absolute bottom-12 left-8 lg:left-24 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-cyan-200 border border-cyan-500/40 shadow-xl text-xs font-bold cursor-grab active:cursor-grabbing touch-none select-none whitespace-nowrap"
        >
          ⚡ Workflow Automation
        </motion.div>

        {/* Desktop Right Side Badges & Role Card */}
        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:flex absolute top-20 right-8 lg:right-20 z-30 items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-purple-500/40 shadow-xl text-purple-200 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="p-1.5 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-500/30">
            <LineChart className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">DATA SCIENCE</div>
            <div className="text-xs font-extrabold text-white">Data Visualization</div>
          </div>
        </motion.div>

        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:flex absolute top-36 right-12 lg:right-28 z-30 items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 shadow-lg text-[11px] font-bold text-emerald-300 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span>Model Acc: 98.4%</span>
        </motion.div>

        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:block absolute top-1/2 -translate-y-10 right-4 lg:right-16 z-30 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl p-4 rounded-2xl text-left space-y-1.5 text-slate-900 w-48 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="text-[10px] uppercase font-black text-purple-600 tracking-wider mb-1">PROFILES & ROLES</div>
          <div className="text-xs font-extrabold flex items-center gap-1.5 text-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Data Analyst
          </div>
          <div className="text-xs font-extrabold flex items-center gap-1.5 text-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> BI & ETL Specialist
          </div>
          <div className="text-xs font-extrabold flex items-center gap-1.5 text-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Fullstack Engineer
          </div>
          <div className="text-xs font-extrabold flex items-center gap-1.5 text-slate-900">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span> AI & ML Enthusiast
          </div>
        </motion.div>

        <motion.div
          drag
          dragElastic={0.2}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block absolute bottom-12 right-10 lg:right-28 z-30 px-3.5 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md text-amber-200 border border-amber-500/40 shadow-xl text-xs font-bold cursor-grab active:cursor-grabbing touch-none select-none whitespace-nowrap"
        >
          💡 Business Intelligence & Dashboards
        </motion.div>

        {/* MOBILE LAYOUT (< lg): Pure Vertical Stack (No Overlapping Elements) */}
        <div className="lg:hidden w-full flex flex-col items-center gap-5 my-auto z-20">
          
          {/* Block 1: Lanyard Card Centered at Top */}
          <div className="w-full flex justify-center pointer-events-auto">
            <InteractiveLanyard fotoUrl={fotoImg.src} />
          </div>

          {/* Block 2: Figma Canvas MY PORTFOLIO Banner */}
          <div className="relative z-10 py-6 sm:py-10 px-4 sm:px-8 rounded-3xl bg-[#f3eeff]/95 backdrop-blur-xl border-2 border-purple-300/60 shadow-[0_25px_60px_rgba(0,0,0,0.5)] transform -rotate-1 max-w-[88vw] w-full text-center group">
            {/* 4 Corner Figma Handles */}
            <div className="absolute -top-2 -left-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
            <div className="absolute -top-2 -right-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
            <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
            <div className="absolute -bottom-2 -right-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>

            {/* Figma Cursor Arrow */}
            <div className="absolute -bottom-3.5 -left-2 z-30 flex items-center gap-1 bg-purple-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-purple-400/40">
              <MousePointer2 className="w-3 h-3 fill-purple-400 text-purple-400" />
              <span>Its Me</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#2a1444] leading-none drop-shadow-sm uppercase">
              MY PORTFOLIO
            </h1>
          </div>

          {/* Block 3: 2 Clean Badges + Presented By Pill */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-purple-200 border border-purple-500/40 text-xs font-bold shadow-lg">
                🐍 Python & ML
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-cyan-200 border border-cyan-500/40 text-xs font-bold shadow-lg">
                ⚡ Workflow Automation
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-purple-950/60 backdrop-blur-md border border-purple-500/40 text-purple-200 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Presented by Harjuna Adi Putra</span>
            </div>
          </div>
        </div>

        {/* DESKTOP ONLY CENTER FIGMA BANNER & PILL */}
        <div className="hidden lg:block relative z-10 my-auto py-16 px-16 rounded-3xl bg-[#f3eeff]/95 backdrop-blur-xl border-2 border-purple-300/60 shadow-[0_25px_60px_rgba(0,0,0,0.5)] transform -rotate-2.5 max-w-4xl w-full text-center mt-20 group transition-transform duration-300">
          <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md z-20"></div>

          <div className="absolute -bottom-4 -left-3 z-30 flex items-center gap-1.5 bg-purple-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-purple-400/40">
            <MousePointer2 className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
            <span>Its Me</span>
          </div>

          <h1 className="text-8xl lg:text-9xl font-black tracking-tighter text-[#2a1444] leading-none drop-shadow-sm uppercase">
            MY PORTFOLIO
          </h1>
        </div>

        <div className="hidden lg:inline-flex relative z-20 mt-6 items-center gap-2 bg-purple-950/60 backdrop-blur-md border border-purple-500/40 text-purple-200 text-sm font-bold px-5 py-2.5 rounded-full shadow-lg">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Presented by Harjuna Adi Putra</span>
        </div>
      </section>

      {/* SECTION 2: INFINITE MARQUEE DIVIDER */}
      <section className="relative z-20 py-2">
        <MarqueeTicker
          speed={35}
          items={[
            "BUSINESS INTELLIGENCE",
            "FULLSTACK ENGINEERING",
            "AI WORKFLOW AUTOMATION",
            "DATA ANALYST",
            "AI ENTHUSIAST",
            "CONTINUOUS LEARNING",
          ]}
        />
      </section>

      {/* SECTION 3: PROFILE & TABLET SHOWCASE (Scrolled View) */}
      <section className="relative z-10 pt-16 pb-20 px-6 max-w-7xl mx-auto">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-purple-200 uppercase tracking-widest mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AVAILABLE FOR FULLTIME & BI ANALYST ROLES
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Hi, I&apos;m <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-white bg-clip-text text-transparent">Harjuna Adi Putra Wicaksana</span>
              </h2>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal mb-6">
                Mahasiswa Sistem Informasi Universitas Mercu Buana yang berfokus pada pengolahan data <strong className="text-white font-bold">Business Intelligence</strong>, pengembangan sistem <strong className="text-white font-bold">Fullstack Web Secure</strong>, dan automasi proses bisnis berbasis <strong className="text-white font-bold">AI Agent & n8n</strong>.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a href="#projects" className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-600/30">
                  Lihat Proyek <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#about" className="bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs px-6 py-3 rounded-xl border border-white/10 transition flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" /> Tentang Saya & CV
                </a>
              </div>
            </div>
          }
        >
          {/* Inner Tablet Showcase Container */}
          <div className="relative w-full h-auto min-h-0 bg-[#111622]/70 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col justify-between p-5 sm:p-8 md:p-10 gap-6 shadow-2xl">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 uppercase bg-purple-950/50 px-3 py-1 rounded-full border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> FEATURED PROFILE SHOWCASE
              </div>

              <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-tight">
                High-Impact Analytics & Fullstack Systems
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                Mengintegrasikan ekosistem Data Warehouse Pentaho & Power BI dengan aplikasi web secure Node.js, PostgreSQL, dan automasi AI n8n. Memiliki kemampuan end-to-end data pipeline & arsitektur perangkat lunak enterprise.
              </p>

              {/* 4 Metrics Grid Inside Tablet */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl">
                  <div className="text-purple-400 font-bold text-sm sm:text-base md:text-xl md:font-extrabold">3.84 IPK</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1">S1 Sistem Informasi UMB</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl">
                  <div className="text-indigo-400 font-bold text-sm sm:text-base md:text-xl md:font-extrabold">BI & ETL</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1">Pentaho, Power BI, n8n</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl">
                  <div className="text-cyan-400 font-bold text-sm sm:text-base md:text-xl md:font-extrabold">Fullstack</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1">Node.js, PostgreSQL, Supabase</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl">
                  <div className="text-emerald-400 font-bold text-sm sm:text-base md:text-xl md:font-extrabold">AI Agent</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5 sm:mt-1">n8n Webhook, WhatsApp/Telegram</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons Bottom Row Inside Tablet */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-4 border-t border-white/10 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a href="#projects" className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30">
                  Lihat Proyek <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl border border-white/10 transition flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" /> Hubungi Saya
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs px-5 py-3 rounded-xl border border-white/10 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Copy className="w-4 h-4 text-purple-400" /> {copied ? "Email Tersalin!" : "Salin Email"}
              </button>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 relative z-10">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-purple-400 font-mono font-bold text-3xl">01.</span>
          <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl">TENTANG SAYA</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Quick Profile
              </h3>
              <div className="w-10 h-0.5 bg-purple-500 mb-6"></div>
              <ul className="space-y-4 text-sm">
                <li>
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Institusi</div>
                  <div className="text-white font-bold">Universitas Mercu Buana (S1)</div>
                </li>
                <li>
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Semester / IPK</div>
                  <div className="text-white font-bold">Semester 6 (3.84 / 4.00)</div>
                </li>
                <li>
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Fokus Role</div>
                  <div className="text-white font-bold">BI Analyst, Fullstack & AI Automation</div>
                </li>
                <li>
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Lokasi</div>
                  <div className="text-white font-bold">Pondok Aren, Tangerang Selatan</div>
                </li>
              </ul>
            </div>

            <button
              onClick={handleCopyEmail}
              className="mt-8 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4 text-purple-400" /> {copied ? "Email Tersalin!" : "Salin Email"}
            </button>
          </div>

          <div className="lg:col-span-2 bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl space-y-6">
            <h3 className="text-2xl font-extrabold text-white">
              Data-Driven Analytics & Software Engineering
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mahasiswa Sistem Informasi Universitas Mercu Buana dengan minat dan pengalaman mendalam di bidang <strong className="text-purple-400 font-bold">Business Intelligence, Data Analytics, Fullstack Web Engineering, dan AI Workflow Automation</strong>.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Memiliki rekam jejak praktis sebagai <strong className="text-white font-bold">Asisten Fasilitator BI di GEN-BI Kediri</strong> serta aktif mengajar dan merancang program kerja akademis di HIMSI Divisi Pendidikan. Terbiasa mengolah data secara end-to-end (preprocessing, EDA, Machine Learning, Power BI/Pentaho ETL) hingga membangun sistem fullstack secure berbasis Node.js, Express, PostgreSQL, dan n8n automation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4" /> End-to-End ETL
                </h4>
                <p className="text-xs text-slate-400">Pentaho PDI, SQL Data Warehouse, & Power BI Dashboards.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <Code2 className="w-4 h-4" /> Secure Fullstack
                </h4>
                <p className="text-xs text-slate-400">Node.js, Express, PostgreSQL, Supabase dengan RBAC security.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4" /> AI Workflow
                </h4>
                <p className="text-xs text-slate-400">Automasi n8n dengan Webhook API & WhatsApp/Telegram bots.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-1">
                  <Brain className="w-4 h-4" /> Machine Learning
                </h4>
                <p className="text-xs text-slate-400">Python (Pandas, Scikit-learn) untuk EDA & model klasifikasi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 relative z-10">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-purple-400 font-mono font-bold text-3xl">02.</span>
          <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl">EXPERIENCE & EDUCATION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work & Org */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" /> ORGANIZATION & WORK
            </h3>
            <div className="space-y-6 border-l-2 border-purple-500/40 pl-6">
              <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-xl relative">
                <div className="w-3 h-3 rounded-full bg-purple-500 absolute -left-[31px] top-7 ring-4 ring-[#0a0d14]"></div>
                <h4 className="text-base font-bold text-white mb-1">Asisten Fasilitator / Pemateri BI Data Analyst</h4>
                <div className="flex justify-between text-xs text-purple-400 font-bold mb-3">
                  <span>GEN-BI Kediri</span>
                  <span>Nov 2025 – Sekarang</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Menjadi pemateri pelatihan Business Intelligence. Menyampaikan materi end-to-end data processing (cleaning, preprocessing, EDA) hingga pembuatan interactive dashboard dengan Microsoft Excel dan visualisasi data bisnis.
                </p>
              </div>

              <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-xl relative">
                <div className="w-3 h-3 rounded-full bg-purple-500 absolute -left-[31px] top-7 ring-4 ring-[#0a0d14]"></div>
                <h4 className="text-base font-bold text-white mb-1">Divisi Pendidikan</h4>
                <div className="flex justify-between text-xs text-purple-400 font-bold mb-3">
                  <span>HIMSI UMB</span>
                  <span>Sept 2025 – Sekarang</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Merancang dan melatih program kerja peningkatan kesiapan kerja mahasiswa, mendampingi pemahaman akademik, serta menyelenggarakan kegiatan edukatif teknologi.
                </p>
              </div>
            </div>
          </div>

          {/* Academic */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" /> ACADEMIC BACKGROUND
            </h3>
            <div className="space-y-6 border-l-2 border-purple-500/40 pl-6">
              <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-xl relative">
                <div className="w-3 h-3 rounded-full bg-purple-500 absolute -left-[31px] top-7 ring-4 ring-[#0a0d14]"></div>
                <h4 className="text-base font-bold text-white mb-1">S1 Sistem Informasi (Semester 6)</h4>
                <div className="flex justify-between text-xs text-purple-400 font-bold mb-3">
                  <span>Universitas Mercu Buana - Jakarta</span>
                  <span>2023 – Sekarang</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  IPK Kumulatif: <strong className="text-purple-400 font-bold">3.84 / 4.00</strong>. Fokus pada Business Intelligence, Rekayasa Perangkat Lunak, Data Pipeline, & Analisis Sistem Enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 relative z-10">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-purple-400 font-mono font-bold text-3xl">03.</span>
          <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl">SKILLS & EXPERTISE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-between border-b border-white/10 pb-4">
              <span>SOFT SKILLS</span>
              <UserCheck className="w-5 h-5 text-purple-400" />
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="font-mono text-purple-400 font-bold">01.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Problem Solving & Analytical Thinking</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Kemampuan memecahkan masalah sistematis berbasis data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-purple-400 font-bold">02.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Public Speaking & Facilitation</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Pengalaman memfasilitasi workshop BI & edukasi teknis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-purple-400 font-bold">03.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Team Collaboration & Leadership</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Kepemimpinan di organisasi HIMSI UMB & kerja tim.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-purple-400 font-bold">04.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Time Management & Adaptability</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Disiplin mengelola proyek fullstack, riset data, & akademis.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-purple-400 font-bold">05.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Data-Driven Decision Making</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Penyusunan rekomendasi berbasis Insight Data & BI metrics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hard Skills */}
          <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-between border-b border-white/10 pb-4">
              <span>HARD SKILLS & TOOLS</span>
              <Laptop className="w-5 h-5 text-indigo-400" />
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="font-mono text-indigo-400 font-bold">01.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Business Intelligence & Data Warehouse</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Power BI</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Pentaho PDI</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">MS Excel Advanced</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">ETL Pipelines</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-indigo-400 font-bold">02.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Python & Machine Learning</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Pandas</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">NumPy</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Scikit-learn</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">EDA</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-indigo-400 font-bold">03.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">AI & Workflow Automation</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">n8n</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Webhook API</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">WhatsApp API</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Telegram Bot</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-mono text-indigo-400 font-bold">04.</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Fullstack Web Development</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Node.js</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Express.js</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">PostgreSQL</span>
                    <span className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-0.5 rounded border border-purple-500/30 font-semibold">Supabase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 relative z-10">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-purple-400 font-mono font-bold text-3xl">04.</span>
          <h2 className="text-white font-bold tracking-tight text-2xl md:text-3xl">FEATURED PROJECTS & SHOWCASE</h2>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl mb-10">
          Geser atau gunakan navigasi untuk melihat galeri 3D interaktif dokumentasi proyek dan aktivitas saya.
        </p>

        {/* 3D Coverflow Carousel Showcase */}
        <div className="mb-16 bg-[#111622]/50 border border-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-2xl">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-widest bg-purple-950/50 px-3.5 py-1 rounded-full border border-purple-500/30">
              3D Interactive Carousel
            </span>
          </div>
          <CoverflowCarousel
            slides={showcaseSlides}
            showCaption={true}
            showNavigation={true}
            showPagination={true}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {[
            { id: "all", label: "Semua Proyek" },
            { id: "fullstack", label: "Fullstack & Web" },
            { id: "bi", label: "BI & Analytics" },
            { id: "ai", label: "AI & Automation" },
            { id: "system", label: "System Design" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition ${activeFilter === tab.id
                ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20"
                : "bg-[#111622]/80 text-slate-300 hover:text-white border border-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/40 transition duration-300 ${project.id === "kbec" ? "md:col-span-2 lg:col-span-3 border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-[#111622]/80 to-[#111622]/70" : ""
                }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${project.badgeClass}`}>
                    {project.badge}
                  </span>
                </div>
                <div className="text-xs text-purple-400 font-semibold mb-4">{project.role}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((t, idx) => (
                    <span key={idx} className="bg-purple-950/40 text-purple-200 text-[11px] px-2 py-0.5 rounded border border-purple-500/30 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-purple-300 text-xs font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Lihat Detail & Arsitektur</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 relative z-10">
        <div className="bg-[#111622]/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 md:p-16 text-center">
          <span className="text-purple-400 font-mono text-xs font-bold uppercase tracking-widest">05. KONTAK</span>
          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent mt-2 mb-4">
            MARI BEKERJA SAMA
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Siap berkontribusi dalam proyek Business Intelligence, Data Analytics, Web Development, maupun AI Workflow Automation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:harjunaadiputra3@gmail.com" className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Saya
            </a>
            <button
              onClick={handleCopyEmail}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Copy className="w-4 h-4 text-purple-400" /> {copied ? "Email Tersalin!" : "Salin Email"}
            </button>
            <a href="https://wa.me/6281333141974" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400 relative z-10">
        <p>&copy; 2026 Harjuna Adi Putra Wicaksana. All rights reserved. | S1 Sistem Informasi Universitas Mercu Buana</p>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111622] border border-white/20 shadow-2xl rounded-2xl max-w-xl w-full p-6 md:p-8 relative space-y-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 p-2 rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            <span className={`text-[10px] font-bold px-2.5 py-1 rounded border inline-block ${selectedProject.badgeClass}`}>
              {selectedProject.badge}
            </span>
            <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
            <div className="text-xs text-purple-400 font-semibold">{selectedProject.role}</div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">{selectedProject.desc}</p>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Fitur & Arsitektur Utama:</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside font-normal">
                {selectedProject.details.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedProject.tags.map((t: string, idx: number) => (
                <span key={idx} className="bg-purple-950/40 text-purple-200 text-[11px] px-2.5 py-1 rounded border border-purple-500/30 font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 right-6 bg-purple-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Check className="w-4 h-4" /> Email berhasil disalin ke clipboard!
        </div>
      )}

    </KineticGrid>
  );
}
