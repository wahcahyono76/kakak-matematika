# 🧮 Kakak Matematika

> Chatbot AI ramah anak untuk membantu siswa belajar matematika dengan cara yang menyenangkan — **menyesuaikan usia pengguna** (SD kelas 1-3, SD kelas 4-6, SMP, dan SMA).

🔗 **Live Demo**: [https://kakak-matematika.vercel.app](https://kakak-matematika.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwind-css)
![Gemini](https://img.shields.io/badge/Gemini-3.8--flash-4285F4?logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## 📖 Tentang Proyek

**Kakak Matematika** adalah chatbot berbasis AI yang dirancang untuk membantu anak belajar matematika dengan pendekatan yang **ramah, sabar, dan menyesuaikan usia**. Alih-alih memberikan jawaban langsung, "Kakak" membimbing anak berpikir melalui:

- 🎨 **Perumpamaan sehari-hari** — permen, pizza, uang jajan
- 🧠 **Metode Socratic** — memancing dengan pertanyaan
- 😊 **Bahasa santai & hangat** — seperti kakak sendiri
- 👶 **Adaptif usia** — gaya bahasa otomatis menyesuaikan kelas pengguna
- ✨ **Emoji** — bikin belajar tidak membosankan

---

## ✨ Fitur

- 🎓 **Persona ramah anak** — "Kakak Matematika" dengan gaya bahasa santai
- 👶 **Adaptif usia** — bot menyesuaikan gaya bahasa untuk SD kelas 1-3, SD kelas 4-6, SMP, dan SMA
- 💬 **Memory percakapan** — bot ingat konteks percakapan sebelumnya
- 🧩 **Bimbingan bertahap** — tidak langsung memberi jawaban
- 🌈 **UI modern** — gradient lembut, rounded, nyaman dilihat anak
- ⚡ **Responsif** — dibangun dengan Next.js App Router

---

## 🛠️ Teknologi

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS 4 |
| AI Model | Google Gemini (`gemini-3.8-flash`) |
| SDK | `@google/genai` |
| Bahasa | TypeScript |

---

## 🚀 Cara Menjalankan

### 1. Clone repository
```bash
git clone https://github.com/wahcahyono76/kakak-matematika.git
cd kakak-matematika
```

### 2. Install dependencies
```bash
npm install
```

### 3. Dapatkan API Key Gemini
Kunjungi [Google AI Studio](https://aistudio.google.com/apikey), buat API Key gratis.

### 4. Buat file `.env.local`
Di root proyek, buat file `.env.local`:
```bash
GEMINI_API_KEY=your_api_key_here
```

### 5. Jalankan server
```bash
npm run dev
```

### 6. Buka di browser
```
http://localhost:3000
```

---

## 📸 Screenshot

### Tampilan Awal
![Tampilan Awal](public/screenshots/awal.jpg)

### Percakapan dengan Kakak
![Percakapan 1](public/screenshots/percakapan1.jpg)

![Percakapan 2](public/screenshots/percakapan2.jpg)

### Memory Percakapan
![Memory](public/screenshots/memory.jpg)

---

## 🧠 Cara Kerja Memory Percakapan

Chatbot ini menggunakan **client-side history** untuk menjaga konteks percakapan:

1. Setiap pesan user & balasan bot disimpan di state `messages` (`app/page.tsx`)
2. Saat user mengirim pesan baru, **seluruh riwayat** dikirim ke backend
3. Backend menyusun array `contents` dari riwayat + pesan baru, lalu mengirimnya ke Gemini API
4. Gemini memahami konteks dari array tersebut dan membalas sesuai topik sebelumnya

Implementasi ada di:
- `app/api/chat/route.ts` — backend (menyusun `contents`)
- `app/page.tsx` — frontend (state management)
- `lib/systemInstruction.ts` — prompt persona & aturan adaptif usia

---

## 📁 Struktur Proyek

```
kakak-matematika/
├── app/
│   ├── api/chat/route.ts       # Endpoint API Gemini
│   ├── layout.tsx              # Layout global
│   ├── page.tsx                # Halaman utama chat
│   └── globals.css             # Style global
├── components/
│   ├── ChatHeader.tsx          # Header gradient
│   ├── ChatBubble.tsx          # Bubble pesan
│   └── ChatInput.tsx           # Input & tombol kirim
├── lib/
│   └── systemInstruction.ts    # Prompt persona & adaptif usia
├── public/
│   └── screenshots/            # Screenshot untuk README
├── .env.local                  # API key (TIDAK di-commit)
└── README.md
```

---

## 🎯 Contoh Percakapan

### Contoh 1 — Anak SD kelas 1-3
**User:** `3 + 5 berapa?`

**Kakak Matematika:**
> Halo! Pertanyaan yang bagus banget! ✨
> Coba bayangkan kamu punya 3 permen rasa stroberi 🍓. Terus, Kakak kasih lagi 5 permen rasa jeruk 🍊.
> Nah, sekarang coba kita hitung bareng-bareng pakai jari ya! Mulai dari angka 3, lalu maju 5 jari ke depan: 4... 5... 6... 7... 8!
> Hayo, jari yang kelima angkanya berapa? 🤔🍓

### Contoh 2 — Anak SMP
**User:** `Aku kelas 8. Bagaimana cara menyelesaikan 2x + 3 = 11?`

**Kakak Matematika:**
> Oke, kita selesaikan langkah demi langkah ya.
> Pertama, kita ingin "x" sendirian di satu sisi. Kurangi kedua sisi dengan 3:
> 2x + 3 - 3 = 11 - 3 → 2x = 8
> Lalu bagi kedua sisi dengan 2:
> 2x / 2 = 8 / 2 → x = 4
> Coba kamu cek: kalau x = 4, apakah 2(4) + 3 = 11? 😊

---

## 📝 Lisensi

MIT License — bebas digunakan untuk pembelajaran.

---

## 🙏 Kredit

Dibuat sebagai proyek akhir kelas **AI Productivity and AI API Integration for Developers** — Hacktiv8.