# SMALLGAPS Coffee — React + TypeScript + Motion

Website satu halaman responsif untuk Small Gaps Coffee di lantai 2 Hotel Starlet BSD. Project ini sudah menggunakan React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, lucide-react, dan struktur folder yang kompatibel dengan shadcn/ui.

## Menjalankan project

Pastikan Node.js 20.19+ atau 22.12+ dan npm telah terpasang. Dari folder project, jalankan:

```bash
npm install
npm run dev
```

Vite akan menampilkan URL lokal (umumnya `http://localhost:5173`). Untuk mengecek build production:

```bash
npm run build
npm run preview
```

> Instalasi paket memerlukan koneksi internet. Dependensi dicantumkan di `package.json`; folder `node_modules` tidak disertakan di ZIP.

## Struktur penting

```text
src/
  App.tsx
  index.css
  data/menu.ts
  lib/utils.ts
  components/ui/
    parallax-scroll-feature-section.tsx
    zoom-parallax-section.tsx
public/assets/
  ...foto Small Gaps...
components.json
vite.config.ts
```

Folder komponen UI berada di `src/components/ui` dan alias `@/components/ui` sudah dikonfigurasi. Ini mengikuti pola shadcn/ui agar komponen UI reusable mudah ditambah atau dikustomisasi, sementara `@/lib/utils` menyediakan helper `cn()`.

## shadcn/ui

Project sudah memiliki `components.json`, Tailwind, TypeScript, alias `@/*`, serta folder komponen UI. Jika ingin menambahkan komponen shadcn setelah `npm install`, jalankan dari root project:

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

Periksa opsi inisialisasi agar tidak mengganti stylesheet dan alias yang sudah dikustomisasi.

## Motion yang terintegrasi

- **Scroll reveal dan stagger** untuk teks dan kartu menu menggunakan `framer-motion`.
- **Parallax feature rows** dengan reveal foto berbasis `clipPath`, opacity, dan pergeseran vertikal. Setiap baris menjadi komponen React sendiri sehingga hooks tidak dipanggil di dalam loop.
- **Pinned zoom parallax** pada `zoom-parallax-section.tsx`: section tinggi menahan satu viewport, foto utama membesar sesuai progres scroll, dan foto pendukung terdorong keluar frame.
- Progress bar halaman, parallax ringan pada hero, animasi pemilihan kategori menu, dan lightbox galeri.
- Preferensi `prefers-reduced-motion` dihormati untuk mengurangi pergerakan.

## Data bisnis

**Alamat:** Hotel Starlet BSD, Jl. BSD Boulevard Utara Lt. 2, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331  
**Telepon:** 0818-199-099  
**Google Maps:** https://maps.app.goo.gl/K2GooMeQ3badv5aZ9  
**Instagram:** https://www.instagram.com/smallgaps.id/  
**Jam buka yang tercantum pada papan:** 08.00–22.00 setiap hari (konfirmasi sebelum publikasi).

## Menu

Menu bersumber dari PDF digital menu yang diberikan. Satu kategori ditampilkan pada satu waktu; kategori "Semua menu" tidak ada. Pencarian dibatasi pada kategori aktif. Angka harga menu diperlakukan sebagai ribuan Rupiah; teks harga `40 | 80 | 250` untuk TropiTwist dan Forbidden Fruit dipertahankan sebagaimana dicantumkan pada PDF agar tidak ditebak artinya.

## Foto

Aset foto yang tersedia dikemas di `public/assets`. Nama aset `*-optimized.webp` berasal dari foto interior yang dioptimalkan untuk tampilan responsif. Upscaling tidak dapat menciptakan detail fotografi yang tidak ada pada sumber.

## Catatan publikasi

Project source telah disiapkan, tetapi dependensi belum di-install pada lingkungan pembuat karena akses registry npm tidak tersedia saat penyusunan. Jalankan `npm install` di lingkungan dengan akses registry sebelum menjalankan Vite/build. Belum ada domain atau hosting yang dihubungkan.
