// Attention-grabbing logo: ghoomti ring + ripple lehren + glow + chamak
export default function SupplierLogo({ initials, index = 0 }) {
  const delay = `${-index * 0.7}s`; // har card ka logo alag timing par

  return (
    <span
      style={{ animation: "bmLogoGlow 2.4s ease-in-out infinite alternate", animationDelay: delay }}
      className="bm-logo relative h-12 w-12 shrink-0 rounded-full"
    >
      <style>{`
        @keyframes bmLogoSpin   { to { transform: rotate(360deg); } }
        @keyframes bmLogoRipple { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes bmLogoShine  { 0%, 55% { transform: translateX(-160%) skewX(-20deg); } 100% { transform: translateX(260%) skewX(-20deg); } }
        @keyframes bmLogoGlow   { from { box-shadow: 0 0 0 0 rgba(255,198,26,0); } to { box-shadow: 0 0 16px 2px rgba(255,198,26,.55); } }
        @media (prefers-reduced-motion: reduce) {
          .bm-logo, .bm-logo i { animation: none !important; }
        }
      `}</style>

      {/* Bahar phailti lehren (do, alag alag waqt par) */}
      {[0, 1.2].map((d) => (
        <i
          key={d}
          style={{ animation: "bmLogoRipple 2.4s ease-out infinite", animationDelay: `calc(${delay} + ${d}s)` }}
          className="absolute inset-0 rounded-full border-2 border-[#ffc61a]"
        />
      ))}

      {/* Ghoomti hui yellow gradient ring */}
      <i
        style={{
          animation: "bmLogoSpin 3s linear infinite",
          animationDelay: delay,
          background: "conic-gradient(from 0deg, #ffc61a, #202124 35%, #A7ADB4 60%, #ffc61a)",
        }}
        className="absolute -inset-[3px] rounded-full"
      />

      {/* Andar ka dark circle + initials + chamak */}
      <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-[#202124] text-sm font-bold text-white">
        <i
          style={{ animation: "bmLogoShine 3.2s ease-in-out infinite", animationDelay: delay }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
        <span className="relative">{initials}</span>
      </span>
    </span>
  );
}