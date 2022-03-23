/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中級 #union
  
  ### 質問
  
  Union 型を Union 型の値の順列を含む配列に変換する順列型を実装します。
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
  
  > GitHubで確認する：https://tsch.js.org/296/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];

// むずいのでトレースしてみる
// Permutation<"A" | "B" | "C">
// "A" | "B" | "C" extends U ? [T, ...Permutation<Exclude<U, T>>]の部分
// ユニオン型のConditional Typesは分配される。
// つまり 1ユニオン目 T = A
// "A" extends U ? (省略) | "B" extends U ? (省略) | "C" extends U ? (省略)になる
// U は常に T = "A" | "B" | "C"
// ということは・・・
// "A" extends "A" | "B" | "C" ? ["A", ...Permutation<Exclude<"A"|"B"|"C", "A">>]
// Excludeの部分を展開して
// "A" extends "A" | "B" | "C" ? ["A", ...Permutation<"B"|"C">]

// ["A", ...Permutation<"B"|"C">]の再帰的に処理されている部分はどうなるか
// まず、Permutation<"B"|"C">の部分 戻り型がスプレッド構文で展開されてる
// "B" | "C" extends U ? [T, ...Permutation<Exclude<U, T>>]
// "B" extends "B"|"C" ? ["B", ...Permutation<"C">]

// Permutation<"C">の部分
// "C" extends "C" ? ["C", ...Permutation<Exclude<"C", "C">>]の部分
// Excludeの部分が、同じ文字列リテラル型になっているどうなるのかというと、never型になる
// "C" extends "C" ? ["C", ...Permutation<never>]の部分

// Permutation<never>は？
// [T] extends [never] ? [] : 省略
// 空配列型を返すようやく最後まで掘り終わり

// 再帰的に処理をしているので、一つずつ戻っていく
// "C" extends "C" ? ["C", ...Permutation<never>] => ["C", ...[]] => ["C"]
// 2層目は、Permutationにユニオン型（"B"|"C"）が渡されているので二つ分配する
// "B" extends "B"|"C" ? ["B", ...Permutation<"C">] => ["B", ...["C"]] => ["B", "C"]
// "C" extends "B"|"C" ? ["C", ...Permutation<"B">] => ["C", ...["B"]] => ["C", "B"]

// Permutation<"B"|"C">は、["B", "C"] | ["C", "B"]になる
// 最後に1層目
// "A" extends "A" | "B" | "C" ? ["A", ...Permutation<"B"|"C">] => ["A", "B", "C"]|["A", "C", "B"]
// "B" extends "A" | "B" | "C" ? ["A", ...Permutation<"A"|"C">] => ["B", "A", "C"]|["B", "C", "A"]
// "C" extends "A" | "B" | "C" ? ["A", ...Permutation<"A"|"B">] => ["C", "A", "B"]|["C", "B", "A"]

// 仕組みは理解できたけど、Excludeとスプレッド構文で順列を作るなんてよう思いつかん…

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<never>, []>>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/296/answer/ja
  > 解答を見る：https://tsch.js.org/296/solutions
  > その他の課題：https://tsch.js.org/ja
*/
