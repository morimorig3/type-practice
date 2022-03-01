/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #初級 #built-in
  
  ### 質問
  
  組み込みの型ユーティリティ`Exclude <T、U>`を使用せず、`U`に割り当て可能な型を`T`から除外する型を実装します。
  
  > GitHubで確認する：https://tsch.js.org/43/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyExclude<T, U> = T extends U ? never : T;

type LiteralUniton = "Ai" | "Haruka" | "Tsukasa" | "Junichi";

type Heroine = MyExclude<LiteralUniton, "Junichi">;

const heroine1: Heroine = "Ai";
// @ts-expect-error
const heroine2: Heroine = "Junichi";

/**
 * "Ai" | "Haruka" | "Tsukasa" | "Junichi" extends "Junichi"
 *
 * "Ai" extends "Junichi" => false
 * "Haruka" extends "Junichi" => false
 * "Tsukasa" extends "Junichi" => false
 * "Junichi" extends "Junichi" => true => never
 *
 */

// neverとは
// 値を持たない型 何も代入できない
// @ts-expect-error
let foo: never = 1;
// @ts-expect-error
foo = "1";
// @ts-expect-error
foo = true;
// @ts-expect-error
foo = () => undefined;
// @ts-expect-error
foo = null;

// never型のユースケース
// エラーを投げる関数の戻り値の型
// 関数が最後まで到達せずに値を返さない
function error(): never {
  throw new Error("Error");
}

// 無限ループも関数が最後まで到達しないのでnever型
function infiniteloop(): never {
  while (true) {
    console.log("loop");
  }
}

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
  Expect<
    Equal<
      MyExclude<"a" | "b" | "c", "a" | "b">,
      Exclude<"a" | "b" | "c", "a" | "b">
    >
  >,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/43/answer/ja
  > 解答を見る：https://tsch.js.org/43/solutions
  > その他の課題：https://tsch.js.org/ja
*/
