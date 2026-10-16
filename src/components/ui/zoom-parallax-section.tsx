import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ZoomTileConfig = {
  src: string;
  alt: string;
  className: string;
  x: number;
  y: number;
};

const tiles: ZoomTileConfig[] = [
  { src: "/assets/interior-wide-optimized.webp", alt: "Interior Small Gaps Coffee", className: "zoom-tile-one", x: -660, y: -360 },
  { src: "/assets/signature-pour.webp", alt: "Signature coffee Small Gaps", className: "zoom-tile-two", x: 0, y: -610 },
  { src: "/assets/noodles.webp", alt: "Hidangan mie Small Gaps", className: "zoom-tile-three", x: 680, y: -350 },
  { src: "/assets/table-detail-optimized.webp", alt: "Meja dan minuman di Small Gaps", className: "zoom-tile-four", x: -700, y: 350 },
  { src: "/assets/affogato.webp", alt: "Affogato Small Gaps", className: "zoom-tile-five", x: 0, y: 610 },
  { src: "/assets/fried-bites.webp", alt: "Camilan Small Gaps", className: "zoom-tile-six", x: 690, y: 350 },
];

function ZoomTile({ tile, progress }: { tile: ZoomTileConfig; progress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const x = useTransform(progress, [0, 1], [0, tile.x]);
  const y = useTransform(progress, [0, 1], [0, tile.y]);
  const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.85, 0.15]);

  return (
    <motion.div
      className={cn("zoom-tile", tile.className)}
      style={{ x: prefersReducedMotion ? 0 : x, y: prefersReducedMotion ? 0 : y, opacity: prefersReducedMotion ? 0.58 : opacity }}
    >
      <img src={tile.src} alt={tile.alt} loading="lazy" decoding="async" />
    </motion.div>
  );
}

export function ZoomParallaxSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.82, 1], [0.82, 3.45, 4.25]);
  const radius = useTransform(scrollYProgress, [0, 0.6, 1], [12, 6, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.75, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.9, 1], [0, 0.6, 1]);
  const ctaY = useTransform(scrollYProgress, [0.72, 1], [24, 0]);

  return (
    <section ref={containerRef} className={cn("zoom-parallax-section", prefersReducedMotion && "motion-reduced")} aria-labelledby="zoom-parallax-title">
      <div className="zoom-parallax-sticky">
        <div className="zoom-parallax-backdrop" />
        <motion.div className="zoom-parallax-intro" style={{ opacity: prefersReducedMotion ? 0.98 : introOpacity }}>
          <p className="eyebrow"><span className="eyebrow-line" /> SMALLGAPS / A CLOSER LOOK</p>
          <h2 id="zoom-parallax-title">Scroll down<br />to <em>feel the space.</em></h2>
          <p>Perbesar momen kecil. Rasakan suasana Small Gaps.</p>
          <span className="zoom-scroll-prompt">GULIR UNTUK MEMPERBESAR <ArrowDown size={14} /></span>
        </motion.div>

        {tiles.map((tile) => (
          <ZoomTile key={tile.className} tile={tile} progress={scrollYProgress} />
        ))}

        <div className="zoom-main-position">
          <motion.div
            className="zoom-main-frame"
            style={{ scale: prefersReducedMotion ? 1 : scale, borderRadius: prefersReducedMotion ? 0 : radius }}
          >
            <img src="/assets/table-detail-optimized.webp" alt="Minuman dan camilan di meja kayu Small Gaps Coffee" loading="eager" decoding="async" />
            <div className="zoom-main-shade" />
          </motion.div>
        </div>

        <motion.div className="zoom-parallax-finish" style={{ opacity: prefersReducedMotion ? 1 : ctaOpacity, y: prefersReducedMotion ? 0 : ctaY }}>
          <p className="eyebrow">YOUR NEXT LITTLE PAUSE</p>
          <h3>Meja sudah menunggu.</h3>
          <a href="https://maps.app.goo.gl/K2GooMeQ3badv5aZ9" target="_blank" rel="noopener noreferrer" className="button button-light">
            Yuk, mampir ke Small Gaps <ArrowUpRight size={15} />
          </a>
        </motion.div>
        <div className="zoom-parallax-edge-note"><span>SMALLGAPS COFFEE</span><span>HOTEL STARLET BSD · LANTAI 2</span></div>
      </div>
    </section>
  );
}

export default ZoomParallaxSection;
