// 유니언 타입(Union Types)
//가끔, number나 string을 매개변수로 기대하는 라이브러리를 사용할때가 있습니다. 예를 들어, 다음 함수를 사용할 때입니다.
type TestType = string | number
let test4: TestType = 'd'
test4 = 4

//위와같이 test4라는 변수가 string과 number를 받을수있는 변수다 그러면 이때 유니언을 통해 타입선언을 해줄수있다.

interface Bird {
	fly(): void
	layEggs(): void
}

interface Fish {
	swim(): void
	layEggs(): void
}

declare function getSmallPet(): Bird | Fish

let pet = getSmallPet()
pet.layEggs()

// 여기서 유니언은 좀 까다롭다. A |B타입이있으면 확실할수있는 것은 그 값이 A와 B 둘다 가지고있는 멤버들을 갖고있는것
pet.swim() //Error
pet.fly() //Error
// 여기서 swim이랑 fly가 가지고있다는 확신을 할수없다. 만약 변수가 실제로 런타임에 Fish이면 pet.fly()를 호출하는것은 오류이기때문

// 유니언 구별하기 (Discriminating Unions)
//유니언을 사용하는데 있어서 일반적인 기술은 TS가 현재 가능한 타입 추론의 범위를 좁혀나가게 해줄수있는 리터럴 타입을 갖는 단일 필드를 사용하는것입니다
//아래는 3가지의 Type을 유니언으로 정의를 하였다. state가 loading, failed, success이렇게 3개 이다.
type NetworkLoadingState = {
	state: 'loading'
}

type NetworkFailedState = {
	state: 'failed'
	code: number
}

type NetworkSuccessState = {
	state: 'success'
	response: {
		title: string
		duration: number
		summary: string
	}
}
// ---생략---
type NetworkState =
	| NetworkLoadingState
	| NetworkFailedState
	| NetworkSuccessState

function networkStatus(state: NetworkState): string {
	//일단 state 잠재적 타입을 알수없음

	//state.code는 NetworkFailedState 상황에만 가능한것인데 그걸 확실할수없다. 위에 조건문으로
	// if (state.state === 'failed') 이걸로 감싸야하거나 아래와 같이 switch를 써서 타입좁히자
	state.code

	// 아래는 swith를 통해 state를 파악해 타입 좁히기를 한것이다.
	// state의 상태를 case별로 처리한다.그리고 그 케이스에 맞는 state.code혹은 state.response.title을 넣으면 타입이 좁힌 상태이기떄문에 오류 없음
	switch (state.state) {
		case 'loading':
			return 'Downloading...'
		case 'failed':
			// 여기서 타입은 NetworkFailedState일 것이며,
			// 따라서 `code` 필드에 접근할 수 있습니다.
			return `Error ${state.code} downloading`
		case 'success':
			return `Downloaded ${state.response.title} - ${state.response.summary}`
	}
}

// 교차 타입 (intersection Types)
// 교차 타입은 유니언 타입과 밀접한 관련이 있지만 사용법은 확실히 다르다.
// 타입1 & 타입2 이런식으로 쓰는것이다.

// ex)
interface ErrorType {
	state: boolean
}
interface NetworkType {
	work: string
}

type ErrorAndNetWorkResponse = ErrorType & NetworkType
//위에 ErrorAndNetWorkResponse타입은 ErrorType과 NetworkType 둘다 가지는 것이다.
