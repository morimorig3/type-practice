/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #中級 #infer #built-in
  
  ### 質問
  
  組み込みの型ユーティリティ`ReturnType<T>`を使用せず、`T`の戻り値の型を取得する型を実装します。
  
  例えば
  
  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }
  
  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```
  
  > GitHubで確認する：https://tsch.js.org/2/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReturnType<T> = T extends (...args: any[]) => infer U ? U : never;
type MyReturnTypeNoSpread<T> = T extends (arg: any) => infer U ? U : never;
type MyReturnTypeNoArg<T> = T extends () => infer U ? U : never;

// スプレッド構文にすることで複数の引数に対応
type Fn = MyReturnTypeNoSpread<typeof fn>; // 1 | 2
type Fn1 = MyReturnTypeNoSpread<typeof fn1>; // never
// ^T extends (arg:any) => infer U を満たさない
// fn2は引数が二つあるため
type Fn1_ = MyReturnType<typeof fn1>; // 1 | 2

// 引数を指定するかしないかの違い
// T extends (...args: any[]) => infer U or T extends () => infer U
// 渡す関数の型が引数なしならば正常に動作するが
type NoArg = MyReturnTypeNoArg<() => 1>; // 1

// 引数なし関数型ではないので、条件を満たさずnever型になる
type FnNoArg = MyReturnTypeNoArg<typeof fn>; // never
type Fn1NoArg = MyReturnTypeNoArg<typeof fn1>; // never

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/2/answer/ja
  > 解答を見る：https://tsch.js.org/2/solutions
  > その他の課題：https://tsch.js.org/ja
*/
