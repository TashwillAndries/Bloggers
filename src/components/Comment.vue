<template>
  <transition name="modal-animation">
    <div v-show="modalActive2" class="modalName">
      <transition name="modal-animation-inner">
        <div class="modal-inner p-3">
            <i @click="close" class="far fa-times-circle"></i>
            <div class="Container" v-for="comment in comments" :key="comment">
              <div class="comment">
              <h5>{{comment.userName}}</h5>
              <p>{{comment.comment}}</p>
              </div>
            </div>
            <div class="form">
              <div class="input-group input-group-lg">
                <input type="text" required placeholder="Comment..." v-model="comment" class="form-control shadow-none">
              </div>
              <button class="btn btn-primary" @click="handleSubmit">Send</button>
              <div class="error">{{error}}</div>
            </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref } from '@vue/reactivity';
import useComment from '../composable/useComment'
import { timestamp } from '../firebase/config'
import getUsers from '../composable/getUsers'
import getComments from '../composable/getComments'
import getBlogs from '../composable/getBlogs'
export default {
    props: ["modalActive2", "doc"],
    setup(props, { emit }) {
        const close = () => {
            emit("close");
        };

        const { error, addDoc } = useComment('comments');
        const { user } = getUsers()
        const { er, comments } = getComments('comments')
        const { err, blogs } = getBlogs('blogs')

        const comment = ref(null)

        const handleSubmit = async () => {
            await addDoc({
              userName: user.value.displayName,
              userId: user.value.uid,
              comment: comment.value,
              createdAt: timestamp(),
              blogId: props.doc
            })
            comment.value = ''
        }

        return { close, comment, handleSubmit , error, er, comments }
    }
}
</script>

<style scoped>
.modal-inner {
  position: fixed;
  top: 10%;
  left: 35%;
  border-radius: 25px;
  background: rgb(236, 233, 233);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}
.form {
  display: flex;
  gap: 10px;
}
.commentWindow{
  background: #ddd;
  width: 100%;
  height: 150px;
}
.comment {
  background: white;
  border-radius: 25px;
  padding: 5px 20px;
  margin-bottom: 15px;
  box-shadow: 0px 5px 10px black;
}
</style>