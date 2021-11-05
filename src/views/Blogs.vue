<template>
<div class="fullPage">
  <nav class="navBar">
    <div class="container">
      <div class="headers">
        <router-link class="head" :to="{ name: 'Blogs' }">Welcome</router-link>
        <p class="displayName">{{ user.displayName }}</p>
      </div>
      <div class="buttons">
        <router-link :to="{ name: 'Userblogs' }"
          ><button class="btn btn-outline-success">
            My Blogs
          </button></router-link
        >
        <button class="btn btn-outline-info" @click="toggleModal">+</button>
        <button class="btn btn-outline-danger" @click="handleClick">
          Log out
        </button>
      </div>
    </div>
  </nav>
  <div>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-stuff"></div>
    </Modal>
  </div>

  <div class="SingleBlog" v-for="blog in formattedDocs" :key="blog">
    <div class="card text-dark bg-light mb-2 p-1" style="width: 45rem; box-shadow: 0px 5px 15px black;">
      <div class="blog-name-time">
        <h5>{{ blog.userName }}</h5>
        <p class="time">{{ blog.createdAt }}</p>
      </div>
      <img class="card-img-top" :src="blog.coverUrl" alt="Card image cap" />
      <div class="card-body p-1">
        <h3 class="card-title">{{ blog.title }}</h3>
        <q class="card-text">{{ blog.content }}</q
        ><br />
        <div class="tags" v-for="tag in blog.tags" :key="tag">
          <p class="tag">#{{ tag }}</p>
        </div>
        <div class="like-comment">
          <p v-if="blog.liked" @click="toggleLike(blog)" class="likeBtn">
            <i class="fas fa-heart"></i>
          </p>
          <p v-if="!blog.liked" @click="toggleLike(blog)">
            <i v-bind:class="heart"></i>
          </p>
          <p @click="toggleModal2(blog.id)"><i class="fas fa-comments"></i></p>
        </div>
      </div>
    </div>
    <div>
      <Comment
        @close="toggleModal2"
        :modalActive2="modalActive2"
        :id="blogId"
      />
    </div>
  </div>
</div>
</template>

<script>
import getUsers from "../composable/getUsers";
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";
import LogoutUser from "../composable/LogoutUser";
import { useRouter } from "vue-router";
import getBlogs from "../composable/getBlogs";
import { computed, watch } from "@vue/runtime-core";
import Comment from "../components/Comment.vue";
import { formatDistanceToNow } from "date-fns";
import { projectFire } from "../firebase/config";

export default {
  components: { Modal, Comment },
  props: ["id"],
  setup(props) {
    const heart = "far fa-heart";
    const showlikes = ref(false);
    const blogId = ref("")
    const { logout, error } = LogoutUser();
    const { user } = getUsers();
    const router = useRouter();
    const { blogs, err } = getBlogs("blogs");
    const modalActive = ref(false);
    const modalActive2 = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
      let model = document.querySelectorAll(".modalName")[0]
      if (model.style.display == 'none' ) {
        document.body.style.overflow = 'hidden';
        model.style.position = "fixed";
        model.style.zIndex = "1000";
        model.style.top = "0";
        model.style.width = "100vw";
        model.style.height = "100vh";
        model.style.backgroundColor = "rgba(0,0,0,0.5)";
      } else document.body.style.overflow = 'auto';
    };
    const toggleModal2 = (id) => {
      blogId.value = id;
      modalActive2.value = !modalActive2.value;
      let model2 = document.querySelectorAll(".modalName")[1]
      if (model2.style.display == 'none' ) {
        document.body.style.overflow = 'hidden';
        model2.style.position = "fixed";
        model2.style.zIndex = "1000";
        model2.style.top = "0";
        model2.style.width = "100vw";
        model2.style.height = "100vh";
        model2.style.backgroundColor = "rgba(0,0,0,0.5)";
      } else document.body.style.overflow = 'auto';
    };

    const formattedDocs = computed(() => {
      if (blogs.value) {
        return blogs.value.map((post) => {
          let time = formatDistanceToNow(post.createdAt.toDate());
          return { ...post, createdAt: time };
        });
      }
    });

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("user logged out");
      }
      router.push({name: "Welcome"})
    };

    const toggleLike = (blog) => {
      projectFire
        .collection("blogs")
        .doc(blog.id)
        .update({
          liked: !blog.liked,
        });
    };

    return {
      user,
      handleClick,
      blogs,
      err,
      formattedDocs,
      modalActive,
      modalActive2,
      user,
      toggleModal,
      showlikes,
      heart,
      toggleLike,
      toggleModal2,
      blogId,
      props
    };
  },
};
</script>

<style scoped>
.fullPage {
  background-image: url(../assets/blogBack.jpeg);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  overflow-x: hidden;
}
.head {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.displayName {
  color: white;
  font-size: 20px;
}

.navBar {
  background: rgb(33, 37, 41);
  width: 100vw;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 5px 5px 15px black;
}
.container {
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 1%;
}
.headers {
  display: flex;
  gap: 20px;
}
.buttons button {
  margin-left: 10px;
}
.SingleBlog {
  position: relative;
  left: 25%;
  margin-bottom: 3%;
  margin-top: 5%;
}
.time {
  font-size: 10px;
  color: #555;
}
.tags {
  display: inline-block;
}
.blog-name-time {
  display: flex;
  justify-content: space-between;
}
.like-comment {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.like-comment p {
  cursor: pointer;
}
.liked-icon {
  margin-right: 55%;
}
.likeBtn{
  color: red;
}
</style>
