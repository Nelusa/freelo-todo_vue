<template>
  <Listbox as="div" v-model="selected" class="w-full">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      Priority
    </ListboxLabel>
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{ selected }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
        name="fade"
        as="ul"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ListboxOptions>
          <ListboxOption
            v-for="option in options"
            :key="option"
            :value="option"
            class="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-sky-600 hover:text-white cursor-pointer"
          >
            <span
              :class="[
                selected === option ? 'font-semibold' : 'font-normal',
                'block truncate',
              ]"
            >
              {{ option.charAt(0).toUpperCase() + option.slice(1) }}
            </span>

            <span
              v-if="selected === option"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/outline";

export default {
  setup() {
    const options = ["High", "Medium", "Low"];
    const selected = ref("Low");

    return {
      selected,
      options,
    };
  },
  components: {
    CheckIcon,
    ChevronUpDownIcon,
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
};
</script>
