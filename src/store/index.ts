import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import { snackbar } from '@/store/snackbar.module';
Vue.use(Vuex);

export interface RootState {
  version: string;
}

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    snackbar,
  },
};

export default new Vuex.Store<RootState>(store);
