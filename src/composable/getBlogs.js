import { projectFire } from "../firebase/config";
import { ref } from "@vue/reactivity";

const getBlogs = () => {
    const blogs = ref([])
    const error = ref(null)

    const fetch = async () => {
        try {
            const res = await projectFire.collection('blogs').orderBy('createdAt', 'desc').get()

            blogs.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
            console.log(error.value);
        }
    }
    return { blogs, error, fetch }
}

export default getBlogs