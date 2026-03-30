export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="bg-black p-6 relative overflow-hidden mb-8">
      <div className="absolute inset-0 scanline-overlay opacity-10" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#00d4fd] font-mono text-xs">prannay.dev</span>
          <div className="h-px flex-1 bg-[#48474a]/20" />
          <span className="text-[#00d2fd] font-mono text-[10px]">QUERY_MODE: ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-[#00d4fd]">
          <span className="font-mono text-xl font-bold">$</span>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="QUERY_THE_ARCHIVE..."
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-xl font-mono w-full placeholder:text-[#00d4fd]/20 text-[#00d4fd]"
          />
          <div className="w-3 h-6 bg-[#00d4fd] cursor-blink flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
