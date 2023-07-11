<template>
    <select ref="selectEl"><slot></slot></select>
</template>

<script>
export default {
    props: {
        value: [String, Array],
    },
    mounted() {
        this.$refs.selectEl.value = this.value;
        this.$refs.selectEl.addEventListener('change', this.emitInput);
    },
    watch: {
        value(val) {
            this.$refs.selectEl.value = val;
        }
    },
    beforeUnmount() {
        this.$refs.selectEl.removeEventListener('change', this.emitInput);
    },
    methods: {
        emitInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>
