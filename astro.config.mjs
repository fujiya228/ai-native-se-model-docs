// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightLinksValidator from 'starlight-links-validator';
import { rehypeBaseLinks } from './plugins/rehype-base-links.mjs';

const basePath = '/ai-native-se-model-docs';

// https://astro.build/config
export default defineConfig({
	site: 'https://fujiya228.github.io/ai-native-se-model-docs',
	base: basePath,
	markdown: {
		rehypePlugins: [[rehypeBaseLinks, { base: basePath }]],
	},
	integrations: [
		mermaid({
			// CLAUDE.md のカラーテーマ規約で %%{init}%% により base テーマを指定するため、
			// デフォルトテーマは base にしておく
			theme: 'base',
			// Starlight のダーク/ライトモード切替に対応
			autoTheme: true,
		}),
		starlight({
			title: 'AI-Native SE Model',
			plugins: [
				// Note: starlight-links-validator は base パス（/ai-native-se-model-docs）設定時に
				// 内部リンクを誤検知するため、base パスの非互換が解消されるまで無効化。
				// 参照: https://github.com/fujiya228/ai-native-se-model-docs/issues/29
				// starlightLinksValidator(),
			],
			locales: {
				root: { label: '日本語', lang: 'ja' },
			},
			editLink: {
				baseUrl: 'https://github.com/fujiya228/ai-native-se-model-docs/edit/main/',
			},
			lastUpdated: true,
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/fujiya228/ai-native-se-model-docs' },
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					content: `
						document.addEventListener('DOMContentLoaded', () => {
							function initMermaidZoom() {
								document.querySelectorAll('.mermaid').forEach((el) => {
									if (el.dataset.zoomReady) return;
									el.dataset.zoomReady = 'true';
									el.addEventListener('click', () => {
										const svg = el.querySelector('svg');
										if (!svg) return;
										const overlay = document.createElement('div');
										overlay.className = 'mermaid-modal-overlay';
										const hint = document.createElement('div');
										hint.className = 'mermaid-modal-hint';
										hint.textContent = 'Click to close';
										const clone = svg.cloneNode(true);
										clone.removeAttribute('style');
										overlay.appendChild(clone);
										overlay.appendChild(hint);
										document.body.appendChild(overlay);
										requestAnimationFrame(() => overlay.classList.add('is-visible'));
										overlay.addEventListener('click', () => {
											overlay.classList.remove('is-visible');
											overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
										});
										document.addEventListener('keydown', function esc(e) {
											if (e.key === 'Escape') {
												overlay.classList.remove('is-visible');
												overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
												document.removeEventListener('keydown', esc);
											}
										});
									});
								});
							}
							const observer = new MutationObserver(() => initMermaidZoom());
							observer.observe(document.body, { childList: true, subtree: true });
							initMermaidZoom();
						});
					`,
				},
			],
			sidebar: [
				{
					label: '導入',
					items: [
						{ label: 'このモデルが目指すこと', slug: 'introduction/model-goals' },
						{ label: 'このモデルでできること', slug: 'introduction/what-you-can-do' },
						{ label: '読み方ガイド', slug: 'introduction/reading-guide' },
					],
				},
				{
					label: '基礎概念',
					items: [
						{ label: '基底モデル', slug: 'foundation/base-model' },
						{ label: '6つの設計属性', slug: 'foundation/design-attributes' },
						{ label: 'モデルの性格', slug: 'foundation/model-character' },
						{ label: '3つの使い方', slug: 'foundation/three-modes' },
					],
				},
				{
					label: 'ライフサイクル',
					items: [
						{ label: '9段階のライフサイクル', slug: 'lifecycle/nine-stages' },
						{ label: 'L2分解表', slug: 'lifecycle/l2-decomposition' },
						{ label: '依存関係マップ', slug: 'lifecycle/dependency-map' },
					],
				},
				{
					label: '実行設計',
					items: [
						{ label: '実行主体と責任主体', slug: 'execution/actor-and-responsibility' },
						{ label: 'RACIと裁量レベル', slug: 'execution/raci-and-discretion' },
						{ label: 'AIの多面性', slug: 'execution/ai-four-facets' },
					],
				},
				{
					label: 'ビュー体系',
					items: [
						{ label: 'なぜ複数ビューが必要か', slug: 'views/why-multiple-views' },
						{ label: '8つのビューの概要', slug: 'views/overview' },
						{ label: 'View 1: ライフサイクルビュー', slug: 'views/view-1-lifecycle' },
						{ label: 'View 2: 実行設計ビュー', slug: 'views/view-2-execution' },
						{ label: 'View 3: アーティファクト＆受け渡しビュー', slug: 'views/view-3-artifact' },
						{ label: 'View 4: 依存関係ビュー', slug: 'views/view-4-dependency' },
						{ label: 'View 5: 制御環境ビュー', slug: 'views/view-5-control' },
						{ label: 'View 6: レイヤービュー', slug: 'views/view-6-layer' },
						{ label: 'View 7: 測定ビュー', slug: 'views/view-7-measurement' },
						{ label: 'View 8: As-Is / To-Be / Validation ビュー', slug: 'views/view-8-asis-tobe' },
						{ label: 'ビュー間のつなぎ方', slug: 'views/connecting-views' },
					],
				},
				{
					label: '動力学',
					items: [
						{ label: 'なぜ動力学が必要か', slug: 'dynamics/why-dynamics' },
						{ label: '理論的基盤', slug: 'dynamics/theoretical-foundations' },
						{ label: 'フロー変数と測定', slug: 'dynamics/flow-variables' },
						{ label: 'ボトルネック移動の4パターン', slug: 'dynamics/bottleneck-patterns' },
						{ label: 'WIP制限の設計原則', slug: 'dynamics/wip-limits' },
					],
				},
				{
					label: '適用例',
					items: [
						{ label: '適用例の読み方', slug: 'instances/how-to-read' },
						{ label: 'Implementation: 変換モード', slug: 'instances/implementation' },
						{ label: 'Verification & Review: 変換モード', slug: 'instances/verification-review' },
					],
				},
				{
					label: '付録',
					items: [
						{ label: '既存フレームワークの全体像', slug: 'appendix/existing-landscape' },
						{ label: '概念の導出過程', slug: 'appendix/derivation-process' },
						{ label: 'L2分解の原則', slug: 'appendix/l2-principles' },
						{ label: '自己批評と未解決論点', slug: 'appendix/critique-and-gaps' },
						{ label: '用語集', slug: 'appendix/glossary' },
					],
				},
			],
		}),
	],
});
