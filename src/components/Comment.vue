<template>
  <transition name="modal-animation">
    <div v-show="modalActive2" class="modalName">
      <transition name="modal-animation-inner">
        <div class="modal-inner p-3" v-if="blogs">
          <i @click="close" class="far fa-times-circle"></i>
          <div class="Container" v-for="doc in formatted" :key="doc.id">
            <div class="comment" v-if="doc.commentId === props.id">
              <h5>{{ doc.userName }}</h5>
              <p>{{ doc.comment }}</p>
            </div>
          </div>
          <div class="form">
            <div class="input-group input-group-lg">
              <input
                type="text"
                required
                placeholder="Comment..."
                v-model="comment"
                class="form-control shadow-none"
              />
            </div>
            <button class="btn btn-primary" @click.prevent="handleSubmit">
              Send
            </button>
            <div class="error">{{ error }}</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { timestamp } from "../firebase/config";
import getUsers from "../composable/getUsers";
import getBlogs from "../composable/getBlogs";
import useBlogs from "../composable/useBlogs";
import { formatDistanceToNow } from "date-fns";

export default {
  props: ["modalActive2", "id", "title"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    console.log(props);
    const { error, addDoc } = useBlogs("comments");
    const { user } = getUsers();
    const { blogs } = getBlogs("comments");

    const comment = ref("");

    const handleSubmit = async () => {
      await addDoc({
        userName: user.value.displayName,
        userId: user.value.uid,
        comment: comment.value,
        createdAt: timestamp(),
        commentId: props.id,
        blogTitle: props.title,
      });
      comment.value = "";
    };

    const formatted = computed(() => {
      if (blogs.value) {
        return blogs.value.map((doc) => {
          const created = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: created };
        });
      }
    });

    return { close, error, blogs, formatted, props, comment, handleSubmit };
  },
};
</script>

<style scoped>
.modal-inner {
  position: fixed;
  top: 20%;
  left: 35%;
  max-height: 350px;
  overflow-y: auto;
  border-radius: 25px;
  background: rgb(236, 233, 233);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-inner i:hover {
  cursor: pointer;
}
.form {
  display: flex;
  gap: 10px;
}
.commentWindow {
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
