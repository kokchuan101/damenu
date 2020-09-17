<template>
    <div>
        <ItemDetail
            v-for="item in items"
            :key="item._id"
            :item="item"
            v-on="$listeners"
            :categories="categories"
        />
    </div>
</template>

<script>
import ItemDetail from './ItemDetail.vue'

export default {
    components: {
        ItemDetail
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        categories: {
            required: true
        }
    }
}
</script>

<style scoped>
</style>
