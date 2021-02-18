<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div class="row" v-else>
        <CategoryCreate
          @categoryCreated="addNewCategory"
        />

        <CategoryEdit
          :categories="categories"
          @categoryUpdated="updateCategory"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex((cat) => cat.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
    },
  },
};
</script>
