# 유틸리티 타입

### 🏀 Partial\<T>

---

`T`의 모든 프로퍼티를 선택적으로 만드는 타입을 구성. 이 유틸리티는 주어진 타입의 모든 하위 타입 집합을 나타내는 타입을 반환.

```tsx
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

<br/>

### 🏀 Readonly\<T>

---

`T`의 모든 프로퍼티를 `읽기 전용(readonly)`으로 설정한 타입을 구성. 생성된 타입의 프로퍼티는 재할당불가.

```tsx
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // 오류: 읽기 전용 프로퍼티에 재할당할 수 없음
```

<br/>

### 🏀 Record\<K,T>

---

타입 `T`의 프로퍼티의 집합 `K`로 타입을 구성. 이 유틸리티는 타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용될 수 있음.

```tsx
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

<br/>

### 🏀 Pick\<K,T>

---

`T`에서 프로퍼티 `K`의 집합을 선택해 타입을 구성

```tsx
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

`TodoPreview`에서 인터페이스 `Todo`의 프로퍼티 집합을 선택해 타입을 구성.
<br/>

### 🏀 Omit\<T,k>

---

`T`에서 모든 프로퍼티를 선택한 다음 `K`를 제거한 타입을 구성합니다.

```tsx
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

`Todo`에서 모든 프로퍼티 선택 후 `description`을 제거한 타입을 구성.

<br/>

### 🏀 Exclude\<T,U>

---

`T`에서 `U`에 할당할 수 있는 모든 속성을 제외한 타입을 구성합니다.

```tsx
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```
