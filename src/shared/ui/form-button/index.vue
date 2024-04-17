<script lang="ts">
export default {
  name: 'form-button',
};
</script>

<template>
  <button class="form-button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  .form-button {
    padding: 8px 16px;
    border: #dad8d8 1px solid;
    border-radius: 4px;
    background-color: transparent;

    font-size: 14px;
    font-weight: bold;

    &:hover {
      border: #827d7d 1px solid;
    }

    &::placeholder {
      position: relative;
      color: #dad8d8;
      font-weight: normal;
    }
    &.disabled {
      cursor: default;
      color: #dad8d8;
    }
  }
</style>