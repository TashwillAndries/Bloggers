<template>
  <div v-show="modalActiveTwo" class="modalName">
    <div v-if="blogs">
      <i @click="close" class="far fa-times-circle"></i>
      <div v-for="doc in formatted" :key="doc.id">
        <div v-if="doc.commentId === props.id">
          <h5>{{ doc.userName }}</h5>
          <p>{{ doc.comment }}</p>
        </div>
      </div>
      <div class="form">
        <form>
          <div class="input-group input-group-lg">
            <textarea
              placeholder="comment section"
              v-model="comment"
            ></textarea>
          </div>
          <button class="btn btn-primary" @click.prevent="handleSubmit">
            Send
          </button>
          <div class="error">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import getUsers from "../composable/getUsers";
import useBlogs from "../composable/useBlogs";
import getBlogs from "../composable/getBlogs";
import { formatDistanceToNow } from "date-fns";
import { computed, ref } from "@vue/reactivity";
import { timestamp } from "../firebase/config";
export default {
  props: ["id", "modalActiveTwo"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    const { error, blogs } = getBlogs("comments");
    const comment = ref("");
    const { user } = getUsers();
    const { addDoc } = useBlogs("comments");

    const handleSubmit = async () => {
      console.log(props.id);
      await addDoc({
        userName: user.value.displayName,
        comment: comment.value,
        createdAt: timestamp(),
        commentId: props.id,
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
    console.log(formatted);
    return { close, error, blogs, formatted, props, comment, handleSubmit };
  },
};
</script>

<style></style>
