{
	/**
	 * 유틸리티 타입
	 * Partial, Required, Readonly
	 *
	 */

	//Partial<T>
	//특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티 바꿔주는 타입
	interface Post {
		title: string
		tags: string[]
		content: string
		URL?: string
	}

	//Partial 타입 직접 구현하기
	type Partial<T> = {
		//앞에 key in key of T
		//key of T 는 T라는 제네릭 뽑겠다.
		// key 하고 in key of T는 맵타입이다.
		//즉 key는 T라는것으로 맵핑하겠다 라는것이죠
		// 그건 아래와 같이 Post타입이고 그건 title, tags, content, URL이렇게 맵핑한거임

		//값은 T[key] 이건 인덱스 타입?

		//선택적을 만들기 위해 ? 넣어준다
		[key in keyof T]?: T[key]
	}

	//Post라는 타입의 모든걸 선택적 프로퍼티로 만든다.
	const draft: Partial<Post> = {
		title: '미정',
		content: '미정....',
	}

	//Required만들기
	//-?이거는 물음표를 빼겠다는 뜻이다.
	type Required<T> = {
		[key in keyof T]-?: T[key]
	}
	//Required<T>
	//필수의 필수적인
	//-> 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입
	const withThumbnaiPost: Required<Post> = {
		title: '하이',
		tags: ['ds'],
		content: '',
		URL: 'www.',
	}

	//Readonly<T>

	//Readonly만들기
	type Readonly<T> = {
		readonly [key in keyof T]: T[key]
	}

	//읽기 전용 수정 불가
	const readonlyPost: Readonly<Post> = {
		title: 'da',
		tags: [],
		content: '',
	}
}
