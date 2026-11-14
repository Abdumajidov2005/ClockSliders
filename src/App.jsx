import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Check,
  Shield,
  Watch,
  Droplet,
  Award,
} from 'lucide-react';

/**
 * S'WATCH — Fossil Gen 5 Luxury Showcase
 * 1:1 Pixel-Accurate Recreation with Framer Motion Graphics, 3D Mouse Parallax,
 * Dynamic Color-Matched Backgrounds, Live Sweeping Watch Hands & Interactive Modals.
 */

const WATCH_MODELS = [
  {
    id: 'fossil-gen-5-gold',
    brand: 'Fossil',
    model: 'Gen 5',
    edition: '18K Yellow Gold President Edition',
    price: 359.0,
    formattedPrice: '$359.00',
    theme: 'gold',
    bgOuter: '#B89578',
    bgInner: '#1C120E',
    glowColor: 'rgba(216,175,114,0.5)',
    dayText: 'SUNDAY',
    dateNum: '20',
    specs: {
      caseSize: '44mm 18K Gold-Tone Oystersteel',
      movement: 'Calibre 3255 Perpetual Mechanical',
      waterResistance: '10 ATM / 100 Meters',
      glass: 'Sapphire Crystal with Cyclops Lens',
    },
    description:
      'Signature brushed 18K yellow gold President link bracelet paired with a fluted bezel, espresso sunray dial, and diamond-set hour markers.',
  },
  {
    id: 'fossil-gen-5-twotone',
    brand: 'Fossil',
    model: 'Gen 5',
    edition: 'Rolesor Two-Tone Jubilee Edition',
    price: 389.0,
    formattedPrice: '$389.00',
    theme: 'twotone',
    bgOuter: '#9BA4B0',
    bgInner: '#11151C',
    glowColor: 'rgba(195,205,220,0.45)',
    dayText: 'MONDAY',
    dateNum: '21',
    specs: {
      caseSize: '42mm Oystersteel & 18K Yellow Gold',
      movement: 'Automatic Chronometer Self-Winding',
      waterResistance: '10 ATM / 100 Meters',
      glass: 'Scratch-Resistant Sapphire Crystal',
    },
    description:
      'Harmonious fusion of brushed surgical steel and polished 18K yellow gold center links framing a radiant opaline silver-white dial.',
  },
  {
    id: 'fossil-gen-5-rose',
    brand: 'Fossil',
    model: 'Gen 5',
    edition: '18K Everose Obsidian Noir',
    price: 375.0,
    formattedPrice: '$375.00',
    theme: 'rose',
    bgOuter: '#C48B7B',
    bgInner: '#1D1113',
    glowColor: 'rgba(220,145,125,0.48)',
    dayText: 'FRIDAY',
    dateNum: '28',
    specs: {
      caseSize: '42mm 18K Everose Gold',
      movement: 'Calibre 3255 Perpetual Mechanical',
      waterResistance: '10 ATM / 100 Meters',
      glass: 'Sapphire Crystal with Anti-Reflective Coating',
    },
    description:
      'Warm 18K Everose gold case and brushed bracelet contrasted by an obsidian black sunray dial and diamond-set hour markers.',
  },
  {
    id: 'fossil-gen-5-emerald',
    brand: 'Fossil',
    model: 'Gen 5',
    edition: '18K Gold Emerald Olive Edition',
    price: 399.0,
    formattedPrice: '$399.00',
    theme: 'emerald',
    bgOuter: '#8E9B82',
    bgInner: '#101813',
    glowColor: 'rgba(145,185,140,0.45)',
    dayText: 'SATURDAY',
    dateNum: '14',
    specs: {
      caseSize: '44mm 18K Yellow Gold & Emerald Dial',
      movement: 'Calibre 3255 Perpetual Chronometer',
      waterResistance: '10 ATM / 100 Meters',
      glass: 'Anti-Reflective Sapphire Crystal',
    },
    description:
      'Deep sunburst forest-emerald dial framed by a fluted 18K gold bezel and signature brushed President links.',
  },
];

/**
 * Photorealistic Vector Luxury Watch Component
 * Includes live sweeping seconds hand, brushed metallic grain, fluted bezel,
 * curved day window at 12, and cyclops date window at 3.
 */
const LuxuryWatchIllustration = ({
  theme = 'gold',
  dayText = 'SUNDAY',
  dateNum = '20',
  isThumbnail = false,
  secondAngle = 214,
}) => {
  const uid = `${theme}-${isThumbnail ? 'thumb' : 'main'}`;

  const palettes = {
    gold: {
      metalLight: '#F8E3B8',
      metalMid: '#D8AF72',
      metalDark: '#8A6028',
      metalDeep: '#523510',
      dialCenter: '#3D251C',
      dialEdge: '#140A07',
      handFill: '#F6DA9F',
      centerLinkLight: '#FCEBC7',
      centerLinkMid: '#CFA05C',
    },
    twotone: {
      metalLight: '#F7F8FA',
      metalMid: '#C3C7CE',
      metalDark: '#787E87',
      metalDeep: '#41454C',
      dialCenter: '#FFFFFF',
      dialEdge: '#D8DCE3',
      handFill: '#D4AA63',
      centerLinkLight: '#F9E5B8',
      centerLinkMid: '#CFA059',
    },
    rose: {
      metalLight: '#F6D4C5',
      metalMid: '#CE9178',
      metalDark: '#854D39',
      metalDeep: '#4B271A',
      dialCenter: '#241D20',
      dialEdge: '#0D090A',
      handFill: '#ECB8A2',
      centerLinkLight: '#F8D8CA',
      centerLinkMid: '#C48268',
    },
    emerald: {
      metalLight: '#F8E3B8',
      metalMid: '#D8AF72',
      metalDark: '#8A6028',
      metalDeep: '#523510',
      dialCenter: '#1D4731',
      dialEdge: '#091A11',
      handFill: '#F6DA9F',
      centerLinkLight: '#FCEBC7',
      centerLinkMid: '#CFA05C',
    },
  };

  const p = palettes[theme] || palettes.gold;
  const isLightDial = theme === 'twotone';

  const minuteTicks = Array.from({ length: 60 }, (_, i) => i * 6);
  const bezelFlutes = Array.from({ length: 72 }, (_, i) => i * 5);
  const linkRows = [0, 1, 2, 3, 4, 5];

  return (
    <svg
      viewBox="0 0 320 640"
      className="w-full h-full select-none drop-shadow-[0_30px_42px_rgba(0,0,0,0.82)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`outerMetal-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.metalDark} />
          <stop offset="18%" stopColor={p.metalLight} />
          <stop offset="36%" stopColor={p.metalMid} />
          <stop offset="50%" stopColor={p.metalLight} />
          <stop offset="70%" stopColor={p.metalMid} />
          <stop offset="88%" stopColor={p.metalLight} />
          <stop offset="100%" stopColor={p.metalDark} />
        </linearGradient>

        <linearGradient id={`centerMetal-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.metalDark} />
          <stop offset="24%" stopColor={p.centerLinkLight} />
          <stop offset="50%" stopColor={p.centerLinkMid} />
          <stop offset="76%" stopColor={p.centerLinkLight} />
          <stop offset="100%" stopColor={p.metalDark} />
        </linearGradient>

        <linearGradient id={`linkV-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="78%" stopColor="#000000" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.58" />
        </linearGradient>

        <linearGradient id={`caseGrad-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={p.metalLight} />
          <stop offset="32%" stopColor={p.metalMid} />
          <stop offset="55%" stopColor={p.metalLight} />
          <stop offset="82%" stopColor={p.metalDark} />
          <stop offset="100%" stopColor={p.metalMid} />
        </linearGradient>

        <radialGradient id={`dialGrad-${uid}`} cx="46%" cy="44%" r="58%">
          <stop offset="0%" stopColor={p.dialCenter} />
          <stop offset="68%" stopColor={p.dialEdge} />
          <stop offset="100%" stopColor="#070403" />
        </radialGradient>

        <linearGradient id={`glassGlare-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
          <stop offset="36%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="62%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.09" />
        </linearGradient>

        <linearGradient id={`cyclopsGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
        </linearGradient>
      </defs>

      {/* UPPER PRESIDENT BRACELET */}
      <g>
        {linkRows.map((idx) => {
          const y = 6 + idx * 28;
          const taper = idx * 1.4;
          const leftX = 104 - taper;
          const totalW = 112 + taper * 2;
          const sideW = totalW * 0.28;
          const midW = totalW * 0.44;

          return (
            <g key={`top-${idx}`}>
              <rect
                x={leftX}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#outerMetal-${uid})`}
              />
              <rect
                x={leftX}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#linkV-${uid})`}
              />
              <rect
                x={leftX + sideW + 0.5}
                y={y - 0.5}
                width={midW - 1}
                height="27.5"
                rx="3.5"
                fill={`url(#centerMetal-${uid})`}
              />
              <rect
                x={leftX + sideW + 0.5}
                y={y - 0.5}
                width={midW - 1}
                height="27.5"
                rx="3.5"
                fill={`url(#linkV-${uid})`}
              />
              <rect
                x={leftX + sideW + midW}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#outerMetal-${uid})`}
              />
              <rect
                x={leftX + sideW + midW}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#linkV-${uid})`}
              />
              <line
                x1={leftX + 3}
                y1={y + 8}
                x2={leftX + totalW - 3}
                y2={y + 8}
                stroke="#000000"
                strokeOpacity="0.15"
                strokeWidth="0.7"
              />
              <line
                x1={leftX + 3}
                y1={y + 18}
                x2={leftX + totalW - 3}
                y2={y + 18}
                stroke="#FFFFFF"
                strokeOpacity="0.18"
                strokeWidth="0.7"
              />
            </g>
          );
        })}
      </g>

      {/* LOWER PRESIDENT BRACELET */}
      <g>
        {linkRows.map((idx) => {
          const y = 464 + idx * 28;
          const taper = (5 - idx) * 1.4;
          const leftX = 104 - taper;
          const totalW = 112 + taper * 2;
          const sideW = totalW * 0.28;
          const midW = totalW * 0.44;

          return (
            <g key={`bot-${idx}`}>
              <rect
                x={leftX}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#outerMetal-${uid})`}
              />
              <rect
                x={leftX}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#linkV-${uid})`}
              />
              <rect
                x={leftX + sideW + 0.5}
                y={y - 0.5}
                width={midW - 1}
                height="27.5"
                rx="3.5"
                fill={`url(#centerMetal-${uid})`}
              />
              <rect
                x={leftX + sideW + 0.5}
                y={y - 0.5}
                width={midW - 1}
                height="27.5"
                rx="3.5"
                fill={`url(#linkV-${uid})`}
              />
              <rect
                x={leftX + sideW + midW}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#outerMetal-${uid})`}
              />
              <rect
                x={leftX + sideW + midW}
                y={y}
                width={sideW}
                height="26.5"
                rx="3"
                fill={`url(#linkV-${uid})`}
              />
              <line
                x1={leftX + 3}
                y1={y + 9}
                x2={leftX + totalW - 3}
                y2={y + 9}
                stroke="#000000"
                strokeOpacity="0.15"
                strokeWidth="0.7"
              />
              <line
                x1={leftX + 3}
                y1={y + 19}
                x2={leftX + totalW - 3}
                y2={y + 19}
                stroke="#FFFFFF"
                strokeOpacity="0.18"
                strokeWidth="0.7"
              />
            </g>
          );
        })}
      </g>

      {/* WINDING CROWN */}
      <g>
        <rect
          x="276"
          y="302"
          width="16"
          height="36"
          rx="4"
          fill={`url(#caseGrad-${uid})`}
          stroke={p.metalDeep}
          strokeWidth="1"
        />
        {[307, 312, 317, 322, 327, 332].map((cy) => (
          <line
            key={cy}
            x1="278"
            y1={cy}
            x2="291"
            y2={cy}
            stroke={p.metalDeep}
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* SCULPTED CASE & LUGS */}
      <path
        d="
          M 93 172
          C 118 166, 202 166, 227 172
          L 242 214
          C 268 238, 282 276, 282 320
          C 282 364, 268 402, 242 426
          L 227 468
          C 202 474, 118 474, 93 468
          L 78 426
          C 52 402, 38 364, 38 320
          C 38 276, 52 238, 78 214
          Z
        "
        fill={`url(#caseGrad-${uid})`}
        stroke={p.metalDeep}
        strokeWidth="1.2"
      />

      {/* End-link Integration Shadow */}
      <path
        d="M 96 174 Q 160 184 224 174"
        fill="none"
        stroke={p.metalDeep}
        strokeWidth="2"
        opacity="0.65"
      />
      <path
        d="M 96 466 Q 160 456 224 466"
        fill="none"
        stroke={p.metalDeep}
        strokeWidth="2"
        opacity="0.65"
      />

      {/* FLUTED BEZEL */}
      <circle
        cx="160"
        cy="320"
        r="116"
        fill={`url(#caseGrad-${uid})`}
        stroke={p.metalDeep}
        strokeWidth="1.5"
      />
      <g>
        {bezelFlutes.map((deg) => (
          <line
            key={deg}
            x1="160"
            y1="205"
            x2="160"
            y2="216"
            stroke={deg % 10 === 0 ? p.metalLight : p.metalDeep}
            strokeWidth="2.1"
            opacity="0.72"
            transform={`rotate(${deg} 160 320)`}
          />
        ))}
      </g>
      <circle
        cx="160"
        cy="320"
        r="104"
        fill="none"
        stroke={p.metalLight}
        strokeWidth="2"
      />

      {/* SUNBURST DIAL */}
      <circle
        cx="160"
        cy="320"
        r="102"
        fill={`url(#dialGrad-${uid})`}
        stroke="#0A0706"
        strokeWidth="2"
      />

      {/* MINUTE TICKS */}
      <g>
        {minuteTicks.map((deg) => {
          const isFive = deg % 30 === 0;
          return (
            <line
              key={deg}
              x1="160"
              y1="223"
              x2="160"
              y2={isFive ? '229' : '226'}
              stroke={isLightDial ? '#333' : '#D6C3B3'}
              strokeWidth={isFive ? '1.3' : '0.7'}
              opacity={isFive ? '0.85' : '0.5'}
              transform={`rotate(${deg} 160 320)`}
            />
          );
        })}
      </g>

      {/* CURVED DAY WINDOW AT 12 */}
      <g>
        <path
          d="M 122 246 Q 160 237 198 246 L 193 259 Q 160 251 127 259 Z"
          fill="#F6F2EB"
          stroke={p.metalMid}
          strokeWidth="1.8"
        />
        <text
          x="160"
          y="253"
          textAnchor="middle"
          fill="#1C120E"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1.1"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {dayText}
        </text>
      </g>

      {/* HOUR MARKERS (BAGUETTES & DIAMONDS) */}
      <g>
        <rect
          x="68"
          y="315.5"
          width="16"
          height="9"
          rx="1.5"
          fill="#FFFFFF"
          stroke={p.metalMid}
          strokeWidth="1.8"
        />
        <rect
          x="155.5"
          y="396"
          width="9"
          height="16"
          rx="1.5"
          fill="#FFFFFF"
          stroke={p.metalMid}
          strokeWidth="1.8"
        />
        {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 160 320)`}>
            <rect
              x="155"
              y="234"
              width="10"
              height="10"
              rx="2"
              fill={p.metalMid}
              stroke={p.metalDeep}
              strokeWidth="0.7"
            />
            <polygon
              points="160,235.5 163.5,239 160,242.5 156.5,239"
              fill="#FFFFFF"
            />
          </g>
        ))}
      </g>

      {/* CYCLOPS DATE WINDOW AT 3 */}
      <g>
        <rect
          x="222"
          y="309"
          width="28"
          height="22"
          rx="4"
          fill="#FAF7F2"
          stroke={p.metalMid}
          strokeWidth="1.8"
        />
        <text
          x="236"
          y="325"
          textAnchor="middle"
          fill="#140D0A"
          fontSize="15"
          fontWeight="800"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {dateNum}
        </text>
        <rect
          x="219"
          y="306"
          width="34"
          height="28"
          rx="7"
          fill={`url(#cyclopsGrad-${uid})`}
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </g>

      {/* HANDS WITH LIVE SWEEPING SECOND HAND */}
      <g>
        <g transform="translate(2, 4)" opacity="0.45">
          <rect
            x="157"
            y="264"
            width="6"
            height="64"
            rx="2"
            fill="#000"
            transform="rotate(-54 160 320)"
          />
          <rect
            x="158"
            y="235"
            width="4.5"
            height="96"
            rx="2"
            fill="#000"
            transform="rotate(56 160 320)"
          />
        </g>

        {/* Hour Hand */}
        <g transform="rotate(-54 160 320)">
          <rect
            x="157"
            y="264"
            width="6"
            height="66"
            rx="2"
            fill={p.handFill}
            stroke={p.metalDeep}
            strokeWidth="0.7"
          />
          <rect x="158.7" y="270" width="2.6" height="44" rx="1" fill="#FFFDF8" />
        </g>

        {/* Minute Hand */}
        <g transform="rotate(56 160 320)">
          <rect
            x="157.8"
            y="234"
            width="4.4"
            height="98"
            rx="2"
            fill={p.handFill}
            stroke={p.metalDeep}
            strokeWidth="0.7"
          />
          <rect x="159.1" y="241" width="1.8" height="72" rx="0.9" fill="#FFFDF8" />
        </g>

        {/* Live Sweeping Second Hand */}
        <g transform={`rotate(${isThumbnail ? 214 : secondAngle} 160 320)`}>
          <line
            x1="160"
            y1="342"
            x2="160"
            y2="226"
            stroke={p.metalLight}
            strokeWidth="1.4"
          />
          <circle cx="160" cy="342" r="2.5" fill={p.metalLight} />
        </g>

        {/* Center Pinion */}
        <circle
          cx="160"
          cy="320"
          r="6.5"
          fill={p.handFill}
          stroke={p.metalDeep}
          strokeWidth="1"
        />
        <circle cx="160" cy="320" r="2.2" fill={p.metalLight} />
      </g>

      {/* SAPPHIRE CRYSTAL GLARE */}
      <circle
        cx="160"
        cy="320"
        r="101"
        fill={`url(#glassGlare-${uid})`}
        pointerEvents="none"
      />
    </svg>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [activeLang, setActiveLang] = useState('EN');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [flyingBadge, setFlyingBadge] = useState(false);
  const [secondAngle, setSecondAngle] = useState(214);

  const containerRef = useRef(null);

  // Framer Motion 3D Mouse Parallax Values for Centerpiece Watch
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const translateWatchX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const translateWatchY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const currentWatch = WATCH_MODELS[activeIndex];
  const nextIndex = (activeIndex + 1) % WATCH_MODELS.length;
  const nextWatch = WATCH_MODELS[nextIndex];

  // Load Plus Jakarta Sans & Montserrat Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Mechanical sweeping seconds hand animation loop
  useEffect(() => {
    let frameId;
    const startAngle = 214;
    const startTime = performance.now();
    const animateSecondHand = (now) => {
      const elapsedSeconds = (now - startTime) / 1000;
      setSecondAngle((startAngle + elapsedSeconds * 6) % 360);
      frameId = requestAnimationFrame(animateSecondHand);
    };
    frameId = requestAnimationFrame(animateSecondHand);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Keyboard ArrowRight / ArrowLeft support for switching watch models
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isSearchOpen || isCartOpen || isExploreOpen || isMenuOpen) return;
      if (e.key === 'ArrowRight') {
        handleNextWatch();
      } else if (e.key === 'ArrowLeft') {
        handlePrevWatch();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, isCartOpen, isExploreOpen, isMenuOpen]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSelectWatch = (index) => {
    if (index === activeIndex) return;
    setSlideDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleNextWatch = () => {
    setSlideDirection(1);
    setActiveIndex((prev) => (prev + 1) % WATCH_MODELS.length);
  };

  const handlePrevWatch = () => {
    setSlideDirection(-1);
    setActiveIndex((prev) => (prev - 1 + WATCH_MODELS.length) % WATCH_MODELS.length);
  };

  const handleAddToCart = (watch = currentWatch) => {
    setFlyingBadge(true);
    setTimeout(() => setFlyingBadge(false), 650);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === watch.id);
      if (existing) {
        return prev.map((item) =>
          item.id === watch.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...watch, qty: 1 }];
    });

    setToastMessage(`${watch.brand} ${watch.model} (${watch.theme.toUpperCase()}) added to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const labels = {
    EN: {
      shop: 'SHOP',
      search: 'SEARCH',
      cart: 'CART',
      addToCart: 'Add to cart',
      explore: 'EXPLORE',
    },
    DE: {
      shop: 'KOLLEKTION',
      search: 'SUCHE',
      cart: 'WARENKORB',
      addToCart: 'In den Warenkorb',
      explore: 'ENTDECKEN',
    },
    IT: {
      shop: 'NEGOZIO',
      search: 'CERCA',
      cart: 'CARRELLO',
      addToCart: 'Aggiungi al carrello',
      explore: 'ESPLORA',
    },
  };
  const t = labels[activeLang] || labels.EN;

  const filteredWatches = WATCH_MODELS.filter(
    (w) =>
      w.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.edition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      animate={{ backgroundColor: currentWatch.bgOuter }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full flex items-center justify-center p-2.5 sm:p-4 md:p-5 overflow-x-hidden selection:bg-[#B89578] selection:text-[#1C120E]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        .hollow-gen-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.9);
          color: transparent;
        }
        @media (min-width: 768px) {
          .hollow-gen-text {
            -webkit-text-stroke: 1.8px rgba(255, 255, 255, 0.92);
          }
        }
      `}</style>

      {/* ================= MAIN ROUNDED ESPRESSO CONTAINER ================= */}
      <motion.main
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1, backgroundColor: currentWatch.bgInner }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1440px] min-h-[86vh] md:h-[88vh] max-h-[880px] rounded-[28px] md:rounded-[34px] overflow-hidden shadow-[0_35px_90px_rgba(18,8,4,0.52)] flex flex-col justify-between"
      >
        {/* ================= ORGANIC HOURGLASS SAND CUTOUTS (TOP & BOTTOM) ================= */}
        {/* Top Sand-Colored Organic Cutout */}
        <motion.svg
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-0 w-full h-[145px] sm:h-[175px] md:h-[195px] z-[1]"
        >
          <motion.path
            d="M 650 0 C 745 0, 815 155, 922 155 C 1030 155, 1100 0, 1195 0 Z"
            animate={{ fill: currentWatch.bgOuter }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.svg>

        {/* Bottom Sand-Colored Organic Cutout */}
        <motion.svg
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[145px] sm:h-[175px] md:h-[195px] z-[1]"
        >
          <motion.path
            d="M 640 240 C 740 240, 812 85, 922 85 C 1032 85, 1104 240, 1205 240 Z"
            animate={{ fill: currentWatch.bgOuter }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.svg>

        {/* Ambient Warm Radial Glow Behind Watch */}
        <motion.div
          animate={{
            scale: [1, 1.07, 1],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-1/2 left-[64%] -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] rounded-full blur-3xl z-[1] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${currentWatch.glowColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />

        {/* ================= TOP NAVIGATION HEADER ================= */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
          className="relative z-20 flex items-center justify-between px-6 sm:px-10 md:px-14 pt-6 sm:pt-8"
        >
          {/* Left Navigation Group */}
          <div className="flex items-center space-x-8 sm:space-x-12 md:space-x-14">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectWatch(0)}
              className="text-white font-extrabold text-sm sm:text-base tracking-[0.12em] uppercase hover:opacity-90 transition cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              S&apos;WATCH
            </motion.button>

            <nav className="hidden sm:flex items-center space-x-8 md:space-x-10">
              <button
                onClick={() => setIsExploreOpen(true)}
                className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#A69B95] hover:text-white transition cursor-pointer"
              >
                {t.shop}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#A69B95] hover:text-white transition cursor-pointer"
              >
                {t.search}
              </button>
            </nav>
          </div>

          {/* Right Navigation Group: CART (0) & Staggered 3-Line Menu */}
          <div className="flex items-center space-x-6 sm:space-x-9">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCartOpen(true)}
              className="relative text-[11px] font-medium tracking-[0.2em] uppercase text-[#E6D9CE] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>
                {t.cart} ({totalCartItems})
              </span>
              {flyingBadge && (
                <motion.span
                  initial={{ scale: 1.8, opacity: 1 }}
                  animate={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-[#B89578]"
                />
              )}
            </motion.button>

            {/* Custom Minimalist 3-Line Staggered Hamburger Icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="group flex flex-col items-end justify-center space-y-[5px] p-1.5 cursor-pointer"
            >
              <span className="block w-6 h-[1.5px] bg-[#D6C3B3] group-hover:bg-white transition-all duration-300" />
              <span className="block w-4 h-[1.5px] bg-[#D6C3B3] group-hover:w-6 group-hover:bg-white transition-all duration-300" />
              <span className="block w-2.5 h-[1.5px] bg-[#D6C3B3] group-hover:w-6 group-hover:bg-white transition-all duration-300" />
            </button>
          </div>
        </motion.header>

        {/* ================= LEFT VERTICAL LANGUAGE SELECTOR ================= */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="hidden sm:flex flex-col items-center justify-center space-y-7 absolute left-6 md:left-9 top-1/2 -translate-y-1/2 z-20"
        >
          {['IT', 'EN', 'DE'].map((lang) => {
            const isActive = activeLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`relative -rotate-90 text-[10px] tracking-[0.25em] font-semibold uppercase transition-colors cursor-pointer ${isActive
                  ? 'text-white'
                  : 'text-[#6E625C] hover:text-[#B89578]'
                  }`}
              >
                {lang}
                {isActive && (
                  <motion.span
                    layoutId="langDot"
                    className="block mx-auto mt-1 w-1 h-1 rounded-full bg-[#B89578]"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ================= HERO CENTERPIECE GRID ================= */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-14 md:px-20 lg:px-24">

          {/* Left Typography Column: Fossil / Gen 5 / $359.00 */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pt-4 lg:pt-0 lg:pl-4 select-none">
            <motion.div
              key={currentWatch.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="text-6xl sm:text-7xl md:text-[86px] xl:text-[98px] font-extrabold leading-[0.95] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
              >
                {currentWatch.brand}
              </h1>

              <div
                className="text-6xl sm:text-7xl md:text-[86px] xl:text-[98px] font-extrabold leading-[1.02] tracking-[-0.02em] hollow-gen-text mt-1"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
              >
                {currentWatch.model}
              </div>

              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D6C3B3] mt-4">
                {currentWatch.edition}
              </p>

              <p className="text-2xl sm:text-[28px] md:text-[32px] font-light tracking-wide text-[#EFE6DF] mt-4 sm:mt-6">
                {currentWatch.formattedPrice}
              </p>
            </motion.div>
          </div>

          {/* Center-Right Vertical Hero Watch Column with 3D Tilt & Reliable Switching */}
          <div
            className="lg:col-span-5 relative flex flex-col items-center justify-center h-[390px] sm:h-[470px] md:h-[560px] lg:h-full"
            style={{ perspective: 1100 }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: translateWatchX,
                y: translateWatchY,
              }}
              className="w-[215px] sm:w-[255px] md:w-[295px] lg:w-[310px] h-full flex items-center justify-center"
            >
              <motion.div
                key={currentWatch.id}
                initial={{
                  opacity: 0,
                  y: slideDirection * 40,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <LuxuryWatchIllustration
                  theme={currentWatch.theme}
                  dayText={currentWatch.dayText}
                  dateNum={currentWatch.dateNum}
                  secondAngle={secondAngle}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Far-Right Floating Next Watch Thumbnail Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden lg:flex lg:col-span-2 flex-col items-end justify-center pr-2"
          >
            <div className="relative flex flex-col items-center">
              {/* Top-Right Tiny Arrow */}
              <motion.button
                type="button"
                whileHover={{ x: 2, color: '#FFFFFF' }}
                onClick={handleNextWatch}
                aria-label="Next Watch"
                className="self-end mb-2 mr-1 text-[#8C7A6E] transition cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>

              {/* Rounded Square Thumbnail Preview Box */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, borderColor: '#B89578' }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextWatch}
                title={`Keyingi soat: ${nextWatch.edition}`}
                className="group relative w-28 h-28 xl:w-32 xl:h-32 rounded-[22px] border border-white/15 bg-[#1C120E]/90 transition-colors duration-300 flex items-center justify-center overflow-hidden shadow-xl cursor-pointer"
              >
                <motion.div
                  key={nextWatch.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-16 h-28 transform group-hover:scale-110 transition-transform duration-300"
                >
                  <LuxuryWatchIllustration
                    theme={nextWatch.theme}
                    dayText={nextWatch.dayText}
                    dateNum={nextWatch.dateNum}
                    isThumbnail
                  />
                </motion.div>
              </motion.button>

              {/* Bottom-Left Tiny Arrow */}
              <motion.button
                type="button"
                whileHover={{ x: -2, color: '#FFFFFF' }}
                onClick={handlePrevWatch}
                aria-label="Previous Watch"
                className="self-start mt-2 ml-1 text-[#8C7A6E] transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ================= BOTTOM BAR ELEMENTS ================= */}
        <footer className="relative z-30 flex items-end justify-between px-6 sm:px-10 md:px-14 pb-5 sm:pb-6 pointer-events-auto">
          {/* Bottom-Left: EXPLORE ↓ + Lifestyle Wrist-Shot Thumbnail Peeking Up */}
          <div className="flex items-center space-x-5 sm:space-x-7">
            <motion.button
              whileHover={{ y: 1 }}
              onClick={() => setIsExploreOpen(true)}
              className="group flex items-center space-x-2 text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-[#A69B95] hover:text-white transition pb-1 cursor-pointer"
            >
              <span>{t.explore}</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-[#A69B95] group-hover:text-white" />
              </motion.span>
            </motion.button>

            {/* Lifestyle Wrist Shot Thumbnail Peeking from Bottom Edge */}
            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => setIsExploreOpen(true)}
              aria-label="Explore Lifestyle Gallery"
              className="hidden sm:block relative w-44 md:w-56 h-12 md:h-14 -mb-6 rounded-t-md overflow-hidden border-t border-x border-white/10 group cursor-pointer shadow-lg"
            >
              <div className="w-full h-full bg-gradient-to-r from-[#5E473A] via-[#8E6B56] to-[#4A382E] relative flex items-center justify-center overflow-hidden">
                <div className="absolute -left-4 top-1 w-24 h-14 rounded-full bg-[#C99B7E] opacity-80 blur-[1px] transform -rotate-12" />
                <div className="absolute right-4 -bottom-2 w-24 h-12 rounded-full bg-[#D8AA8C] opacity-75 blur-[1px] transform rotate-12" />
                <div className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#2B2625] to-[#0E0C0C] border-2 border-[#D4AF7A] shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#181C24] to-[#323A46] opacity-90" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Bottom-Center: 'Add to cart' Inside Bottom Sand Hourglass Flare */}
          <div className="absolute left-1/2 lg:left-[64%] -translate-x-1/2 bottom-4 sm:bottom-5 z-30">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleAddToCart(currentWatch)}
              className="px-6 py-2 text-xs sm:text-[13px] font-medium tracking-[0.06em] text-[#F5EFEA] hover:text-[#1C120E] hover:bg-white/95 rounded-full transition-colors duration-300 cursor-pointer"
            >
              {t.addToCart}
            </motion.button>
          </div>

          {/* Bottom-Right: Watch Dots Indicator + Circular Outline Next Button */}
          <div className="relative z-40 flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 mr-2">
              {WATCH_MODELS.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectWatch(idx)}
                  title={m.edition}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/35 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.1, borderColor: '#FFFFFF' }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleNextWatch();
              }}
              aria-label="Next Watch Slide"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/50 bg-[#1C120E]/80 hover:bg-white/15 flex items-center justify-center text-[#E6D9CE] hover:text-white transition-colors duration-300 cursor-pointer shadow-lg"
            >
              <ArrowRight className="w-4 h-4 pointer-events-none" />
            </motion.button>
          </div>
        </footer>

        {/* ================= TOAST FEEDBACK NOTIFICATION ================= */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#2A1C16] border border-[#B89578]/50 text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2.5 text-xs tracking-wide"
            >
              <span className="w-5 h-5 rounded-full bg-[#B89578] text-[#1C120E] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* ================= SLIDE-OVER CART DRAWER ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="w-full max-w-md bg-[#1C120E] border-l border-[#3A2820] h-full flex flex-col justify-between p-6 sm:p-8 text-white shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#32221B]">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#B89578]" />
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase">
                      Your Bag ({totalCartItems})
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <p className="text-stone-400 text-sm">Your shopping bag is currently empty.</p>
                    <button
                      onClick={() => handleAddToCart(currentWatch)}
                      className="px-6 py-2.5 rounded-full bg-[#B89578] text-[#1C120E] text-xs font-bold uppercase tracking-wider hover:bg-[#cbb099] transition cursor-pointer"
                    >
                      Add {currentWatch.brand} {currentWatch.model}
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-5 max-h-[58vh] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        className="flex items-center justify-between bg-[#251813] p-4 rounded-2xl border border-[#38261E]"
                      >
                        <div className="w-12 h-20 flex-shrink-0">
                          <LuxuryWatchIllustration theme={item.theme} isThumbnail />
                        </div>
                        <div className="flex-1 px-4">
                          <h3 className="text-sm font-bold text-white">
                            {item.brand} {item.model}
                          </h3>
                          <p className="text-xs text-[#B89578] mt-0.5">{item.edition}</p>
                          <p className="text-sm font-light text-stone-200 mt-1">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 bg-[#1C120E] rounded-full px-2.5 py-1 border border-[#3A2820]">
                          <button
                            onClick={() => updateCartQty(item.id, -1)}
                            className="text-stone-400 hover:text-white p-1 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateCartQty(item.id, 1)}
                            className="text-stone-400 hover:text-white p-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-[#32221B] space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-400">Subtotal</span>
                    <span className="text-lg font-semibold text-white">
                      ${totalCartPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setToastMessage('Proceeding to S’WATCH Concierge Checkout...');
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#B89578] hover:bg-[#c8a68a] text-[#1C120E] font-bold text-xs tracking-[0.2em] uppercase transition cursor-pointer"
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SEARCH OVERLAY MODAL ================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C120E]/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-stone-400 hover:text-white p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-2xl space-y-8"
            >
              <div className="relative border-b border-[#B89578]/50 pb-3 flex items-center">
                <Search className="w-5 h-5 text-[#B89578] mr-4" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Fossil Gen 5 editions..."
                  className="w-full bg-transparent text-white text-xl sm:text-2xl font-light placeholder:text-stone-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {filteredWatches.map((watch) => (
                  <motion.button
                    whileHover={{ y: -4 }}
                    key={watch.id}
                    onClick={() => {
                      const realIdx = WATCH_MODELS.findIndex((m) => m.id === watch.id);
                      handleSelectWatch(realIdx);
                      setIsSearchOpen(false);
                    }}
                    className="bg-[#251813] hover:bg-[#2F1F18] border border-[#3B2920] rounded-2xl p-4 text-left transition flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-20 h-36">
                      <LuxuryWatchIllustration theme={watch.theme} isThumbnail />
                    </div>
                    <p className="text-white font-bold text-sm mt-2">
                      {watch.brand} {watch.model}
                    </p>
                    <p className="text-[11px] text-[#B89578] text-center mt-0.5">{watch.edition}</p>
                    <p className="text-xs text-stone-300 mt-1.5">{watch.formattedPrice}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= EXPLORE SPECIFICATIONS & GALLERY MODAL ================= */}
      <AnimatePresence>
        {isExploreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-[#1C120E] border border-[#3B2920] rounded-[28px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
            >
              <button
                onClick={() => setIsExploreOpen(false)}
                className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#2A1C16] text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="md:col-span-5 bg-gradient-to-b from-[#2A1C15] to-[#140D0A] p-8 flex flex-col items-center justify-center relative">
                <div className="w-44 h-72">
                  <LuxuryWatchIllustration
                    theme={currentWatch.theme}
                    dayText={currentWatch.dayText}
                    dateNum={currentWatch.dateNum}
                    secondAngle={secondAngle}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  {WATCH_MODELS.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectWatch(idx)}
                      className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider transition cursor-pointer ${idx === activeIndex
                        ? 'bg-[#B89578] text-[#1C120E] font-bold'
                        : 'bg-[#2A1C16] text-stone-400 hover:text-white'
                        }`}
                    >
                      {m.theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-white">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89578] font-semibold">
                    S&apos;WATCH HAUTE HORLOGERIE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">
                    {currentWatch.brand} {currentWatch.model}
                  </h2>
                  <p className="text-sm text-[#D6C3B3] mt-1">{currentWatch.edition}</p>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mt-4">
                    {currentWatch.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#2E2019]">
                    <div className="flex items-start space-x-3">
                      <Watch className="w-4 h-4 text-[#B89578] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-stone-400">Case</p>
                        <p className="text-xs font-medium text-stone-200 mt-0.5">
                          {currentWatch.specs.caseSize}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-4 h-4 text-[#B89578] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-stone-400">
                          Movement
                        </p>
                        <p className="text-xs font-medium text-stone-200 mt-0.5">
                          {currentWatch.specs.movement}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Droplet className="w-4 h-4 text-[#B89578] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-stone-400">
                          Water Resistance
                        </p>
                        <p className="text-xs font-medium text-stone-200 mt-0.5">
                          {currentWatch.specs.waterResistance}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-4 h-4 text-[#B89578] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-stone-400">
                          Crystal
                        </p>
                        <p className="text-xs font-medium text-stone-200 mt-0.5">
                          {currentWatch.specs.glass}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#2E2019]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400">Price</p>
                    <p className="text-2xl font-light text-white">{currentWatch.formattedPrice}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(currentWatch);
                      setIsExploreOpen(false);
                    }}
                    className="px-7 py-3 rounded-full bg-[#B89578] hover:bg-[#cca98c] text-[#1C120E] font-bold text-xs uppercase tracking-[0.18em] transition cursor-pointer"
                  >
                    {t.addToCart}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FULLSCREEN STAGGERED MENU OVERLAY ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C120E] text-white flex flex-col justify-between p-8 sm:p-14"
          >
            <div className="flex items-center justify-between">
              <span
                className="font-extrabold text-base tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                S&apos;WATCH
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto w-full">
              <div className="space-y-5">
                {WATCH_MODELS.map((watch, idx) => (
                  <motion.button
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={watch.id}
                    onClick={() => {
                      handleSelectWatch(idx);
                      setIsMenuOpen(false);
                    }}
                    className="block text-left group cursor-pointer"
                  >
                    <span className="text-xs text-[#B89578] tracking-[0.25em] uppercase">
                      0{idx + 1} — {watch.edition}
                    </span>
                    <div className="text-3xl sm:text-5xl font-extrabold text-white group-hover:text-[#B89578] transition">
                      {watch.brand} {watch.model}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="border-t md:border-t-0 md:border-l border-[#35241D] pt-6 md:pt-0 md:pl-12 space-y-4 text-stone-400 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B89578]">
                  Boutique Concierge
                </p>
                <p>Geneva • Milan • New York • Tokyo</p>
                <p className="text-xs text-stone-500">
                  Complimentary insured worldwide express shipping &amp; 5-year international
                  warranty.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 tracking-widest uppercase">
              <span>© 2026 S&apos;WATCH GENÈVE</span>
              <div className="flex space-x-6">
                {['DE', 'EN', 'IT'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setActiveLang(l)}
                    className={activeLang === l ? 'text-white font-bold' : 'hover:text-white'}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}