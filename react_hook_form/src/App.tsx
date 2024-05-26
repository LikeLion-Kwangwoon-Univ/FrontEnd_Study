import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerSchema = z.object({
    ID: z
        .string()
        .min(5, '아이디는 최소 5글자 이상이어야 합니다.')
        .max(15, '아이디는 최대 15글자 이하여야 합니다.'),
    nickname: z
        .string()
        .min(3, '닉네임은 최소 3글자 이상이어야 합니다.')
        .max(15, '닉네임은 최대 15글자 이하여야 합니다.'),
    password: z.string().min(5, '비밀번호는 최소 5글자 이상이어야 합니다.'),
    email: z.string().email('유효한 이메일 형식이어야 합니다.'),
    phoneNumber: z
        .string()
        .regex(/^010-\d{4}-\d{4}$/, '유효한 휴대폰 번호 형식이어야 합니다.'),
})

export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = (data: any) => {
        alert('제출 완료')
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>아이디</label>
                <input {...register('ID')} />
                {errors.ID && <p>{errors.ID.message as React.ReactNode}</p>}
            </div>
            <div>
                <label>닉네임</label>
                <input {...register('nickname')} />
                {errors.nickname && (
                    <p>{errors.nickname.message as React.ReactNode}</p>
                )}
            </div>
            <div>
                <label>비밀번호</label>
                <input {...register('password')} />
                {errors.password && (
                    <p>{errors.password.message as React.ReactNode}</p>
                )}
            </div>
            <div>
                <label>이메일</label>
                <input {...register('email')} />
                {errors.email && (
                    <p>{errors.email.message as React.ReactNode}</p>
                )}
            </div>
            <div>
                <label>휴대폰 번호</label>
                <input {...register('phoneNumber')} />
                {errors.phoneNumber && (
                    <p>{errors.phoneNumber.message as React.ReactNode}</p>
                )}
            </div>
            <button type="submit">제출</button>
        </form>
    )
}
