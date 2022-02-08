<template>
  <div>
    <books-form/>
    <books-table/>
  </div>
</template>
<script>
import BooksForm from '../../components/books/BooksForm.vue';
import BooksTable from "../../components/books/BooksTable.vue";

export default {
  components:{
    BooksForm,
    BooksTable
  }

}
</script>

