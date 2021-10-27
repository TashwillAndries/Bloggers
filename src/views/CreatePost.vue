<template>
  <div class="create-post">
      <form>
          <label>Title</label>
          <input v-model="title" type="text" required>
          <label>Select Banner Image</label>
          <input
            style="display: none"
            type="file" 
            @change="previewImage"
            accept="image/*"
            ref="fileInput">
          <p>Progress: {{ uploadValue.toFixed() + "%" }}
              <progress :value="uploadValue" max="100"></progress>
          </p>
          <button @click="$refs.fileInput.click()">Select Image</button>
          <img class="preview" :src="picture">
          <button @click.prevent="onUpload">Upload</button>
          <label>Content</label>
          <textarea v-model="body" required></textarea>
          <label>Tags</label>
          <input 
            v-model="tag" 
            type="text" 
            @keydown.enter.prevent="handleKeyDown"
          />
          <div v-for="tag in tags" :key="tag">
            # {{ tag }}
          </div>
          <button>Create Post</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase';
// import axios from 'axios'

export default {
    name: 'Upload',
    data() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },
    methods: {
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = null;
            this.imageData = event.target.files[0]
        },
        onUpload() {
            this.picture = null;
            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state changed`, snapshot => {
                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
                }, error => {console.log(error.message)},
                () => {this.uploadValue = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    this.picture = url;
                });
                }
                );
        }
    },
    setup() {
      const title = ref('')
      const body = ref('')
      const tag = ref('')
      const tags = ref([])

      const handleKeyDown = () => {
        if (!tags.value.includes(tag.value)) {
          tag.value = tag.value.replace(/\s/, '')
          tags.value.push(tag.value)
        }

        tag.value = ''
      }

      return { title, body, tag, handleKeyDown, tags }
    }
}
</script>

<style>

</style>