/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #easy #infer #tuple #built-in
  
  ### Question
  
  Implement the built-in Parameters<T> generic without using it.
  
  > View on GitHub: https://tsch.js.org/3312
*/

/* _____________ Your Code Here _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;

// 疑問点
// T extends () => any ? true : false
// ^これはどう解釈されるのか？

// そもそもconditional Typeは、T extends U ? X : Y
// TがUに代入可能ならX、代入不可ならY

// inferを使うのが、Type inference in Conditional types
// T extends U ? X : Y の U を infer Sにすると、Sを戻り型で再利用できる

// T extends () => infer S ? S : never であれば、
// Tが関数ならば、関数の戻り値の型が返る！これのinfer Sの位置を変更すると

// T extends (arg:infer S)=> any ? S : never
// Tが関数ならば、関数の引数の型が返る！これをスプレッド構文にすると

// T extends (...args: infer S) => any ? S : never

// なぜ戻りがタプルになるのか
// 引数の ...argsがスプレッド構文だから、タプル型になる？

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3312/answer
  > View solutions: https://tsch.js.org/3312/solutions
  > More Challenges: https://tsch.js.org
*/
