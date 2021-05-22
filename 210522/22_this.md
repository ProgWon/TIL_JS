# 22. this

## 1. this 키워드

객체지향 프로그래밍에서 객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.  

동작을 나타내는 메서드느는 자신이 속한 객체의 상태인 프로퍼티를 참조하고 변경이 가능해야한다. 메서드가 자신이 속한 객체의 프로퍼티를 참조하기 위해서는 **자신이 속한 객체를 가리키는 식별자의 참조가 가능해야한다.**

### 1.1 객체 리터럴 방식으로 생성한 경우

메서드 내부에서 메서드 자신이 속한 객체를 가리키는 식별자를 **재귀적으로 참조가 가능하다.**

```javascript
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    // 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면
    // 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

getDiameter 메서드 내에서 메서드 자신이 속한 객체를 가리키는 식별자 circle 을 참조하고 있다. 이 참조 표현식이 평가되는 시점은 getDiameter 메서드가 호출되어 함수 몸체가 실행되는 시점이다.

위 예제의 객체 리터럴은 circle 변수에 할당되기 직전에 평가된다. getDiameter 메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되어 circle 식별자에 생성된 객체가 할당된 이후이다. 따라서 내부에서 circle 식별자를 참조할 수 있다.

### 1.2 생성자 함수 방식으로 인스턴스를 생성하는 경우

생성자 함수 내부에서는 프로퍼티나 메서드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 한다. 하지만 생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의한 이후에 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가적으로 필요하다. 즉, 생성자 함수로 인스턴스를 생성하려면 생성자 함수가 존재해야 한다.

생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이다. 따라서 생성할 인스턴스를 가리키는 식별자를 알 수 없다. 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다.

**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다.** this 를 통해 **자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**

```javascript
// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

this 바인딩은 동적으로 일어난다. -> this 는 **함수가 호출되는 방식에 따라 this 에 바인딩될 값이 달라진다.**

## 2. 함수 호출 방식과 this 바인딩

위에서도 얘기했듯이 this 바인딩은 함수 호출 방식, 즉 **함수가 어떻게 호출되었는지에 따라** 동적으로 결정된다.

> 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. this 바인딩은 함수 호출 시점에 결정된다.

### 2.1 일반 함수 호출

기본적으로 this 에는 **전역 객체** 가 바인딩이 된다. 전역 함수는 물론이고, 중첩 함수(즉, 모든 함수르를 일반 함수로 불러버린다면)를 일반 함수로 부른다면 함수 내부의 this 는 **전역 객체** 가 바인딩이 되버린다.

하지만 메서드 내에서 정의한 중첩 함수 또는 메서드에게 전달한 콜백 함수가 일반 함수로 호출될 때 this 가 전역 객체를 바인딩 하는것은 문제가 있다. 중첩 함수나 콜백 함수의 경우 외부 함수를 돕는 헬퍼 함수의 역할로 외부 함수의 로직을 대신하는 경우가 대부분이다.

이러한 문제를 해결하기 위한 방법들은 아래와 같다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};
----------------------------------------
obj.foo();

var value = 1;

const obj = {
  value: 100,
  foo() {
    // 콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(function () {
      console.log(this.value); // 100
    }.bind(this), 100);
  }
};

obj.foo();
----------------------------------------
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    setTimeout(() => console.log(this.value), 100); // 100
  }
};

obj.foo();
```

### 2.2 메서드 호출

메서드 내부의 this 에는 메서드를 호출한 객체, 메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다.

```javascript
const anotherPerson = {
  name: 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
// 브라우저 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
// Node.js 환경에서 this.name은 undefined다.
```

### 2.3 생성자 함수 호출

생성자 함수 내부의 this 에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩 된다.

```javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

### 2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Function.prototype 의 메서드이므로 모든 함수가 상속받아서 사용하는 것이 가능하다.

```javascript
/**
주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
@param thisArg - this 로 사용할 객체
@param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
**/
Function.prototype.apply(thisArgs[, argsArray])

/**
주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
@param thisArgs - this 로 사용할 객체
@param arg1, arg2, ... - 함수에게 전달할 인수 리스트
**/
Function.prototype.call (thisArg[, arg1[, arg2[, ...]]])
```

apply 와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 이 둘은 인수를 전달하는 방식만 다를 뿐 동일하게 작동한다.

apply 메서드는 호출할 함수의 인수를 배열로 묶어서 전달한다. 

call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.

Function.prototype.bind 메서드는 apply 와 call 메서드와 달리 함수를 호출하지 않고 this 로 사용할 객체만 전달한다.

```javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 함수에 this로 사용할 객체를 전달한다.
// bind 메서드는 함수를 호출하지는 않는다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

