/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #中級 #array
  
  ### 質問
  
  > この課題ではTypeScript 4.0が推奨されます
  
  配列 `T` を受け取り、最後の要素を除いた配列を返す汎用的な `Pop<T>` を実装してください。
  
  例えば
  
  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]
  
  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```
  
  **おまけ**: 同様に `Shift`、 `Push`、 `Unshift` も実装できますか？
  
  > GitHubで確認する：https://tsch.js.org/16/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Pop<T extends unknown[]> = T extends [...infer First, infer Rest]
  ? First
  : never;

type Shift<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? Rest
  : never;

type Push<T extends unknown[], U> = [...T, U];

type Unshift<T extends unknown[], U> = [U, ...T];

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>,
  Expect<Equal<Push<[3, 2, 1], 2>, [3, 2, 1, 2]>>,
  Expect<Equal<Push<["a", "b", "c", "d"], "e">, ["a", "b", "c", "d", "e"]>>,
  Expect<Equal<Unshift<[3, 2, 1], 2>, [2, 3, 2, 1]>>,
  Expect<Equal<Unshift<["a", "b", "c", "d"], "e">, ["e", "a", "b", "c", "d"]>>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/16/answer/ja
  > 解答を見る：https://tsch.js.org/16/solutions
  > その他の課題：https://tsch.js.org/ja
*/
