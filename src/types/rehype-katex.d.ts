// rehype-katex 1.x does not ship TypeScript declarations.
declare module 'rehype-katex' {
  import type { Root } from 'hast';
  import type { Plugin } from 'unified';

  const rehypeKatex: Plugin<[], Root>;
  export default rehypeKatex;
}
