<template>
  <div>
    <EditForm
      v-if="showForm"
      :onShowForm="hideTodoForm"
      :editedTodo="editedTodo"
      @editTask="handleEditTodo(todo)"
    />
    <li class="flex justify-between items-center lg:justify-normal mt-5">
      <EllipsisVerticalIcon
        class="w-5 h-5 hidden lg:block lg:mr-3 text-zinc-400"
      />
      <div class="flex gap-2 lg:items-center">
        <Checkbox :id="'todo'" :todo="todo" :listId="listId" />
        <div class="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center">
          <h2
            :class="[
              'truncate hover:text-sky-800 text-base md:text-lg',
              todo.status === 'finished' ? 'line-through text-gray-500' : '',
            ]"
          >
            {{ todo.title }}
          </h2>
          <div class="flex gap-2 items-center text-xs">
            <Assignee :todo="todo" />
            <div class="flex flex-col leading-3 text-center">
              <DueDate :todo="todo" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col text-zinc-400 gap-1.5 lg:ml-5">
        <EllipsisVerticalIcon class="w-5 h-5 self-end lg:hidden" />
        <div class="flex gap-2">
          <Icon>
            <PlayIcon class="cursor-not-allowed" />
          </Icon>
          <Icon @click="handleEditTask(todo)">
            <PencilIcon />
          </Icon>
          <Icon>
            <TagIcon class="cursor-not-allowed" />
          </Icon>
          <div>
            <Priority :todo="todo" :isDetail="true" />
          </div>
        </div>
      </div>
    </li>
    <button
      class="mt-10 bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm"
      @click="navigateBack"
    >
      👈🏼 Back to all lists
    </button>
  </div>
</template>

<script>
import { PencilIcon, PlayIcon, TagIcon } from "@heroicons/vue/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import Icon from "../components/ui/Icon.vue";
import Checkbox from "../components/ui/Checkbox.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import EditForm from "../components/forms/EditForm.vue";
// import classNames from "../helpers/classNames";
import Priority from "../components/ui/Priority.vue";
import Assignee from "../components/ui/Assignee.vue";
import DueDate from "../components/ui/DueDate.vue";
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    Icon,
    Checkbox,
    EditForm,
    Priority,
    EllipsisVerticalIcon,
    PencilIcon,
    PlayIcon,
    TagIcon,
    Assignee,
    DueDate,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const taskId = route.params.taskId;

    const todo = computed(() => {
      const todoLists = JSON.parse(localStorage.getItem("todoLists")) || [];
      for (const list of todoLists) {
        const foundTodo = list.todos.find(
          (todo) => todo.id === parseInt(taskId)
        );
        if (foundTodo) {
          return foundTodo;
        }
      }
      return null;
    });

    const showForm = computed(() => !!store.state.editedTodo);
    const editedTodo = computed(() => store.state.editedTodo);
    const currentTodoList = computed(() => store.getters.selectCurrentTodoList);
    const listId = computed(() => currentTodoList.value.id);

    console.log(currentTodoList.value);
    console.log(listId.value);

    console.log(editedTodo.value);

    const handleShowForm = (show) => {
      if (!show) {
        store.commit("showFormToggle", {
          listId: listId,
          show: false,
        });
      }
    };

    const handleEditTask = (updatedTodo) => {
      console.log(updatedTodo);
      store.commit("setEditedTodo", updatedTodo);
      store.commit("showFormToggle", {
        listId: listId,
        show: true,
      });
      store.commit("editTodo", {
        listId: listId,
        todoId: updatedTodo.id,
        updatedTodo: updatedTodo,
      });
    };

    const navigateBack = () => {
      router.back();
    };

    const handleEditTodo = (todo) => {
      store.commit("setEditedTodo", todo);
      store.commit("showFormToggle", {
        listId: listId,
        show: true,
      });
    };

    const hideTodoForm = () => {
      store.commit("showFormToggle", {
        listId: listId,
        show: false,
      });
      store.commit("setEditedTodo", null);
    };

    return {
      taskId,
      showForm,
      editedTodo,
      handleShowForm,
      handleEditTask,
      navigateBack,
      handleEditTodo,
      hideTodoForm,
      todo,
      listId,
    };
  },
};
</script>
