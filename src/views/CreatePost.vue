<template>
  <div class="welcome container">
    <form @submit.prevent="handleSubmit">
      <h4>Create Blog Post</h4>
      <div class="input-group input-group-lg">
        <input
          type="text"
          placeholder="Title"
          v-model="title"
          required
          class="form-control shadow-none"
        />
      </div>
      <div class="input-group input-group-lg">
        <textarea
          class="form-control shadow-none"
          placeholder="Content..."
          v-model="content"
          required
        ></textarea>
      </div>
      <div class="input-group input-group-lg">
        <input
          type="text"
          placeholder="Tags"
          v-model="tag"
          @keydown.enter.prevent="handleKeydown"
          required
          class="form-control shadow-none"
        />
      </div>
      <div v-for="tag in tags" :key="tag" class="pill">
              #{{ tag }}
      </div>
      <div class="input-group input-group-lg">
        <input
          @change="handleChange"
          type="file"
          class="form-control shadow-none"
        />
      </div>
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending" class="btn btn-success p-2 px-5">
        Create Post
      </button>
      <button v-if="isPending" disabled class="btn btn-success p-2 px-5">
        Saving...
      </button>
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
    const tag = ref("");
    const tags = ref([]);
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
    const handleKeydown = () => {
        if (!tags.value.includes(tag.value)) {
            tag.value = tag.value.replace(/\s/, '') // removes all whitespaces
            tags.value.push(tag.value)
        }

        tag.value = ''
    }
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

    return { title, content, handleSubmit, handleChange, fileError, isPending, tag, tags, handleKeydown };
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
