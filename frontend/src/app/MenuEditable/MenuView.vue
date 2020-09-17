<template>
    <div class="row">
        <div class="col-12">
            <v-btn
                v-for="category in menu.categories"
                :key="category"
                @click="changeList(category)"
            >{{category}}</v-btn>
        </div>
        <div class="col-12">
            <v-btn
                color="success"
                @click="createItem"
                :disabled="isCreate"
            >Add</v-btn>
            <ItemDetail
                v-if="newItem"
                :item="newItem"
                :isCreate="isCreate"
                :categories="menu.categories"
                @refreshData="refreshData"
                @cancelCreate="cancelCreate"
            />
        </div>
        <div class="col-12">
            <ItemList :items="itemList" :categories="menu.categories" @refreshData="refreshData" />
        </div>
    </div>
</template>

<script>
import ItemList from './ItemList.vue';
import ItemDetail from './ItemDetail.vue';
import axios from 'axios';
import { path } from '@/constant.js';

export default {
    components: {
        ItemList,
        ItemDetail
    },
    data() {
        return {
            menu: {},
            itemList: [],
            category: '',
            newItem: null,
            isCreate: false
        };
    },
    created() {
        axios
            .get(path.menus.index + '/5f5500ea26f50147b4e0976c')
            .then((response) => {
                this.menu = response.data;
                this.category = this.menu.categories[0];
                this.itemList = this.menu.sortedItems[this.category];
            });
    },
    methods: {
        refreshData(category, isCreate = false) {
            axios
                .get(path.menus.index + '/5f5500ea26f50147b4e0976c')
                .then((response) => {
                    this.menu = response.data;
                    this.changeList(category);
                    if (isCreate) {
                        this.cancelCreate();
                    }
                });
        },
        changeList(category) {
            this.category = category;
            this.itemList = this.menu.sortedItems[this.category];
        },
        createItem() {
            if (!this.isCreate) {
                this.isCreate = true;
                this.newItem = {
                    code: '',
                    name: '',
                    category: this.category,
                    price: 0.0,
                    img: '/placeholder.png',
                    menuId: this.menu._id
                };
            }
        },
        cancelCreate() {
            this.isCreate = false;
            this.newItem = null;
        }
    }
};
</script>

<style scoped>
</style>
