// 첫번째 인터페이시 (Our First Interface)

interface LabelType {
	label: string
}

function printLabel(labelobj: LabelType) {
	console.log(labelobj.label)
}

//선택적 프로퍼티
//인터페이스의 모든 프로퍼티가 필요한 것은 아닙니다. 어떤 조건에서만 존재하거나 아예 없을수도있습니다.
//선택적 프로퍼티들은 객체 안의 몇개의 프로퍼티만 채워 함수에 전달하는 option bags같은 패턴을 만들때 유용하다.
interface SquareConfig {
	color?: string
	width?: number
}
//위에같이 하면 color가 있을수도있고, 없을수도 있다. width도 마찬가지

//일부 프로퍼티들은 객체가 처음 생성될때만 수정 가능해야합니다
//프로퍼티 이름 앞에 readonly를 넣어서 이를 지정할수있다.
interface PointType {
	readonly x: number
	readonly y: number
}

let p1: PointType = { x: 10, y: 20 }
p1.x = 5 //읽기 전용이므로 변경할수없다.

//readonly VS const
//readonly와 const 중에 어떤것을 사용할지 기억하기 가장 쉬운 방법은
//변수와 프로퍼티중 어디에 사용할지 질문해 보는것입니다.
//변수는 const많이 사용하고 프로퍼티는 readonly를 사용합니다.

// 함수타입 (Fn Types)
//인터페이스는JS객체가 가질수있는 넓은 범위의 형태를 기술할수있습니다. 프로퍼티로 객체를 기술하는것외에 인터페이스는 함수타입을 설명할수있다.
//인터페이스로 함수타입을 기술하기 위해 인터페이스에 호출 서명을 전달합니다.
//이는 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷합니다.
interface SearchFunc {
	(source: string, subString: string): boolean
}

let mySearch: SearchFunc

mySearch = function (source, subString) {
	let result = source.search(subString)
	return result > -1
}
// 이렇게 함수까지 interface를 통해 함수 타입을 정의하고 재사용이 가능하다는 뜻이다.

//인덱서블 타입(Indexable Types)
//인터페이스로 함수 타입을 설명하는 방법과 유사하게, a[10] 이나 ageMap["daniel"]처럼 타입을 인덱스로 기술할 수 있습니다.
//인덱서블 타입은 인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는데 사용할수있는 타입을 기술하는 인덱스 시그니처를 가지고있습니다.

interface StringArr {
	[index: number]: string
	//key값 number : value => string
}
interface NumberDictionary {
	[index: string]: number
	length: number
	name: string //error, name의 타입은 string이여서
}

let myArray: StringArr
myArray = ['d', 'd']

// 클래스 타입
// 타입스크립트로 클래스가 특정 계약을 출족시키도록 명시적으로 강제할수있다.
//인터페이스로 클래스를 정의하는 경우 implements 키워드를 사용해 클래스 정의 옆에 명시한다.
interface ClockInterface {
	currentTime: Date
	setTime(d: Date): void
}

class Clock implements ClockInterface {
	currentTime: Date = new Date()
	setTime(d: Date) {
		this.currentTime = d
	}
	constructor(h: number, m: number) {}
}

//인터페이스 확장은 extend사용
interface Shape {
	color: string
}
interface Square extends Shape {
	sideLength?: number
}
let dd: Square = { color: '1' }
