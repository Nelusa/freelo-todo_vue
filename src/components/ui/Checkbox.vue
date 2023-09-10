<template>
  <div :class="classNames(' items-center', className)">
    <label :class="classNames('relative flex items-center')">
      <input
        :id="id"
        name="type"
        type="checkbox"
        :disabled="disabled"
        :class="
          classNames(
            'relative rounded-[4px] h-5 w-5 focus:[&:not(:focus-visible)]:ring-1 focus:ring-sky-500 checked:ring-1 checked:ring-sky-500 checked:bg-sky-500 peer appearance-none  border checked:border-none transition-all focus:[&:not(:focus-visible)]:ring-offset-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-500 focus:border-sky-500',
            disabled
              ? 'border-gray-300 cursor-not-allowed'
              : 'border-gray-400 cursor-pointer'
          )
        "
        :checked="isChecked"
        @change="toggleTodoStatus"
      />
      <div
        class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-0 peer-focus:opacity-0 [&:not(checked)]:peer-checked:opacity-100"
      >
        <CheckIcon width="16" :stroke-width="3" />
      </div>
    </label>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import classNames from "../../helpers/classNames";
import { CheckIcon } from "@heroicons/vue/24/outline"; // Použijte odpovídající import pro vaši ikonovou knihovnu

export default {
  props: {
    id: String,
    disabled: Boolean,
    className: String,
    todo: Object,
    listId: Number,
  },
  components: {
    CheckIcon,
  },
  setup(props) {
    const store = useStore();

    const isChecked = computed(() => props.todo.status === "finished");

    const toggleTodoStatus = () => {
      if (props.todo.status === "finished") {
        store.commit("markTodoAsFinished", {
          listId: props.listId,
          todoId: props.todo.id,
          status: "in-progress",
        });
      } else {
        store.commit("markTodoAsFinished", {
          listId: props.listId,
          todoId: props.todo.id,
          status: "finished",
        });
      }
    };

    return {
      isChecked,
      toggleTodoStatus,
      classNames,
    };
  },
};
</script>
