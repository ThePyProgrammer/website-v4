import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 text-base leading-relaxed">{children}</p>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">{children}</a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-4 mb-4">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="mb-2 text-base leading-relaxed">{children}</li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
