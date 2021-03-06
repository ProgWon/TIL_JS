# 15. let, const와 블록 레벨 스코프

## 1. var 키워드로 선언한 변수의 문제점

### 1.1 변수의 중복 선언 허용

- var 키워드로 선언한 변수는 중복 선언이 가능하다. 초기화문 유무에 따라 다르게 동작하는데, 초기화문이 있는 변수 선언문은 JS 엔진에 의해 var 키워드가 없는 것처럼 동작하고 초기화문이 없는 변수 선언문은 무시된다. -> 동일한 이름의 변수가 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당한다면? -> 의도치 않게 먼저 선언된 변수 값이 변경되는 부작용이 발생한다.

### 1.2 함수 레벨 스코프

- var 키워드로 선언한 변수는 오직 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다. for 문의 변수 선언문에서 var 키워드로 선언한 변수도 전역 변수가 된다. 함수 레벨 스코프는 전역 변수를 남발할 가능성을 높이게 된다.

### 1.3 변수 호이스팅

- var 키워드 사용시 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 즉, var 키워드로 선언한 변수는 변수 선언문 이전에 참조가 가능하다.

## 2. let 키워드

앞의 살펴본 단점들을 보완하기 위해 ES6 는 새로운 변수 선언 키워드인 let, const 를 도입했다. **var 키워드와의 차이점을 중심으로 let 키워드를 살펴보자.**

### 2.1 변수 중복 선언 금지

- let 키워드로 이름이 같은 변수를 중복 선언한다면 문법 에러가 발생한다. -> 같은 스코프 내에서의 중복 선언을 허용하지 않는다.

### 2.2 블록 레벨 스코프

- var 키워드로 선언한 변수는 함수의 코드 블록만을 코드 스코프로 인정하는 함수 레벨 스코프를 따른다. let 키워드는 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.
- 블록 레벨 스코프를 따르기 때문에 전역에서 선언된 변수와 코드 블록 내에서 선언된 변수는 이름이 같더라도 다른 별개의 변수로 본다.

### 2.3 변수 호이스팅

#### var 키워드

- let 키워드는 마치 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
- var 키워드로 선언한 변수는 암묵적으로 선언 단계와 초기화 단계가 한번에 진행된다.
- 선언 단계에서 스코프(실행 컨텍스트의 레기컬 환경)에 변수 식별자를 등록해 JS 엔진에 변수의 존재를 알린다. 
- 즉시 초기화 단계에서 undefined 로 변수를 초기화하기 때문에 변수에 접근해도 스코프에 변수가 존재하므로 에러가 발생하지 않는다.

#### let 키워드

- let 키워드로 선언한 변수는 선언 단계와 초기화 단계가 분리 되어 진행된다. 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.
- 만약 초기화 이전에 변수에 접근시 참조 에러가 발생한다. 
- 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 일시적 사각지대(TDZ) 라고 부른다.
- 결국 let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는것 처럼 보이지만 **그렇지 않다.**
- JS 에서는 ES6 에서 도입된 let, const 를 포함한 모든 선언을 호이스팅한다. 단 let, const, class 의 경우 호이스팅이 발생하지 않는 것처럼 동작 할 뿐이다.

### 2.4 전역 객체와 let

- var 키워드로 선언한 전역 변수와 전역 함수, 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window 의 프로퍼티가 된다.
- let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 보이지 않는 개념적인 블록내에 존재하게 된다.

## 3. const 키워드
const 키워드는 상수를 선언하기 위해 사용된다. 하지만 반드시 상수만을 위해 사용하지는 않는다. let 키워드와 대부분 동일하므로 let 키워드와 다른 점을 중심으로 살펴볼 필요가 있다.

### 3.1 선언과 초기화

- const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.
- const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

### 3.2 재할당 금지

- const 키워드로 선언한 변수는 재할당이 금지 된다.

### 3.3 상수

- const 키워드로 선언한 변수에 원시값을 할당한 경우에는 변수 값 변경이 불가능하다. (원시값은 변경이 불가능 한 값이므로 재할당 없이는 변경이 부가능하다.) 이러한 특징을 이용해 const 키워드를 상수를 표현하는 데 사용하기도 한다.
- 상수는 재할당이 금지된 변수이다. 상수도 값을 저장하기 위한 메모리 공간이 필요하기 때문에 변수라고 할 수 있다.
- 일반적으로 상수의 이름은 대문자로 선언해 상수임을 명확히 나타낸다. 여러 단어로 이루어 졌다면, 언더스코어로 구분해서 스네이크 케이스로 표현하는 것이 일반적이다.

### 3.4 const 키워드와 객체

- const 키워드로 선언된 변수에 객체를 할당한 경우, 값을 변경할 수 있다. 객체는 재할당이 없어도 직접 변경이 가능하기 때문이다.
- 즉, const 키워드는 재할당을 금지할 뿐 "불변" 의미하지는 않는다.

## 4. var vs let vs const

- 변수 선언에는 기본적으로 const 를 사용하고 let 은 재할당이 필요한 경우에 한정해서 사용하는 것이 좋다. 
- ES6 를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 을 사용하고 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시값과 객체에는 const 키워드를 사용한다. 재할당을 금지하기 때문에 var, let 키워드보다 안전하다.