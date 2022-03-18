/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #中級 #template-literal
  
  ### 質問
  
  文字列を受け取り、先頭の空白を削除した新しい文字列を返す `TrimLeft<T>` を実装します。
  
  例えば
  
  ```ts
  type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```
  
  > GitHubで確認する：https://tsch.js.org/106/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

// テンプレートリテラル型？
// 一番左が半角空白・\n・\tならば一文字削除して、残りを再帰的に処理する
// テンプレートリテラル型では、スプレッド構文しなくても、inferで残りを取得できる模様

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/106/answer/ja
  > 解答を見る：https://tsch.js.org/106/solutions
  > その他の課題：https://tsch.js.org/ja
*/
