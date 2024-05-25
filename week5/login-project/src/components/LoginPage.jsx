import { useForm } from "react-hook-form";
import styled from "styled-components";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <LoginContainer>
      <Title>멋사 로그인</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          type="email"
          placeholder="Email"
          {...register("Email", { required: true })}
        />
        {errors.Email && <ErrorText>이메일을 작성해주세요.</ErrorText>}
        <LoginInput
          type="password"
          placeholder="Password"
          {...register("Password", { required: true })}
        />
        {errors.Password && <ErrorText>비밀번호를 작성해주세요.</ErrorText>}
        <LoginButton type="submit">Log in</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-top: 150px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 326px;
  height: 300px;
  gap: 16px;
`;

const LoginInput = styled.input`
  margin: 0px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 20px;
  border: 2px solid rgb(44, 44, 44);
`;

const LoginButton = styled.button`
  margin: 0px;
  width: 326px;
  height: 50px;
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 20px;
  color: white;
  background-color: rgb(44, 44, 44);
  border: 2px solid rgb(44, 44, 44);
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;
