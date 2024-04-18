<script lang="ts">
import { defineComponent } from 'vue';
import FormButton from '@/shared/ui/form-button/index.vue';
import TextField from '@/shared/ui/text-field/index.vue';
import FormLayout from '@/shared/components/form-layout/index.vue';
import FormField from '@/shared/components/form-field/index.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from 'vuelidate/lib/validators';
import StyledSelect from '@/shared/ui/styled-select/index.vue';
import StyledCheckbox from '@/shared/ui/styled-checkbox/index.vue';
import { helpers } from '@vuelidate/validators';

const numberValidator = helpers.regex(/^[0-9]{6}$/);
const cyrillicValidator = helpers.regex(/^[А-ЯЁа-яё -]+$/);
const seriesValidator = helpers.regex(/^[IVXА-ЯЁа-яё0-9 -]+$/);

export default defineComponent({
  name: 'client-create-form-document',
  components: {
    StyledCheckbox,
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
    onSubmit: {
      type: Function,
    },
  },
  data() {
    return {
      form: {
        issue: {
          value: '',
          focused: false,
        },
        series: {
          value: '',
          focused: false,
        },
        number: {
          value: '',
          focused: false,
        },
        date: {
          value: '',
          focused: false,
        },
        authority: {
          value: '',
          focused: false,
        },
        sms: {
          value: false,
        },
      },
      blured: false,
    };
  },
  computed: {
    formValid():boolean {
      this.$emit('isFormValid', !this.v$.form.$invalid, 'document');
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
        issue: {
          value: {
            required,
          },
        },
        series: {
          value: {
            seriesValidator,
          },
        },
        number: {
          value: {
            numberValidator,
          },
        },
        date: {
          value: {
            required,
          },
        },
        authority: {
          value: {
            cyrillicValidator,
          },
        },
        sms: {
          value: {
          },
        },
      },
    };
  },
  methods: {
    onBackButtonClick() {
      if (this.onPrevPage) this.onPrevPage();
    },
    onFocused(element) {
      return (value) => {
        this.form[element].focused = value;
      };
    },
    onFormButtonClick() {
      this.blured = true;
      if (this.formValid && this.onSubmit) this.onSubmit();
    },
  },
});
</script>

<template>
  <form-layout
      class="form"
      title="Создание клиента"
      :disabled="!formValid"
  >
    <div class="form__content">
      <form-field
          label="Тип документа"
          class="field"
          :invalid="v$.form.issue.$invalid"
          :helper-text="
               form.issue.focused &&
               v$.form.issue.$invalid &&
               blured ? 'Обязательное поле' : ''
          "
      >
        <styled-select
            label="document-type"
            v-model="form.issue.value"
            :invalid="v$.form.issue.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('issue')(val)"
            :value="form.issue.value"
            required
        >
          <option disabled selected>Выберите документ</option>
          <option>Паспорт</option>
          <option>Свидетельство о рождении</option>
          <option>Вод. удостоверение</option>
        </styled-select>
      </form-field>
      <div class="document-id">
        <form-field
            label="Серия"
            class="field field__document-id"
            :invalid="v$.form.series.$invalid"
            :helper-text="
               form.series.focused &&
               v$.form.series.$invalid &&
               blured ? 'Серия должна соответствовать формату 0222 или II-МЮ' : ''
            "
        >
          <text-field
              label="series"
              v-model.trim="form.series.value"
              placeholder="0222 или II-МЮ"
              :invalid="v$.form.series.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('series')(val)"
              full-width
          />
        </form-field>
        <form-field
            label="Номер"
            class="field field__document-id"
            :invalid="v$.form.number.$invalid"
            :helper-text="
               form.number.focused &&
               v$.form.number.$invalid &&
               blured ? 'Номер должен состоять из 6 цифр' : ''
            "
        >
          <text-field
              label="number"
              type="number"
              v-model.trim="form.number.value"
              placeholder="357819"
              :invalid="v$.form.number.$invalid"
              :form-blured="blured"
              v-on:focused="(val) => onFocused('number')(val)"
              full-width
          />
        </form-field>
      </div>
      <form-field
          label="Кем выдан"
          class="field"
          :invalid="v$.form.authority.$invalid"
          :helper-text="
               form.authority.focused &&
               v$.form.authority.$invalid &&
               blured ? 'Поле должно состоять из кириллицы' : ''
          "
      >
        <text-field
            label="authority"
            v-model.trim="form.authority.value"
            placeholder="ОМВД России по району Гольяново г.Москвы"
            full-width
            :invalid="v$.form.authority.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('authority')(val)"
        />
      </form-field>

      <form-field
          label="Дата выдачи"
          class="field"
          :invalid="v$.form.date.$invalid"
          :helper-text="
               form.date.focused &&
               v$.form.date.$invalid &&
               blured ? 'Обязательное поле' : ''
          "
      >
        <text-field
            label="date"
            v-model.trim="form.date.value"
            placeholder="17.04.2024"
            :invalid="v$.form.date.$invalid"
            :form-blured="blured"
            v-on:focused="(val) => onFocused('date')(val)"
            type="date"
            required
        />
      </form-field>
      <div class="form__content__sms">
        <span>Не отправлять смс</span>
        <styled-checkbox
            label="sms"
            class="form__content__sms__checkbox"
            v-model="form.sms.value"
            :invalid="v$.form.sms.$invalid"
            :form-blured="blured"
        />
      </div>
    </div>
    <template v-slot:actions>
      <form-button
          class="form__button"
          @click="onBackButtonClick"
      >Назад</form-button>
      <form-button
          class="form__button"
          type="submit"
          :class="{disabled:!formValid}"
          @click="onFormButtonClick"
      >Создать</form-button>
    </template>
  </form-layout>
</template>

<style scoped lang="scss">
  .document-id {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
  }
  .field__document-id {
  }
  .form__content__sms {
    margin: 16px 0;
    display: flex;
    align-items: center;
  }
  .form__content__sms__checkbox {
    margin: 0 0 0 8px;
  }
</style>