<template>
  <FormWrapper :onSubmit="handleSubmit" topMargin="mt-2">
    Edit
    <div class="flex flex-col gap-2">
      <label for="taskTitle" class="sr-only">Title</label>
      <input
        v-model="taskTitle"
        type="text"
        :key="editedTodo.id"
        name="taskTitle"
        id="taskTitle"
        class="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light"
        placeholder="Enter task name..."
        required
        @input="handleTitleChange"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="taskDescription" class="sr-only">Description</label>
      <input
        v-model="taskDescription"
        type="text"
        name="taskDescription"
        id="taskDescription"
        class="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light"
      />
    </div>
    <FormActions :onClick="onShowForm" />
  </FormWrapper>
</template>

<script>
import { ref } from "vue";
import FormWrapper from "./FormWrapper.vue";
import FormActions from "./FormActions.vue";

export default {
  props: ["onShowForm", "onEditTask", "editedTodo"],
  setup(props) {
    const taskTitle = ref(props.editedTodo?.title || "");
    const taskDescription = ref("");

    const handleSubmit = (e) => {
      e.preventDefault();

      const updatedTask = {
        ...props.editedTodo,
        title: taskTitle.value,
        description: taskDescription.value,
      };

      props.onEditTask(updatedTask);
      props.onShowForm();
    };

    console.log(props.editedTodo.status);

    const handleTitleChange = (e) => {
      taskTitle.value = e.target.value;
    };

    return {
      taskTitle,
      taskDescription,
      handleSubmit,
      handleTitleChange,
    };
  },
  components: {
    FormWrapper,
    FormActions,
  },
};
</script>
