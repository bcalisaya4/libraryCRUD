<template>
  <v-data-table
    :headers="headers"
    :items="books"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD de Libros</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Book
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Titulo del Libro"
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Decripcion del Libro"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Precio del Libro"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Stock del Libro"
                    ></v-text-field>
                  </v-col>
                  <!--v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.authorId"
                      label="Author del Libro"
                    ></v-text-field>
                  </v-col-->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>






<script>
import {mapState,mapActions} from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Titulo',
          align: 'start',
          value: 'title' },
        { text: 'Descripcion', value: 'description' },
        { text: 'Precio', value: 'price' },
        { text: 'Stock', value: 'quantity' },
        //{ text: 'Author', value: 'authorId' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        //id: '',
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        //authorId: 2,
      },
      defaultItem: {
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        //authorId: 0,
      },
    }),

    async fetch() {
        try {
        await this.getBooks();
        } catch (error) {
            this.$message.error(error.message);
        }
        },
    computed: {
      ...mapState('books', ['books','book']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },


    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
        ...mapActions('books', ['getBooks', 'getBook']),

      initialize () {
       this.desserts = this.books
      },




      editItem (item) {
        this.editedIndex = item.id
        //console.log(this.editedIndex)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await this.$axios.delete(`book/${this.editedIndex}/`);
        await this.getBooks();
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          await this.getBooks(this.editedIndex);
          const { id, ...data } = this.editedItem;
          console.log(data)
          await this.$axios.patch(`book/${id}`, data);
          await this.getBooks();
        } else {
          await this.$axios.post('book', this.editedItem);
          await this.getBooks();
        }
        this.close()
      },
    },
  }
</script>
