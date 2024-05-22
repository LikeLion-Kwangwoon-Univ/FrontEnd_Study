## 🐽 인터페이스 구현하기

JavaScript의 this 키워드는 함수가 호출될 때 결정되는데, 이는 때때로 혼란을 야기할 수 있다.<br/> 
특히 함수를 반환하거나 다른 곳에 전달할 때, 예상치 못한 this의 값 때문에 문제가 발생할 수 있다.<br/><br/>

예를 들어, 아래의 deck 객체에서 createCardPicker 함수는 의도와 다르게 window 객체를 this로 가리키게 된다.

```TypeScript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

<br/>
이 문제를 해결하기 위해, ES6의 화살표 함수를 사용할 수 있다.<br/> 
화살표 함수는 this가 함수가 생성될 때의 컨텍스트를 가리키도록 한다.<br/><br/>

아래와 같이 코드를 수정하면 this가 deck 객체를 정확히 가리키게 된다.

```TypeScript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: 아랫줄은 화살표 함수로써, 'this'를 이곳에서 캡처할 수 있도록 합니다
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

<br/><br/>

## 🐽 this 매개변수

TypeScript를 사용하면 --noImplicitThis 플래그를 설정하여 잘못된 this 사용을 포착할 수 있다.<br/>
또한, 함수 내에서 this의 타입을 명시적으로 지정함으로써 더 명확한 코드를 작성할 수 있다.<br/><br/>

예를 들어, Card와 Deck 인터페이스를 정의하고, createCardPicker 함수에 this 타입을 Deck으로 지정한다.<br/>
이렇게 하면 createCardPicker 함수가 Deck 객체의 메서드로서 호출될 것임을 명시적으로 표현할 수 있다.

```TypeScript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
```

<br/><br/>

## 🐽 콜백에서 this 매개변수

this 매개변수는 콜백 함수에서도 유용하게 사용될 수 있다.<br/><br/>
UI 요소에 클릭 리스너를 추가할 때 this를 사용하고 싶지 않다면, this 타입을 void로 지정하여 this 사용을 방지할 수 있다.<br/>

```TypeScript
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // void 타입이기 때문에 this는 이곳에서 쓸 수 없습니다!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

<br/>
만약 this를 사용해야 한다면, 화살표 함수를 사용하는 것이 좋다.<br/>
화살표 함수는 외부의 this를 자동으로 캡처하기 때문에, this가 void로 예상되는 상황에서도 문제 없이 사용할 수 있다.

```TypeScript
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```
