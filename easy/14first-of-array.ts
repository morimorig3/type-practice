/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #初級 #array
  
  ### 質問
  
  配列`T`を受け取り、その最初のプロパティの型を返す`First<T>`を実装します。
  
  例えば
  
  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```
  
  > GitHubで確認する：https://tsch.js.org/14/ja
*/

/* _____________ ここにコードを記入 _____________ */

type First<T extends any[]> = T extends [] ? never : T[0];

// ジェネリクスへの型制約
// type GenericsExtends<T> = T[0]; // Tが配列型とは限らないのでエラーになる
// 配列型の一つ目のプロパティの型を返す
type GenericsExtends<T extends any[]> = T[0]; // Tは少なくとも配列型なのでT[0]がエラーにならない
const num1: GenericsExtends<[1, 2, 3, 4, 5]> = 1;
const num2: GenericsExtends<[1, 2, 3, 4, 5]> = 2; // Type '2' is not assignable to type '1'.
const myHeroine1: GenericsExtends<["Ai", "Haruka", "Tsukasa"]> = "Ai";
const myHeroine2: GenericsExtends<["Ai", "Haruka", "Tsukasa"]> = "Haruka"; // Type '"Haruka"' is not assignable to type '"Ai"'.
const undefined1: GenericsExtends<[undefined]> = undefined;
// 空配列を渡してしまうと
const emptyArray: GenericsExtends<[]> = undefined; // 空配列でもundefinedになってしまう
// 空配列の時は何も入らないという型　＝ never型
// undefinedなら undefined型 にしたい
type GenericsExtendsEmpty<T extends any[]> = T extends [] ? never : T[0]; // 三項演算子でTが[]であればneverという分岐を作る
const emptyArrayNever: GenericsExtendsEmpty<[]> = "";
// エラーが出てくれる
// Type 'string' is not assignable to type 'never'.

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/14/answer/ja
  > 解答を見る：https://tsch.js.org/14/solutions
  > その他の課題：https://tsch.js.org/ja
*/
