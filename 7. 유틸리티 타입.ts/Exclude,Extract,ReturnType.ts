{
	/**
	 * Exclude<T, U>
	 * -> 제외하다, 추방하다
	 * -> Tdptj U를 제거하는 타입
	 */

	type A = Exclude<string | boolean, boolean>

	//Extract<T, U>
	//-> T에서 U를 추출하는 타입
	type B = Extract<string | boolean, boolean>

	//ReturnType<T>
	//함수의 반환값 타입을 추출하는 타입
	function funA() {
		return 'ddd'
	}
	type ReturnA = ReturnType<typeof funA>

	type Event =
		| {
				type: 'click'
				event: MouseEvent
		  }
		| {
				type: 'focus'
				event: FocusEvent
		  }
		| {
				type: 'keydown'
				event: KeyboardEvent
		  }

	type NonKeyDownEvents = Exclude<
		Event,
		{
			type: 'keydown'
			event: KeyboardEvent
		}
	>

	type tests = [
		Expect<
			Equal<
				NonKeyDownEvents,
				| { type: 'click'; event: MouseEvent }
				| { type: 'focus'; event: FocusEvent }
			>
		>,
	]

	
}
