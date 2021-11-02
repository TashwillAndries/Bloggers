import { ref } from "@vue/reactivity";
import { projectFire } from "../firebase/config";

const likePost = (id) => {
  const liked = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFire
        .collection("blogs")
        .doc(id)
        .get();
      if (!res.exists) {
        throw Error("that post does not exist");
      }
      liked.value = { ...res.data(), id: res.id };
      console.log(liked.value);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { liked, error, load };
};

export default likePost;
