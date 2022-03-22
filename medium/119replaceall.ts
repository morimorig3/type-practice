/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #中級 #template-literal
  
  ### 質問
  
  文字列`S`に含まれる部分文字列`From`を`To`に置き換える型`ReplaceAll<S, From, To>`を実装します。
  
  例えば
  
  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'
  ```
  
  > GitHubで確認する：https://tsch.js.org/119/ja
*/

/* _____________ ここにコードを記入 _____________ */

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : S;

// 最初わからなかったところ
// S extends `${infer Left}${From}${Right}` ? Replace<`${infer Left}${To}${Right}`, From, To>
// と書いてしまっていた。
// 問題点
// 再帰的に処理させるので、処理済みの文字列に再度マッチングしてしまった場合意図せぬ動きになる。
// ex) ReplaceAll<"foobarfoobar", "ob", "b"> => "fobarfobar"
// 1. foobarfoobar => fobarfoobar
// 2. fobarfoobar => fbarfoobar
// 3. fbarfoobar => fbarfobar
// 4. fbarfobar => fbarfbar
// => fbarfbar 意図せぬ結果 意図した結果 => "fobarfobar"

// 処理済みの文字列は置き換えしないようにする
// 再帰的に処理する文字列に、処理済みの文字列を渡さない。
// S extends `${infer Left}${From}${Right}` ? `${Left}${To}${ReplaceAll<Right, From, To>}`

// テンプレートリテラル型柔軟！

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/119/answer/ja
  > 解答を見る：https://tsch.js.org/119/solutions
  > その他の課題：https://tsch.js.org/ja
*/
