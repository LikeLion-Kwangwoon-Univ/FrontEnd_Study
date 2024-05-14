// Boolean
// 가장 기본적인 데이터 타입은 JS, TS에서 boolean값이라고 일컫는 참/거짓입니다.

let test1: boolean = true

// Number
// JS처럼 TS의 모든 숫자는 부동 소수 값입니다.
// 부동 소수에는 number라는 타입이 붙혀집니다. TS는 16진수, 10진수 리터럴에 더불어
// 2진수 8진수 리터럴도 지원한다.

let dec: number = 6
let hex: number = 0xf00d
let bin: number = 0b1010
let octal: number = 0o744

// 문자열(String)
// 웹 페이지 서버 같은 프로그램을 JS로 만들때 기본적으로 텍스트 데이터를 다루는 작업이 필요합니다.
// 다른 언어들처럼 TS에서는 텍스트 데이터 타입을 String으로 표현합니다. JS처럼 TS도 큰따옴표나 작은따옴표를 문자열 데이터를 감싸는데 사용합니다.

let color: string = 'blue'
color = 'red'

let fullName: string = 'bob bobbington'
let age: number = 47
let sentence: string = 'hello my name is ddd'

// Array(배열)
// TS는 JS처럼 값들을 배열로 다룰 수 있게 해줍니다. 배열 타입은 두가지로 할수있다.
// 1.
let list: number[] = [1, 2, 3]
let list1: Array<number> = [1, 2, 3]

// 튜플 (Tuple)
// 튜플 타입을 사용하면, 요소의 타입과 개수가 고정된 배열을 표현할 수있습니다. 단 요소들의 타입이 모두 같을 필요는 없습니다.
// 예를 들어 number, string 이 쌍으로 있는 값을 나타내고 싶을 수 있습니다.
let x: [string, number]
x = ['hello', 1] //성공
x = ['hello', '1'] //실패

// 열거 (Enum)
// JS의 표준 자료형 집합과 사용하면 도움이 될만한 데이터형은 enum입니다.
enum Color {
	Red,
	Green,
	Blue,
}
let c: Color = Color.Green

//기본적으로 enum은 0부터 시작하여 멤버들의 번호를 매깁니다.

// Any 타입
// 애플리케이션을 만들 때, 알지 못하는 타입을 표현해야 할 수도 있습니다. 이값들은 사용자로부터 받은 데이터나 서드 파티 라이브러리 같은 동적인 컨텐츠에서 올 수도있습니다.
// 이경우 타입 검사를 하지 않고, 그 값들이 컴파일 시간에 검사를 통과하길 원합니다. 이를 위해 any를 타입을 사용할수있다.
let notSure: any = 4
notSure = 'maybe a string instead'

// any타입은 기존에 JS로 작업할수있는 강력한 방법으로, 컴파일 중에 점진적으로 타입 검사를 하거나 하지 않을 수 있습니다.
// 하지만 사용하지 않는게 좋다 왜냐면 TS를 쓰는 의미가 없으니

// Void
// void는 어떤 타입도 존재할 수 없음을 나타내기 떄문에, any의 반대 타입같습니다.
// void는 보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰는것을 볼수있습니다.
function warnUser(): void {
	console.log('hello')
}
// void를 타입 변수를 선언하는 것은 유용하지 않는데, 왜냐면 그 변수에는 null을 하용하지 않을때만, 자세한 건 다음 섹션을 참고 또는 undefined만 할당할 수 있기 떄문입니다.

let unusable: void = undefined

// Null and Undefined
// TS는 undefined과 null 둘 다 각각 자신의 타입 이름으로 undefined, null로 사용합니다. void처럼 그 자체로 유용한 경우는 거의 없습니다.
let u: undefined = undefined
let n: null = null

// 기본적으로 null과 undefined는 다른 모든 타입의 하위 타입이다. 이건 nullrhk undefined를 numeber 같은 타입에 할당할 수 있다는것을 의미
// 하지만 strictNullchecks를 사용하면, null과 undefined는 오직 any와 각자 자신들 타입에만 할당 가능,

// Never
// never타입은 절대 발생할수없는 타입입니다. never는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 안흔ㄴ 반환 타입으로 쓰입니다.
// 변수 또한 타입가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있습니다.

// never 타입은 모든 타입에 할당 가능한 하위타입입니다. 하지만 어떤 타입도 never에 할당할 수 있거나 하위 타입이 아닙니다.

// 객체 (Object)
// object는 원시 타입이 아닌 타입을 나타냅니다. 예를 들어 number, string, boolean, bigint, symbol, null 또는 undefined 가 아닌 나머지를 의미한다.
// object 타입을 쓰면 object.create 같은 API가 더 잘 나타납니다. 예를 들어 :

declare function create(o: object | null): void

// 타입 단언 (Type assertions)
// 가끔, TS보다 개발자가 값에 대해 더 잘 알고 일을 할때가 있다.
// 이런 경우 실제 타입이 현재 타입보다 구체적일 때 발생합니다.

// 타입단언 type assertions은 컴파일러에게 날 믿어 난 내가 뭘하고있는지 알아! 라고 말해주는것이다. 타입 단언은 다른 언어의 타입 변환과 유사하지만 다른 특별한 검사를 하거나 데이터를 재구성하지는 않습니다.
// 이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용합니다.
let someValue: any = 'test'
