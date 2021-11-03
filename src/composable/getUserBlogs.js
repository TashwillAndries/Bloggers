import { ref } from 'vue'
import { projectFire, projectAuth } from '../firebase/config'

const getUserBlogs = () => {
    const userBlogs = ref([])
    const error = ref(null)
    const user = ref(projectAuth.currentUser);
    const uid = user.value.uid
    const load = async () => {
        try {
            projectFire.collection('blogs')
                .onSnapshot((snap) => {
                    let docs = snap.docs.map(doc => {
                        return { ...doc.data(), id: doc.id }
                    })

                    userBlogs.value = docs.filter((blog => blog.userId === uid));
                })
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { userBlogs, error, user, load, user }
}

export default getUserBlogs