/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #初級 #built-in #readonly #object-keys
  
  ### 質問
  
  組み込みの型ユーティリティ`Readonly<T>`を使用せず、`T` のすべてのプロパティを読み取り専用にする型を実装します。実装された型のプロパティは再割り当てできません。
  
  例えば
  
  ```ts
  interface Todo {
    title: string
    description: string
  }
  
  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```
  
  > GitHubで確認する：https://tsch.js.org/7/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

type Keyof = keyof Todo1; // 'title'|'description'|'completed'|'meta'

const TodoKey1: Keyof = "title";
const TodoKey2: Keyof = "description";
const TodoKey3: Keyof = "completed";
const TodoKey4: Keyof = "meta";

// const TodoKey5: Keyof = "author"; // error
// const TodoKey6: Keyof = "error"; // error

// T[key]
type Todo1Title = Todo1["title"]; // string
type Todo1completed = Todo1["completed"]; // string
type Todo1meta = Todo1["meta"];
// {
//     author: string;
// }

const meta1: Todo1meta = {
  author: "Nanasaki",
};
// const meta2: Todo1meta = {
//   grade: 1,
// };

// Mapped typesの復習
// [key in keyof T]
type mapped1 = {
  [P in "age" | "old"]: number;
};
// {
//     age:number;
//     old:number
// }

type mapped2 = {
  [P in "age" | "old"]: P;
};
// {
//   age: "age";
//   old: "old";
// }

type mapped3 = {
  [P in "title"]: Todo1[P];
};
// {
//     title:string
// }

// interfaceまるまるコピーできている？
type mapped4 = {
  [P in keyof Todo1]: Todo1[P];
};
// あとはreadonlyにするだけ
type mapped5 = {
  readonly [P in keyof Todo1]: Todo1[P];
};

// keyof T === 'title'|'description'|'completed'|'meta'
type MappedType1<T> = {
  [key in keyof T]: string;
};

const mappedType1: MappedType1<Todo1> = {
  title: "1",
  description: "2",
  completed: "3",
  meta: "4",
  //   done: "5", // error
};

type MappedType2 = {
  title: string;
  description: string;
  completed: string;
  meta: string;
};

// MappedType1<Todo1>とMappedType2は同一
type cases0 = [Expect<Equal<MappedType1<Todo1>, MappedType2>>];

/* _____________ テストケース _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/7/answer/ja
  > 解答を見る：https://tsch.js.org/7/solutions
  > その他の課題：https://tsch.js.org/ja
*/
