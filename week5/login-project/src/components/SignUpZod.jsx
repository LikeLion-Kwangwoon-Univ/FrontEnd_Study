import styled from "styled-components";
import "../reset.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(5, "최소 아이디는 5글자입니다.")
    .max(15, "최대 아이디는 15글자입니다.")
    .nonempty("아이디는 필수 입력 사항입니다."),
  nickname: z
    .string()
    .min(3, "최소 닉네임은 3글자입니다.")
    .max(15, "최대 닉네임은 15글자입니다.")
    .nonempty("닉네임은 필수 입력 사항입니다."),
  password: z
    .string()
    .min(5, "최소 비밀번호는 5글자입니다.")
    .nonempty("비밀번호는 필수 입력 사항입니다."),
  phonenumb: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "올바른 핸드폰 번호 형식을 입력해주세요.")
    .nonempty("핸드폰 번호는 필수 입력 사항입니다."),
  email: z
    .string()
    .email("올바른 이메일 형식을 입력해주세요.")
    .max(50, "이메일은 50글자 이하로 입력해주세요.")
    .nonempty("이메일은 필수 입력 사항입니다."),
});

const SignUpZod = () => {
  // useForm hook with zodResolver
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AccountContainer>
      <Title>회원 가입 페이지</Title>
      <CreateForm onSubmit={handleSubmit(onSubmit)}>
        {/* 아이디 */}
        <TitleSection>
          <SubTitle>아이디</SubTitle>
          {errors?.name && <ErrorSpan>{errors?.name.message}</ErrorSpan>}
        </TitleSection>
        <CreateInput
          type="text"
          {...register("name")}
          placeholder="아이디를 입력해주세요"
        />
        {/* 닉네임 */}
        <TitleSection>
          <SubTitle>닉네임</SubTitle>
          {errors?.nickname && (
            <ErrorSpan>{errors?.nickname.message}</ErrorSpan>
          )}
        </TitleSection>
        <CreateInput
          type="text"
          {...register("nickname")}
          placeholder="닉네임을 입력해주세요"
        />
        {/* 비밀번호 */}
        <TitleSection>
          <SubTitle>비밀번호</SubTitle>
          {errors?.password && (
            <ErrorSpan>{errors?.password.message}</ErrorSpan>
          )}
        </TitleSection>
        <CreateInput
          type="password"
          {...register("password")}
          placeholder="비밀번호를 입력해주세요"
        />
        {/* 핸드폰 번호 */}
        <TitleSection>
          <SubTitle>핸드폰 번호</SubTitle>
          {errors?.phonenumb && (
            <ErrorSpan>{errors?.phonenumb.message}</ErrorSpan>
          )}
        </TitleSection>
        <CreateInput
          type="text"
          {...register("phonenumb")}
          placeholder="전화번호를 입력해주세요"
        />
        {/* 이메일 */}
        <TitleSection>
          <SubTitle>이메일</SubTitle>
          {errors?.email && <ErrorSpan>{errors?.email.message}</ErrorSpan>}
        </TitleSection>
        <CreateInput
          type="text"
          {...register("email")}
          placeholder="이메일을 작성해주세요"
        />

        <SendButton type="submit">제출</SendButton>
      </CreateForm>
    </AccountContainer>
  );
};

export default SignUpZod;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-top: 100px;
`;

const CreateForm = styled.form`
  margin-top: 20px;
  background-color: white;
  width: 330px;
  border: 1.5px solid gray;
  border-radius: 6px;
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
`;

const CreateInput = styled.input`
  color: ${(props) => props.color || "#000"};
  height: 30px;
  border: 1px solid gray;
  border-radius: 6px;
  padding-inline-start: 6px;
`;

const SubTitle = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

// const EmailButton = styled.button`
//   height: 34px;
//   width: 160px;
//   border: 1px solid gray;
//   border-radius: 6px;
//   padding-inline-start: 6px;
//   font-size: 13.3333px;
//   background-color: white;
// `;

// const Icon = styled.span`
//   position: absolute;
//   margin-left: 10px;
// `;

// const EmailUl = styled.ul`
//   display: flex;
//   flex-direction: column;
//   margin-left: 164px;
//   margin-top: 5px;
//   width: 158px;
//   border-radius: 6px;
//   height: 140px;
//   border: 1px solid gray;
//   background-color: white;
//   padding-top: 5px;
//   gap: 5px;
// `;

// const EmailLi = styled.li`
//   border: none;
//   padding-left: 10px;
//   padding-right: 10px;
// `;

// const EmailLiButton = styled.button`
//   width: 100%;
//   height: 30px;
//   border: none;
//   border-radius: 6px;
//   font-size: 15px;
//   padding-inline-start: 0px;
//   padding-left: 5px;
//   padding-top: 0px;
//   padding-bottom: 0px;
//   font-size: 12px;
//   background-color: white;
//   &:hover {
//     background: cornflowerblue;
//     color: white;
//     transition: 0.5s;
//   }
// `;

// const EmailSection = styled.section`
//   display: flex;
// `;

const SendButton = styled.button`
  color: ${(props) => props.color || "#000"};
  height: 30px;
  width: 150px;
  border: 1px solid gray;
  border-radius: 6px;
  padding-inline-start: 6px;
  background-color: white;
  font-size: 15px;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
  margin: 10px 90px;
`;

const TitleSection = styled.section`
  display: flex;
  gap: 10px;
`;

const ErrorSpan = styled.span`
  font-size: 11px;
  color: red;
  font-weight: 200;
  text-align: center;
  margin: 7px 0px;
`;
