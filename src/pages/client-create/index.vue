<script lang="ts">

import ClientCreateFormMainInfo from '@/widgets/client-create-form-main-info/index.vue';
import ClientCreateFormAddress from '@/widgets/client-create-form-address/index.vue';
import ClientCreateFormDocument from '@/widgets/client-create-form-document/index.vue';
import { defineComponent } from 'vue';
import ClientCreateSuccess from '@/widgets/client-create-success/index.vue';
import SpinnerLoader from '@/shared/ui/spinner-loader/index.vue';

export default defineComponent({
  name: 'client-create',
  components: {
    SpinnerLoader,
    ClientCreateSuccess,
    ClientCreateFormDocument,
    ClientCreateFormAddress,
    ClientCreateFormMainInfo,
  },
  data() {
    return {
      page: 1,
      maxPage: 3,
      formData: {},
      formValidData: {} as Record<string, boolean>,
      success: false,
      clean: false,
      loader: false,
    };
  },
  watch: {
    clean() {
      if (this.clean) {
        this.loader = true;
        setTimeout(() => {
          this.clean = false;
          this.loader = false;
        }, 200);
      }
    },
  },
  methods: {
    onSubmit() {
      if (this.formValid()) {
        this.page = 0;
        this.loader = true;
        setTimeout(() => {
          this.success = true;
          this.loader = false;
        }, 200);
      }
    },
    formValid():boolean {
      return Object.values(this.formValidData).every((item) => item);
    },
    onVal(newVal, name) {
      this.formValidData[name] = newVal;
    },
    onData(newVal) {
      this.formData = { ...this.formData, ...newVal };
    },
    onNextPage() {
      if (this.page === this.maxPage) return;
      this.page += 1;
    },
    onPrevPage() {
      if (this.page === 1) return;
      this.page -= 1;
    },
    onCleanForm() {
      this.page = 1;
      this.success = false;
      this.clean = true;
    },
  },
});
</script>

<template>
  <div class="layout">
    <client-create-form-main-info
        class="form__client-create"
        v-if="!clean"
        v-show="page === 1 && !success"
        v-on:isFormValid="onVal"
        v-on:data="onData"
        :on-next-page="onNextPage"
        :on-prev-page="onPrevPage"
    />
    <client-create-form-address
        class="form__client-create"
        v-if="!clean"
        v-show="page === 2 && !success"
        v-on:isFormValid="onVal"
        v-on:data="onData"
        :on-next-page="onNextPage"
        :on-prev-page="onPrevPage"
    />
    <client-create-form-document
        class="form__client-create"
        v-if="!clean"
        v-show="page === 3 && !success"
        v-on:isFormValid="onVal"
        v-on:data="onData"
        :on-submit="onSubmit"
        :on-prev-page="onPrevPage"
    />
    <client-create-success
        class="success__client-create"
        v-if="!clean"
        v-show="success"
        :on-clean="onCleanForm"
    />
    <spinner-loader v-if="loader"/>
  </div>
</template>

<style scoped lang="scss">
  .layout {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form__client-create {
    flex: 0 1 550px;
    border-radius: 16px;
  }
  .success__client-create {
    flex: 0 1 550px;
    border-radius: 16px;
  }
  .form__content {
    display: flex;
    flex-direction: column;
  }
  .field {
    flex: 1 0 auto;
    padding: 8px;
  }
</style>