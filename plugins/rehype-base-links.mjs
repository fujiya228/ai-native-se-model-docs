/**
 * rehype plugin: 内部リンクに Astro の base パスをプレフィックスする。
 *
 * Starlight のサイドバーリンクは pathWithBase() で自動的に base が付くが、
 * markdown 内の絶対パスリンク（/introduction/... 等）や LinkCard の href には
 * base が付かない。このプラグインでビルド時に一括で付与する。
 */
import { visit } from 'unist-util-visit';

/**
 * @param {{ base?: string }} options
 */
export function rehypeBaseLinks(options = {}) {
  const base = options.base || '';

  // base が空または '/' なら何もしない
  if (!base || base === '/') {
    return (tree) => tree;
  }

  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = String(node.properties.href);
        // 内部の絶対パスリンクで、まだ base が付いていないものだけ変換
        if (
          href.startsWith('/') &&
          !href.startsWith(normalizedBase + '/') &&
          !href.startsWith(normalizedBase + '#') &&
          href !== normalizedBase &&
          !href.startsWith('//') // protocol-relative URLs
        ) {
          node.properties.href = normalizedBase + href;
        }
      }
    });
  };
}
