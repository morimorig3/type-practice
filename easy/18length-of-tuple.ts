/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #初級 #tuple
  
  ### 質問
  
  タプル`T`を受け取り、そのタプルの長さを返す型`Length<T>`を実装します。
  
  例えば
  
  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
  
  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```
  
  > GitHubで確認する：https://tsch.js.org/18/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Length<T extends readonly any[]> = T["length"];

// T['length']について
// 配列型の数の型 => number型が取得できるっぽい・・・こういう取得の仕方のドキュメント見つからない・・・
type AnyArrayLength<T extends any[]> = T["length"];

const strArray = ["a", "b", "c"];
const strArrayLength1: AnyArrayLength<typeof strArray> = 3; // number型
const strArrayLength2: AnyArrayLength<typeof strArray> = 1; // ただのnumber型なので1も受け入れてしまう
const readOnlyNumArray = [1, 2, 3, 4, 5] as const;
// @ts-expect-error
const readOnlyNumArrayLength: AnyArrayLength<typeof readOnlyNumArray> = 3;
// T extends any[]では、値も順序も決まっているtuple型を受け取れない
// The type 'readonly ["a", "b", "c"]' is 'readonly' and cannot be assigned to the mutable type 'any[]'.
type ReadonlyAnyArray<T extends readonly any[]> = T["length"];
// Tの制約型がany[]のとき、T['length']の返す型はnumber型だったが
// Tの制約型をreadonly any[]にするとT['length']の返す型はnumberのリテラル型になる
const strNumArrayLength1: ReadonlyAnyArray<typeof readOnlyNumArray> = 5; // 5型
// @ts-expect-error
const strNumArrayLength2: ReadonlyAnyArray<typeof readOnlyNumArray> = 1;

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/18/answer/ja
  > 解答を見る：https://tsch.js.org/18/solutions
  > その他の課題：https://tsch.js.org/ja
*/
