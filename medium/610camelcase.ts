/*
  610 - CamelCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `for-bar-baz` -> `forBarBaz`
  
  > View on GitHub: https://tsch.js.org/610
*/

/* _____________ Your Code Here _____________ */

type CamelCase<S extends string> =
  `${S}` extends `${infer Left}-${infer Target}${infer Right}`
    ? Target extends Uppercase<Target>
      ? `${Left}-${CamelCase<`${Target}${Right}`>}`
      : `${Left}${Uppercase<Target>}${CamelCase<Right>}`
    : S;

// ターゲットを絞り出す
// ターゲットが大文字にする対象か判定する

// 対象じゃなければ
// 次のターゲットを絞り出す

// 対象であれば
// 区切り文字のハイフンを削除する
// ターゲット文字を大文字にする
// 次のターゲットを絞り出す

// ターゲットがなくなれば終了

// foo
type tmplateliteral1 = `foo-bar-baz` extends `${infer Left}-${infer Right}`
  ? Left
  : any;
// 最初に出現した'-'で区切れる

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CamelCase<"foo-bar-baz">, "fooBarBaz">>,
  Expect<Equal<CamelCase<"foo-Bar-Baz">, "foo-Bar-Baz">>,
  Expect<Equal<CamelCase<"foo-Bar-baz">, "foo-BarBaz">>,
  Expect<Equal<CamelCase<"foo-bar">, "fooBar">>,
  Expect<Equal<CamelCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<CamelCase<"foo--bar----baz">, "foo-Bar---Baz">>,
  Expect<Equal<CamelCase<"a-b-c">, "aBC">>,
  Expect<Equal<CamelCase<"a-b-c-">, "aBC-">>,
  Expect<Equal<CamelCase<"ABC">, "ABC">>,
  Expect<Equal<CamelCase<"-">, "-">>,
  Expect<Equal<CamelCase<"">, "">>,
  Expect<Equal<CamelCase<"😎">, "😎">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/610/answer
  > View solutions: https://tsch.js.org/610/solutions
  > More Challenges: https://tsch.js.org
*/
