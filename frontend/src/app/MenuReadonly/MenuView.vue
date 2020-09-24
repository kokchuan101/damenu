<template>
<div>
    <v-app-bar
            app
            dense
            class="d-flex justify-content-center">
            <p class="h3 font-weight-bold mt-2">{{ menu.restaurantName }}</p></v-app-bar>
    <div class="row">
        <div class="col-12">
            <MenuCategory :categories="menu.categories" @changeList="changeList"></MenuCategory>
        </div>
        <div class="col-12">
            <ItemList :data="itemList"/>
        </div>
    </div>
</div>
</template>

<script>
import ItemList from './ItemList.vue';
import MenuCategory from '@/app/components/menu/MenuCategory.vue';
import axios from 'axios';
import { path } from '@/constant.js';
import AxiosHandlerMixin from '@/app/mixins/axiosHandler.mixin.js';

export default {
    mixins: [AxiosHandlerMixin],
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
            })
            .catch((error) => {
                this.axiosErrorHandler(error);
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
