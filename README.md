# CineClip AI Studio (Siap Deploy ke GitHub & Vercel)

Aplikasi web pembuat rangkaian visual **Satu Konsep • Berbagai Tempat Berbeda** (hingga 30 scene) dari gambar referensi Anda.

## Perbaikan yang Telah Dilakukan
- **Perbaikan Error `[vite]: Rollup failed to resolve import "/src/main.jsx"`**: Struktur import pada `index.html` telah disesuaikan menjadi `./main.jsx` (tanpa perlu subfolder `src/`), sehingga saat Anda mengunggah seluruh file langsung ke repository GitHub, Vercel dapat langsung menemukan `main.jsx` dan `App.jsx` tanpa error.
- Ditambahkan konfigurasi `vercel.json` untuk memastikan proses build Vite berjalan otomatis di Vercel.

## Cara Upload ke GitHub & Deploy ke Vercel
1. Ekstrak file ZIP ini di komputer Anda.
2. Buka repository GitHub Anda, klik **Add file** -> **Upload files**.
3. Pilih semua file hasil ekstrak (`index.html`, `main.jsx`, `App.jsx`, `package.json`, `vite.config.js`, `vercel.json`, `README.md`) lalu klik **Commit changes**.
4. Di Vercel, proyek akan otomatis ter-deploy ulang dan langsung berhasil.
