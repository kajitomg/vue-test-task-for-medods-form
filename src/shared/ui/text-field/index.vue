<script lang="ts">

interface InputEvent extends Event {
  target: HTMLInputElement;
}

export default {
  name: 'text-field',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    formBlured: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: [String, Number],
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    onUpdate(event: InputEvent) {
      (this as any).$emit('input', event.target.value);
    },

    onFocus() {
      (this as any).$emit('focused', true);
      (this as any).focused = true;
    },

    onBlur() {
      (this as any).$emit('focused', false);
      (this as any).focused = false;
    },
  },
};
</script>

<template>
  <input
      @input="onUpdate"
      @focus="onFocus"
      @blur="onBlur"
      :value="value"
      class="text-field"
      :placeholder="required ? placeholder + '*' : placeholder"
      :required="required"
      :class='{
        invalid,
        filled:!!value,
        formBlured,
        fullWidth,
        focused,
      }'
  />
</template>

<style scoped lang="scss">
  .text-field {
    position: relative;

    padding: 12px;
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

    &.fullWidth {
      width: 100%;
    }
  }
</style>