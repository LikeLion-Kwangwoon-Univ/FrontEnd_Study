import logo from './assets/Logo.jpeg'
import { styled } from 'styled-components'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import schema from './\bconstants/zodSchema'

function App() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			id: '',
			nickName: '',
			password: '',
			email: '',
			phone: '',
		},
	})
	return (
		<Container>
			<Box
				onSubmit={handleSubmit(() =>
					alert('🦁 광운대학교 멋사 회원가입을 축하드립니다 🦁'),
				)}
			>
				<LogoWrapper>
					<Logo src={logo} alt="logo" />
				</LogoWrapper>
				<Header>KWU 멋사 회원가입</Header>
				<CustomInput placeholder="아이디" {...register('id')} />
				{errors.id ? <Error>{errors.id.message}</Error> : <SuccessBox />}
				<CustomInput placeholder="닉네임" {...register('nickName')} />
				{errors.nickName ? (
					<Error>{errors.nickName.message}</Error>
				) : (
					<SuccessBox />
				)}
				<CustomInput
					placeholder="비밀번호"
					type="password"
					{...register('password')}
				/>
				{errors.password ? (
					<Error>{errors.password.message}</Error>
				) : (
					<SuccessBox />
				)}
				<CustomInput placeholder="이메일" {...register('email')} />
				{errors.email ? <Error>{errors.email.message}</Error> : <SuccessBox />}
				<CustomInput
					placeholder="핸드폰번호 Ex) 010-1234-5678"
					{...register('phone')}
				/>
				{errors.phone ? <Error>{errors.phone.message}</Error> : <SuccessBox />}
				<CustomBtn type="submit">가입 완료</CustomBtn>
			</Box>
		</Container>
	)
}

export default App

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`
const Box = styled.form`
	width: 21.5vw;
	margin-top: 7rem;
`
const LogoWrapper = styled.div`
	text-align: center;
`
const Logo = styled.img`
	width: 150px;
	text-align: center;
`
const Header = styled.div`
	font-size: 35px;
	margin: 22px 0;
	text-align: center;
`
const CustomInput = styled.input`
	width: 400px;
	height: 45px;
	border-radius: 5px;
	border: 1px solid #ced4da;
	background-color: #f8f9fa;
	margin-top: 13px;
	padding-left: 10px;
	font-size: 16px;
	&:focus {
		outline: none;
	}
	color: #868e96;
`
const CustomBtn = styled.button`
	background-color: #ff9a00;
	width: 414px;
	padding: 15px 0;
	border-radius: 5px;
	margin-top: 20px;
	text-align: center;
	cursor: pointer;
	font-size: 20px;
	font-weight: bold;
	color: white;
	&:hover {
		background-color: #ff7400;
	}
	border: none;
`
const Error = styled.div`
	color: red;
	margin: 5px 0 0 10px;
`
const SuccessBox = styled.div`
	height: 21.5px;
`
