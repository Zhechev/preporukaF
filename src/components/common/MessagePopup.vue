<script setup>
import { defineProps } from 'vue';
const props = defineProps(['title', 'text'])

</script>
<template>
    <div class="popup">
        <div class="icon"><font-awesome-icon :icon="['fas', 'envelope-open-text']" /></div>
        <h2 class="title">{{ props.title }}</h2>
        <p class="txt">{{ props.text }}</p>
        <router-link :to="{name:'home'}" class="btn">Обратно към сайта</router-link>
    </div>
</template>