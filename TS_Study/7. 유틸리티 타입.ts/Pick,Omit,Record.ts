{
	/**
	 * 유틸리티 타입
	 * Pick, Omit, Record 타입
	 *
	 * Pick<T, K>
	 * -> 뽑다, 고르다
	 * -> 객체 타입으로부터 특정 프로포티만 딱 골라내는 그런 타입
	 *
	 */

	interface Post {
		title: string
		tags: string[]
		content: string
		URL?: string
	}

	//pick 만들기
	type Pick<T, K extends keyof T> = {
		[key in K]: T[key]
	}

	const legacyPost: Pick<Post, 'title' | 'content'> = {
		title: '옛날 글',
		content: '글',
	}

	/**
	 * Omit<T, k>
	 * -> 생략하다, 빼다
	 * -> 객체 타입으로부터 특정 프로퍼티를 제거하는 타입
	 */

	const noTitlePost: Omit<Post, 'title'> = {
		content: '',
		tags: [],
		URL: '',
	}

	//Record<K,V>
	//
	type ThumbnailLegacy = {
		small: {
			url: string
		}
		medium: {
			url: string
		}
		large: {
			url: string
		}
	}
	//중복될때 사용하면 된다.
	//첫번째는 객체의 key 두번째는 그 객체의 value를 넣는것이다.
	type Thumbnail = Record<'large' | 'medium' | 'small', { url: string }>
}
