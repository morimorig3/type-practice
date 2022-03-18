/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #中級 #template-literal
  
  ### 質問
  
  文字列を受け取り、両端の空白を削除した新しい文字列を返す `Trim<T>` を実装します。
  
  例えば
  
  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```
  
  > GitHubで確認する：https://tsch.js.org/108/ja
*/

/* _____________ ここにコードを記入 _____________ */

// type Trim<S extends string> = S extends `${" " | "\n" | "\t"}${infer Rest}`
//   ? Trim<Rest>
//   : S extends `${infer Rest}${" " | "\n" | "\t"}`
//   ? Trim<Rest>
//   : S;
// TrimLeftが終わったらTrimRightを行うだけ

// リファクタリングするならば、TrimLeftとTrimRightを分ける
type Space = " " | "\n" | "\t";
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S;
type TrimRight<S extends string> = S extends `${infer Rest}${Space}`
  ? TrimRight<Rest>
  : S;
type Trim<S extends string> = TrimLeft<TrimRight<S>>;

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/108/answer/ja
  > 解答を見る：https://tsch.js.org/108/solutions
  > その他の課題：https://tsch.js.org/ja
*/
