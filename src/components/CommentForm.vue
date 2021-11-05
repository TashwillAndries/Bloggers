<template> </template>

<script>
import getUsers from "../composable/getUsers";
import { timestamp } from "../firebase/config";
import getBlogs from "../composable/getBlogs";
import useBlogs from "../composable/useBlogs";
import { ref } from "@vue/reactivity";
export default {
  props: ["doc"],
  setup(props) {
    const comment = ref("");
    const { user } = getUsers();
    const { addDoc, error } = useBlogs("comments");
    const { blogs } = getBlogs("blogs");

    const handleSubmit = async () => {
      console.log(props.doc);
      await addDoc({
        userName: user.value.displayName,
        comment: comment.value,
        createdAt: timestamp(),
        commentId: props.doc,
      });
      comment.value = "";
    };
    return { comment, handleSubmit, error };
  },
};
</script>

<style></style>
