/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #中級 #application
  
  ### 質問
  
  JavaScript では、チェイン可能なオプションがよく使われます。しかし、TypeScript に切り替えたとき、正しく型を付けることができますか？
  
  この課題では、オブジェクトでもクラスでも何でもいいので、 `option(key, value)` と `get()` の 2 つの関数を提供する型を定義してください。`option` では、与えられたキーと値を使って現在の config の型を拡張できます。最終的な結果は `get` で取得することにしましょう。
  
  例えば
  
  ```ts
  declare const config: Chainable
  
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()
  
  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```
  
  この問題を解くために js/ts のロジックを書く必要はありません。型レベルのロジックだけを書いてください。
  
  `key` は `string` のみを受け付け、`value` は任意の型を受け付けると仮定しても構いません。同じ `key` が 2 回渡されることはありません。
  
  > GitHubで確認する：https://tsch.js.org/12/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<T & { [param in K]: V }>;
  get(): T;
};

// 感想ややこしい & ユースケースわからん…　が、なんとなく理解できた。メソッドチェーンで型を作ることがあるのか・・？
// type Chainable<T = {}> デフォルトパラメータを渡してオブジェクトリテラル型にしとく
// このからのオブジェクトリテラルに交差型で型を追加していくイメージ

// option<K extends string, V> オプションは、string型の文字列と値:anyを受け取る

// ( key: K extends keyof T ? never : K, value: V )
// キーがオブジェクトリテラルに存在すれば無視
// 存在しなければ、K=新たなキー・V=新たな値

// Chainable<T & { [param in K]: V }>
// T と 新しいオブジェクトリテラルの交差型

// {[param in K]: V}
// Kを展開

/* _____________ テストケース _____________ */
import { Alike, Expect } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

/* _____________ 次のステップ _____________ */
/*
    > 解答を共有する：https://tsch.js.org/12/answer/ja
    > 解答を見る：https://tsch.js.org/12/solutions
    > その他の課題：https://tsch.js.org/ja
  */
