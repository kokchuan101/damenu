<template>
    <v-row>
        <v-col cols="12">
            <MenuCategory
                :categories="menu.categories"
                :isCreate="isCreate"
                ref="MenuCategory"
                @changeList="changeList">
            </MenuCategory>
        </v-col>
        <v-col cols="12">
            <v-btn
                color="info"
                :disabled="isCreate"
                @click="categoryOverlay = true"
            >Manage Category</v-btn>
        </v-col>
        <v-col cols="12">
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
        </v-col>
        <v-col cols="12">
            <ItemList :items="itemList" :categories="menu.categories" @refreshData="refreshData" />
        </v-col>
        <v-overlay :value="categoryOverlay">
            <CategoryManager
                :categories="menu.categories"
                :menuId="menu._id"
                @closeOverlay="categoryOverlay = false"
                @refreshData="refreshData"
                ></CategoryManager>
        </v-overlay>
    </v-row>
</template>

<script>
import ItemList from './ItemList.vue';
import ItemDetail from './ItemDetail.vue';
import CategoryManager from './CategoryManager.vue';
import MenuCategory from '@/app/components/menu/MenuCategory.vue';
import axios from 'axios';
import { path } from '@/constant.js';

export default {
    components: {
        ItemList,
        ItemDetail,
        CategoryManager,
        MenuCategory
    },
    data() {
        return {
            menu: {},
            itemList: [],
            category: '',
            newItem: null,
            isCreate: false,
            categoryOverlay: false
        };
    },
    created() {
        axios
            .get(path.menus.index + '/5f5500ea26f50147b4e0976c')
            .then((response) => {
                this.menu = response.data;
                this.changeList();
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

                    if (this.categoryOverlay) {
                        this.categoryOverlay = false;
                        this.$refs.MenuCategory.click();
                    }
                });
        },
        changeList(category = null) {
            if (category) {
                this.category = category;
            } else {
                this.category = this.menu.categories[0];
            }
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
.v-overlay__content {
    width: 100% !important;
    color: blue;
}
</style>
