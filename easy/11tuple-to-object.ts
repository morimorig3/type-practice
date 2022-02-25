/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #初級 
  
  ### 質問
  
  タプルを受け取り、その各値のkey/valueを持つオブジェクトの型に変換する型を実装します。
  
  例えば
  
  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  
  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```
  
  > GitHubで確認する：https://tsch.js.org/11/ja
*/

/* _____________ ここにコードを記入 _____________ */

// タプル復習
// タプル型 型と順番と数が決まっている?
const tuple1: [number, number] = [1, 2];
tuple1[0] = 3;
tuple1.push(12345); // pushできてしまうが
// tuple1[2]; // 参照できない => Tuple type '[number, number]' of length '2' has no element at index '2'.
// const tuple2: [number] = [1, 2];
// Type '[number, number]' is not assignable to type '[number]'.
// Source has 2 element(s) but target allows only 1.
const tuple3: [number, string] = [1, "2"];
const tuple4: [number, string?] = [1]; // オプショナル
type TypeofTuple = typeof tuple1; // [number, number]

// constアサーション
const names1 = ["Ai", "Haruka", "Rihoko", "Tae"] as const;
type TypeofNames = typeof names1; // readonly ["Ai", "Haruka", "Rihoko", "Tae"]
// const names2: TypeofNames = ["Ai"]; // 値固定、要素数固定、再代入不可(readonly)
// Type '["Ai"]' is not assignable to type 'readonly ["Ai", "Haruka", "Rihoko", "Tae"]'.
// Source has 1 element(s) but target requires 4.
// names1[0] = "Jun"; // 再代入不可
// Cannot assign to '0' because it is a read-only property.

type TupleToObject<T extends readonly any[]> = {
  [key in T[number]]: key;
};
/**
 * T = readonly ["tesla", "model 3", "model X", "model Y"]
 *
 * loop1
 * [key in T[number]] = ["tesla", "model 3", "model X", "model Y"][0] => "tesla"
 * key = "tesla"
 *
 * loop2
 * [key in T[number]] = ["tesla", "model 3", "model X", "model Y"][1] => "model 3"
 * key ="model 3"
 *
 * loop3
 * [key in T[number]] = ["tesla", "model 3", "model X", "model Y"][2] => "model X"
 * key = "model X"
 *
 * loop4
 * [key in T[number]] = ["tesla", "model 3", "model X", "model Y"][3] =>  "model Y"
 * key = "model Y"
 */

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/11/answer/ja
  > 解答を見る：https://tsch.js.org/11/solutions
  > その他の課題：https://tsch.js.org/ja
*/
