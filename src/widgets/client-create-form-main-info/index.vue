<script lang="ts">
import { defineComponent } from 'vue';
import TextField from '@/shared/ui/text-field/index.vue';
import FormLayout from '@/shared/components/form-layout/index.vue';
import FormField from '@/shared/components/form-field/index.vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from 'vuelidate/lib/validators';
import { helpers } from '@vuelidate/validators';
import FormButton from '@/shared/ui/form-button/index.vue';
import StyledSelect from '@/shared/ui/styled-select/index.vue';

const phonenumberValidator = helpers.regex(/^[7]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}$/);
const firstButtonIsBig = helpers.regex(/^[А-ЯЁ][а-яё-]+$/);

export default defineComponent({
  name: 'client-create-form-main-info',
  components: {
    StyledSelect,
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
        firstname: {
          value: '',
          focused: false,
        },
        lastname: {
          value: '',
          focused: false,
        },
        patronymic: {
          value: '',
          focused: false,
        },
        phonenumber: {
          value: '',
          focused: false,
        },
        sex: {
          value: '',
          focused: false,
        },
        clients: {
          value: [],
          focused: false,
        },
        doctor: {
          value: '',
          focused: false,
        },
      },
      blured: false,
    };
  },
  computed: {
    formValid():boolean {
      this.$emit('isFormValid', !this.v$.form.$invalid, 'main-info');
      return !this.v$.form.$invalid;
    },
  },
  watch: {
    form: {
      handler(newData) {
        this.$emit('data', newData, 'main-info');
      },
      deep: true,
    },
  },
  validations() {
    return {
      form: {
        firstname: {
          value: {
            required,
            minLength: minLength(2),
            firstButtonIsBig,
          },
        },
        lastname: {
          value: {
            required,
            minLength: minLength(2),
            firstButtonIsBig,
          },
        },
        patronymic: {
          value: {
            minLength: minLength(2),
            firstButtonIsBig,
          },
        },
        phonenumber: {
          value: {
            required,
            phonenumberValidator,
          },
        },
        sex: {
          value: {
          },
        },
        clients: {
          value: {
            required,
          },
        },
        doctor: {
          value: {
          },
        },
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('da');
    },
    onFormButtonClick() {
      this.blured = true;
      if (this.formValid && this.onNextPage) this.onNextPage();
    },
    onBackButtonClick() {
      if (this.onPrevPage) this.onPrevPage();
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
  <form-layout class="form" title="Создание клиента">
    <form class="form__content" :disabled="!formValid" @submit.prevent="onSubmit">
      <div class="form__content__fcs">
        <form-field label="Фамилия" class="field">
          <text-field
              label="firstname"
              v-model.trim="form.firstname.value"
              placeholder="Иванов"
              full-width
              :invalid="v$.form.firstname.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('firstname')(val)"
              required
          ></text-field>
        </form-field>
        <form-field label="Имя" class="field">
          <text-field
              label="lastname"
              v-model.trim="form.lastname.value"
              placeholder="Иван"
              full-width
              :invalid="v$.form.lastname.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('lastname')(val)"
              required
          ></text-field>
        </form-field>
        <form-field label="Отчество" class="field field__patronymic">
          <text-field
              label="patronymic"
              v-model.trim="form.patronymic.value"
              placeholder="Иванович"
              :invalid="v$.form.patronymic.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('patronymic')(val)"
              full-width
          ></text-field>
        </form-field>
      </div>
      <form-field
          label="Номер телефона"
          class="field"
          :invalid="v$.form.phonenumber.$invalid"
          :helper-text="
          form.phonenumber.focused &&
          v$.form.phonenumber.$invalid &&
          form.phonenumber.value &&
          blured ? 'Неверный формат номера' : ''
        "
      >
        <text-field
            label="phonenumber"
            v-model.trim="form.phonenumber.value"
            placeholder="79999999999"
            :invalid="v$.form.phonenumber.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('phonenumber')(val)"
            required
        ></text-field>
      </form-field>
      <form-field
          label="Пол"
          class="field"
      >
        <styled-select
            label="sex"
            v-model="form.sex.value"
            :invalid="v$.form.sex.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('sex')(val)"
            :value="form.sex.value"
        >
          <option disabled selected>Выберите пол</option>
          <option>Мужской</option>
          <option>Женский</option>
        </styled-select>
      </form-field>
      <form-field
          label="Группа клиентов"
          class="field"
      >
        <styled-select
            label="clients"
            multiple
            required
            v-model="form.clients.value"
            :value="form.clients.value"
            :invalid="v$.form.clients.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('clients')(val)"
        >
          <option>VIP</option>
          <option>Проблемные</option>
          <option>ОМС</option>
        </styled-select>
      </form-field>
      <form-field
          label="Лечащий врач"
          class="field"
      >
        <styled-select
            label="doctor"
            v-model="form.doctor.value"
            :value="form.doctor.value"
            :invalid="v$.form.doctor.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('doctor')(val)"
        >
          <option disabled selected>Выберите врача</option>
          <option>Иванов</option>
          <option>Захаров</option>
          <option>Чернышева</option>
        </styled-select>
      </form-field>
    </form>
    <template v-slot:actions>
      <form-button
          class="form__button"
          type="submit"
          :class="{disabled:!formValid}"
          @click="onFormButtonClick"
      >Далее</form-button>
    </template>
  </form-layout>
</template>

<style scoped lang="scss">
  .form__content__fcs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
  .field__patronymic {
    grid-area: 2 / 1 / 3 / 3;
  }
</style>