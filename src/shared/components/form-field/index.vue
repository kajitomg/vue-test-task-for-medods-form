<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'form-field',
  props: {
    label: {
      type: String,
    },
    helperText: {
      type: String,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hasSlot(name:string) {
      return !!this.$slots[name];
    },
  },
});
</script>

<template>
  <div
      class="form-field"
  >
    <div
        v-if="!!label || hasSlot('label')"
        class="form-field__label"
    >
      <span v-if="!!label && !hasSlot('label')">{{label}}</span>
      <slot name="label"></slot>
    </div>
    <div
        v-if="hasSlot('default')"
        class="form-field__content"
    >
      <slot></slot>
    </div>
    <div
        v-if="!!helperText || hasSlot('helper-text')"
        class="form-field__helper-text"
        :class="{invalid:invalid}"
    >
      <span v-if="!!helperText && !hasSlot('helperText')">{{helperText}}</span>
      <slot v-if="!helperText" name="helper-text"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .form-field {
    flex-direction: column;
    margin: 8px 0;
  }
  .form-field__label {
    display: inline-block;
    margin-bottom: 12px;
    padding: 0 4px;

    font-size: 14px;
    font-weight: bold;

  }

  .form-field__content {
  }
  .form-field__helper-text {
    display: inline-block;
    margin-top: 8px;
    padding: 0 4px;

    color: #b0b0b0;

    font-size: 14px;

    &.invalid {
      color: red;
    }
  }
</style>