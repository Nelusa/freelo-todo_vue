<template>
  <FormWrapper :onSubmit="handleSubmit" topMargin="mt-3">
    <div class="flex flex-col gap-2">
      <label for="todoTitle" class="text-sm">To-Do list name</label>
      <input
        v-model="listTitle"
        type="text"
        name="todoTitle"
        id="todoTitle"
        class="border focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-sky-400 focus:border-transparent rounded-md p-2 placeholder:text-gray-400 placeholder:font-light"
        placeholder="Enter the To-do List name"
        required
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
  props: ["onShowForm", "onAddList"],
  setup(props) {
    const listTitle = ref("");

    const handleSubmit = (e) => {
      e.preventDefault();

      const newList = {
        id: Math.floor(Math.random() * 10000),
        listName: listTitle.value,
        todos: [],
      };

      props.onAddList(newList);
    };

    return {
      listTitle,
      handleSubmit,
    };
  },
  components: {
    FormWrapper,
    FormActions,
  },
};
</script>
