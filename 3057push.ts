/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #easy #array
  
  ### Question
  
  Implement the generic version of ```Array.push```
  
  For example
  
  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```
  
  > View on GitHub: https://tsch.js.org/3057
*/

/* _____________ Your Code Here _____________ */

// type Push<T extends any[], U> = [...T, U];

// Tの制約型をany[]にするか、unknown[]にすべきか。
// typechallengeの解答共有では、半々くらいでどちらがメジャーかわからない
// 型が機能することと、理解しやすいことを目標にする

// anyとは
// どんな型がでも代入が可能。プリミティブ型でもオブジェクトでもなんでもおk
let anyValue: any = 1;
anyValue = "1";
anyValue = false;
anyValue = {
  any: true,
};
anyValue = new Date();

anyValue = 1;
// number型にはtoUpperCaseメソッドが使用できないので、実行時エラーになるがコンパイルエラーは発生しない。
anyValue.toUpperCase();
// つまり、なんでもおk型がないのと一緒

// unknownとは
// どんな型でも代入が可能なのはanyと同じだが。
let unknownValue: unknown = 1;
unknownValue = "1";
unknownValue = false;
unknownValue = {
  unknown: true,
};
unknownValue = new Date();

unknownValue = 1;
// @ts-expect-error
unknownValue.toUpperCase();
// unknown型は、any型と違い、使用できないメソッドを使った場合はコンパイルエラーが出てくれる

// これでは意味がないのでは？ => ある
// 何らかの方法で型がわかる状態になれば、メソッドを使用できる
unknownValue = "apple";
// 型ガード
if (typeof unknownValue === "string") {
  unknownValue.toUpperCase(); // unknown型 => string型に限定されるのでtoUpperCaseがOK
}

// 結論
// unknownを使えるときは積極的に使用して、どうしてもムリ(>_<)なときはanyを使うべきか
type Push<T extends unknown[], U> = [...T, U];

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3057/answer
  > View solutions: https://tsch.js.org/3057/solutions
  > More Challenges: https://tsch.js.org
*/
