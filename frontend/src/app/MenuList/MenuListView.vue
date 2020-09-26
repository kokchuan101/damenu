<template>
    <div class="mt-5">
        <v-row justify="center" no-gutters :class="{'mb-3': !isCreate}">
            <v-col cols="10" lg="8">
                <v-btn color="success" block @click="isCreate = true">Create Menu</v-btn>
            </v-col>
        </v-row>
        <MenuDetail
            v-if="isCreate"
            class="menu-detail"
            :menu="newMenu"
            :isCreate="isCreate"
            @cancelCreate="isCreate = false"
            @refreshData="loadData"
        ></MenuDetail>
        <MenuDetail
            class="menu-detail"
            v-for="menu in menus"
            :key="menu._id"
            :menu="menu"
            @refreshData="loadData"
        ></MenuDetail>
    </div>
</template>

<script>
import MenuDetail from './MenuDetail.vue';
import axios from 'axios';
import { path } from '@/constant.js';
import AxiosHandlerMixin from '@/app/mixins/axiosHandler.mixin.js';

export default {
    mixins: [AxiosHandlerMixin],
    components: { MenuDetail },
    created() {
        this.loadData();
    },
    data() {
        return {
            menus: [],
            isCreate: false,
            newMenu: {
                name: '',
                restaurantName: ''
            }
        };
    },
    methods: {
        loadData(isCreate = false) {
            axios
                .get(
                    path.menus.user + `/${JSON.parse(sessionStorage.user)._id}`
                )
                .then((response) => {
                    this.menus = response.data;
                })
                .catch((error) => {
                    this.axiosErrorHandler(error);
                });

            if (isCreate) {
                this.isCreate = false;
            }
        }
    }
};
</script>

<style scoped>
.menu-detail {
    margin-bottom: 30px;
}
</style>
