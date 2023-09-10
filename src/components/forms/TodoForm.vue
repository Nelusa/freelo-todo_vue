<template>
  <FormWrapper :onSubmit="handleSubmit">
    <div class="flex flex-col gap-2">
      <label for="taskTitle" class="sr-only">Title</label>
      <input
        v-model="taskTitle"
        type="text"
        name="taskTitle"
        id="taskTitle"
        class="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light"
        placeholder="Enter task name..."
        required
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
        placeholder="Enter task description..."
      />
    </div>
    <div class="flex flex-col gap-2">
      <SelectInput v-model="taskPriority" :selected="taskPriority" />
    </div>

    <FormActions :onClick="onShowForm" />
  </FormWrapper>
</template>

<script>
import { ref } from "vue";
import FormWrapper from "./FormWrapper.vue";
import FormActions from "./FormActions.vue";
import SelectInput from "../ui/SelectInput.vue";
import { format } from "date-fns";

export default {
  props: ["onShowForm", "onAddTask"],
  setup(props) {
    const taskTitle = ref("");
    const taskDescription = ref("");
    const taskPriority = ref("Low");

    const date = new Date();
    const showTime =
      date.getHours() +
      ":" +
      (date.getMinutes() <= 9 ? "0" : "") +
      date.getMinutes() +
      ":" +
      (date.getSeconds() <= 9 ? "0" : "") +
      date.getSeconds();

    const dateNow = format(new Date(), "yyyy-MM-dd");

    const handleSubmit = (e) => {
      e.preventDefault();

      const newTask = {
        id: Math.floor(Math.random() * 10000),
        title: taskTitle.value,
        description: taskDescription.value,
        assignee: "Nela Letochová",
        date: dateNow,
        time: showTime,
        status: "in-progress",
        priority: taskPriority.value.toLowerCase(),
      };

      props.onAddTask(newTask);
      props.onShowForm();
    };

    return {
      taskTitle,
      taskDescription,
      taskPriority,
      handleSubmit,
    };
  },
  components: {
    FormWrapper,
    FormActions,
    SelectInput,
  },
};
</script>
