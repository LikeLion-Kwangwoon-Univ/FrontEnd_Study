// 리터럴 타입(Literal type)

// 리터럴 타입 좁히기 (Literal Narrowing)
// var또는 let으로 변수를 선언할 경우 이 변수의 값이 변경될 가능성이 있음을 컴파일러에게 알립니다.
// 반면 const로 변구를 선언하게 되면 TS에게 이 객체는 절대 변경되지 않음을 알립니ㅏ다.

const helloworld = 'hello' //TS는 문자열이 아닌 Hello world로 타입을 정한다. 왜냐면 상수이니깐

let hiWorld = 'hi world' //이건 TS에서 string으로 합ㄴ디ㅏ. 그 이유는 변수이니

// 위에같이 간단한 코드에서도 개발자가 타입 좁히기를 진행할수있는것이다.

// 문자열 리터럴 타입(string literal types)
// 실제로 문자열 리터럴 타입은 유니언 타입, 타입 가드 그리고 타입 별칭과 잘 결합됩니다.
// 이런 기능을 함계 사용하여 문자열로 enum과 비슷한 형태를 갖출 수 있습니다.

type Easing = 'dd' | 'kk' | 'ee'

function test1(aa: Easing): string {
	return 'd'
}

test1('dx') //error 'dx'는 정의된 타입에 없는것!

// 숫자형 리터럴 타입 (Numeric Literal Types)
// TS에는 위의 문자열 리터럴과 같은 역할을 하는 숫자형 리터럴 타입도 있습니다.

function rollDice(): 1 | 2 | 3 {
	return 1
}

//추가로 유니언 타입 예시

/**
 * 타입 좁히기
 * 서로소 유니온 타입
 * 태그드유니온타입이라고 불리는데
 * switch 혹은 if문으로 타입을 직관적으로 분리하기 좋고, 또한 타입을 좁히는것도 쉽다
 */

{
	//우리가 기본적으로 많이 쓰는형식은
	type Admin = {
		name: string
		kickOut: number
	}
	type Member = {
		name: string
		point: number
	}
	type Guest = {
		name: string
		visitCount: number
	}

	//이때 함수에서 admin혹은 member혹은 geust 세개중 하나가 props로 들어와서 값을 적는다고 하자
	// 그러면 이런식으로 아래 3개를 유니온으로 사용해서 작동할것이다. 아래와 같이 사용할것이다.
	type StatusProps = Admin | Member | Guest

	function Test(status: StatusProps) {
		if ('kickOut' in status) {
			console.log('Admin이네요.')
		}
		if ('point' in status) {
			console.log('Member이네요.')
		}
		if ('visitCount' in status) {
			console.log('Guest이네요.')
		}
	}
	//위에 코드가 틀린것은 아니다 하지만 직관적이지가 않다.
	//point, kickOut, visitCount 이것이 어디있는지 위에서 확인을 하고 따로 작성해야하는 것이다.
	//더 좋은 방법은
	type Admin1 = {
		status: 'ADMIN'
		name: string
		kickOut: number
	}
	type Member1 = {
		status: 'MEMBER'
		name: string
		point: number
	}
	type Guest1 = {
		status: 'GUEST'
		name: string
		visitCount: number
	}
	type StatusProps1 = Admin1 | Member1 | Guest1

	//이렇게 하면 좀더 직관적이다 하지만 이럴때는 switch문이 좀더 직관적인데 그 이유는 아래 써보겠다.
	function Test1(status: StatusProps1) {
		//if문
		if (status.status === 'ADMIN') {
			console.log('Admin이네요.')
		}
		if (status.status === 'MEMBER') {
			console.log('Member이네요.')
		}
		if (status.status === 'GUEST') {
			console.log('Guest이네요.')
		}

		//switch문
		switch (status.status) {
			case 'ADMIN': {
				console.log('관리자네요')
				break
			}
			case 'MEMBER': {
				console.log('회원이네요')
				break
			}
			case 'GUEST': {
				console.log('게스트네요')
				break
			}
		}
	}
}
