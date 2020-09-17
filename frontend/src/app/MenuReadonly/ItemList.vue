<template>
    <div>
        <ItemDetail
            v-for="datum in data"
            :key="datum._id"
            v-bind:data="datum"
        />
    </div>
</template>

<script>
import ItemDetail from './ItemDetail.vue';

export default {
    components: {
        ItemDetail
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped>
</style>
