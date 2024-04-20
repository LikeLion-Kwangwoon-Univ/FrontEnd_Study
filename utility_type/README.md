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

타입 `T`의 프로퍼티의 집합 `K`로 타입을 구성. 키 `K`와 값 `T`를 가지는 객체를 만드는 유틸리티 타입.

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

`Page`와 `PageInfo`를 매핑하는 객체 `x`를 만들었다.
<br/>

### 🏀 Pick\<K,T>

---

`T`에서 프로퍼티 `K`만 추출해 새로운 타입을 구성

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

`Todo`에서 `title`과 `completed`만 추출하고 싶을 때
<br/>

### 🏀 Omit\<T,k>

---

`T`에서 프로퍼티 `K`를 제거한 새로운 타입을 구성.

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

### 🏀 Required\<T>

---

`T`의 모든 프로퍼티를 필수로 만드는 유틸리티 타입

```tsx
interface UserInfo {
  name: string;
  age: number;
  email?: string;
}

const user: Required<UserInfo> = {
  name: "John",
  age: 30,
  email: "john@example.com", // ?여도 없으면 오류 발생.
};
```

### 🏀 Extract\<T,U>

---

타입 `T`에서 `U`에 할당할 수 있는 타입만 추출하는 유틸리티 타입

```tsx
type T = "a" | "b" | "c";
type U = Extract<T, "a" | "b">; // "a" | "b"
```

<br/>

### 🏀 NonNullable\<T>

---

`null` 또는 `undefined`를 제외한 타입 `T`를 만드는 유틸리티 타입

```tsx
type T = string | null | undefined;
type U = NonNullable<T>; // string
```

<br/>

### 🏀 ReturnType\<T>

---

함수 타입 `T`의 반환 타입을 추출하는 유틸리티 타입

```tsx
type T = () => string;
type U = ReturnType<T>; // string
```
