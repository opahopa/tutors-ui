<template>
  <v-flex align-self-center align-center>
    <AppTable/>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppTable from '../components/AppTable.vue'; // @ is an alias to /src

@Component({
  components: {
    AppTable,
  },
})
export default class Home extends Vue {}
</script>
