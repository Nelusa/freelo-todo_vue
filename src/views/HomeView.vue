<script setup></script>

<template>
  <div>
    <div class="mb-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <h1 class="text-xl text-red-700 font-normal">All To-Do lists</h1>
          <button
            @click="showForm = !showForm"
            class="bg-green-500 p-1 rounded-md"
          >
            <PlusIcon class="text-white w-4 h-4" />
          </button>
        </div>
        <div class="relative">
          <button @click="showFilter = !showFilter">
            <MagnifyingGlassIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <input
        v-if="showFilter"
        type="text"
        placeholder="Search by todo name"
        class="border border-gray-300 rounded-md px-3 py-1 self-end w-full mt-3 placeholder:text-sm focus:outline-sky-500"
        v-model="filtered"
        @input="handleFilterChange"
      />
      <ListForm
        v-if="showForm"
        :onAddList="handleAddList"
        :onShowForm="handleShowForm"
      />
    </div>
    <div v-if="todoLists.length === 0 && !showForm">
      <EmptyState message="Start adding some lists! 📄" />
    </div>
    <div class="flex flex-col gap-10">
      <TodoList
        v-for="todoList in todoLists"
        :key="todoList.id"
        :listName="todoList.listName || ''"
        :listId="todoList.id"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import ListForm from "@/components/forms/ListForm.vue";
import TodoList from "@/components/TodoList.vue";
import EmptyState from "@/components/states/EmptyState.vue";

export default {
  components: {
    PlusIcon,
    MagnifyingGlassIcon,
    ListForm,
    TodoList,
    EmptyState,
  },
  setup() {
    const showForm = ref(false);
    const showFilter = ref(false);
    const filtered = ref("");

    const store = useStore();

    const todoLists = computed(() => store.state.todoLists);

    function handleAddList(newList) {
      store.commit("addTodoList", newList);
      showForm.value = false;

      localStorage.setItem("currentTodoListId", newList.id.toString());
    }

    function handleShowForm() {
      showForm.value = !showForm.value;
    }

    const handleFilterChange = (event) => {
      store.commit("filterTodosName", event.target.value);
    };

    onMounted(() => {
      store.commit("loadTodoLists");
    });

    return {
      showForm,
      showFilter,
      filtered,
      todoLists,
      handleAddList,
      handleShowForm,
      handleFilterChange,
    };
  },
};
</script>
