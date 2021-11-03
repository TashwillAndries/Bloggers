import { ref } from "@vue/reactivity";
import { projectFire } from "../firebase/config";

const useComment = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      await projectFire.collection(collection).add(doc.id);
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useComment;
