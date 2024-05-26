> REF
> https://react-hook-form.com/

### 설치

```bash
npm install react-hook-form
```

### 예제

```tsx
import { useForm, SubmitHandler } from 'react-hook-form'

type Input = {
    example: string // 첫번째 input
    exampleRequired: string // 두번째 input
}

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => console.log(data)

    console.log(watch('example')) // watch example value

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="TEST" {...register('example')} />
            <input {...register('exampleRequired', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
        </form>
    )
}
```

### Register fields

> React Hook Form의 핵심 개념 중 하나는 component를 hook에 등록하는 것이다. 이렇게 하면 validation과 submission 모두 사용할 수 있다.

```tsx
import { useForm, SubmitHandler } from 'react-hook-form'

enum GenderEnum {
    female = 'female',
    male = 'male',
    other = 'other',
}

interface IFormInput {
    firstName: string
    gender: GenderEnum
}

export default function App() {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input {...register('firstName')} />
            <label>Gender Selection</label>
            <select {...register('gender')}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
            <input type="submit" />
        </form>
    )
}
```

![스크린샷 2024-05-19 오후 12.51.22.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/51c56ae3-24e5-4fa0-a88c-335df5fad0c0/0d89aa37-dfdb-446b-8f64-82b27b8c482a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-05-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.51.22.png)

`제출`을 누르면 `onSubmit`에 의해 data가 console에 출력되게 된다.

결과는 다음과 같이 출력된다.

```tsx
{
	firstName: 'test', gender: 'other'
}
```

-   추가적으로 typescript enum을 이용하여 다음과 같이 `option`을 작성할 수 있다.

```tsx
<option value={GenderEnum.female}>Female</option>
<option value={GenderEnum.male}>Male</option>
<option value={GenderEnum.other}>Other</option>
```

### Apply Validation

React Hook Form은 HTML standard for form validation을 이용하여 validation을 더욱 쉽게 만들어 준다.

validation rule의 목록

-   required
-   min
-   max
-   minLength
-   maxLength
-   pattern
-   validate

```tsx
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
    firstName: string
    lastName: string
    age: number
}

export default function App() {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('firstName', { required: true, maxLength: 20 })}
            />
            <input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />
            <input {...register('age', { min: 18, max: 99 })} />
            <input type="submit" />
        </form>
    )
}
```

### Handle Errors

form의 오류를 보여주는 `errors` 객체를 제공한다. `errors`의 `type`은 유효성 제약 조건을 반환한다.

```tsx
import { useForm } from 'react-hook-form'

export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('firstName', { required: true })}
                aria-invalid={errors.firstName ? 'true' : 'false'}
            ></input>
            {errors.firstName?.type === 'required' && (
                <p role="alert">First name is required</p>
            )}
            <input
                {...register('mail', { required: 'Email Address is required' })}
                aria-invalid={errors.mail ? 'true' : 'false'}
            ></input>
            {errors.mail && (
                <p role="alert">{errors.mail.message as React.ReactNode}</p>
            )}
            <input type="submit" />
        </form>
    )
}
```

-   erros 객체는 폼 필드의 유효성 검사 결과를 저장한다.

```tsx
<input
    {...register('firstName', { required: true })}
    aria-invalid={errors.firstName ? 'true' : 'false'}
></input>
```

> firstName filed가 유효성 검사를 했을 때 오류가 난다면 true로 그렇지 않다면 false가 되게 된다.

### Schema Validation

useForm에 전달하여 schema 기반 유효성 검사를 지원하는 Yup, Zod, Superstruct, … 등을 지원한다.
