<template>
    <v-row class="item-card pl-2 shadow mb-2">
        <v-col cols="4" lg="2" class="d-flex align-items-start align-items-lg-center"><img
                class='item-img'
                :src="imgUrl"
            ></v-col>
        <v-col cols="8" lg="10" class="row no-gutters align-items-start align-items-lg-center item-text">
            <v-col cols="12" lg="3" class="item-title"><span class="mr-2">{{data.code}}</span>{{data.name}}</v-col>
            <v-col cols="12" lg="2" >RM {{data.price.toFixed(2)}}</v-col>
            <v-col cols="12" lg="5" class="item-desc">{{data.description}}</v-col>
        </v-col>
    </v-row>
</template>

<script>
import { assetUrl } from '@/constant.js';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        imgUrl() {
            if (this.data.img) {
                return assetUrl + this.data.img;
            } else {
                return assetUrl + '/placeholder.png';
            }
        }
    }
};
</script>

<style scoped>

.item-card {
    background-color: white
}

@media screen and (max-width: 991px) {
    .item-img {
        height: 150px;
        width: 100%;
    }

    .item-title {
        font-size: 1.25em;
        font-weight: 700;
    }

    .item-desc {
        font-size: 0.8em;
    }
}

@media screen and (min-width: 992px) {
    .item-img {
        height: 180px;
        width: 100%;
    }

    .item-text {
        font-size: 1.5em;
    }

    .item-title span{
        font-weight: 700
    }
}
</style>
