<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'form-layout',
  props: {
    title: {
      type: [String, Number],
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
  <form class="form-layout">
    <div
        class="form-layout__title"
        v-if="hasSlot('title') || title"
    >
      <h4
          v-if="!hasSlot('title') && !!title"
          class="form-layout__title__text"
      >{{title}}</h4>
      <slot
          v-if="hasSlot('title') && !title"
          name="title"
      ></slot>
    </div>
    <div class="form-layout__content">
      <slot></slot>
    </div>
    <div
        class="form-layout__actions"
        v-if="hasSlot('actions')"
    >
      <slot
          name="actions"
      ></slot>
    </div>
  </form>
</template>

<style scoped lang="scss">
  .form-layout {
    padding: 16px;

    background-color: rgba(245, 245, 245, 1);
  }
  .form-layout__title {
    margin: 16px 16px 32px;
  }
  .form-layout__title__text {
    font-size: 20px;
    font-weight: 700;
  }
  .form-layout__content {

  }
  .form-layout__actions {
    margin-top: 16px;
  }
</style>