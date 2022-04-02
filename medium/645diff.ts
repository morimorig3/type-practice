/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
  
  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

// キーのDiff
type MyExcludeKey<K, K1> =
  | (K extends K1 ? never : K)
  | (K1 extends K ? never : K1);

// 'name'|'age', 'name'|'age'|'gender'

type cases01 = [
  Expect<Equal<MyExcludeKey<keyof Foo, keyof Bar>, "gender">>,
  Expect<Equal<MyExcludeKey<keyof Bar, keyof Foo>, "gender">>
];

// オブジェクト同士のDiff
type MyDiff<O, O1> = {
  [K in MyExcludeKey<keyof O, keyof O1>]: K extends keyof O
    ? O[K]
    : K extends keyof O1
    ? O1[K]
    : never;
};

// パラメータキーはキー同士のDiffで算出した値
// それぞれのオブジェクトに対して、算出した値の存在を確かめる
// 存在すればオブジェクトの値を返す

// 組み込み関数を使用
// 再帰的に処理したバージョン
type Diff<O, O1> = O extends O1
  ? {
      [K in Exclude<keyof O, keyof O1>]: O[K];
    }
  : Diff<O1, O>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};

type cases = [
  Expect<Equal<MyDiff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<MyDiff<Bar, Foo>, { gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
