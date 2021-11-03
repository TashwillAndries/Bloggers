import { projectFire } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getComments = (collection) => {
    const comments = ref(null)
    const er = ref(null)

    let collectionRef = projectFire.collection(collection)
    .orderBy('createdAt')

    const unSub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach((doc) => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })
        comments.value = results
        er.value = null
    }, (error) => {
        console.log(error.message)
        comments.value = null
        er.value = 'Could not fetch data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unSub())
    })


    return{ comments, er }
}

export default getComments