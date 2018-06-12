# TypeScript-React-Rx-Fluxlike

個人的なFluxっぽいアーキテクチャのボイラープレート

## モチベーション
### 背景
- ReactのJSXは便利がよいなーと個人的に感じている。
- しかし、Reactはビューに状態があって気持ち悪い。
  - 関心事は分離させたい。
  - StatelssComponentのみでReactを使いたい。
- Fluxの単方向性はイケてると思ったので、Fluxっぽいアーキテクチャを使いたい。
### 解決策
- Rxで状態を管理し、Reactで描画する。
  - RxがReactのStateの役割を担う。
  - Rxを用いて状態を管理して、ReactDOMに渡してRenderを渡すことで実現した。

## 概要図
完全なFluxではおそらくないが、思想は則っているつもり
![概要](https://gist.githubusercontent.com/sato0203/b07d593afb954cfedac6d98acb218f52/raw/93f33b7cc462122bf7aa8989891bfbbf4e083747/figure.png "概要")

## 入っているフレームワーク等
- 実装
  - React
    - JSXを用いたビュー生成
  - RxJS
    - BehaviourSubject,Subjectを用いた状態管理
  - inversify
    - DependencyInjection
- テスト
  - mocha
  - power-assert
  - enzyme
    - React用テストユーティリティ
- ビルド・コマンド
  - gulp

## gulpコマンド
- gulp
  - コンパイル
- gulp develop
  - localhost:8000に立ち上げ
- gulp test
  - テストを走らせる

## 備考
開発スピードは落ちますが、CleanArchitectureとFluxの合わせ技のようなアーキテクチャを使うときもあります。
https://github.com/sato0203/TypeScript-React-CleanFlux