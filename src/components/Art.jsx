// Built-in product illustrations, tinted by the selected color.
const Shadow = ({ rx = 62 }) => <ellipse cx="100" cy="182" rx={rx} ry="7" fill="#000" opacity=".12" />
const Shade = { fill: '#000', opacity: 0.13 }

const PARTS = {
  tote: (c) => (
    <>
      <Shadow />
      <path d="M72 82V60a28 28 0 0 1 56 0v22" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" />
      <path d="M44 80h112l8 100H36z" fill={c} />
      <rect x="72" y="116" width="56" height="44" rx="3" {...Shade} />
    </>
  ),
  backpack: (c) => (
    <>
      <Shadow rx={56} />
      <path d="M88 54v-9a12 12 0 0 1 24 0v9" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
      <rect x="48" y="52" width="104" height="126" rx="40" fill={c} />
      <rect x="64" y="112" width="72" height="52" rx="16" {...Shade} />
      <path d="M74 98h52" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <path d="M62 70c0 24 4 40 4 40M138 70c0 24-4 40-4 40" stroke="#000" strokeOpacity=".15" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  mug: (c) => (
    <>
      <Shadow rx={58} />
      <path d="M138 84h12q16 0 16 20t-18 24h-10" fill="none" stroke={c} strokeWidth="11" />
      <path d="M50 66h90v84q0 22-22 22H72q-22 0-22-22z" fill={c} />
      <ellipse cx="95" cy="66" rx="45" ry="9" fill="#3b2a20" />
      <path d="M62 84v62" stroke="#fff" strokeOpacity=".3" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  bottle: (c) => (
    <>
      <Shadow rx={44} />
      <rect x="82" y="26" width="36" height="30" rx="8" fill="#26292d" />
      <rect x="68" y="52" width="64" height="128" rx="24" fill={c} />
      <rect x="68" y="108" width="64" height="12" fill="#fff" opacity=".4" />
      <path d="M80 70v34" stroke="#fff" strokeOpacity=".4" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  cap: (c) => (
    <>
      <Shadow />
      <path d="M52 118C52 58 148 58 148 118z" fill={c} />
      <path d="M100 66v50M76 74c-6 14-8 30-8 44M124 74c6 14 8 30 8 44" stroke="#000" strokeOpacity=".15" strokeWidth="2" fill="none" />
      <path d="M44 116h126q6 22-52 20H72q-24-2-28-20z" fill={c} />
      <path d="M44 116h126q6 22-52 20H72q-24-2-28-20z" {...Shade} />
      <circle cx="100" cy="64" r="5" fill={c} />
    </>
  ),
  tee: (c) => (
    <>
      <Shadow />
      <path d="M72 42l28 10 28-10 40 22-16 30-18-9v97H66V85l-18 9-16-30z" fill={c} />
      <path d="M82 44q18 22 36 0" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="4" />
    </>
  ),
  hoodie: (c) => (
    <>
      <Shadow />
      <path d="M64 62L34 84l12 32 18-8v72h72v-72l18 8 12-32-30-22z" fill={c} />
      <path d="M70 62q30-40 60 0-30 24-60 0z" fill="#000" opacity=".2" />
      <rect x="76" y="128" width="48" height="30" rx="8" {...Shade} />
      <path d="M92 74v22M108 74v22" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  notebook: (c) => (
    <>
      <Shadow rx={48} />
      <rect x="54" y="28" width="94" height="148" rx="8" fill={c} />
      <rect x="54" y="28" width="13" height="148" rx="6" {...Shade} />
      <rect x="128" y="28" width="6" height="148" fill="#000" opacity=".3" />
      <rect x="80" y="62" width="44" height="34" rx="3" fill="#fff" opacity=".85" />
      <path d="M88 74h28M88 84h18" stroke="#000" strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
}

export default function Art({ kind, color, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      {(PARTS[kind] || PARTS.tote)(color)}
    </svg>
  )
}
