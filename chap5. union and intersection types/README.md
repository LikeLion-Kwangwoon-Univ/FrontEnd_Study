# 4장. 유니온과 교차 타입

> ## 목차
>
> > 1. [유니언 타입 (Union Types)](#🏀-유니언-타입-union-types)
> > 2. [교차 타입 (Intersection Types)](#🏀-교차-타입-intersection-types) > > <br/>

<br>

### 🏀 유니언 타입 (Union Types)

---

> **여러 타입 중 하나가 될 수 있는 값**. 세로 막대 (`|`)로 각 타입을 구분, `number | string | boolean`은 값의 타입이 `number, string` 혹은 `boolean`이 될 수 있음을 의미.

```ts
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", true);
```

<br>

### &nbsp;&nbsp;⭐️&nbsp;공통 필드를 갖는 유니언 (Unions with Common Fields)

---

```tsx
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// error: 잠재적인 타입 중 공통된 타입만 사용 가능.
pet.swim();
```

> 만약 값이 `A | B` 타입을 갖고 있으면, 확신할 수 있는 것은 그 값이 `A`와`B` 둘 다 가지고 있는 멤버들을 갖고 있다는 것. 따라서 `layEggs()`만 가능.

<br>

### &nbsp;&nbsp;⭐️&nbsp;유니언 구별하기 (Discriminating Unions)

---

```tsx
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// ---생략---
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
  // 현재 TypeScript는 셋 중 어떤 것이
  // state가 될 수 있는 잠재적인 타입인지 알 수 없습니다.

  // 모든 타입에 공유되지 않는 프로퍼티에 접근하려는 시도는
  // 오류를 발생시킵니다.
  state.code;

  // state에 swtich문을 사용하여, TypeScript는 코드 흐름을 분석하면서
  // 유니언 타입을 좁혀나갈 수 있습니다.
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // 여기서 타입은 NetworkFailedState일 것이며,
      // 따라서 `code` 필드에 접근할 수 있습니다.
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

### 🏀 교차 타입 (Intersection Types)

---

> 교차 타입은 여러 타입을 하나로 결합. 기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있습니다. 예를 들어, Person & Serializable & Loggable은 Person 과 Serializable 그리고 Loggable입니다. 즉, 이 타입의 객체는 세 가지 타입의 모든 멤버를 갖게 됩니다.

```tsx
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 이 인터페이스들은
// 하나의 에러 핸들링과 자체 데이터로 구성됩니다.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```
