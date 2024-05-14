{
	//유틸리티 타입
	// 제네릭 타입이라고도 불림
	// 필수적인것은 아니지만, 정의한 인터페이스를 변환

	//사실 옵셔널로 지정하면 원하는 속성만 포함된 타입을 사용할수있지만, 이러면 타입 검사가 느슨해짐으로써 결국 타입스크립트를 사용하는 의미가 퇴색되게 됩니다.
	// 즉, partial은 인자 타입의 모든 속성을 옵셔널로 변경한 타입입니다.
	// 위에 예시와 같이 Partial로 옵션을 주는것이다.

	//Partial
	//파셜 타입은 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있습니다.
	interface Info {
		email: string
		name: string
	}
	type Taek = Partial<Info>
	const me: Taek = {} //가능
	const you: Taek = { email: 'teak@naver.com' }
	const all: Taek = {
		email: 'string',
		name: 'string',
	}

	// #1
	type TypeInfo = {
		infoEmail: Info['email'] // string
		infoName: Info['name'] // string
	}

	// #2
	type KeysInfo = keyof Info // 'email' | 'username'  이렇게 하면 key만 따오는거

	// type MappedInfo =  {
	//     [p in keyof Info]? = Info[p]
	// }

	// 	- pick⭐️ (유틸리티 타입)
	// pick타입은 특정 요소만 포함된 타입을 생성한다.
	// 아래 예시 코드와 같이 보자
	// type userType = {
	// 		id: number
	// 		email: string
	// 		password: string
	// 		firstname: string
	// 		lastname: string
	// }
	// // 이런 예시가 있다고 치면
	// // Pick은 첫 번째 인자로 받은 타입 중, 두 번째 인자로 주어진 속성만을 포함한 타입을 리턴합니다.
	// // 즉, 첫번째 인자를 타입을 넣어주고 두번째 인자는 내가 어떤것을 받을지 넣어줄수있는것이다.
	// const user: Pick<userType, 'id' | 'firstname' | 'lastname'> = {
	// 		id: 1,
	// 		firstname: '길동',
	// 		lastname: '홍',
	// }
	// pick을 사용하는곳
	// 즉, 기본타입에서 원하는 속성만 뽑아서 새로운 타입을 정의하고 싶을때? 그럴때 쓰자

	// 	- omit⭐️ (유틸리티 타입)
	// 특정 속성만 제거한 타입을 정의합니다. pick의 반대
	// interface Product {
	//   id: number;
	//   name: string;
	//   price: number;
	//   brand: string;
	//   stock: number;
	// }

	// type shoppingItem = Omit<Product, "stock">;

	// const apple: Omit<Product, "stock"> = {
	//   id: 1,
	//   name: "red apple",
	//   price: 1000,
	//   brand: "del"
	// };
	// 위에 코드를 보면 Omit을 사용하고 첫번째 인자로 타입을 넣고 두번째 인자로 내가 제거하고싶은
	// 놈을 쓰고 새로 생성한 shoppingItem 타입을 넣어서 사용하는것이다.

	// 	- 선택적 프로퍼티 (?:)
	// 	선택적 프로퍼티는 간편한 연산자이다.
	// 	예를 들어
	// 	interface CraftBeer {
	//   name: string;
	//   hope?: number; // hope 속성은 명시해도 되고 안해도 상관없다 (옵션)
	// 	}
	// 	위와같은 인터페이스가 있다. hope라는곳에 선택적 프로퍼티 연산자가 있다.
	// 	저것의 의미는 hope가 없어도 괜찮다. 이것이다.
	// 	우리는 보낼때도 있고 아닐때도 있다. 그럴때 유용하게 사용할수있을것이다.
	// 	이것을 통해 코드의 유연성을 Up

	// 	이것은 우리가 만약 union type으로 number | undefined로 작성하는것과 같다.
	// 	하지만 선택적 프로퍼티가 더 편하겠죠?

	// - 인터페이스 vs 타입
	// 	위에 꺼를 진행하면서 알아야하는 생각 나는것이 있다.
	// 	객체를 할때 우리는 인터페이스를 써야하는거야? 타입을 써야하는거야
	// 	구현을 위한거면 사실 둘다 구현 가능하다. 그래서 고민을 해야한다.
	// 	🔥참고한 자료에 따르면 Interface를 사용한다.
	// 	=> 왜? why?
	// 	타입은 확장 X , interface는 확장 O

	// - 읽기 전용 프로퍼티 (readonly)
	// 	읽기 전용이라는것은 말 그대로 객체를 처음 생성할때만 값을 할당하고 그 이후에는 변경할 수 없는
	// 속성을 의미한다.
	// 	ex)
	// 	interface User {
	//    name: string;
	//    age: number;
	//    gender?: string;
	//    readonly birthYear: number; // 읽기 전용 속성
	// 	}
	// 	위와 같이
}
