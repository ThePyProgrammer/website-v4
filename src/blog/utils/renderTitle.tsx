import React from 'react';

const STRIKE = /~~([^~]+)~~/g;

export function stripTitleMarkup(title: string): string {
  return title.replace(STRIKE, '$1');
}

export function renderTitle(
  title: string,
  transform?: (segment: string) => string,
): React.ReactNode {
  const apply = (s: string) => (transform ? transform(s) : s);
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  STRIKE.lastIndex = 0;
  while ((match = STRIKE.exec(title)) !== null) {
    if (match.index > last) out.push(apply(title.slice(last, match.index)));
    out.push(
      <s key={match.index} className="opacity-60">
        {apply(match[1])}
      </s>,
    );
    last = match.index + match[0].length;
  }
  if (last < title.length) out.push(apply(title.slice(last)));
  return out.length ? out : apply(title);
}
