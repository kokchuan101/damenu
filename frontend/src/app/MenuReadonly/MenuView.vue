<template>
    <div class="row">
        <div class="col-12">
            <v-btn
                v-for="category in menu.categories"
                :key="category"
                @click="this.itemList = this.menu.sortedItems[category]"
            >{{category}}</v-btn>
        </div>
        <div class="col-12">
            <ItemList :data="itemList"/>
        </div>
    </div>
</template>

<script>
import ItemList from './ItemList.vue';
import axios from 'axios';
import { path } from '@/constant.js';

export default {
    components: {
        ItemList
    },
    data() {
        return {
            menu: {},
            itemList: []
        };
    },
    created() {
        axios
            .get(path.menus.index + '/5f5500ea26f50147b4e0976c')
            .then((response) => {
                this.menu = response.data;
                this.itemList = this.menu.sortedItems.DRINKS;
                this.category = 'drinks';
            });
    }
};
</script>

<style scoped>
</style>
