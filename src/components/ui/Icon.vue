<template>
  <div
    @click="handleClick"
    :style="{ ...iconStyle, strokeWidth: `${strokeWidth}px` }"
    :class="[cursor, className]"
  >
    <slot> </slot>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    strokeWidth: Number,
    className: String,
    onClick: Function,
    cursor: String,
  },
  setup(props) {
    const iconStyle = ref({
      width: "20px",
      height: "20px",
    });

    const handleClick = () => {
      if (props.onClick) {
        props.onClick();
      }
    };

    return {
      iconStyle,
      handleClick,
    };
  },
};
</script>
