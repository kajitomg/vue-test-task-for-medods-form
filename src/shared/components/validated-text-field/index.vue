<script lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, required as requiredValidate } from 'vuelidate/lib/validators';
import TextField from '@/shared/ui/text-field/index.vue';

interface InputEvent extends Event {
  target: HTMLInputElement;
}

export default {
  name: 'validated-text-field',
  components: { TextField },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue;
    },
    currentValue(newValue) {
      (this as any).$emit('input', newValue);
    },
  },
};
</script>

<template>
  <text-field
      v-model="currentValue"
  />
</template>

<style scoped lang="scss">

</style>