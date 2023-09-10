<template>
  <div
    class="flex justify-center items-center rounded-full bg-zinc-400 border-2 cursor-default border-sky-600 text-white font-bold p-1"
  >
    {{ initials }}
  </div>
</template>

<script>
export default {
  props: ["todo"],
  setup(props) {
    const initials = props.todo.assignee
      .split(" ")
      .map((word) => word[0])
      .join("");

    return {
      initials,
    };
  },
};
</script>
