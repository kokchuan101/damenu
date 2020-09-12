<template>
    <div class="row item-card">
        <div class="col-2"><img
                class='item-img'
                :src="imgUrl"
                alt=""
            ></div>
        <div class="col-10 row">
            <div class="col-12 col-lg-3"><span v-if="data.code">{{data.code}}&nbsp;</span>{{data.name}}</div>
            <div class="col-12 col-lg-2">RM {{data.price.toFixed(2)}}</div>
            <div class="col-12 col-lg-5">{{data.description}}</div>
        </div>
    </div>
</template>

<script>
import { assetUrl } from '../../../constant'

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        imgUrl() {
            return assetUrl + this.data.img
        }
    }
}
</script>

<style scoped>
.item-img {
    max-height: 100%;
    max-width: 100%;
}

.item-card {
    background-color: aliceblue;
    border-bottom: 2px black solid;
}
</style>
