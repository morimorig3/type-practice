/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中級 #union #string
  
  ### 質問
  
  受け取った文字列を Union 型に変換する型を実装します。
  
  例えば
  
  ```ts
  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
  ```
  
  > GitHubで確認する：https://tsch.js.org/531/ja
*/

/* _____________ ここにコードを記入 _____________ */

// type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
//   ? First | StringToUnion<Rest>
//   : never;

// 再帰処理の理解がむずかしい
// 一時的なデータの場所を確保しようとする癖がある

// 例えば

type StringToUnion<
  T extends string,
  U extends string = never
> = T extends `${infer First}${infer Rest}`
  ? StringToUnion<Rest, First | U>
  : U;

// みたいな感じ。
// 変数Uに結果を追加していって、ループ終了の条件になれば、その時点のUを返すという処理

// 描きやすいが読みづらい => 長くなってしまうため
// 再帰処理で書けば非常にシンプル
// 再帰処理自体が読みづらいという問題はあるが、シンプルなので読んでみようと思える

// どちらがいいのやら

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/531/answer/ja
  > 解答を見る：https://tsch.js.org/531/solutions
  > その他の課題：https://tsch.js.org/ja
*/
