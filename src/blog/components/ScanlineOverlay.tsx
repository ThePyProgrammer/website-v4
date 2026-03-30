export function ScanlineOverlay({ className = '' }: { className?: string }) {
  return <div className={`absolute inset-0 scanline-overlay pointer-events-none ${className}`} />;
}
