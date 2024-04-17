<script lang="ts">
import './style.scss';
import ClientCreate from '@/pages/client-create/index.vue';
import AppScheme from '@/shared/components/app-scheme/index.vue';

export default {
  name: 'app',
  components: { AppScheme, ClientCreate },
};
</script>

<template>
  <app-scheme>
    <client-create/>
  </app-scheme>
</template>

<style lang="scss">

</style>