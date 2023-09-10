<template>
  <div>
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? 'text-opacity-100' : 'text-opacity-50'"
        class="group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span @click="changeCurrentTodoList">
          <EllipsisVerticalIcon class="w-5 h-5" />
        </span>
      </PopoverButton>
      <transition :enter="transitionEnter" :leave="transitionLeave">
        <PopoverPanel
          class="absolute -left-5 top-4 z-10 mt-3 w-fit max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative grid gap-5 bg-white p-4 lg:grid-cols-2">
              <button
                v-for="item in actions"
                :key="item.name"
                class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 text-gray-800"
                @click="handleAction(item.name)"
              >
                <component :is="item.icon" class="w-3 h-3" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-700">
                    {{ item.name }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { ref } from "vue";
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useStore } from "vuex";

const actions = [
  { name: "Edit", icon: "PencilIcon" },
  { name: "Delete", icon: "TrashIcon" },
];

export default {
  props: ["listId", "onEditTask", "onDeleteTask"],
  components: {
    Popover,
    PopoverPanel,
    PopoverButton,
    EllipsisVerticalIcon,
    PencilIcon,
    TrashIcon,
  },
  setup(props) {
    const store = useStore();
    const isPopoverOpen = ref(false);

    const transitionEnter = "transition ease-out duration-200";
    const transitionLeave = "transition ease-in duration-150";

    const togglePopover = () => {
      isPopoverOpen.value = !isPopoverOpen.value;
    };

    const changeCurrentTodoList = () => {
      store.commit("changeCurrentTodoList", props.listId);
    };

    const handleAction = (actionName) => {
      if (actionName === "Edit" && props.onEditTask) {
        props.onEditTask();
      } else if (actionName === "Delete" && props.onDeleteTask) {
        props.onDeleteTask();
      }
      isPopoverOpen.value = false;
    };

    return {
      isPopoverOpen,
      transitionEnter,
      transitionLeave,
      togglePopover,
      changeCurrentTodoList,
      handleAction,
      actions,
    };
  },
};
</script>
