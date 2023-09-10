<template>
  <div>
    <div
      class="flex items-center mb-2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <h1
        v-if="editedTodoList === null || !editedTodoList.listName"
        class="text-sky-600 font-medium text-base"
      >
        {{ editedTodoList ? editedTodoList.listName : listName }}
      </h1>
      <input
        v-else
        type="text"
        :value="editedTodoList !== null ? editedTodoList.listName : ''"
        @input="updateEditedListName"
        @keydown.enter="handleEditList"
        class="border-b-2 border-t-transparent border-r-transparent border-l-transparent border-sky-600 focus:outline-none p-0.5 focus:ring-0 focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent focus:border-b-2 focus:border-sky-600 font-medium"
      />
      <div
        v-if="editedTodoList === null && isHovered"
        class="flex items-center gap-1"
      >
        <PencilIcon
          class="w-3.5 h-3.5 text-gray-500 ml-2 cursor-pointer"
          @click="startEditingList"
        />
        <TrashIcon
          @click="deleteTodoList"
          class="w-3.5 h-3.5 text-gray-500 hover:cursor-pointer"
        />
      </div>
    </div>
    <EmptyState
      v-if="newTodos.length === 0"
      message="Start adding some todos! ✏️"
    />
    <ul class="flex flex-col mb-5">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :listId="listId"
        @click="handleTodoListClick"
        @editTask="handleEditTask(todo)"
      />
    </ul>
    <button
      v-if="!showForm"
      @click="showAddTaskForm"
      class="flex items-center gap-2 text-sm mt-3 border border-gray-300 rounded-md px-3 py-1"
    >
      <PlusIcon class="w-4 h-4 text-gray-500" :strokeWidth="5" />
      <span>Add task</span>
    </button>
    <div v-if="showForm">
      <TodoForm
        v-if="!editedTodo"
        @showForm="hideTodoForm"
        @addTask="handleAddTask"
      />
      <EditForm
        v-if="editedTodo"
        @showForm="hideTodoForm"
        @editTask="handleEditTask"
        :editedTodo="editedTodo"
      />
    </div>
  </div>
</template>

<script>
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import TodoItem from "./TodoItem.vue";
import { computed, ref } from "vue";
import TodoForm from "./forms/TodoForm.vue";
import EditForm from "./forms/EditForm.vue";
import EmptyState from "./states/EmptyState.vue";
import { useStore } from "vuex";

export default {
  props: ["listName", "listId"],
  setup(props) {
    const store = useStore();
    const isHovered = ref(false);
    const editedTodoList = ref(null);

    const newTodos = computed(() => {
      const todoList = store.state.todoLists.find(
        (list) => list.id === props.listId
      );
      return todoList?.todos || [];
    });

    const editedTodo = computed(() => store.state.editedTodo);

    console.log(editedTodo.value);

    const showForm = computed(
      () =>
        store.state.todoLists.find((list) => list.id === props.listId)
          ?.showFormToggle || false
    );

    const startEditingList = () => {
      editedTodoList.value = {
        ...store.state.todoLists.find((list) => list.id === props.listId),
      };
    };

    const updateEditedListName = (e) => {
      editedTodoList.value.listName = e.target.value;
    };

    const handleEditList = () => {
      store.commit("editTodoList", {
        listId: props.listId,
        updatedList: {
          ...editedTodoList.value,
          listName: editedTodoList.value.listName.trim(),
          id: props.listId,
          todos: newTodos.value,
        },
      });
      editedTodoList.value = null;
    };

    const deleteTodoList = () => {
      store.commit("removeTodoList", props.listId);
    };

    const handleAddTask = (newTodo) => {
      store.commit("createTodo", {
        listId: props.listId,
        todo: newTodo,
      });
      store.commit("showFormToggle", {
        listId: props.listId,
        show: false,
      });
    };

    const handleEditTask = (updatedTodo) => {
      store.commit("setEditedTodo", updatedTodo);
      store.commit("showFormToggle", {
        listId: props.listId,
        show: true,
      });

      store.commit("editTodo", {
        listId: props.listId,
        todoId: updatedTodo.id,
        updatedTodo,
      });
    };

    const handleTodoListClick = () => {
      store.commit("changeCurrentTodoList", props.listId);
    };

    const showAddTaskForm = () => {
      store.commit("showFormToggle", {
        listId: props.listId,
        show: true,
      });
      store.commit("setEditedTodo", null);
    };

    const hideTodoForm = () => {
      store.commit("showFormToggle", {
        listId: props.listId,
        show: false,
      });
      store.commit("setEditedTodo", null);
    };

    const filteredTodos = computed(() => {
      const filtered = store.state.filtered.toLowerCase();
      return newTodos.value.filter((todo) =>
        todo.title.toLowerCase().includes(filtered)
      );
    });

    return {
      isHovered,
      editedTodoList,
      newTodos,
      editedTodo,
      showForm,
      startEditingList,
      updateEditedListName,
      handleEditList,
      deleteTodoList,
      handleAddTask,
      handleEditTask,
      handleTodoListClick,
      showAddTaskForm,
      hideTodoForm,
      filteredTodos,
    };
  },
  components: {
    TodoItem,
    TodoForm,
    EditForm,
    EmptyState,
    PencilIcon,
    PlusIcon,
    TrashIcon,
  },
};
</script>
