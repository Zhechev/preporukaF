<script setup>
import { ref, onMounted, defineProps, watch, defineExpose, defineEmits, nextTick } from "vue";
import { useRoute } from 'vue-router';

import { getReviewComments, addCommentToReview } from "@/services/venueService";


const route = useRoute();
const props = defineProps(["reviewId"]);

const comments = ref([]);
const newCommentContent = ref("");
const commentsPagination = ref({ current_page: 0 });
const emit = defineEmits(['comments-loaded']);


const fetchComments = async () => {
  const nextPage = (commentsPagination.value.current_page || 0) + 1;
  try {
    const commentsData = await getReviewComments(props.reviewId, nextPage);
    comments.value = comments.value.concat(commentsData.data);
    commentsPagination.value = { ...commentsPagination.value, ...commentsData };
    // Emit an event after comments are loaded
    emit('comments-loaded');
  } catch (error) {
    console.error("Error fetching comments:", error);
    // Handle the error appropriately
  }
};


const loadMoreComments = async () => {
  await fetchComments();
  if (targetCommentId.value) {
    await nextTick();
    await tryScrollingToComment();
  }
};

const submitComment = async () => {
  await addCommentToReview(props.reviewId, newCommentContent.value);
  newCommentContent.value = "";
  commentsPagination.value.current_page = 0; // Reset to first page
  comments.value = []; // Clear current comments
  await fetchComments(); // Fetch comments starting from the first page
};

const targetCommentId = ref(null);

onMounted(async () => {
  const commentId = route.query.comment;
  if (commentId) {
    targetCommentId.value = commentId;
  }
  await fetchComments();
  if (targetCommentId.value) {
    await tryScrollingToComment();
  }
});

const tryScrollingToComment = async () => {
  const commentElement = document.getElementById(`comment-${targetCommentId.value}`);
  if (commentElement) {
    commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (commentsPagination.value.next_page_url && targetCommentId.value != null) {
    await loadMoreComments();
    await nextTick(); // Изчакайте DOM да се обнови
    await tryScrollingToComment(); // Рекурсивно повикване на функцията
  }
};

watch(() => props.reviewId, () => {
  comments.value = []; // Clear comments when reviewId changes
  commentsPagination.value.current_page = 0; // Reset to first page
  fetchComments(); // Fetch comments for the new review
});

const showComments = async () => {
  await fetchComments();
};  

defineExpose({
  showComments
});
</script>



<template>
  <div class="review-comments">
    <div v-for="comment in comments" :key="comment.id" :id="'comment-' + comment.id" class="comment">
      <div class="avatar"><img src="images/client-avatar1.jpg" alt=""></div>
      <strong>{{ comment.user.name }}</strong>: {{ comment.content }}
    </div>

    <button v-if="commentsPagination.next_page_url" @click="loadMoreComments" class="button">
      Show More Comments
    </button>

    <form @submit.prevent="submitComment">
      <textarea v-model="newCommentContent"></textarea>
      <button type="submit" class="button">Add Comment</button>
    </form>
  </div>
</template>

