<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Method to retrieve the token
const retrieveUserData = async () => {
    await store.dispatch('auth/retrieveUserData');
};

onMounted(() => {
    retrieveUserData();
});
</script>
