<template>
  <p class="text-sm text-gray-500 italic mt-2 text-center">{{ message }}</p>
</template>

<script>
export default {
  name: "EmptyState",
  props: ["message"],
};
</script>
