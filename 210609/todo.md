# todo

DOM 을 잘 다뤄서 화면에 HTML 을 변경하는것은 상태를 변경시키는 것이 아니다. 이는 웹 브라우저를 잘 조작한것이다.

애플리케이션을 만들려면 상태를 잘 조작해야 한다. 즉 서버로 부터 응답받은 자료를 화면에 뿌려줘야 하고 이를 수정할 수 있어야 한다.

간단한 todo 리스트를 만들어보자. 아래와 같은 html 이 존재한다. 이는 하나의 input 창과 버튼을 통해서 todo 목록을 추가하는 것이 가능하다. 이는 체크박스, 콘텐츠, 삭제 버튼으로 구성되어 있다.

form 안에서 input 과 button 을 관리해주는 것은 onsubmit 이벤트의 사용으로 버튼 클릭과 input 입력에서 enter 키를 눌렀을때 이벤트 핸들링이 가능해지기 때문이다.

```html
<form>
      <input type="text" class="input-todo" value="" placeholder="enter todo!" />
      <button class="add">add</button>
    </form>
    <ul class="todo-list"></ul>
```

서버에서 상태를 받아왔다고 가정하고 아래와 같은 todo 리스트인 todos 를 받아왔다고 가정하겠다.

```javascript
const fetch = () => {
        todos = [
          { id: 3, content: 'HTML', completed: false },
          { id: 2, content: 'CSS', completed: true },
          { id: 1, content: 'Javascript', completed: false }
        ].sort((todo1, todo2) => todo2.id - todo1.id);

        render();
      };
```

id 와 content, completed 를 가지고 있다. id 는 목록의 고유한 번호, content 는 콘텐츠 내용, completed 는 체크 박스의 체크 여부를 말한다.

이때 이 fetch 는 웹 페이지의 렌더링이 마무리 되면 동작한다. 이를 구현하기 위해 DOMContentLoaded 를 사용해서 fetch 를 불러주기만 하면 된다.

```javascript
window.addEventListener('DOMContentLoaded', fetch);
```

DOMContentLoaded 는 addEventListener 밖에 사용할 수 없으니 주의해야 한다.

fetch 내부에서 render 를 불러주는데, 이는 실질적으로 화면에 렌더링을 해주는 함수를 의미한다. innerHTML 을 통해서 todos 안에 있는 객체들을 이용해 map 으로 list 를 문자열로 받아 join 해주었다.

```javascript
const render = () => {
        $todoList.innerHTML = todos
          .map(
            ({ id, content, completed }) =>
              `<li id=${id}>
          <input type="checkbox" ${completed ? 'checked' : ''}/>
          <span>${content}</span>
          <button class="remove">X</button>
        </li>`
          )
          .join('');
      };
```

이제 초기 화면을 제대로 그려주었다. 다음은 추가나 삭제, 체크 박스의 체크와 해제에 대한 구현을 해보도록 하겠다.

만약 todo 를 추가하고 싶다면 form 에서 onsubmit 이벤트가 일어난 경우에 todo 가 추가가 될 것이다. 이때 마우스로 add 버튼을 클릭한다던가 input 에서 엔터를 치는 경우에 이벤트가 발생한다.

```javascript
$form = e => {
    e.preventDefault()

    const content = e.target.value.trim();

    if (content) addTodo(content);

    e.target.value = '';
}
```

위 코드에서 document.querySelector('form') 을 통해 form 을 찾아주고 이를 $form 에 넣어주었다. 이후 e.preventDefault() 를 진행해주는데, form 은 onsubmit 이벤트가 발생하면 새로고침이 되는 기본 상태를 가지고 있다.

이를 막아주기 위해, 즉 기본 이벤트 발생을 예방해주기 위해서 e.preventDefault() 를 사용한다. 여기서 e 는 이벤트 객체를 의미힌다.

이후 content 에 이벤트의 타겟의 value, 즉 input 의 value 를 넣어주고 공백이 들어올 수 없도록 양 옆의 공백들을 전부 제거해준다. 이를 통해 띄어쓰기에서의 공백은 허용한다. 

만약 content 가 빈 문자열, 즉 공백이라면 if 문을 통해 공백으로 문자가 들어오는것을 막아준다. 이후 addTodo 함수를 부르는데 이를 통해 todo 의 추가를 구현하는 것이 가능하다. 

이런 로직은 따로 함수를 구현해서 사용하는것이 좋다. addTodo 를 호출하고 사용자의 편의성을 위해 e.target.value 를 빈 문자로, 즉 입력이 끝났을 때는 다시 공백으로 돌려줘 사용자가 입력한 내용을 다시 지울 필요 없게 만들어준다.

addTodo 는 아래와 같이 구현된다.

```javascript
const addTodo = content => {
        const newTodo = { id: generateId(), content, completed: false };
        todos = [newTodo, ...todos];

        render();
      };
```

addTodo 는 content 를 받는다. 이후 newTodo 에 generatedId 값을 가져와서 넣어주는데, 이는 현재 todos 안에 있는 id 값중 가장 큰 id 값보다 1 큰 값을 가져온다. 아래와 같이 구현되어 있다.

```javascript
const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;
```

addTodo 는 content, completed 를 객체로 넣어주고 이를 배열로 만들어서 todos 에 넣어준다. 이때 todos 의 맨 위에 삽입해야 하므로 newTodo, ...todos 로 넣어준다.

그렇다면 todo 를 지워주고 싶다면 어떻게 해야 할까? 이때는 삭제 버튼의 onclick 이벤트를 핸들링 하면 된다.

```javascript
$todoList.onclick = e => {
        if (!e.target.matches('.todo-list > li > .remove')) return;
        removeTodo(e.target.parentNode.id);
      };
```

$todoList 는 ul 을 받아온다. 이는 이벤트를 상위 ul 에 위임해준것이다. 만약 위임해주지 않고 사용한다면 모든 li 요소들에게 이벤트를 걸어줘야 한다. 이는 이벤트의 전파가 일어나기 때문에 가능하다. 타겟의 이벤트가 발생했을때 DOM 에서 상위 노드로 이벤트가 전파되는것을 버블링이라고 한다.

버블링이 일어나기 때문에 위와 같은 코드를 사용하는 것이 가능하다. 즉 상위 노드에서 이벤트를 관리하고 만약 이벤트 객체의 target 이 list 를 가리키지 않는다면 예외를 처리해주고 removeTodo 에 e.target.parentNode.id 를 넣어준다.

이는 e.target 이 button 이기 때문이고 부모인 li 의 id 를 삭제해야 리스트가 삭제되기 때문이다.

```javascript
const removeTodo = id => {
        todos = todos.filter(todo => todo.id !== +id);

        render();
      };
```

removeTodo 함수는 id 를 받아온다. 이때 todos 에는 todos.filter 를 통해 넘어온 id 와 일치하지 않는 경우에만 배열에 다시 담아준다.

이때 id 에 +를 한 이유는, id 가 문자로 넘어오기 때문이다. 따라서 숫자형으로 변환해줘야 할 필요가 있다. 이후 render 를 호출한다.

이제 삭제까지 전부 구현됬다. 마지막으로 남은 것은 체크 박스의 해제와 체크의 상태를 변경하는 것이다. 이는 체크 박스가 체크되거나 해지되거나 둘 중하나를 확인하면 됨으로 onchange 를 통해서 가능하다.

```javascript
$todoList.onchange = e => {
        toggleTodo(e.target.parentNode.id);
      };
```

마찬가지로 체크박스마다 event 를 달아줄 필요 없이 상위 노드에 이벤트를 걸어주었다. 이때도 마찬가지로 이벤트 객체의 target.parentNode.id 를 넣어줘야 li 의 id 를 얻는 것이 가능하다.

```javascript
const toggleTodo = id => {
        todos = todos.map(todo =>
          todo.id === +id ? { ...todo, completed: !todo.completed } : todo
        );

        render();
      };
```

map 을 통해 todo.id 와 넘어온 id 가 같다면, 즉 id 로 넘어온 li 의 체크박스가 선택되었다면 원래 상태의 정 반대로 만들어 줘야 한다. (true 면 false, false 면 true) 만약 id 가 다르다면 todo 를 그대로 넣어 주면 된다.

이를 통해 todo 리스트를 구현했고 부족한 부분, 즉 추가된 요소만 렌더링 해줘야 하지만 모두 렌더링 되는 부분에 대해서는 수정이 필요하다.