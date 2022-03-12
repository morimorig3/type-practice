/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #中級 #readonly #object-keys
  
  ### 質問
  
  2つの型引数`T`と`K`を取る`MyReadonly2<T, K>`を実装します。
  
  `K`が指定されている場合は、`T`の中の`K`のプロパティのみを読み取り専用にします。`K`が指定されていない場合は、通常の`Readonly<T>`と同様に、すべてのプロパティを読み取り専用にします。
  
  例えば
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```
  
  > GitHubで確認する：https://tsch.js.org/8/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyOmit<T, K extends keyof T> = {
  [key in keyof T as key extends K ? never : key]: T[key];
};

// 型 & 型 とは？ => 交差型

// 交差型と合併型の復習
// 合併型とは 型同士をバーティカルラインで結んだ型。どちらの型も許容する。
type union = string | number; // string or numberを代入可能な型

// 交差型とは オブジェクトリテラル同士をアンパサンドで結んだ型。型同士を合体させるイメージ。
type intersection = {
  userName: string;
} & {
  age: number;
};
const user: intersection = {
  userName: "Ai",
  age: 15,
};

// すべてのプロパティを含まなければならない
// @ts-expect-error
const user1: intersection = {
  userName: "Haruka",
};

// プロパティ名が重複していた場合はどちらが優先される？
type SameProps1 = {
  user: string;
} & {
  readonly user: string;
};

const same: SameProps1 = {
  user: "Ai",
};
// 変更できる
// readonly user: string;はなかったことになる
same.user = "Haruka";

type SameProps2 = {
  user: string;
} & {
  readonly user: string;
  readonly age: number;
};

const same1: SameProps2 = {
  user: "Ai",
  age: 15,
};
same1.user = "Tsukasa";
// @ts-expect-error
same1.age = 16;
// プロパティ名が重複していた時の結論
// 同じプロパティ名でreadonlyの有無が異なるときは、readonlyが無効化される

type MyReadonly2<T, K extends keyof T = keyof T> = MyOmit<T, K> & {
  readonly [key in keyof T]: T[key];
};

// MyReadonly2<Todo1, "title" | "description">の場合
// MyOmit<Todo1, "title" | "description">
// Omitは引数1つ目から2つ目を取り除くので
// {
//   title: string;
// }
// readonly [key in keyof T]: T[key] はeasyのreadonlyと同じ前プロパティをreadonly付きで上書き
// MyOmitで定義されたプロパティは、readonlyが付与されない
// {
//     title: string;
//     readonly description?: string;
//     readonly completed: boolean;
// }

// 引数が一つだった場合 MyReadonly2<Todo1> は全てをReadonlyにする
// MyReadonly2<Todo1>
// Kが指定されていない時のために、デフォルトパラメータをジェネリクスに渡す必要がある
// <T, K extends keyof T = keyof T>
// MyOmit<Todo1, "title" | "description"| "completed"> こうなる
// {
// }
// Omitなので空っぽになる。そして、交差型
// readonly [key in keyof T]: T[key]
// {
//     readonly title: string;
//     readonly description?: string;
//     readonly completed: boolean;
// }

/* _____________ テストケース _____________ */
import { Alike, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/8/answer/ja
  > 解答を見る：https://tsch.js.org/8/solutions
  > その他の課題：https://tsch.js.org/ja
*/
