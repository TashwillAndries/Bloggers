import { projectStorage } from "../firebase/config";
import { ref } from "@vue/reactivity";
import getUsers from "./getUsers";
const { user } = getUsers();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `banner-images/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
