//Function
//TS함수는 JS와 마찬가지로 기명함수와 익명함수로 만들수있다.
//이를 통해 API에서 함수목록을 작성하든 일회성 함수를 써서 다른 함수로 전달하든 애플리케이션에 가장 적합한 방법을 선택 할 수있습니다.
//JS에서의 이 두 가지 대한 예시를 빠르게 다시 보겠습니다.

function add(x, y) {
	return x + y
}

let myAdd = function (x, y) {
	return x + y
}
// 그러면 어떤식으로 함수의 타입을 지정해줘야할까?
//Function Types
function add1(x: number, y: number): number {
	return x + y
}
let myAdd1 = function (x: number, y: number): number {
	return 1 + 2
}
//이런식으로 props와 return에 타입을 지정해줄수있다.

//타입의 추론 inferring the types
let myAdd2 = function (x, y) {
	return 1 + 2
	//이걸보면 return의 타입은 number로 추정을 한다 1+2는 number type이기때문
}

//선택적 매개변수와 기본 매개변수
//Typescipt에서는 모든 매개변수가 함수에 필요하다고 가정한다.
function buildName(firstName: string, lastName: string) {
	return firstName + ' ' + lastName
}

buildName('d', '2')

//나머지 매개변수 (Rest Parameters)
//필수,선택적, 기본매개변수는 한번에 하나의 매개변수만을 가지고 이야기합니다.
//떄는 다수의 매개변수를 그룹 지어 작업하기를 원하거나, 함수가 최종적으로 얼마나 많은 매개변수를 취할지 모를때도 있습니다.
function restFunction(firstName: string, ...restOfName: string[]) {
	return '1'
}
//위에같이하면 첫번째 인수는 string 그 뒤에부터는 string만 받겠다 이거다
restFunction('ddd', '2', 'dsadsa')

//오버로드 (Overloads)
//JS는 본질적으로 매우 동적인 언어이다. 하나의 JS 함수가 전달된 인자의 형태에 따라 다른 타입의 객체들을 반환하는 것은 흔한 일입니다.

{
	/**
	 * 함수의 오버로딩이란?
	 * 함수를 매개변수의 개수나 타입에 따라
	 * 여러가지 버전으로 정의하는 방법
	 *
	 * 즉, 쉽게 말해 하나의 함수인데 여러가지 버전으로 만드는 문법이다.
	 * -> 하나의 함수 func
	 * -> 모든 매개변수 타입은 number
	 * -> ver1. 매개변수 1개면 20 곱하고
	 * -> ver2. 매개변수 3개면 다 더한다
	 *
	 */

	//버전들
	//아래와 같이 구현부없이 선언식만 써준것을 -> 오버로드 시그니처 라고 부른다
	//함수를 오버로딩 하기 위해 각각 매개변수별로 다른 기능을 위해 아래와 같이 정의하낟
	function func(a: number): void
	function func(a: number, b: number, c: number): void

	//실제 구현부 => 구현 시그니처라고도 부른다.
	function func(a: number, b?: number, c?: number) {
		if (typeof b === 'number' && typeof c === 'number') {
			//ver2
			console.log(a + b + c)
		} else {
			//ver1
			console.log(a * 20)
		}
	}

	//위에 오버로드 시그니처를 만들었기 때문에 저 함수를 호출할때 인수들의 타입이 실제 구현부에 적용한 매개변수에 따르는것이 아닌,
	//오버로드 시그니처의 버전과 비교하기 때문에 지금 매개변수 1개와 3개가 정상적으로 작동하는 모습을 보인다.
	//그래서 호출할때는 타입 영향을 미치지 않는다.

	func() //오류
	func(1)
	func(1, 2) //오류
	func(1, 2, 3)
}
