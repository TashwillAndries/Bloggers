<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modalName">
      <transition name="modal-animation-inner">
        <div class="modal-inner">
          <i @click="close" class="far fa-times-circle"></i>
          <form @submit.prevent="handleSubmit">
            <h4>Create Blog Post</h4>
            <div class="input-group input-group-lg inputs">
              <input
                type="text"
                placeholder="Title"
                v-model="title"
                required
                class="form-control shadow-none input-size"
              />
            </div>
            <div class="input-group input-group-lg inputs">
              <textarea
                class="form-control shadow-none"
                placeholder="Content..."
                v-model="content"
                required
              ></textarea>
            </div>
            <div class="input-group input-group-lg inputs">
              <input
                type="text"
                placeholder="Tags (press enter to submit tags)"
                v-model="tag"
                @keydown.enter.prevent="handlekeydown"
                class="form-control shadow-none"
              />
            </div>
            <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
            <div class="input-group input-group-lg inputs">
              <input
                @change="handleChange"
                type="file"
                class="form-control shadow-none"
              />
            </div>
            <div class="error">{{ fileError }}</div>

            <button v-if="!isPending" class="btn btn-success p-2 px-5 ml-5">
              Create Post
            </button>
            <button
              v-if="isPending"
              disabled
              class="btn btn-success p-2 px-5 text-center"
            >
              Saving...
            </button>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import useStorage from "../composable/useStorage";
import useBlogs from "../composable/useBlogs";
import { timestamp } from "../firebase/config";
import getUsers from "../composable/getUsers";
export default {
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useBlogs("blogs");
    const { user } = getUsers();

    const title = ref("");
    const content = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const tag = ref("");
    const tags = ref([]);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        await addDoc({
          title: title.value,
          content: content.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          tags: tags.value,
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

    const handlekeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/, "");
        tags.value.push(tag.value);
      }
    };

    return {
      handlekeydown,
      title,
      content,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
      close,
      tag,
      tags,
    };
  },
};
</script>

<style scoped>
.input-size {
  width: 50px;
}
.modal-inner {
  position: fixed;
  left: 850px;
  margin-top: 70px;
  background: rgba(73, 65, 65, 0.705);
}
.inputs {
  margin-bottom: 15px;
}
</style>
