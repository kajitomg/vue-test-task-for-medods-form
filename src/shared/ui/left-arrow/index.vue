<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'left-arrow',
});
</script>

<template>
  <span class="arrow">
    <span class="arrow__hook-top"/>
    <span/>
    <span class="arrow__hook-bottom"/>
  </span>
</template>

<style scoped lang="scss">
  .arrow {
    --width: 20px;
    --height: calc(var(--width) / 2);
    display: inline-block;
    position: relative;

    width: var(--width);
    height: var(--height);

    & span {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      border-radius: 1px;

      width: 100%;
      height: 2px;

      background-color: black;
    }

    & .arrow__hook-top {
      transform: rotate(-45deg) translateX(-20%) translateY(-20%);
      top: 0;
      width: 50%;
    }

    & .arrow__hook-bottom {
      transform: rotate(45deg) translateX(-20%) translateY(20%);
      top: auto;
      bottom: 0;
      width: 50%;
    }
  }
</style>