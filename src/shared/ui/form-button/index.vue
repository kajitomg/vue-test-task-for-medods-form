<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'form-button',
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
});
</script>

<template>
  <button
      class="form-button"
      @click.prevent="$emit('click')"
      :type="type"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  .form-button {
    padding: 8px 16px;
    border: #dad8d8 1px solid;
    border-radius: 4px;
    background-color: transparent;

    color: #1786f6;

    font-size: 14px;
    font-weight: bold;

    &:hover {
      border: #827d7d 1px solid;
    }

    &.disabled {
      cursor: default;
      color: #dad8d8;
    }
  }
</style>