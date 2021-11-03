import { projectFire } from "../firebase/config";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection) => {
  const blogs = ref([]);
  const err = ref(null);

  let collectionRef = projectFire
    .collection(collection)
    .orderBy("createdAt", "desc");

  const unSub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.map((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      blogs.value = results;
      err.value = null;
    },
    (error) => {
      console.log(error.message);
      blogs.value = null;
      err.value = "Could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unSub());
  });

  return { blogs, err };
};

export default getCollection;
