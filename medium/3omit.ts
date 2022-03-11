/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #中級 #union #built-in
  
  ### 質問
  
  組み込みの型ユーティリティ`Omit<T, K>`を使用せず、`T`のプロパティから`K`を削除する型を実装します。
  
  例えば
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
  const todo: TodoPreview = {
    completed: false,
  }
  ```
  
  > GitHubで確認する：https://tsch.js.org/3/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyOmit<T, K extends keyof T> = {
  [key in keyof T as key extends K ? never : key]: T[key];
};

// アサーションで条件をつける
// アサーションなのか？

// アサーションをのぞくと
// ただの複製
type MyOmitNoAssertion<T> = {
  [key in keyof T]: T[key];
};

const kamitsubaki = {
  artist: ["kafu"],
  company: "kamitsubaki",
};
type studio = MyOmitNoAssertion<typeof kamitsubaki>;

// キー指定の時に条件をつける
// [key in keyof T as key extends K ? never : key]: T[key];
// keyはT型のキーです。ただし、keyはK型を満たすならば、neverです。K型を満たさなければkey

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/3/answer/ja
  > 解答を見る：https://tsch.js.org/3/solutions
  > その他の課題：https://tsch.js.org/ja
*/
