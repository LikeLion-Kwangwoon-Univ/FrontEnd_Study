import styled from "styled-components";
import "./reset.css";
import { useForm } from "react-hook-form";
// import { SlArrowDown } from "react-icons/sl";
// import { useState } from "react";

const SignUpReactHook = () => {
  // const [optionIsOpen, setOptionIsOpen] = useState(false);
  // const [selectedMail, setSelectedMail] = useState("");
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  // const onClick = () => {
  //   setOptionIsOpen(true);
  // };
  // const selectMail = (e) => {
  //   setSelectedMail(e.target.value);
  //   setOptionIsOpen(false);
  // };
  return (
    <AccountContainerZod>
      <TitleZod>회원 가입 페이지</TitleZod>
      <CreateFormZod onSubmit={handleSubmit(onSubmit)}>
        {/* 아이디 */}
        <TitleZodSection>
          <SubTitleZod>아이디</SubTitleZod>
          {errors?.name && <ErrorSpanZod>{errors?.name.message}</ErrorSpanZod>}
        </TitleZodSection>
        <CreateInputZod
          type="text"
          {...register("name", {
            required: "아이디는 필수 입력 사항입니다.",
            minLength: { value: 5, message: "최소 아이디는 5글자입니다." },
            maxLength: { value: 15, message: "최대 아이디는 15글자입니다." },
          })}
          placeholder="아이디를 입력해주세요"
        />
        {/* 닉네임 */}
        <TitleZodSection>
          <SubTitleZod>닉네임</SubTitleZod>
          {errors?.nickname && (
            <ErrorSpanZod>{errors?.nickname.message}</ErrorSpanZod>
          )}
        </TitleZodSection>
        <CreateInputZod
          type="text"
          {...register("nickname", {
            required: "닉네임은 필수 입력 사항입니다.",
            minLength: { value: 3, message: "최소 닉네임은 3글자입니다." },
            maxLength: { value: 15, message: "최대 닉네임은 15글자입니다." },
          })}
          placeholder="닉네임을 입력해주세요"
        />
        {/* 비밀번호 */}
        <TitleZodSection>
          <SubTitleZod>비밀번호</SubTitleZod>
          {errors?.password && (
            <ErrorSpanZod>{errors?.password.message}</ErrorSpanZod>
          )}
        </TitleZodSection>
        <CreateInputZod
          type="password"
          {...register("password", {
            required: "비밀번호는 필수 입력 사항입니다.",
            minLength: { value: 5, message: "최소 비밀번호는 5글자입니다." },
          })}
          placeholder="비밀번호를 입력해주세요"
        />
        {/* 핸드폰 번호 */}
        <TitleZodSection>
          <SubTitleZod>핸드폰 번호</SubTitleZod>
          {errors?.phonenumb && (
            <ErrorSpanZod>{errors?.phonenumb.message}</ErrorSpanZod>
          )}
        </TitleZodSection>
        <CreateInputZod
          type="text"
          {...register("phonenumb", {
            required: "핸드폰 번호는 필수 입력 사항입니다.",
            pattern: {
              value: /^010-\d{4}-\d{4}$/,
              message: "올바른 핸드폰 번호 형식을 입력해주세요.",
            },
          })}
          placeholder="전화번호를 입력해주세요"
        />
        {/* 이메일 */}
        <TitleZodSection>
          <SubTitleZod>이메일</SubTitleZod>
          {errors?.email && (
            <ErrorSpanZod>{errors?.email.message}</ErrorSpanZod>
          )}
        </TitleZodSection>
        <CreateInputZod
          type="text"
          {...register("email", {
            required: "이메일은 필수 입력 사항입니다.",
            maxLength: {
              value: 50,
              message: "이메일은 50글자 이하로 입력해주세요.",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
          placeholder="이메일을 작성해주세요"
        />
        <SendButtonZod type="submit">제출</SendButtonZod>
      </CreateFormZod>
    </AccountContainerZod>
  );
};

export default SignUpReactHook;

const AccountContainerZod = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleZod = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-top: 100px;
`;

const CreateFormZod = styled.form`
  margin-top: 20px;
  background-color: white;
  width: 330px;
  border: 1.5px solid gray;
  border-radius: 6px;
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
`;

const CreateInputZod = styled.input`
  color: ${(props) => props.color || "#fffff"};
  height: 30px;
  border: 1px solid gray;
  border-radius: 6px;
  padding-inline-start: 6px;
`;

const SubTitleZod = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const SendButtonZod = styled.button`
  color: ${(props) => props.color || "#fffff"};
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

const TitleZodSection = styled.section`
  display: flex;
  gap: 10px;
`;

// const ErrorSpanZod = styled.span`
//   font-size: 11px;
//   color: red;
//   font-weight: 200;
//   text-align: center;
//   margin: 7px 0px;
// `;
