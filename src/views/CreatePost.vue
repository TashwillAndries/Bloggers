<template>
  <div class="welcome container">
    <form @submit.prevent="handleSubmit">
      <h4>Create Blog Post</h4>
      <input type="text" placeholder="Title" v-model="title" required />
      <textarea placeholder="Content..." v-model="content" required></textarea>
      <label>Upload Banner Image</label>
      <input @change="handleChange" type="file" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create Post</button>
      <button v-if="isPending" disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "../composable/useStorage";
import useBlogs from "../composable/useBlogs";
import { timestamp } from "../firebase/config";
import getUsers from "../composable/getUsers";
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useBlogs("blogs");
    const { user } = getUsers();

    const title = ref("");
    const content = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        await addDoc({
          title: title.value,
          content: content.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          console.log("post added");
        }
      }
    };
    // Allowed file types
    const types = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file(png or jpg)";
      }
    };

    return { title, content, handleSubmit, handleChange, fileError, isPending };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
  width: 260px;
}
span {
  margin-right: 15px;
  padding: 8px 20px;
  border-radius: 15px;
}
</style>
