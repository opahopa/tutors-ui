import {Module} from 'vuex';
import {RootState} from '@/store/index';
import { SnackbarState } from '@/models/types';


const initState: SnackbarState = {
        type: '',
        message: '',
        color: '',
};

export const snackbar: Module<SnackbarState, RootState> = {
    namespaced: true,
    state: initState,
    actions: {
        snackSuccess(context: any, message: string) {
            context.commit('success', message);
        },

        snackError(context: any, message: string) {
            context.commit('error', message);
        },
        snackInfo(context: any, message: string) {
            context.commit('info', message);
        },
        clear(context: any): void {
            context.commit('clear');
        },
    },
    mutations: {
        success(state: any, message: string) {
            state.type = 'success';
            state.message = message;
            state.color = 'success';
        },
        error(state: any, message: string) {
            state.type = 'error';
            state.message = message;
            state.color = 'error';
        },
        info(state: any, message: string) {
            state.type = 'info';
            state.message = message;
            state.color = 'secondary';
        },
        clear(state: any) {
            state.type = null;
            state.message = null;
            state.color = null;
        },
    },
    getters: {
        getSnackBar: (state: any) => {
            return state;
        },
    },
};
