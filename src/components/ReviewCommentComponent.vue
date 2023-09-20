<script setup>
import { ref, onMounted, defineProps } from "vue";
import { getReviewComments, addCommentToReview } from "@/services/venueService";

const props = defineProps(["reviewId"]);

const comments = ref([]);
const newCommentContent = ref("");

const fetchComments = async () => {
  comments.value = await getReviewComments(props.reviewId);
};

const submitComment = async () => {
  await addCommentToReview(props.reviewId, newCommentContent.value);
  newCommentContent.value = "";
  await fetchComments();
};

onMounted(() => {
  fetchComments();
});
</script>


<template>
  <div class="review-comments">
    <!-- <div v-for="comment in comments" :key="comment.id">
      <div class="avatar"><img src="images/client-avatar1.jpg" alt=""></div>
      <strong>{{ comment.user.name }}</strong
      >: {{ comment.content }}
    </div> -->

    <form @submit.prevent="submitComment">
      <textarea v-model="newCommentContent"></textarea>
      <button type="submit" class="button">Add Comment</button>
    </form>
  </div>
</template>
