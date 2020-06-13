<template>

</template>
<script>
  export default {
    name: 'app-modal',
    props: {
        showModal: Boolean
    },
    methods: {
        closeModal() {
            this.$emit('clicked');
        }
    },
  };
</script>
