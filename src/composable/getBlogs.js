import { projectFire } from "../firebase/config";
import { ref } from "@vue/reactivity";

const getBlogs = () => {
  const blogs = ref([]);
  const err = ref(null);

  const fetch = async () => {
    try {
      const res = await projectFire
        .collection("blogs")
        .orderBy("createdAt", "desc")
        .get();

      blogs.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (error) {
      err.value = error.message;
      console.log(err.value);
    }
  };
  return { blogs, err, fetch };
};

export default getBlogs;
