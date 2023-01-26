/**
 * @jest-environment jsdom
 */

import display from './to-do.js'

describe('Add new task', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="todo-body"></div>
    <div class="todo-edit flex">
              <input
                type="text"
                class="no-outline type-task"
                placeholder="Add to your list..."
                value="visit the gym" 
              />
              <i class="enter-btn fa-solid fa-right-from-bracket"></i>
            </div>`;
  });

  test('Adding todo object to the local storage', () => {
    display.addTodo();
    const result = JSON.parse(localStorage.getItem('todo'));
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('visit the gym');
  });

  test('Adding task to the DOM', () => {
    const addTodoOnSpy = jest.spyOn(display, 'addTodo');
    display.addTodo();
    expect(addTodoOnSpy).toHaveBeenCalledTimes(1);
    const result = document.querySelector('.to-do-check');
    expect(result).toBeDefined();
  });
});

describe('Delete task item', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="todo-body"></div>
    <div class="todo-edit flex">
              <input
                type="text"
                class="no-outline type-task"
                placeholder="Add to your list..."
                value="visit the gym" 
              />
              <i class="enter-btn fa-solid fa-right-from-bracket"></i>
            </div>`;

    const obj1 = {
      text: 'visit the gym with Kevin',
      completed: false,
      index: 1,
    };

    const obj2 = {
      text: 'visit the gym with Diana',
      completed: false,
      index: 2,
    };

    window.localStorage.setItem('todo', JSON.stringify([obj1, obj2]));
  });

  test('Remove task from local storage', () => {
    const removeTodoOnSpy = jest.spyOn(display, 'removeTodo');
    display.removeTodo(1);
    expect(removeTodoOnSpy).toHaveBeenCalledTimes(1);
    const result = JSON.parse(localStorage.getItem('todo'));
    expect(result).toHaveLength(1);
  });

  test('Remove three tasks from local storage', () => {
    const removeTodoOnSpy = jest.spyOn(display, 'removeTodo');
    display.removeTodo(1);
    display.removeTodo(0);
    expect(removeTodoOnSpy).toHaveBeenCalledTimes(3);
    const result = JSON.parse(localStorage.getItem('todo'));
    expect(result).toHaveLength(0);
  });

  test('Remove tasks from the DOM', () => {
    display.removeTodo(1);
    display.removeTodo(0);
    const result = document.querySelector('.to-do-check');
    expect(result).toBeNull();
  });
});
