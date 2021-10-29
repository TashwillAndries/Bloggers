<template>
  <div class="tag-filter">
      <h3>Tags</h3>
      <div v-for="tag in tags" :key="tag">
          <router-link :to="{ name: 'Tag', params: { tag: tag }}">
              #{{ tag }}
          </router-link>
      </div>
  </div>
</template>

<script>
import useTags from '../composable/useTags'
import getBlogs from '../composable/getBlogs'
export default {
    setup() {
        const { blogs , err} = getBlogs('blogs')
        console.log(blogs);
        const { tags } = useTags(blogs.value)

        return { tags }
    }
}
</script>