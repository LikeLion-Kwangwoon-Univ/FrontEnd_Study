# 클래스를 확장한 인터페이스

인터페이스가 클래스 타입을 확장할 때, 해당 클래스의 멤버를 상속받지만 구현은 상속받지 않는다. 이는 인터페이스가 클래스의 구현을 강제하지 않으며, 클래스의 모든 멤버를 선언만 한다. 따라서 인터페이스는 기반 클래스의 private 및 protected 멤버를 상속받는다. 이는 인터페이스가 private 또는 protected 멤버를 포함한 클래스를 확장할 수 있음을 의미하며, 인터페이스 타입은 해당 클래스나 하위 클래스에서만 구현될 수 있음을 의미한다.<br/><br/>

```TypeScript
class Control {
private state: any;
}

interface SelectableControl extends Control {
select(): void;
}

class Button extends Control implements SelectableControl {
select() { }
}

class TextBox extends Control {
select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
private state: any;
select() { }
}

class Location {

}
```

<br/>

이 예제는 인터페이스가 클래스를 확장할 때, 해당 클래스의 private과 protected 멤버를 상속받는다는 중요한 사실을 보여준다. 그러나 이 멤버들은 오로지 해당 클래스나 그 하위 클래스에서만 접근 가능하다.<br/><br/>

이는 특정한 방식으로 코드를 구성할 때 유용하게 사용될 수 있으며, 클래스의 특정 멤버를 반드시 포함하는 하위 클래스만을 대상으로 하는 인터페이스를 만들 때 유용하다.
