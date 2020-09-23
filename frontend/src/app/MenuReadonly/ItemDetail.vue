<template>
    <div class="row item-card pl-2 shadow mb-2">
        <div class="col-4 col-lg-2 d-flex align-items-start align-items-lg-center"><img
                class='item-img'
                :src="imgUrl"
            ></div>
        <div class="col-8 col-lg-10 row no-gutters align-items-start align-items-lg-center item-text">
            <div class="col-12 col-lg-3 item-title"><span class="mr-2">{{data.code}}</span>{{data.name}}</div>
            <div class="col-12 col-lg-2">RM {{data.price.toFixed(2)}}</div>
            <div class="col-12 col-lg-5 item-desc">{{data.description}}</div>
        </div>
    </div>
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
