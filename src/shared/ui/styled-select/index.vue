<script lang="ts">
export default {
  name: 'styled-select',
  props: {
    label: {
      type: String,
    },
    multiple: {
      type: Boolean,
    },
  },
};
</script>

<template>
  <label :for="label">
    <select :id="label" :multiple="multiple" class="selector">
      <slot></slot>
    </select>
  </label>
</template>

<style scoped lang="scss">
  .selector {
    position: relative;

    background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
    background-position: calc(100% - 0.75rem) center;

    &[multiple] {
      background:transparent;
    }
    -moz-appearance:none;
    -webkit-appearance: none;
    appearance: none;

    padding: 12px calc(12px + 2rem) 12px 12px;
    border: #dad8d8 1px solid;
    border-radius: 4px;
    background-color: transparent;

    font-size: 14px;
    font-weight: bold;

    transition: 0.1s ease;

    &:hover {
      border: #827d7d 1px solid;
    }

    &::placeholder {
      position: relative;
      color: #dad8d8;
      font-weight: normal;
    }
    &.filled {
      border: #827d7d 1px solid;
      &.focused {
        border: #05ce05 1px solid;
      }
      &.invalid {
        border: #e82c3f 1px solid;
      }
    }
    &.formBlured {
      &.invalid {
        border: #e82c3f 1px solid;
      }
    }
    & option{
      font-size: 14px;
      font-weight: bold;
    }

  }
</style>