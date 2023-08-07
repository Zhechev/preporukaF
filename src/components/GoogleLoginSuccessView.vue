<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Method to retrieve the token
const retrieveTokenAndLogin = async () => {
    await store.dispatch('auth/retrieveTokenAndLogin');
};

onMounted(() => {
    retrieveTokenAndLogin();
});
</script>
