<script lang="ts">
import { defineComponent } from 'vue';
import TextField from '@/shared/ui/text-field/index.vue';
import FormLayout from '@/shared/components/form-layout/index.vue';
import FormField from '@/shared/components/form-field/index.vue';
import FormButton from '@/shared/ui/form-button/index.vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from 'vuelidate/lib/validators';
import { maxLength, helpers, numeric } from '@vuelidate/validators';

const indexValidator = helpers.regex(/^[0-9]{6}$/);
const firstButtonIsBig = helpers.regex(/^[А-ЯЁ][а-яё ]+$/);

export default defineComponent({
  name: 'client-create-form-address',
  components: {
    FormButton,
    FormField,
    FormLayout,
    TextField,
  },
  setup: () => ({ v$: useVuelidate() }),
  props: {
    onNextPage: {
      type: Function,
    },
    onPrevPage: {
      type: Function,
    },
  },
  data() {
    return {
      form: {
        index: {
          value: '',
          focused: false,
          name: 'index',
          label: 'Индекс',
          placeholder: '103132',
          fullWidth: true,
        },
        country: {
          value: '',
          focused: false,
          name: 'country',
          label: 'Страна',
          placeholder: 'Россия',
          fullWidth: true,
        },
        state: {
          value: '',
          focused: false,
          name: 'state',
          label: 'Область',
          placeholder: 'Московская область',
          fullWidth: true,
        },
        city: {
          value: '',
          focused: false,
          name: 'city',
          label: 'Город',
          placeholder: 'Москва',
          fullWidth: true,
        },
        street: {
          value: '',
          focused: false,
          name: 'street',
          label: 'Улица',
          placeholder: 'Манежная улица',
          fullWidth: true,
        },
        houseNumber: {
          value: '',
          focused: false,
          name: 'houseNumber',
          label: 'Номер дома',
          placeholder: '2',
          fullWidth: true,
        },
      },
      blured: false,
    };
  },
  computed: {
    formValid():boolean {
      this.$emit('isFormValid', !this.v$.form.$invalid, 'address');
      return !this.v$.form.$invalid;
    },
  },
  watch: {
    form: {
      handler(newData) {
        this.$emit('data', newData, 'address');
      },
      deep: true,
    },
  },
  validations() {
    return {
      form: {
        index: {
          value: {
            maxLength: maxLength(6),
            minLength: minLength(6),
            indexValidator,
          },
        },
        country: {
          value: {
            firstButtonIsBig,
          },
        },
        state: {
          value: {
            firstButtonIsBig,
          },
        },
        city: {
          value: {
            required,
            firstButtonIsBig,
          },
        },
        street: {
          value: {
            firstButtonIsBig,
          },
        },
        houseNumber: {
          value: {
            numeric,
          },
        },
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('da');
    },
    onBackButtonClick() {
      if (this.onPrevPage) this.onPrevPage();
    },
    onFormButtonClick() {
      this.blured = true;
      if (this.formValid && this.onNextPage) this.onNextPage();
    },
    onFocused(element) {
      return (value) => {
        this.form[element].focused = value;
      };
    },
  },
});
</script>

<template>
  <form-layout class="form" title="Создание клиента" :disabled="!formValid">
      <form-field
          :label="item.label"
          class="field"
          :class="`field__${[item.name]}`"
          v-for="item in form"
          :key="item.name"
      >
        <text-field
            :label="item.name"
            v-model.trim="item.value"
            :placeholder="item.placeholder"
            :full-width="item.fullWidth"
            :invalid="v$.form[item.name].$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused(item.name)(val)"
        />
      </form-field>
    <template v-slot:actions>
      <form-button
          @click="onBackButtonClick"
      >Назад</form-button>
      <form-button
          @click="onFormButtonClick"
          type="submit"
          :class="{disabled:!formValid}"
      >Далее</form-button>
    </template>
  </form-layout>
</template>

<style scoped lang="scss">

</style>