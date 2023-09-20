<script setup>

</script>
<template>
    <div class="popup">
        <div class="icon"><font-awesome-icon :icon="['fas', 'envelope-open-text']" /></div>
        <h2 class="title">Благодаря Ви!</h2>
        <p class="txt">Ревюто Ви ще бъде прегледано и одобрено до 24 часа</p>
        <router-link :to="{name:'home'}" class="btn">Обратно към сайта</router-link>
    </div>
</template>