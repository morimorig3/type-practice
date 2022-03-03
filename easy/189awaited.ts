/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #初級 #promise #built-in
  
  ### 質問
  
  Promise ライクな型が内包する型をどのように取得すればよいでしょうか。
  例えば、`Promise<ExampleType>`という型がある場合、どのようにして ExampleType を取得すればよいでしょうか。
  
  > この問題の元記事は [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora) です。
  
  > GitHubで確認する：https://tsch.js.org/189/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U>
  ? U extends Promise<unknown>
    ? MyAwaited<U>
    : U
  : never;

// conditional types
// 型の条件分岐
type Conditional<T, U, X, Y> = T extends U ? X : Y;
const conditional1: Conditional<any[], string[], "X", "Y"> = "X";
// UがTに代入可能な型か？ true => X型, false => Y型
// TがUnion Typeだった場合は、分配される
const conditional2: Conditional<string | number, number, "X", "Y"> = "X";
const conditional3: Conditional<string | number, number, "X", "Y"> = "Y";
// (string extends number ? 'X' : 'Y') | (number extends number ? 'X' : 'Y') => 'Y'|'X'

// Type inference in conditional types
// inferという構文の学習 型の再利用
type ReturnType<T> = T extends (...args: any[]) => infer S ? S : any;
// Tに関数の型を受け取っていたら、関数の返り値をinfer S して Sを再利用して返す。

// 再帰的に定義してるところがわからん・・

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/189/answer/ja
  > 解答を見る：https://tsch.js.org/189/solutions
  > その他の課題：https://tsch.js.org/ja
*/
