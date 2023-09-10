<template>
  <li
    @click="onClick"
    :class="[
      'relative flex justify-between md:justify-normal md:gap-5 items-center py-1.5 border-b border-gray-200 rounded',
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Priority :todo="todo" />
    <div class="flex gap-2 items-center">
      <Priority :todo="todo" :isTablet="true" />
      <Checkbox :id="'todo'" :todo="todo" :listId="listId" class="ml-3" />
      <router-link :to="'/task/' + todo.id">
        <h2
          :class="[
            'truncate hover:text-sky-800 text-sm',
            todo.status === 'finished' ? 'line-through text-gray-500' : '',
          ]"
        >
          {{ todo.title }}
        </h2>
      </router-link>
    </div>
    <div class="flex gap-2 items-center text-xs">
      <Assignee :todo="todo" />
      <DueDate :todo="todo" />
      <ActionsModal
        class="md:hidden"
        :onEditTask="onEditTask"
        :onDeleteTask="handleDeleteTask"
        :listId="listId"
      />
    </div>
    <div class="text-zinc-400 gap-1.5 hidden lg:flex lg:flex-col lg:ml-2">
      <div class="flex gap-2">
        <Icon>
          <PlayIcon class="cursor-not-allowed" />
        </Icon>
        <Icon @click="handleEditTodo(todo)">
          <PencilIcon />
        </Icon>
        <Icon>
          <TagIcon class="cursor-not-allowed" />
        </Icon>
        <Icon @click="handleDeleteTask">
          <TrashIcon />
        </Icon>
      </div>
    </div>
  </li>
</template>

<script>
import {
  PencilIcon,
  PlayIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import Icon from "./ui/Icon.vue";
import Checkbox from "./ui/Checkbox.vue";
import { ref } from "vue";
import DueDate from "./ui/DueDate.vue";
import Assignee from "./ui/Assignee.vue";
import ActionsModal from "./ActionsModal.vue";
import { useStore } from "vuex";
import Priority from "./ui/Priority.vue";

export default {
  props: ["todo", "listId", "onEditTask"],
  components: {
    Icon,
    Checkbox,
    DueDate,
    Assignee,
    ActionsModal,
    Priority,
    PencilIcon,
    PlayIcon,
    TagIcon,
    TrashIcon,
  },
  setup(props) {
    const store = useStore();

    const isHovered = ref(false);

    const handleDeleteTask = () => {
      store.commit("deleteTodo", {
        todoId: props.todo.id,
        listId: Number(props.listId),
      });
    };

    const handleEditTodo = (todo) => {
      store.commit("setEditedTodo", todo);
      store.commit("showFormToggle", {
        listId: props.listId,
        show: true,
      });
    };

    /*    const handleEditTodo = () => {
      store.commit("editTodo", props.todo);
      store.commit("toggleTodoForm", {
        listId: Number(props.listId),
        todoId: props.todo.id,
        show: true,
      });
    }; */

    return {
      isHovered,
      handleDeleteTask,
      handleEditTodo,
    };
  },
};
</script>
