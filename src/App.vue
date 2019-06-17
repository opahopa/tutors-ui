<template>
  <v-app>
    <router-view></router-view>
    <snack-bar/>
  </v-app>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";
  import SnackBar from '@/components/SnackBar.vue';

  @Component({
    components: {
      'snack-bar': SnackBar
    }
  })
  export default class Main extends Vue {

  }
</script>
