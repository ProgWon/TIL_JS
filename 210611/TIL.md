# TIL

수업 시간에 todo 만들기를 진행하면서 오늘 하루 작성한 코드와 수정 방안에 대해서 정리해봅니다.

먼저 과제로 냈었던 todos 와 다른점은, 이번에는 관리할 상태가 2개 더 있다는 점이다.

걍 tab 별로 클릭할때마다 각기 다른 조건을 주면서 진행해야 하는데, 이 부분을 중점적으로 진행해봐야 할 것 같다.
```javascript
let todos = [];
let activeTodos = [];
let completedTodos = [];
let nowNav = todos;
```

먼저 위와 같이 3개의 상태를 관리하도록 해주었다. 이후 nowNav 를 통해서, 현재 클릭되어 렌더링 되어야 할 상태를 알 수 있도록 해주었다.(일종의 flag 처럼 동작하도록 진행했다.)
```javascript

```
const render = nowNav => {
  $todos.innerHTML = nowNav
    .map(
      ({ id, completed, content }) =>
        `<li id=${id} class="todo-item">
          <input id="ck-${id}" class='checkbox' type="checkbox" ${completed ? 'checked' : ''} >
          <label for="ck-${id}">${content}</label>
          <i class="remove-todo far fa-times-circle"></i>
          </li>`
    )
    .join('');
};

```javascript
const fetch = () => {
  todos = [
    { id: 3, content: '12345', completed: true },
    { id: 2, content: '1243', completed: false },
    { id: 1, content: '123', completed: false }
  ].sort((todo1, todo2) => todo2.id - todo1.id);

  render(todos);
};
```

저번 todos 와 마찬가지로 현재 상태로 진행될 기본 값들이다.


```javascript
document.addEventListener('DOMContentLoaded', fetch);
```

DOM 이 완성되고 나서 부르도록 해주었다.

```javascript
const generateTodoId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;
```

addTodo 에서 id 값이 필요한데, 현재 todos 에 들어있는 id 중에서 가장 큰 값을 뽑아와주는 함수를 만들었다. 여기까지는 비슷하다.


```javascript
// todo 등록
const addTodo = content => {
  todos = [{ id: generateTodoId(), content, completed: false }, ...todos];

  render(nowNav);
};

$inputTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  const content = $inputTodo.value.trim();

  if (content) addTodo(content);

  $inputTodo.value = '';
};
```

문제가 생긴 부분이다. addTodo 시에 현재 탭에서 바로 렌더링 되지 않는다. 마우스로 탭을 클릭해줘야 동작하는 걸 보니 수정해야 할 부분이 있는 것 같다.

```javascript
// remove todo
const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);

  render(nowNav);
};

$todos.onclick = e => {
  if (e.target.matches('.todos > li > .remove-todo')) removeTodo(e.target.parentNode.id);
};
```

removeTodo 역시 마찬가지다. 삭제시에 체크해주었던 부분이 다시 원래 상태로 돌아오는 문제가 발생한다. 아마 toggle 에서 문제가 발생하지 않았나 싶다.

```javascript
// toggleTodo
const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));

  render(nowNav);
};

$todos.onchange = e => {
  if (e.target.matches('.todos > li > label')) toggleTodo(e.target.parentNode.id);
};
```

내 생각엔 이 부분에서 todo.complete 의 값이 제대로 동작하지 않는 것 같다. 이 부분에서 먼저 수정이 들어가야 할 것 같다.

```javascript
// mark all
const markAllComplete = checked => {
  if (checked) todos = todos.map(todo => ({ ...todo, completed: true }));
  else todos = todos.map(todo => ({ ...todo, completed: false }));

  render(nowNav);
};

$completeAll.onchange = e => {
  if (e.target.matches('.complete-all > .checkbox')) markAllComplete(e.target.checked);
};
```

한 번 클릭시 전부 true, 체크되어 있는 박스를 클릭시에는 전부 false 로 해준다. 이 부분은 정상적으로 동작한다.

```javascript
// nav 클릭시 이벤트
const changeTodoAll = () => {
  nowNav = todos;
  render(nowNav);
};

const changeTodoActive = () => {
  activeTodos = [...todos].filter(todo => !todo.completed);
  nowNav = activeTodos;
  render(nowNav);
};

const changeTodoCompleted = () => {
  completedTodos = [...todos].filter(todo => todo.completed);
  nowNav = completedTodos;
  render(nowNav);
};

$nav.addEventListener('click', e => {
  if (e.target.matches('.nav > #completed')) {
    changeTodoCompleted();
  }
});

$nav.addEventListener('click', e => {
  if (e.target.matches('.nav > #active')) {
    changeTodoActive();
  }
});

$nav.addEventListener('click', e => {
  if (e.target.matches('.nav > #all')) {
    changeTodoAll();
  }
});
```

아마 이 부분이 좀 더 리팩토링이 필요할 것 같다. 하나씩 관리해주는것이 아니라 하나로 관리가 가능할것 같다. 일단 제대로 동작하기는 하지만 좀 더 리팩토링이 필요할 것 같다.

## 진행해야 할 내용

체크된 상자의 개수 구현과 클릭시 탭에 css 추가를 추가적으로 구현해야 한다. 이외의 요소들은 수정과 리팩토링이 필요하다. 