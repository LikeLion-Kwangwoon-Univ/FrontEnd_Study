### 리액트 훅 폼(React Hook Form)과 조드(Zod)

---

> 목차
>
> 1. 리액트 훅 폼
> 2. 조드

### 🏀 라이브러리 없이 폼 구현

```jsx
const [occupation, setOccupation] = useState(Occupation.Professor);
const [name, setName] = useState("");
const [id, setId] = useState("");
const [pwd, setPwd] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
```

제어 컴포넌트로 폼을 다루기 위해서는 다음과 같이 모든 데이터에 대한 state 를 선언해주고, 해당 state 를 다루기 위해서 또 핸들링 함수를 만들어야 한다.

```jsx
{
  occupation === Occupation.Professor ? (
    <Row>
      <Label>e-mail: </Label>
      <input type="text" value={email} onChange={handleEmail} />
    </Row>
  ) : null;
}
```

다음과 같이 직업이 교수인 경우에만 e-mail을 뭍는 validation 함수를 보면 코드가 길어지는 것을 알 수 있고, 만약 여러 데이터에 대한 유효성 검증이 필요하다면 함수가 매우 많아져, 가독성도 떨어지고 새로운 유효성 검증 요청이 들어왔을 때 유지보수도 어려울 수 밖에 없다.

하지만 가장 큰 문제는 `하나의 데이터 값이 변경 될때마다, state가 변하기 때문에 React에서 리렌더링이 발생`해 **불필요한 연산**을 야기한다.

<br/>

### 🏀 리액트 훅 폼(React Hook Form)

---

react-hook-form은 위에서 언급했던 문제들을 해결하고자 개발된 form 라이브러리이다. 리액트 훅 폼을 사용하면 유효성 검사를 위한 코드 양을 줄여 코드의 가독성과 유지보수성을 높을 수 있다. 다음은 리액트 훅 폼의 장점이다.

> 1. **간단한 사용법**
>
>    React Hook Form은 API가 간단하고 직관적이어서 쉽게 배울 수 있습니다. 기본적인 사용법이 간단하여 초기 설정과 사용이 매우 쉽습니다.
>
> 2. **성능 최적화**
>
>    React Hook Form은 언마운트된 컴포넌트의 상태를 추적하지 않기 때문에 성능이 뛰어납니다. 또한, 비제어 컴포넌트를 사용하여 리렌더링을 최소화하고 폼 데이터의 변경 사항을 더욱 효율적으로 처리합니다.
>
> 3. **작은 번들 크기**
>
>    React Hook Form의 크기는 매우 작습니다. 기본 기능만 사용하면 약 9KB (gzip 기준) 정도로, 다른 폼 라이브러리에 비해 번들 크기가 작아 애플리케이션의 전체 크기를 줄일 수 있습니다.
>
> 4. **유효성 검사**
>
>    내장된 유효성 검사 기능을 제공하며, 기본 HTML5 유효성 검사와도 잘 통합됩니다. 커스텀 유효성 검사도 쉽게 구현할 수 있습니다. 다양한 유효성 검사 방법을 통해 폼 필드의 유효성을 쉽게 관리할 수 있습니다.

다음은 기본적인 리액트 훅 폼의 코드이다.

```jsx
import React from "react";
import { useForm } from "react-hook-form";

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: "First name is required" })}
        placeholder="First Name"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        {...register("lastName", { required: "Last name is required" })}
        placeholder="Last Name"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

리액트 훅 폼은 `useForm`이라는 훅을 통해 사용할 수 있다. useFormd은 폼 상태를 관리하고 다양한 기능을 제공한다. useForm 훅을 사용하면 폼의 유효성 검사, 데이터 수집, 상태 추적 등을 간편하게 할 수 있다.
