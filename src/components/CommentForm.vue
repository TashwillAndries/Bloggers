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

<style>
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
