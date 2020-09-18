<template>
    <v-slide-group show-arrows mandatory>
        <v-slide-item
            v-for="(category, index) in categories"
            :key="index"
            v-slot:default="{ active, toggle }">
                <v-btn
                    :input-value="active"
                    active-class="purple lighten-2 white--text"
                    :disabled="isCreate"
                    @click="changeList(category);toggle();"
                    :ref="toggle+index"
                >{{category}}</v-btn>
        </v-slide-item>
    </v-slide-group>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            default() {
                return [];
            }
        },
        isCreate: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        changeList(category) {
            this.$emit('changeList', category);
        }
    }
};
</script>

<style scoped>
</style>
