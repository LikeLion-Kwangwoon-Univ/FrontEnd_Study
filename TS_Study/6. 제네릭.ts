// 잘 정의된 일관된 API뿐만 아닌 재사용 가능한 컴포넌트를 구축하는것도 소프트웨어 엔지니어링에서의 중요한 부분이다.
// 현재의 데이터와 미래의 데이터 모두를 다룰수있는 컴포넌트는 가장 유연한 능력을 제공할것입니다.

// 제네릭의 Hello World
function identity(arg: number): number {
	return arg
}

//또한 any 타입을 사용하여 identity 함수를 기술할수있습니다.
function identityGeneric<T>(arg: T): T {
	return arg
}
// 위에를 보면 identityGeneric함수에 T라는 타입 변수를 추가했습니다.
// T는 유저가 준 인수의 타입을 캡처하고 이 정보를 나중에 사용할수있게 합니다.
// 여기서 T를 반환 타입으로 다시 사용합니다.
let output = identityGeneric<string>('gg')
// 위에 T가 string 타입으로 되면서 타입이 선언되는것을 볼수있다.

// 두번째 방법은 아마 가장 일반적인 방법이다.
// 여기서는 타입 인수 추론을 사용합니다.
let output1 = identityGeneric('gg') //출력 타입은 'string'입니다.
// 타입 인수를 꺽쇠괄호 즉 <>에 담아 명시적으로 전달해주지않은것을 주목해보세요
// 컴파일러는 값인 'myString'을 보고 그것을 타입으로 T를 정합니다.
// 인수 추론은 코드를 간결하고 가독성 있게 하는데 있어 유용하지만 더 복잡한 예제에서 컴파일러가 타입을 유추할수없는 경우엔
// 명시적인 타입 인수 전달이 필요할수있다

// 제네릭 타입 변수 작업 (Working with Generic Type Variables)
// 제네릭을 사용하기 시작하면 identity와 같은 제네릭 함수를 만들때, 컴파일러가 함수 본문에 제네릭 타입화된 매개변수를 쓰도록 강요합니다.

function logggingIdentity<T>(arg: T): T {
	if (typeof arg === 'string') {
		console.log(arg.length)
	}
	return arg
}
// .length를 사용하고 있다는 오류를 낼것입니다. 어떤곳에서도 arg가 이 멤버가 있다는것이 명시되어있지 않습니다.
// 이전에 이러한 변수 타입은 any나 모든 타입을 의미한다고 했던 것을 기억하십시오,
// 따라서 이 함수를 쓰고있는 사용자는 .length멤버가 없는 number를 대신 전달할수도있다.

function loggingIdentity<T>(arg: T[]): T[] {
	console.log(arg.length)
	return arg
}
//위에 예제는 arg같은경우 number, string이던 배열은 length가 존재하니 오류가 없다

// 제네릭 타입 (Generic Types)
// 이전 섹션에서 우리는 타입을 초월한 제네릭 함수 identity를 만들었습니다.
// 이번 섹션에서는 함수 자체의 타입과 제네릭 인터페이스를 만드는 방법에 대해 살펴보겠습니다.

// 제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 비-제네릭 함수의 타입과 비슷하다.

function identity3<T>(arg: T): T {
	return arg
}

// 제네릭이 많이 쓰이는곳
interface Mobile<T> {
	name: string
	price: number
	option: T //제네릭 타입 -option 속성에는 다양한 데이터 자료가 들어온다고 가정하는것이다.
}

const m1: Mobile<{ color: string; coupon: boolean }> = {
	name: 's21',
	price: 1000,
	option: { color: 'red', coupon: true },
}
// name과 price는 공통 type이지만 option같은경우는 전부 다른 타입으로 구성될수도있다.
// 그런점들을 생각하면 option을 제네릭으로 사용하여 위와같이 사용하면 재사용에 더 좋다

// 제네릭 제약 조건(extends)
// 제네릭은 사용하는 시점에 타입을 결점해줌으로써 사실상 아무 타입아나 집어넣어도 상관 없다.

function identity5<T>(p1: T): T {
	return p1
}

type numOrstr = number | string

function identity9<T extends numOrstr>(p1: T): T {
	return p1
}

identity9(1)
identity9('1')
identity9(true)
