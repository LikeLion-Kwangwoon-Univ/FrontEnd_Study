import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  id: z
    .string()
    .min(5, { message: "아이디는 최소 5글자 이상입니다." })
    .max(15, { message: "아이디는 최대 15글자 이상입니다." }),
  nick_name: z
    .string()
    .min(3, { message: "닉네임은 최소 3글자 이상입니다." })
    .max(15, { message: "닉네임은 최대 15글자 이상입니다." }),
  password: z.string().min(5, { message: "비밀번호는 최소 5글자 이상입니다." }),
  email: z
    .string()
    .regex(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      { message: "이메일 형식과 맞지 않습니다." }
    ),
  phone: z.string().regex(/^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/, {
    message: "핸드폰 번호 형식과 맞지 않습니다.",
  }),
});

const ZodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = () => alert("회원가입에 성공했습니다.");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <input {...register("id")} placeholder="아이디" />
        <span>{errors?.id?.message}</span>
      </section>

      <section>
        <input {...register("nick_name")} placeholder="닉네임" />
        <span>{errors?.nick_name?.message}</span>
      </section>

      <section>
        <input {...register("password")} placeholder="비밀번호" />
        <span>{errors?.password?.message}</span>
      </section>

      <section>
        <input {...register("email")} placeholder="이메일" />
        <span>{errors?.email?.message}</span>
      </section>

      <section>
        <input {...register("phone")} placeholder="핸드폰 번호" />
        <span>{errors?.phone?.message}</span>
      </section>

      <button type="submit" disabled={!isValid}>
        제출
      </button>
    </form>
  );
};

export default ZodForm;
