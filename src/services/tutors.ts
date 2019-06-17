import Api from './api';
import {Tutor} from '@/models/tutor';


const api = Api();
const endpoint = '/tutors/';

export class TutorsService {

    getAll() {
        return api.get(endpoint);
    }

    get(id: number) {
        return api.get(endpoint + id + '/');
    }

    create(tutor: Tutor) {
        return api.post(endpoint, tutor);
    }

    edit(tutor: Tutor) {
        return api.patch(endpoint + tutor.id + '/', tutor);
    }

    deleteById(id: number) {
        return api.delete(endpoint + id + '/');
    }
}
