export const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

export const formatList = (items) => {
  if (items.length < 2) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
};

export const shortName = (name) => {
  if (name === 'Kevin Yang Chen') return 'K.-Y. Chen';
  const parts = name.split(' ');
  const surname = parts.pop();
  return `${parts.map((part) => `${[...part][0]}.`).join(' ')} ${surname}`;
};

export const renderAuthors = (authors, { abbreviated = false } = {}) => formatList(
  authors.map((author) => {
    const displayName = abbreviated ? shortName(author) : author;
    const escapedName = escapeHtml(displayName);
    return author === 'Yichao Yuan' ? `<strong>${escapedName}</strong>` : escapedName;
  }),
);

export const renderHead = ({ title, description, socialDescription, url, cv = false }) => `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  ${cv ? '' : `<meta name="theme-color" content="#080b16">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(socialDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">`}
  <title>${escapeHtml(title)}</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="styles.css">${cv ? '\n  <link rel="stylesheet" href="cv.css">' : ''}
  <script src="script.js" defer></script>
</head>`;

export const renderWordmark = (site, href) => `
      <a class="wordmark" href="${href}" aria-label="${escapeHtml(site.name)}, home">
        <span class="wordmark-mark">${escapeHtml(site.initials)}</span>
        <span class="wordmark-name">${escapeHtml(site.name)}</span>
      </a>`;

export const documentShell = ({ head, bodyClass = '', body }) => `<!doctype html>
<html lang="en">
${head}
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
</body>
</html>
`;
