<template>
  <form
    @submit="onSubmit"
    :class="[
      'flex flex-col gap-4 bg-sky-100 rounded-md border border-sky-200 shadow-md p-2 md:p-4',
      topMargin,
    ]"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: ["onSubmit", "topMargin"],
};
</script>
