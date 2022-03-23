/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中級 #template-literal
  
  ### 質問
  
  `String#length`と同じように、文字列リテラルの長さを計算します。
  
  > GitHubで確認する：https://tsch.js.org/298/ja
*/

/* _____________ ここにコードを記入 _____________ */

type LengthOfString<
  S extends string,
  N extends string[] = []
> = S extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [First, ...N]>
  : N["length"];

// 配列型のlengthが取得できる性質を利用する
// case LengthOfString<"kumiko">

// "kumiko" extends First = "k" Rest = "umiko"
// LengthOfString<"umiko", ["k"]>

// "kumiko" extends First = "u" Rest = "miko"
// LengthOfString<"miko", ["u", ...["k"]]>
// LengthOfString<"miko", ["u", "k"]>

// "kumiko" extends First = "m" Rest = "iko"
// LengthOfString<"iko", ["m", ...["u","k"]]>
// LengthOfString<"iko", ["m", "u", "k"]>

// "kumiko" extends First = "i" Rest = "ko"
// LengthOfString<"ko", ["i", ...["m", "u", "k"]]>
// LengthOfString<"ko", ["i", "m", "u", "k"]>

// "kumiko" extends First = "k" Rest = "o"
// LengthOfString<"o", ["k", ...["i", "m", "u", "k"]]>
// LengthOfString<"o", ["k", "i", m", "u", "k"]>

// "kumiko" extends First = "o" Rest = ""
// LengthOfString<"", ["o", ...["k","i", "m", "u", "k"]]>
// LengthOfString<"", ["o", "k", "i", m", "u", "k"]>

// "kumiko" extends First = "" Rest = "" => false
// N["length"]
// ["o", "k", "i", m", "u", "k"]['length] => 6

// テンプレートリテラル型のconditionalTypes判定
type tmplateliteral1 = "a" extends `${infer F}${infer R}` ? true : false; // 一文字でもtrue
type tmplateliteral2 = "" extends `${infer F}${infer R}` ? true : false; // 空だとfalse

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/298/answer/ja
  > 解答を見る：https://tsch.js.org/298/solutions
  > その他の課題：https://tsch.js.org/ja
*/
