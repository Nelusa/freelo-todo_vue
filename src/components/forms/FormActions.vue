<template>
  <div class="flex gap-2">
    <button
      class="bg-green-500 border border-green-600 text-white px-6 py-1.5 rounded-md text-sm font-semibold"
      type="submit"
    >
      Save
    </button>
    <button
      @click="onClick"
      class="bg-white border border-gray-300 px-3 py-1.5 rounded-md text-sm"
      type="button"
    >
      Cancel
    </button>
  </div>
</template>

<script>
export default {
  props: ["onClick"],
};
</script>
