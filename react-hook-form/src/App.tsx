import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function App() {
  const valSchema = z.object({
    id: z
      .string()
      .regex(
        /^[a-z0-9]{5,10}$/,
        '아이디에는 영문 소문자나 숫자로만 구성된 5~10글자 문자열입니다.'
      )
      .min(5, { message: '아이디는 최소 5글자 이상 입력해주세요.' })
      .max(10, { message: '아이디는 최대 10글자까지 입력할 수 있습니다.' }),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2글자 이상 입력해주세요.' })
      .max(10, { message: '닉네임은 최대 10글자까지 입력할 수 있습니다.' }),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
        message: '영문+숫자+특수문자 조합 8~15자리를 입력할 수 있습니다.',
      }),
    email: z.string().email({ message: '이메일 형식을 확인해주세요.' }),
    phone: z
      .string()
      .regex(/^010-([0-9]{4})-([0-9]{4})$/, '전화번호 형식을 확인해주세요.'),
  });
  const handleSubmitForm = () => {
    alert('form 제출 완료');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(valSchema),
  });
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div>
          <label>아이디</label>
          <input {...register('id')} />
          {errors.id && <span>{errors.id.message as React.ReactNode}</span>}
        </div>
        <div>
          <label>닉네임</label>
          <input {...register('nickname')} />
          {errors.nickname && (
            <span>{errors.nickname.message as React.ReactNode}</span>
          )}
        </div>
        <div>
          <label>비밀번호</label>
          <input {...register('password')} />
          {errors.password && (
            <span>{errors.password.message as React.ReactNode}</span>
          )}
        </div>
        <div>
          <label>이메일</label>
          <input {...register('email')} />
          {errors.email && (
            <span>{errors.email.message as React.ReactNode}</span>
          )}
        </div>
        <div>
          <label>전화번호</label>
          <input {...register('phone')} />
          {errors.phone && (
            <span>{errors.phone.message as React.ReactNode}</span>
          )}
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

// id, nickname, password, password check, email, phone
export default App;
