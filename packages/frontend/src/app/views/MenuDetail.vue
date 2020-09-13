<template>
    <div class="row">
        <div class="col-12">
            <button
                v-for="category in menu.categories"
                :key="category"
                @click="itemList = menu.sortedItems[category]"
            >{{category}}</button>
        </div>
        <div class="col-12">
            <ItemList :data="itemList" />
        </div>
    </div>
</template>

<script>
import ItemList from '../components/item/ItemList'
import axios from 'axios'
import { path } from '../../constant'

export default {
    components: {
        ItemList
    },
    created() {
        axios
            .get(path.menus.index + '/5f5500ea26f50147b4e0976c')
            .then((response) => {
                this.menu = response.data
                this.itemList = this.menu.sortedItems.DRINKS
            })
    },
    data() {
        return {
            menu: {},
            itemList: []
        }
    }
}
</script>

<style scoped>
</style>
