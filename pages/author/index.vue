<template>
  <div>

        <authors-form/>

    <authors-table/>
  </div>
</template>
<script>
import AuthorsForm from '../../components/authors/AuthorsForm.vue';
import AuthorsTable from '../../components/authors/AuthorsTable.vue';
export default {
  components:{
    AuthorsForm,
    AuthorsTable
  }
}
</script>
