# TypeScript-React-Rx-Fluxlike

個人的なFluxっぽいアーキテクチャのボイラープレート

## モチベーション
### 背景
- ReactのJSXは便利がよいなーと個人的に感じている。
- しかし、Reactはビューに状態があって気持ち悪い。
  - 関心事は分離させたい。
  - StatelssComponentのみでReactを使いたい。
- Fluxの単方向性はシンプルで良いと思ったので、Fluxっぽいアーキテクチャを使いたい。
### 解決策
- Rxで状態を管理し、Reactで描画する。
  - RxがReactのStateの役割を担う。
  - Rxを用いて状態を管理して、ReactDOMにその状態を渡してDOM生成をすることで実現した。

## 概要図
完全なReduxと構成が少し違うが、Fluxの思想は則っているつもり
![概要](https://gist.githubusercontent.com/sato0203/b07d593afb954cfedac6d98acb218f52/raw/0a43a0d1e65120ff122d0cca296b3b6c4c46aacb/figure.png "概要")

## 入っているフレームワーク等
- 実装
  - React
    - JSXを用いたビュー生成
  - RxJS
    - BehaviourSubject,Subjectを用いた状態管理
  - inversify
    - DependencyInjection
  - Express
    - サーバー用に、Webフレームワーク
- テスト
  - mocha
  - power-assert
  - enzyme
    - React用テストユーティリティ
- ビルド・コマンド
  - gulp

## gulpコマンド
- frontend
  - gulp
    - コンパイル
  - gulp develop
    - localhost:8000に立ち上げ
    - frontend側のコードが書き換わるたびにコンパイルが走る。
  - gulp test
    - テストを走らせる
- server
  - gulp
    - サーバー立ち上げ
    - frontendのコードを書き換えのたびにコンパイルする。
    - serverのコードを書き換えるたびに自動的にサーバーを立ち上げ直し

## 備考
開発スピードは落ちますが、CleanArchitectureとFluxの合わせ技のようなアーキテクチャを使うときもあります。
https://github.com/sato0203/TypeScript-React-CleanFlux
