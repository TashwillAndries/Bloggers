import { ref } from 'vue'

const useTags = async (blogs) => {

    const tags = ref([])
    const tagSet = new Set()

    await blogs.forEach(item => {
        item.tags.forEach(tag => tagSet.add(tag))
    })

    tags.value = [...tagSet]

    return { tags }
}

export default useTags