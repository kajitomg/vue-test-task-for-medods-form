<script lang="ts">
import { defineComponent } from 'vue';
import LeftArrow from '@/shared/ui/left-arrow/index.vue';

export default defineComponent({
  name: 'client-create-success',
  components: { LeftArrow },
  props: {
    onClean: {
      type: Function,
    },
  },
  methods: {
    onBack() {
      if (this.onClean) this.onClean();
    },
  },
});
</script>

<template>
  <div class="client-create-success">
    <h4>Клиент успрешно создан</h4>
    <button @click="onBack">
      <left-arrow/>
    </button>
  </div>
</template>

<style scoped lang="scss">
  .client-create-success {
    padding: 16px;
    background-color: whitesmoke;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h4 {
      font-weight: 700;
    }

    & button {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: transparent;

      transition: 0.2s ease;

      &:hover {
        background-color: rgba(176, 176, 176, 0.29);
      }
    }
  }
</style>