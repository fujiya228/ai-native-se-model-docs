# AI-Native SE Model Docs

AIエージェントとの協働を前提としたソフトウェア開発ライフサイクルの参照モデル「AI-Native Software Engineering Model」のドキュメントサイトです。既存の知見（SDLC, RACI, DORA など）を、AIエージェントがもたらす「実行と責任の分離」「裁量の段階的な委譲」に対応できる形で体系化しています。

公開 URL: https://fujiya228.github.io/ai-native-se-model-docs

## 技術スタック

- [Astro 6](https://astro.build/) + [Starlight](https://starlight.astro.build/)
- [astro-mermaid](https://github.com/joesaby/astro-mermaid)（Mermaid 図の描画）
- [starlight-links-validator](https://github.com/HiDeoo/starlight-links-validator)（内部リンクの検証）

## 必要環境

- Node.js 22.12 以上

## 開発コマンド

| コマンド          | 内容                                       |
| :---------------- | :----------------------------------------- |
| `npm install`     | 依存パッケージのインストール               |
| `npm run dev`     | 開発サーバーの起動（`localhost:4321`）     |
| `npm run build`   | 本番ビルド（`./dist/` に出力）             |
| `npm run preview` | ビルド結果のローカルプレビュー             |

## ディレクトリ構成

ドキュメント本体は `src/content/docs/` 配下にあり、各ディレクトリがサイトのセクションに対応します。

```
src/content/docs/
├── introduction/  # 導入 — モデルの目的・使い方・読み方ガイド
├── foundation/    # 基礎概念 — 基盤モデル・ステップ構成・モデルの性格
├── lifecycle/     # ライフサイクル — 開発の流れをステップとして定義
├── execution/     # 実行設計 — 実行主体と責任主体の分離、裁量レベル
├── views/         # ビュー体系 — 目的別の可視化
├── dynamics/      # 動力学 — ボトルネック移動と継続的改善
├── instances/     # 適用例 — 変換モードインスタンス
└── appendix/      # 付録 — 既存フレームワークとの対応など
```

## デプロイ

`main` ブランチへの push をトリガーに、GitHub Actions（`.github/workflows/deploy.yml`）が GitHub Pages へ自動デプロイします。

## 執筆規約

ドキュメント執筆時のルールは [docs/writing-tips.md](docs/writing-tips.md) を参照してください。
