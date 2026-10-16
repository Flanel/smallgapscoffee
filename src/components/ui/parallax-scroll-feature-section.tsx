import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Coffee, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature = {
  id: string;
  kicker: string;
  title: string;
  accent: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
  tone?: "paper" | "dark";
  icon: "coffee" | "heart" | "sparkles";
};

const sections: Feature[] = [
  {
    id: "01",
    kicker: "A PLACE TO PAUSE",
    title: "Ruang kecil,",
    accent: "cerita besar.",
    description:
      "Di tengah hari yang bergerak cepat, Small Gaps memberi ruang untuk menurunkan tempo. Datang untuk secangkir kopi, duduk sejenak, dan nikmati momen yang sering terlewat.",
    imageUrl: "/assets/interior-wide-optimized.webp",
    imageAlt: "Area utama Small Gaps Coffee dengan meja kayu dan pencahayaan hangat",
    icon: "coffee",
    tone: "dark",
  },
  {
    id: "02",
    kicker: "MADE WITH CARE",
    title: "Diracik dengan",
    accent: "perhatian.",
    description:
      "Dari Gaps Latte yang dinikmati berlapis sampai minuman segar berbasis buah, setiap pilihan dibuat untuk menemani suasana hati dan ritme harimu.",
    imageUrl: "/assets/signature-pour.webp",
    imageAlt: "Minuman kopi berlapis dengan susu di atas meja kayu",
    reverse: true,
    icon: "heart",
    tone: "paper",
  },
  {
    id: "03",
    kicker: "GOOD FOOD, GOOD COMPANY",
    title: "Tinggal sedikit",
    accent: "lebih lama.",
    description:
      "Bagikan camilan, pesan comfort food favorit, atau lanjutkan obrolan tanpa buru-buru. Karena terkadang, bagian terbaik dari hari adalah waktu yang kita habiskan bersama.",
    imageUrl: "/assets/table-detail-optimized.webp",
    imageAlt: "Meja Small Gaps Coffee dengan minuman dan camilan",
    icon: "sparkles",
    tone: "dark",
  },
];

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  if (name === "coffee") return <Coffee size={18} strokeWidth={1.5} />;
  if (name === "heart") return <Heart size={18} strokeWidth={1.5} />;
  return <Sparkles size={18} strokeWidth={1.5} />;
}

function ParallaxFeatureRow({ feature }: { feature: Feature }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.65], [0.12, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.78],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const textY = useTransform(scrollYProgress, [0, 1], [54, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [72, -18]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "parallax-feature-row",
        feature.reverse && "is-reversed",
        feature.tone === "paper" ? "feature-tone-paper" : "feature-tone-dark",
      )}
    >
      <motion.div
        className="parallax-feature-copy"
        style={{ opacity: prefersReducedMotion ? 1 : opacity, y: prefersReducedMotion ? 0 : textY }}
      >
        <p className="eyebrow">
          <span className="eyebrow-line" /> {feature.kicker}
        </p>
        <div className="feature-index">SMALLGAPS / {feature.id}</div>
        <h3>
          {feature.title}
          <br />
          <em>{feature.accent}</em>
        </h3>
        <p className="feature-description">{feature.description}</p>
        <div className="feature-bottomline">
          <span className="feature-icon"><FeatureIcon name={feature.icon} /></span>
          <span>GOOD COFFEE <b>·</b> GOOD FOOD <b>·</b> GOOD COMPANY</span>
          <a href="#lokasi" aria-label="Kunjungi Small Gaps Coffee"><ArrowUpRight size={18} /></a>
        </div>
      </motion.div>

      <motion.div
        className="parallax-feature-image-wrap"
        style={{
          opacity: prefersReducedMotion ? 1 : opacity,
          clipPath: prefersReducedMotion ? "inset(0 0% 0 0)" : clipPath,
          y: prefersReducedMotion ? 0 : imageY,
        }}
      >
        <img src={feature.imageUrl} alt={feature.imageAlt} loading="lazy" decoding="async" />
        <div className="parallax-image-overlay" />
        <span className="parallax-image-number">{feature.id} / SMALLGAPS MOMENTS</span>
      </motion.div>
    </section>
  );
}

export function Component() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="parallax-feature-section" aria-labelledby="parallax-feature-title">
      <div className="parallax-feature-intro">
        <motion.p
          className="eyebrow"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow-line" /> GOOD COFFEE × GOOD FOOD × GOOD VIBES
        </motion.p>
        <motion.h2
          id="parallax-feature-title"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Small moments,<br /><em>bigger connections.</em>
        </motion.h2>
        <p className="parallax-intro-copy">
          Scroll pelan-pelan. Kenali tempat, racikan, dan momen yang membuat Small Gaps terasa berbeda.
        </p>
        <motion.a
          href="#feature-row-01"
          className="parallax-scroll-cue"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL UNTUK MENJELAJAH <ArrowDown size={14} />
        </motion.a>
      </div>
      <div className="parallax-feature-rows">
        {sections.map((feature) => (
          <div key={feature.id} id={`feature-row-${feature.id}`}>
            <ParallaxFeatureRow feature={feature} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Component;
