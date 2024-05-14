import { z } from 'zod'
import REGEX from './regex'

const schema = z.object({
	id: z
		.string()
		.min(5, { message: '아이디를 입력해주세요. (최소 5글자)' })
		.max(10, { message: '아이디는 최대 10글자까지 입력 가능합니다' }),
	nickName: z
		.string()
		.min(3, { message: '닉네임를 입력해주세요.(최소 3글자)' })
		.max(10, { message: '닉네임은 최대 10글자까지 입력 가능합니다' }),
	password: z
		.string()
		.min(5, { message: '비밀번호를 입력해주세요 (최소 5글자)' }),
	email: z
		.string()
		.regex(REGEX.email, { message: '이메일 형식에 맞게 입력해 주세요' }),
	phone: z
		.string()
		.regex(REGEX.phone, { message: '핸드폰 형식에 맞게 입력해 주세요' }),
})
export default schema
