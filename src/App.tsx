import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Armchair,
  Check,
  Clock3,
  Copy,
  Heart,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  Sparkles,
  Wifi,
  X,
} from "lucide-react";
import { Component as ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { ZoomParallaxSection } from "@/components/ui/zoom-parallax-section";
import { menuData, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const MAPS_URL = "https://maps.app.goo.gl/K2GooMeQ3badv5aZ9";
const PHONE_DISPLAY = "0818-199-099";
const PHONE_LINK = "tel:+62818199099";
const ADDRESS = "Hotel Starlet BSD, Jl. BSD Boulevard Utara Lt. 2, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331";
const INSTAGRAM_URL = "https://www.instagram.com/smallgaps.id/";

const categoryGroups = [
  { id: "signature", label: "Signature", categories: ["Signature Drinks"] },
  { id: "coffee", label: "Kopi", categories: ["Coffee", "Flavored Coffee"] },
  { id: "noncoffee", label: "Non-kopi", categories: ["Kawa", "Milkies & Non-Coffee", "Tea & Other Drinks"] },
  { id: "dessert", label: "Affogato & dessert", categories: ["Affogato", "Dessert"] },
  { id: "bites", label: "Camilan", categories: ["Lite Bites"] },
  { id: "mains", label: "Makanan utama", categories: ["All-day Dining", "Sandwiches"] },
  { id: "addons", label: "Tambahan", categories: ["Add-ons"] },
] as const;

type CategoryId = (typeof categoryGroups)[number]["id"];
type GalleryPhoto = { src: string; alt: string; caption: string };

const categoryLabels: Record<string, string> = {
  "Signature Drinks": "Signature",
  Coffee: "Kopi",
  "Flavored Coffee": "Kopi rasa",
  Affogato: "Affogato",
  Kawa: "Kawa",
  "Milkies & Non-Coffee": "Milkies & non-kopi",
  "Tea & Other Drinks": "Teh & lainnya",
  "Lite Bites": "Camilan",
  Dessert: "Dessert",
  "All-day Dining": "Makanan utama",
  Sandwiches: "Sandwich",
  "Add-ons": "Tambahan",
};

const signatureItems = [
  {
    name: "Gaps Latte",
    price: 58,
    description: "Espresso segar berpadu dengan susu olahan khas kami, diracik untuk dinikmati berlapis.",
    image: "/assets/signature-pour.webp",
    alt: "Minuman kopi berlapis dengan susu",
    kicker: "HOUSE FAVORITE",
    note: "Terbaik dinikmati dalam 5 menit",
    category: "signature" as CategoryId,
  },
  {
    name: "Markizza",
    price: 55,
    description: "Sparkling iced Americano dengan passion fruit olahan.",
    image: "/assets/espresso-tonic.webp",
    alt: "Minuman signature segar di Small Gaps",
    kicker: "BRIGHT & BUBBLY",
    note: "Signature coffee",
    category: "signature" as CategoryId,
  },
  {
    name: "Classic Affogato",
    price: 55,
    description: "Es krim vanilla lembut dipadukan dengan espresso yang baru diseduh.",
    image: "/assets/affogato.webp",
    alt: "Classic affogato dengan es krim dan espresso",
    kicker: "A SWEET FINISH",
    note: "Kopi bertemu dessert",
    category: "dessert" as CategoryId,
  },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/assets/interior-wide-optimized.webp",
    alt: "Area utama Small Gaps Coffee dengan meja kayu dan interior bernuansa gelap",
    caption: "Area utama Small Gaps Coffee di Hotel Starlet BSD",
  },
  {
    src: "/assets/space-entrance-optimized.webp",
    alt: "Area pintu masuk Small Gaps Coffee",
    caption: "Pintu masuk Small Gaps Coffee",
  },
  {
    src: "/assets/table-detail-optimized.webp",
    alt: "Meja kayu dengan minuman dan camilan",
    caption: "Detail meja dan momen kecil di Small Gaps",
  },
];

function formatPrice(price: number | string) {
  if (typeof price === "string") return price;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price * 1000);
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("eyebrow", dark && "eyebrow-dark")}>
      <span className="eyebrow-line" /> {children}
    </p>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("reveal", className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.68, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  return <div className="scroll-progress" aria-hidden="true"><motion.span style={{ scaleX }} /></div>;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  const navLinks = [
    { label: "Tentang", href: "#tentang" },
    { label: "Favorit", href: "#favorit" },
    { label: "Menu", href: "#menu" },
    { label: "Suasana", href: "#suasana" },
    { label: "Lokasi", href: "#lokasi" },
  ];

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="Small Gaps Coffee, beranda" onClick={() => setIsOpen(false)}>
        <span className="brand-mark" aria-hidden="true">sg<span>.</span></span>
        <span className="brand-name">SMALLGAPS<small>COFFEE · BITES · MORE</small></span>
      </a>
      <button
        className="menu-toggle"
        id="menuToggle"
        type="button"
        aria-label={isOpen ? "Tutup navigasi" : "Buka navigasi"}
        aria-expanded={isOpen}
        aria-controls="mainNav"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} /> : <MenuIcon size={22} />}
      </button>
      <nav className={cn("main-nav", isOpen && "is-open")} id="mainNav" aria-label="Navigasi utama">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</a>
        ))}
        <a className="nav-cta" href={MAPS_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
          Arah ke sini <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useSpring(useTransform(scrollY, [0, 720], [0, 105]), { stiffness: 65, damping: 24 });
  return (
    <section className="hero section-dark" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Reveal><Eyebrow>JEDA KECILMU DI BSD</Eyebrow></Reveal>
        <Reveal delay={0.06}><h1 id="hero-title">Small gaps,<br /><em>bigger moments.</em></h1></Reveal>
        <Reveal delay={0.12}><p className="hero-intro">Kopi yang dibuat dengan perhatian, hidangan yang comforting, dan ruang hangat untuk mengambil jeda dari ramainya hari.</p></Reveal>
        <Reveal delay={0.18}>
          <div className="hero-actions">
            <a className="button button-light" href="#menu">Jelajahi menu <ArrowDown size={15} /></a>
            <a className="button button-ghost" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Kunjungi kami <ArrowUpRight size={15} /></a>
          </div>
        </Reveal>
        <Reveal delay={0.24}><div className="hero-meta"><span className="meta-dot" aria-hidden="true" /><span>HOTEL STARLET BSD <b>·</b> LANTAI 2</span></div></Reveal>
        <Reveal delay={0.3}>
          <div className="hero-note"><span className="hero-note-icon"><Sparkles size={16} /></span><span><strong>Make room for a pause.</strong><small>Good coffee · Good food · Good company</small></span></div>
        </Reveal>
      </div>
      <div className="hero-visual">
        <motion.img
          className="hero-photo"
          src="/assets/interior-wide-optimized.webp"
          alt="Area duduk Small Gaps Coffee dengan meja kayu dan suasana interior yang hangat"
          fetchPriority="high"
          decoding="async"
          style={{ y: prefersReducedMotion ? 0 : imageY }}
        />
        <div className="photo-shade" aria-hidden="true" />
        <div className="hero-photo-chip"><span className="chip-dot" aria-hidden="true" /> A cozy corner in BSD</div>
        <div className="hero-photo-caption"><span>01</span> / THE SMALLGAPS SPACE</div>
      </div>
      <a className="scroll-cue" href="#info-singkat"><span>GULIR UNTUK MENJELAJAH</span><i aria-hidden="true" /></a>
    </section>
  );
}


function QuickInfo() {
  return (
    <section className="quick-info section-paper" id="info-singkat" aria-label="Informasi singkat Small Gaps Coffee">
      <a className="quick-info-item" href="#lokasi"><span className="quick-icon"><MapPin size={20} /></span><span><small>LOKASI</small><strong>Hotel Starlet BSD, lantai 2</strong><em>Lihat detail alamat <b>↗</b></em></span></a>
      <div className="quick-info-item"><span className="quick-icon"><Clock3 size={20} /></span><span><small>JAM BUKA</small><strong>08.00–22.00</strong><em>Setiap hari*</em></span></div>
      <a className="quick-info-item" href={PHONE_LINK}><span className="quick-icon"><Phone size={19} /></span><span><small>HUBUNGI KAMI</small><strong>{PHONE_DISPLAY}</strong><em>Ketuk untuk menelepon</em></span></a>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro-section section-paper" id="tentang" aria-labelledby="intro-heading">
      <Reveal className="intro-number">[ 001 — SEBUAH JEDA ]</Reveal>
      <Reveal className="intro-content" delay={0.06}>
        <Eyebrow dark>LEBIH DARI SEKADAR COFFEE BREAK</Eyebrow>
        <h2 id="intro-heading">Untuk momen kecil<br />yang terasa <em>berarti.</em></h2>
      </Reveal>
      <Reveal className="intro-aside" delay={0.12}>
        <p>Terkadang, yang kita butuhkan cuma secangkir kopi yang enak, sesuatu yang dibuat dengan hati, dan sudut nyaman untuk melambat sejenak.</p>
        <a href="#favorit" className="circle-link" aria-label="Lihat menu favorit"><ArrowDown size={18} /></a>
      </Reveal>
      <div className="ticker" aria-hidden="true"><div className="ticker-track"><span>COFFEE MADE WITH CARE</span><b>✳</b><span>BITES WORTH SHARING</span><b>✳</b><span>ROOM TO RESET</span><b>✳</b><span>COFFEE MADE WITH CARE</span><b>✳</b><span>BITES WORTH SHARING</span><b>✳</b><span>ROOM TO RESET</span><b>✳</b></div></div>
    </section>
  );
}

function SignatureSection({ onChooseCategory }: { onChooseCategory: (category: CategoryId) => void }) {
  return (
    <section className="signature-section section-dark" id="favorit" aria-labelledby="favorites-heading">
      <Reveal className="section-heading">
        <div><Eyebrow>MULAI DARI YANG FAVORIT</Eyebrow><h2 id="favorites-heading">Our little <em>favorites.</em></h2></div>
        <p>Pilihan untuk memulai jeda: signature drink, kopi berkarakter, hingga dessert untuk penutup yang manis.</p>
      </Reveal>
      <div className="signature-grid">
        {signatureItems.map((item, index) => (
          <motion.article
            className={cn("signature-card", index === 0 && "sig-large")}
            key={item.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.64, delay: index * 0.11 }}
          >
            <a className="signature-image" href="#menu" aria-label={`Cari ${item.name} pada menu`} onClick={() => onChooseCategory(item.category)}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <span className="image-index">SG / 0{index + 1}</span>
              <span className="image-hover-cta">Lihat menu <b>↗</b></span>
            </a>
            <div className="signature-copy"><span className="card-kicker">{item.kicker}</span><h3>{item.name}</h3><p>{item.description}</p><div className="item-footer"><span>{item.note}</span><strong>{formatPrice(item.price)}</strong></div></div>
          </motion.article>
        ))}
      </div>
      <Reveal className="signature-bottom"><span>DIBUAT UNTUK MENEMANI HARI</span><a href="#menu" className="underlined-link">Jelajahi semua menu <ArrowUpRight size={14} /></a></Reveal>
    </section>
  );
}

function MenuSection({ initialCategory }: { initialCategory: CategoryId }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [query, setQuery] = useState("");

  useEffect(() => setSelectedCategory(initialCategory), [initialCategory]);
  const activeGroup = categoryGroups.find((group) => group.id === selectedCategory) ?? categoryGroups[0];
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
    return menuData.filter((item: MenuItem) => {
      const inCategory = (activeGroup.categories as readonly string[]).includes(item.category);
      const searchable = `${item.name} ${item.category} ${categoryLabels[item.category] ?? ""} ${item.description ?? ""}`.toLocaleLowerCase("id-ID");
      return inCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeGroup, query]);

  function selectCategory(category: CategoryId) {
    setSelectedCategory(category);
    setQuery("");
  }

  return (
    <section className="menu-section section-paper" id="menu" aria-labelledby="menu-heading">
      <Reveal className="menu-top">
        <div><Eyebrow dark>PILIH SESUAI MOOD-MU</Eyebrow><h2 id="menu-heading">Find your<br /><em>new favorite.</em></h2></div>
        <div className="menu-intro"><p>Dari kopi pertama di pagi hari sampai comfort food untuk mengisi energi, temukan pilihanmu di menu Small Gaps.</p><span className="menu-note">MENU DIGITAL · HARGA DALAM RUPIAH</span></div>
      </Reveal>
      <Reveal className="menu-controls">
        <div className="category-tabs" id="categoryTabs" role="group" aria-label="Pilih kategori menu">
          {categoryGroups.map((category) => (
            <button
              key={category.id}
              type="button"
              className={cn("category-tab", selectedCategory === category.id && "active")}
              aria-pressed={selectedCategory === category.id}
              onClick={() => selectCategory(category.id)}
            >{category.label}</button>
          ))}
        </div>
        <label className="menu-search"><Search size={16} aria-hidden="true" /><span className="visually-hidden">Cari menu di kategori {activeGroup.label}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={`Cari di ${activeGroup.label.toLocaleLowerCase("id-ID")}...`} autoComplete="off" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Hapus pencarian"><X size={15} /></button>}</label>
      </Reveal>
      <div className="menu-active-heading"><span>{activeGroup.label}</span><span aria-live="polite">{visibleItems.length} pilihan</span></div>
      <div className="menu-list" id="menuList" aria-live="polite">
        <AnimatePresence mode="wait">
          {visibleItems.length ? (
            <motion.div className="menu-grid-inner" key={selectedCategory + query} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }}>
              {visibleItems.map((item, index) => (
                <motion.article className="menu-item" key={`${selectedCategory}-${item.name}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: Math.min(index * 0.025, 0.3) }}>
                  <div className="menu-item-top"><h3>{item.name}</h3><strong className="menu-price">{formatPrice(item.price)}</strong></div>
                  <span className="menu-item-category">{categoryLabels[item.category] ?? item.category}</span>
                  {item.description ? <p>{item.description}</p> : <p className="menu-no-description" aria-hidden="true">&nbsp;</p>}
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div className="menu-empty" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Search size={25} strokeWidth={1.4} aria-hidden="true" /><strong>Belum ada menu yang cocok</strong><p>Coba kata kunci lain atau pilih kategori menu yang berbeda.</p>{query && <button className="button button-outline button-small" type="button" onClick={() => setQuery("")}>Hapus pencarian</button>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="menu-bottom-note"><Sparkles size={14} aria-hidden="true" /><p>Harga, varian, dan ketersediaan menu dapat berubah. Untuk item dengan beberapa pilihan, tanyakan variasi yang tersedia kepada tim Small Gaps.</p></div>
    </section>
  );
}

function GallerySection({ onOpen }: { onOpen: (photo: GalleryPhoto) => void }) {
  return (
    <section className="space-section section-dark" id="suasana" aria-labelledby="space-heading">
      <Reveal className="space-section-head"><Eyebrow>RUANG UNTUK MENJEDA</Eyebrow><h2 id="space-heading">Stay for the<br /><em>atmosphere.</em></h2><p className="space-lead">Nuansa gelap, sentuhan kayu, cahaya hangat, dan meja untuk cerita yang tidak harus buru-buru selesai.</p></Reveal>
      <div className="gallery-grid">
        {galleryPhotos.map((photo, index) => (
          <motion.button
            key={photo.src}
            className={cn("gallery-photo", index === 0 && "gallery-photo-main", index === 1 && "gallery-photo-portrait", index === 2 && "gallery-photo-table")}
            type="button"
            onClick={() => onOpen(photo)}
            aria-label={`Perbesar foto: ${photo.caption}`}
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            <span className="gallery-label"><span>0{index + 1} / {index === 0 ? "MAIN SPACE" : index === 1 ? "THE ENTRANCE" : "TABLE MOMENTS"}</span><b aria-hidden="true"><ArrowUpRight size={15} /></b></span>
          </motion.button>
        ))}
      </div>
      <div className="gallery-hint"><span>FOTO SUASANA SMALL GAPS</span><span>Ketuk foto untuk memperbesar <ArrowUpRight size={12} /></span></div>
      <div className="space-perks"><span><Armchair size={17} /> Cozy space</span><span><Wifi size={17} /> Free Wi-Fi</span><span><Heart size={17} /> Good company</span></div>
    </section>
  );
}


function LocationSection() {
  const [copied, setCopied] = useState(false);
  async function copyAddress() {
    let success = false;
    try {
      await navigator.clipboard.writeText(ADDRESS);
      success = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = ADDRESS;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      success = document.execCommand("copy");
      textarea.remove();
    }
    setCopied(success);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <>
      <section className="visit-section section-caramel" id="lokasi" aria-labelledby="visit-heading">
        <Reveal className="visit-left"><Eyebrow dark>JEDA BERIKUTNYA DIMULAI DI SINI</Eyebrow><h2 id="visit-heading">We'll save<br />you a <em>seat.</em></h2><p>Mampir untuk daily coffee, camilan di tengah aktivitas, atau makan santai bersama orang-orang terdekat. Kami ada di lantai 2 Hotel Starlet BSD.</p><div className="visit-actions"><a className="button button-dark" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Buka Google Maps <ArrowUpRight size={15} /></a><a className="phone-link" href={PHONE_LINK}>Hubungi {PHONE_DISPLAY} <ArrowUpRight size={13} /></a></div></Reveal>
        <Reveal className="visit-card" delay={0.1}>
          <div className="visit-card-top"><span>SMALLGAPS / BSD</span><span>02F — ID</span></div>
          <div className="visit-card-mid"><span className="visit-mark">sg<span>.</span></span><h3>Find your<br />small gap.</h3><p>Good coffee · Good food · Good company</p></div>
          <div className="visit-info">
            <div className="visit-detail"><span>ALAMAT</span><p>{ADDRESS}</p></div>
            <div className="visit-detail visit-detail-row"><div><span>JAM BUKA*</span><p>08.00–22.00<br />Setiap hari</p></div><div><span>TELEPON</span><p><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></p></div></div>
            <div className="visit-card-links"><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Petunjuk arah <ArrowUpRight size={13} /></a><button type="button" onClick={copyAddress}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Alamat tersalin" : "Salin alamat"}</button><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@smallgaps.id <ArrowUpRight size={13} /></a></div>
          </div>
          <div className="visit-card-stamp" aria-hidden="true">A LITTLE<br />OFF THE<br />BUSY DAY.</div>
        </Reveal>
      </section>
      <p className="hours-note">Jam buka dan ketersediaan menu dapat berubah. Cek Instagram <strong>@smallgaps.id</strong> untuk pembaruan terbaru.</p>
    </>
  );
}

function FinalCta() {
  return (
    <section className="final-cta section-dark" aria-labelledby="final-heading">
      <div className="final-cta-image"><img src="/assets/table-detail-optimized.webp" alt="" loading="lazy" decoding="async" /></div>
      <Reveal className="final-cta-copy"><Eyebrow>TAKE A LITTLE PAUSE</Eyebrow><h2 id="final-heading">Hari ini, luangkan<br />waktu untuk <em>dirimu.</em></h2><p>Kopi favorit, meja yang nyaman, dan suasana yang bikin ingin tinggal sedikit lebih lama.</p><a className="button button-light" href={MAPS_URL} target="_blank" rel="noopener noreferrer">Yuk, mampir ke Small Gaps <ArrowUpRight size={15} /></a></Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-dark">
      <div className="footer-top"><a className="footer-logo" href="#top">SMALLGAPS<span>.</span></a><p>Make room for a pause.</p><a className="back-top" href="#top">KEMBALI KE ATAS <ArrowUp size={12} /></a></div>
      <div className="footer-details"><span>Hotel Starlet BSD · Lantai 2</span><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Buka Maps <ArrowUpRight size={12} /></a><a href={PHONE_LINK}>{PHONE_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={12} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} SMALLGAPS COFFEE</span><span>COFFEE · BITES · ALL DAY DINING</span><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@SMALLGAPS.ID ↗</a></div>
    </footer>
  );
}

function MobileActionBar() {
  return <div className="mobile-action-bar" aria-label="Aksi cepat"><a href="#menu">Lihat menu</a><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Petunjuk arah <ArrowUpRight size={14} /></a></div>;
}

function PhotoLightbox({ photo, onClose }: { photo: GalleryPhoto | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("lightbox-open");
    };
  }, [photo, onClose]);
  return (
    <AnimatePresence>
      {photo && (
        <motion.div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={photo.caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="photo-lightbox-panel" initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.24 }} onClick={(event) => event.stopPropagation()}>
            <div className="photo-lightbox-top"><span>{photo.caption}</span><button type="button" onClick={onClose} aria-label="Tutup foto"><X size={18} /> Tutup</button></div>
            <img src={photo.src} alt={photo.alt} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [menuCategoryFromFavorite, setMenuCategoryFromFavorite] = useState<CategoryId>("signature");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#main-content">Langsung ke konten</a>
      <Header />
      <main id="main-content">
        <Hero />
        <QuickInfo />
        <Intro />
        <ParallaxScrollFeatureSection />
        <SignatureSection onChooseCategory={setMenuCategoryFromFavorite} />
        <ZoomParallaxSection />
        <MenuSection initialCategory={menuCategoryFromFavorite} />
        <GallerySection onOpen={setActivePhoto} />
        <LocationSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <PhotoLightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </>
  );
}
