<template>
    <v-snackbar
            v-model="isPresent"
            :bottom="true"
            :timeout="timeout"
            :color="snackbar.color"
    >
        <span class="subheading">{{ snackbar.message }}</span>
        <v-btn
                icon
                fab
                @click="isPresent = false"
        >
            <v-icon>clear</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {mapActions} from 'vuex';
    import {SnackbarState} from '@/models/types';

    @Component<SnackBar>({
        watch: {
            snackbar: {
                handler (val) {
                    if (val.message) {
                        this.isPresent = true;
                    }
                },
                deep: true
            },
            isPresent: {
                handler (val) {
                   if (!val) this.clear();
                }
            }
        },
        methods: {
            ...mapActions('snackbar', [
                'clear'
            ])
        }
    })
    export default class SnackBar extends Vue {
        clear: any;

        isPresent: boolean = false;
        timeout: number = 5000;

        get snackbar(): SnackbarState {
            return this.$store.getters["snackbar/getSnackBar"];
        }
    }
</script>

<style scoped>

</style>
