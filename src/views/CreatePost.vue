<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New BlogPost</h4>
        <br>
        <input 
            type="text" 
            required 
            placeholder="Blog Title" 
            v-model="title">
        <textarea 
            required
            placeholder="Blog Content..."
            v-model="content">
        </textarea>
        <label>Upload Banner Image</label>
        <p>Progress: {{ uploadValue.toFixed() + "%" }}
            <progress style="display: none" :value="uploadValue" max="100"></progress>
        </p>
        <img class="preview" :src="picture">
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <div class="error"></div>
        <button @click="onUpload">Create</button>
    </form>
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
    form {
        display: flex;
        flex-direction: column;
        margin: 200px 500px;
    }
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>