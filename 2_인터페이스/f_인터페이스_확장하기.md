# 인터페이스 확장하기

## 기본 인터페이스 확장하기

예를 들어, Shape 인터페이스가 있다고 가정해보자.<br/>
이 인터페이스에는 color라는 속성이 있다.

```TypeScript
interface Shape {
  color: string;
}
```

<br/>
이제 Shape 인터페이스를 확장하여 Square 인터페이스를 만들 수 있다.<br/>
Square는 Shape의 모든 속성을 상속받으며, 추가로 sideLength라는 자신만의 속성도 가진다.<br/>

```TypeScript
interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

<br/>
여기서 square 객체는 Shape 인터페이스로부터 상속받은 color 속성과 Square 인터페이스 자체의 sideLength 속성을 모두 가진다.

## 다중 인터페이스 확장하기

인터페이스는 여러 다른 인터페이스들을 확장할 수 있어, 다양한 속성들을 조합하여 더 구체적인 인터페이스를 만들 수 있다.<br/><br/>

예를 들어, Shape과 PenStroke라는 두 개의 인터페이스가 있다고 해보자.<br/>
Shape에는 color 속성이, PenStroke에는 penWidth 속성이 있다.

```TypeScript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}
```

<br/>
이제 Shape와 PenStroke 두 인터페이스를 확장하여 Square 인터페이스를 만들 수 있다.<br/>
이렇게 하면 Square는 세 가지 속성을 모두 가지게 된다. (color, penWidth, sideLength)

```TypeScript
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

<br/>
이렇게 Square 인터페이스는 Shape와 PenStroke의 속성을 모두 상속받아, 두 인터페이스의 특성을 결합한 새로운 형태로 확장된다. 이 방식은 코드의 재사용성을 높이고, 복잡한 타입들을 더 쉽게 구성할 수 있게 해준다.
