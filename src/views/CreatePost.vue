<template>
<div class="welcome container">
    <form @submit.prevent="handleSubmit">
        <h4>Create New BlogPost</h4>
        <br>
        <div class="input-group input-group-lg">
            <input 
                type="text" 
                required 
                placeholder="Blog Title" 
                v-model="title"
                class="form-control shadow-none">
        </div>
        <textarea 
            class="form-control shadow-none"
            required
            placeholder="Blog Content..."
            v-model="content">
        </textarea>
        <label>Upload Banner Image</label>
        <img class="preview" :src="picture">
        <input type="file" @change="handleChange">
        <p>Progress: {{ uploadValue.toFixed() + "%" }}
            <progress style="display: none" :value="uploadValue" max="100"></progress>
        </p>
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <button class="text-decoration-none btn btn-info" @click="onUpload">Create</button>
    </form>
</div>
</template>

<script>
import { ref } from 'vue'
import useStorage from "../composable/useStorage"

export default {
    name:'CreatePost',
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
            this,this.imageData = event.target.files[0];
        }
    },
    setup() {
        const { filePath, url, uploadImage } = useStorage()

        const title = ref('')        
        const content = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit = async () => {
            if (file.value) {
                await uploadImage(file.value)
                console.log('image uploaded, url: ', url.value);
            }
        }

        // Allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected);

            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
                previewImage()
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }
        
        return { title, content, handleSubmit, handleChange, fileError }
    }
}
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