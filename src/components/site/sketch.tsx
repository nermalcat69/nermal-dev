export function ArchitectureSketch({
  className,
  title,
  ...rest
}: { className?: string; title?: string } & React.SVGAttributes<SVGSVGElement>) {
  const rows = [102, 136, 170, 204, 238, 272, 306];
  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
      className={className}
      {...rest}
    >
      <g stroke="currentColor" strokeWidth="1.25">
        <rect x="12" y="20" width="430" height="380" rx="16" />
        <path d="M12 56h430" />
        <circle cx="32" cy="38" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="44" cy="38" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="56" cy="38" r="2.4" fill="currentColor" stroke="none" />
        <path d="M148 56v344" />
        <rect x="28" y="70" width="104" height="18" rx="5" />
        <rect x="24" y="164" width="112" height="32" rx="7" fill="currentColor" opacity="0.06" stroke="none" />
        {rows.map((y) => (
          <g key={y}>
            <circle cx="36" cy={y + 8} r="3" />
            <path d={`M48 ${y + 5}h${y % 3 === 0 ? 62 : 74}`} />
            <path d={`M48 ${y + 14}h${y % 2 === 0 ? 40 : 52}`} />
          </g>
        ))}
        <path d="M148 230h294" />
        <path d="M168 78v140M168 248v132" />
        <path d="M180 92h150M180 108h118M180 124h136M180 140h86M180 156h124M180 172h70" />
        <path d="M178 258l7 6-7 6" />
        <path d="M194 264h150M180 286h112M180 304h138M180 322h70M180 340h124" />
        <path d="M442 196h36" />
        <rect x="478" y="132" width="146" height="148" rx="14" />
        <path d="M478 168h146M478 204h146M478 240h146" />
      </g>
    </svg>
  );
}
