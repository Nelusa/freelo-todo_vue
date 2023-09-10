<template>
  <div
    v-if="!isTablet"
    class="absolute w-1 h-[90%] rounded-r-lg md:hidden text-xs"
    :class="{
      'bg-green-600': todo.priority === 'low',
      'bg-yellow-500': todo.priority === 'medium',
      'bg-red-600': todo.priority === 'high',
    }"
  ></div>
  <div v-else class="text-xs hidden md:flex">
    <Icon :cursor="!isDetail ? 'hidden md:block' : ''">
      <ExclamationTriangleIcon
        :class="{
          'text-red-600': todo.priority === 'high',
          'text-yellow-600': todo.priority === 'medium',
          'text-green-600': todo.priority === 'low',
        }"
      />
    </Icon>
  </div>
</template>

<script>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import Icon from "./Icon.vue";

export default {
  props: ["todo", "isDetail", "isTablet"],
  components: {
    ExclamationTriangleIcon,
    Icon,
  },
  setup(props) {
    const priorityText =
      props.todo.priority.charAt(0).toUpperCase() +
      props.todo.priority.slice(1);

    return {
      priorityText,
    };
  },
};
</script>
