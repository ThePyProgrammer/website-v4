export function BlogFooter() {
  return (
    <footer className="w-full py-8 px-12 bg-[#0e0e10] flex flex-col md:flex-row justify-between items-center mt-20">
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        <span className="text-[#00d4fd] font-bold font-headline text-lg tracking-tighter mb-1">prannay.dev</span>
        <p className="font-headline text-[10px] opacity-50 uppercase text-[#00d4fd]">
          © {new Date().getFullYear()} ThePyProgrammer // ALL_RIGHTS_RESERVED
        </p>
      </div>
      <div className="flex gap-8">
        <a href="/" className="font-headline text-[10px] opacity-50 hover:opacity-100 hover:text-[#00d2fd] transition-colors uppercase text-[#00d4fd]">PORTFOLIO</a>
        <a href="https://github.com/ThePyProgrammer" target="_blank" rel="noreferrer" className="font-headline text-[10px] opacity-50 hover:opacity-100 hover:text-[#00d2fd] transition-colors uppercase text-[#00d4fd]">SOURCE</a>
      </div>
    </footer>
  );
}
