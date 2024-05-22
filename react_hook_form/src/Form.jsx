import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = () => alert("회원가입에 성공했습니다.");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <input
          {...register("id", {
            required: { value: true, message: "필수 입력 항목입니다." },
            minLength: { value: 5, message: "아이디는 최소 5글자 이상입니다." },
            maxLength: {
              value: 15,
              message: "아이디는 최대 15글자 이상입니다.",
            },
          })}
          placeholder="아이디"
        />
        <span>{errors?.id?.message}</span>
      </section>

      <section>
        <input
          {...register("nick_name", {
            required: { value: true, message: "필수 입력 항목입니다." },
            minLength: { value: 3, message: "닉네임은 최소 3글자 이상입니다." },
            maxLength: {
              value: 15,
              message: "닉네임은 최대 15글자 이상입니다.",
            },
          })}
          placeholder="닉네임"
        />
        <span>{errors?.nick_name?.message}</span>
      </section>

      <section>
        <input
          {...register("password", {
            required: { value: true, message: "필수 입력 항목입니다." },
            minLength: {
              value: 5,
              message: "비밀번호는 최소 5글자 이상입니다.",
            },
          })}
          placeholder="비밀번호"
        />
        <span>{errors?.password?.message}</span>
      </section>
      <section>
        <input
          {...register("email", {
            required: { value: true, message: "필수 입력 항목입니다." },
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식과 맞지 않습니다.",
            },
          })}
          placeholder="이메일"
        />
        <span>{errors?.email?.message}</span>
      </section>
      <section>
        <input
          {...register("phone", {
            required: { value: true, message: "필수 입력 항목입니다." },
            pattern: {
              value: /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/,
              message: "핸드폰 번호 형식과 맞지 않습니다.",
            },
          })}
          placeholder="핸드폰 번호"
        />
        <span>{errors?.phone?.message}</span>
      </section>
      <button type="submit" disabled={!isValid}>
        제출
      </button>
    </form>
  );
};

export default Form;
