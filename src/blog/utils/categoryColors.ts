export interface CategoryColor {
  text: string;
  bg: string;
  hover: string;
  groupHover: string;
  hex: string;
}

const categoryColors: Record<string, CategoryColor> = {
  'ai': { text: 'text-[#00d4fd]', bg: 'bg-[#00b8e0]/20', hover: 'hover:text-[#00d4fd]', groupHover: 'group-hover:text-[#00d4fd]', hex: '#00d4fd' },
  'web-dev': { text: 'text-[#00d2fd]', bg: 'bg-[#00677e]/20', hover: 'hover:text-[#00d2fd]', groupHover: 'group-hover:text-[#00d2fd]', hex: '#00d2fd' },
  'rust': { text: 'text-[#ff58e7]', bg: 'bg-[#fe00e9]/20', hover: 'hover:text-[#ff58e7]', groupHover: 'group-hover:text-[#ff58e7]', hex: '#ff58e7' },
  'security': { text: 'text-[#ff58e7]', bg: 'bg-[#fe00e9]/20', hover: 'hover:text-[#ff58e7]', groupHover: 'group-hover:text-[#ff58e7]', hex: '#ff58e7' },
  'optimization': { text: 'text-[#ffd93d]', bg: 'bg-[#f5c518]/20', hover: 'hover:text-[#ffd93d]', groupHover: 'group-hover:text-[#ffd93d]', hex: '#ffd93d' },
  'research': { text: 'text-[#ff4d6d]', bg: 'bg-[#ff1744]/20', hover: 'hover:text-[#ff4d6d]', groupHover: 'group-hover:text-[#ff4d6d]', hex: '#ff4d6d' },
};

const fallback: CategoryColor = { text: 'text-[#00d4fd]', bg: 'bg-[#00d4fd]/20', hover: 'hover:text-[#00d4fd]', groupHover: 'group-hover:text-[#00d4fd]', hex: '#00d4fd' };

export function getCategoryColor(category: string): CategoryColor {
  return categoryColors[category] ?? fallback;
}
