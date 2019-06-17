<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Tutors CRUD</v-toolbar-title>
      <v-divider
              class="mx-2"
              inset
              vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Create</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form"
                      lazy-validation
                      v-model="formValid">
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                            :rules="[rules.required, rules.strMin1, rules.strMax255]"
                            v-model="tmpTutor.name"
                            label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                            :rules="[rules.required, rules.strMin1, rules.strMax255]"
                            v-model="tmpTutor.subject"
                            label="Subject"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                            box
                            :rules="[rules.required, rules.strMin1]"
                            v-model="tmpTutor.description"
                            label="Description"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save" :disabled="!formValid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <div v-if="!isLoading && tutors.length > 0">
      <v-data-table
              :headers="headers"
              :items="tutors"
              class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.subject }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.score }}</td>
          <td class="text-xs-right">{{ props.item.registerDate }}</td>
          <td class="justify-center layout px-0 mr-2">
            <v-icon
                    small
                    class="mr-2"
                    @click="editTutor(props.item)"
            >
              edit
            </v-icon>
            <v-icon
                    small
                    @click="deleteTutor(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <div v-else-if="!isLoading && tutors.length === 0">
      No tutors found
    </div>
    <div v-else>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {TutorsService} from "@/services/tutors";
  import {Tutor} from "@/models/tutor";
  import {baseRules, Rules} from "@/models/validation";

  const tutorsService = new TutorsService();

  @Component
  export default class AppTable extends Vue {
    isLoading: boolean = false;
    tutors: Tutor[] = [];
    editedIndex = -1;
    dialog:boolean = false;
    rules: Rules = baseRules;
    formValid:boolean = true;


    tmpTutor: Tutor = {
      name: '',
      subject: '',
      description: '',
      score: 0
    };
    defaultTutor: Tutor = {
      name: '',
      subject: '',
      description: '',
      score: 0
    };

    headers:any[] = [
      { text: 'Name', align: 'left', value: 'name' },
      { text: 'Subject', value: 'subject' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Score', value: 'score' },
      { text: 'Register Date', value: 'registerDate' }
    ];

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tutors[this.editedIndex], this.tmpTutor);
        try {
          await tutorsService.edit(this.tmpTutor);
          this.$store.dispatch('snackbar/snackSuccess', 'Tutor edited');
        } catch (e) {
          this.$store.dispatch('snackbar/snackError', 'Failed to edit tutor');
        }
      } else {
        this.tutors.push(this.tmpTutor);
        try {
          await tutorsService.create(this.tmpTutor);
          this.$store.dispatch('snackbar/snackSuccess', 'Tutor created');
        } catch (e) {
          this.$store.dispatch('snackbar/snackError', 'Failed to create tutor');
        }
      }
      await this.loadData();
      this.close()
    }

    get formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }

    editTutor(tutor: Tutor) {
      this.editedIndex = this.tutors.indexOf(tutor);
      this.tmpTutor = tutor;
      this.dialog = true
    }

    //'delete' keyword is reserved
    async deleteTutor(tutor: Tutor) {
      const index = this.tutors.indexOf(tutor);
      const confirmed = confirm('Are you sure you want to delete this tutor?');
      if (confirmed) {
        this.tutors.splice(index, 1);
        try {
          await tutorsService.deleteById(tutor.id);
          this.$store.dispatch('snackbar/snackSuccess', 'Tutor deleted');
        } catch (e) {
          this.$store.dispatch('snackbar/snackError', 'Failed to delete tutor');
        }
      }
    }

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.tmpTutor = this.defaultTutor;
        this.editedIndex = -1
      }, 300)
    }

    async mounted() {
      await this.loadData();
    }


    async loadData() {
      try {
        this.isLoading = true;
        const result = await tutorsService.getAll();
        if (result.data) {
          this.tutors = result.data.map(
                  ({ id, name, subject, description, score, register_date: registerDate}) =>
                          ({ id, name, subject, description, score, registerDate }));
        } else {
          this.$store.dispatch('snackbar/snackError', 'Failed to load tutors: ' + result.status);
        }
      } catch (e) {
        this.$store.dispatch('snackbar/snackError', 'Failed to load tutors');
      } finally {
        this.isLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
