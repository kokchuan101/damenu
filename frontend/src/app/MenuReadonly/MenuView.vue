<template>
    <div class="row">
        <div class="col-12">
            <MenuCategory :categories="menu.categories" @changeList="changeList"></MenuCategory>
        </div>
        <div class="col-12">
            <ItemList :data="itemList"/>
        </div>
    </div>
</template>

<script>
import ItemList from './ItemList.vue';
import MenuCategory from '@/app/components/menu/MenuCategory.vue';
import axios from 'axios';
import { path } from '@/constant.js';

export default {
    components: {
        ItemList,
        MenuCategory
    },
    data() {
        return {
            menu: {},
            itemList: []
        };
    },
    created() {
        axios
            .get(path.menus.index + `/${this.$route.params.id}`)
            .then((response) => {
                this.menu = response.data;
                this.itemList = this.menu.sortedItems.DRINKS;
                this.category = this.menu.categories[0];
                this.itemList = this.menu.sortedItems[this.category];
            });
    },
    methods: {
        changeList(category) {
            this.itemList = this.menu.sortedItems[category];
        }
    }
};
</script>

<style scoped>
</style>
