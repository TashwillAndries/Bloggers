import { ref } from "@vue/reactivity";
import { projectFire } from "../firebase/config";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection) => {
  const blogs = ref(null);
  const error = ref(null);

  let collectionRef = projectFire
    .collection(collection)
    .orderBy("createdAt", "desc");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      blogs.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      blogs.value = null;
      error.value = "could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
