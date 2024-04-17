<script lang="ts">

import {
  required,
  numeric,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';
import { useVuelidate } from '@vuelidate/core';
import TextField from '@/shared/ui/text-field/index.vue';
import FormField from '@/shared/components/form-field/index.vue';
import { helpers } from '@vuelidate/validators';
import FormLayout from '@/shared/components/form-layout/index.vue';

const phonenumberValidator = helpers.regex(/^[7]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}$/);

export default {
  name: 'client-create',
  components: { FormLayout, FormField, TextField },
  setup: () => ({ v$: useVuelidate() }),
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
      },
      blured: false,
    };
  },
  computed: {
    formValid() {
      return (this as any).v$.form.$invalid;
    },
  },
  validations() {
    return {
      form: {
        firstname: {
          value: {
            required,
            minLength: minLength(2),
          },
        },
        lastname: {
          value: {
            required,
            minLength: minLength(2),
          },
        },
        patronymic: {
          value: {
            minLength: minLength(2),
          },
        },
        phonenumber: {
          value: {
            required,
            phonenumberValidator,
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
      (this as any).blured = true;
    },
    onFocused(element) {
      return (value) => {
        (this as any).form[element].focused = value;
      };
    },
  },
};
</script>

<template>
  <div class="layout">
    <form-layout class="form" title="Создание клиента">
      <form class="form__content" typeof="submit" :disabled="formValid" @submit.prevent="onSubmit">
        <form-field label="Фамилия" class="field">
          <text-field
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
              v-model.trim="form.lastname.value"
              placeholder="Иван"
              full-width
              :invalid="v$.form.lastname.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('lastname')(val)"
              required
          ></text-field>
        </form-field>
        <form-field label="Отчество" class="field">
          <text-field
              v-model.trim="form.patronymic.value"
              placeholder="Иванович"
              :invalid="v$.form.patronymic.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('patronymic')(val)"
              full-width
          ></text-field>
        </form-field>
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
              v-model.trim="form.phonenumber.value"
              placeholder="79999999999"
              full-width
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
          <styled-select label="doctor">
            <option>Выберите пол</option>
            <option>Мужской</option>
            <option>Женский</option>
          </styled-select>
        </form-field>
        <form-field
            label="Группа клиентов"
            class="field"
        >
          <styled-select label="clients" multiple>
            <option>VIP</option>
            <option>Проблемные</option>
            <option>ОМС</option>
          </styled-select>
        </form-field>
        <form-field
            label="Лечащий врач"
            class="field"
        >
          <styled-select label="doctor">
            <option>Выберите врача</option>
            <option>Иванов</option>
            <option>Захаров</option>
            <option>Чернышева</option>
          </styled-select>
        </form-field>
        <div>
          <label for="sms">
            <span>Не отправлять смс</span>
            <input id="sms" type="checkbox"/>
          </label>
        </div>
      </form>
      <template v-slot:actions>
        <form-button
            class="form__button"
            type="submit"
            :class="{disabled:formValid}"
            @click="onFormButtonClick"
        >Далее</form-button>
      </template>
    </form-layout>
  </div>
</template>

<style scoped lang="scss">
  .layout {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form {
    width: 550px;
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