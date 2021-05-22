# 20. strict mode

## 1. strict mode 란

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

위와 같이 var, let, const 키워드 없이 선언한 x 에 10을 할당하고 console.log(x) 를 실행하면 어떻게 될까? 스코프 체인을 통해 검색하기 시작하고 x 변수의 선언이 존재하지 않으므로 ReferenceError 를 발생시킬 것 같지만 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 이러한 현상을 암묵적 전역이라고 한다.  

개발자의 의도와 상관없이 발생한 암묵적 전역은 오류를 발생시킬 원인이 될 가능성이 크다. 하지만 오타나 문법 지식 미비로 인한 실수는 언제나 발생한다. 이를 위해 좀 더 근본적인, 즉 잠재적 오류를 발생시키기 어려운 개발 환경을 만들어 개발하는것이 근복적인 해결책이라고 할 수 있다.  

이를 위해 ES5 부터 strict mode 가 추가되었다. JS 문법을 좀 더 엄격하게 적용해 명시적 에러를 발생시킨다.  

## 2. strict mode 의 적용

strict mode 를 적용하려면 전역의 선두나 함수의 몸체 선두에 'use strict'; 를 추가하면 된다.

## 3. 전역에 stict mode 를 적용하는 것을 피하자

전역에 적용한 strict mode 는 스크립트 단위로 적용된다. strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode 인 경우도 있으므로 전역에 strict mode 를 적용하는 것은 바람직하지 않다. 이 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode 를 적용한다.

## 4. 함수 단위로 strict mode 를 적용하는 것도 피하자

함수 단위로 strict mode 를 적용할 수도 있다. 위와 마찬가지로 어떤 함수는 사용하고 어떤 함수는 사용하지 않는 것은 바람직하지 않다.

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```  

strict mode 는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

## 5. strict mode 가 발상시키는 에러

### 5.1 암묵적 전역

선언하지 않은 변수를 참조하면 ReferenceError 가 발생한다.

```javascript
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());

```

### 5.2 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 가 발생한다.

```javascript
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

### 5.3 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 SyntaxError 가 발생한다.

```javascript
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

### 5.4 with 문의 사용

with 문을 사용하면 SyntaxError 가 발생한다. with 문은 전달된 객체를 스코프 체인에 추가한다. 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 with 문은 사용하지 않는 것이 좋다.

```javascript
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```

## 6. strict mode 적용에 의한 변화

### 6.1 일반함수의 this

strict mode 에서는 함수를 일반 함수로 호출하면 this 에 undefined 가 바인딩 된다. 이때 에러는 발생하지 않는다 (미적용시 window, node.js 는 global 반환함.)

```javascript
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
}());
```

### 6.2 arguments 객체

strict mode 에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```javascript
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1));
```