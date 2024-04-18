<script lang="ts">
import { defineComponent } from 'vue';

import { InputEvent } from '@/shared/ui/text-field/index.vue';

export default defineComponent({
  name: 'styled-checkbox',
  props: {
    label: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    formBlured: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onUpdate(event: InputEvent) {
      this.$emit('input', event.target.checked);
    },
  },
});
</script>

<template>
  <label class="styled-checkbox" :for="label">
    <input
        :id="label"
        @input="onUpdate"
        type="checkbox"
        :required="required"
        :class='{
          invalid,
          formBlured,
        }'
    />
    <span class="slider">
    </span>
  </label>
</template>

<style scoped lang="scss">
  .styled-checkbox {
    --height: 20px;

    display: inline-block;
    position: relative;
    width: calc(var(--height) * 2);
    height: var(--height);
    border-radius: calc(var(--height) / 2);
    border: 1px solid #827d7d;

    background-color: transparent;

    cursor: pointer;
    overflow: hidden;

    & input {
      opacity: 0;
      width: 100%;
      height: 0;

      &:checked + .slider {
        transform: translateX(125%);
        background-color: #1786f6;
      }
    };
    & .slider {
      --offset: calc(var(--height) / 5);
      --size: calc(var(--height) - var(--offset));

      position: absolute;
      top: 0;
      left: 0;
      margin: calc((var(--offset) / 2) - 1px);

      height: var(--size);
      width: var(--size);
      border-radius: 50%;

      background-color: #827d7d;

      transition: 0.2s;
    }

  }
</style>