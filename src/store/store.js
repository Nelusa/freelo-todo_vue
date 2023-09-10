import { createStore } from "vuex";

const saveStateToLocalStorage = (state) => {
  localStorage.setItem("todoLists", JSON.stringify(state.todoLists));
};

const store = createStore({
  state: {
    todoLists: [],
    editedTodo: null,
    filtered: "",
    newTodos: [],
    selectedTodoListId: null,
  },
  mutations: {
    showFormToggle(state, payload) {
      const { listId, show } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.showFormToggle = show;
        saveStateToLocalStorage(state);
      }
    },
    loadTodoLists(state) {
      const todoLists = localStorage.getItem("todoLists");
      if (todoLists) {
        state.todoLists = JSON.parse(todoLists);
      } else {
        state.todoLists = [];
      }
    },
    changeCurrentTodoList(_, selectedListId) {
      localStorage.setItem("currentTodoListId", selectedListId.toString());
    },
    filterTodosName(state, filtered) {
      state.filtered = filtered;
    },
    addTodoList(state, payload) {
      state.todoLists.unshift(payload);
      saveStateToLocalStorage(state);
    },
    editTodoList(state, payload) {
      const { listId, updatedList } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.listName = updatedList.listName;
        saveStateToLocalStorage(state);
      }
    },
    removeTodoList(state, listId) {
      const listIndex = state.todoLists.findIndex((list) => list.id === listId);
      if (listIndex !== -1) {
        state.todoLists.splice(listIndex, 1);
        saveStateToLocalStorage(state);
      }
    },
    createTodo(state, payload) {
      const { listId, todo } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.todos = [...list.todos, todo];
        saveStateToLocalStorage(state);
      }
    },
    setEditedTodo(state, editedTodo) {
      state.editedTodo = editedTodo;
    },
    editTodo(state, payload) {
      const { listId, todoId, updatedTodo } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo) {
          todo.title = updatedTodo.title;
          todo.description = updatedTodo.description;
          state.editedTodo = updatedTodo;
          saveStateToLocalStorage(state);
        }
      }
    },
    markTodoAsFinished(state, payload) {
      const { listId, todoId, status } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo) {
          todo.status = status;
          saveStateToLocalStorage(state);
        }
      }
    },
    deleteTodo(state, payload) {
      const { listId, todoId } = payload;
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const todoIndex = list.todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
          list.todos.splice(todoIndex, 1);
          saveStateToLocalStorage(state);
        }
      }
    },
  },
  getters: {
    selectCurrentTodoList: (state) => {
      const currentTodoListId = localStorage.getItem("currentTodoListId");
      return (
        state.todoLists.find(
          (list) => list.id === Number(currentTodoListId)
        ) || { id: Number(currentTodoListId), todos: [] }
      );
    },
  },
});

export default store;
