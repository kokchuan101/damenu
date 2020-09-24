<template>
    <div class="row justify-content-center manage-category-wrapper">
        <div class="col-11 col-lg-4 bg-white shadow-lg">
            <h3>Manage Category</h3>
            <div class="row no-gutters mb-5">
                <div class="col-12 col-lg-8">
                    <v-text-field
                        class="mr-lg-4"
                        v-model="newCategory"
                        label="New Category"
                        dense
                        clearable
                        :rules="rules"
                        ></v-text-field>
                </div>
                <div class="col-12 col-lg-4">
                    <v-btn
                        width="100%"
                        color="success"
                        :disabled="!valid||loading"
                        @click="add">Add</v-btn>
                </div>
            </div>

            <div v-for="(category,index) in dataCopy" :key="index" class="shadow-lg mb-3 d-flex">
                <div class="flex-fill">
                    <p>{{index + 1}}&nbsp;&nbsp;{{category}}</p>
                </div>
                <div class="flex-fill d-inline-flex justify-content-end">
                    <v-btn
                    class="mr-2"
                    :disabled="index===0||loading"
                    @click="move(index, -1)"><v-icon>mdi-chevron-up</v-icon></v-btn>
                    <v-btn
                        class="mr-2"
                        :disabled="index===dataCopy.length-1||loading"
                        @click="move(index, 1)"><v-icon>mdi-chevron-down</v-icon></v-btn>
                    <v-btn
                    color="red"
                    @click="deleteCategory(category)"
                    :disabled="loading"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                </div>
            </div>
            <v-btn
                @click="submit"
                width="50%"
                color="green"
                :loading="loading">Save</v-btn>
            <v-btn
                @click="closeOverlay"
                width="50%"
                :disabled="loading">Cancel</v-btn>
        </div>
    </div>
</template>

<script>
import { path } from '@/constant.js';
import axios from 'axios';
import AxiosHandlerMixin from '@/app/mixins/axiosHandler.mixin.js';

export default {
    mixins: [AxiosHandlerMixin],
    props: {
        categories: {
            type: Array,
            default() {
                return [];
            }
        },
        menuId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dataCopy: [],
            newCategory: '',
            valid: false,
            rules: [
                (v) => {
                    return !this.dataCopy.includes(v) || 'No duplicate value';
                }
            ],
            loading: false
        };
    },
    created() {
        this.dataCopy = [...this.categories];
    },
    methods: {
        add() {
            this.dataCopy.push(this.newCategory.toUpperCase());
            this.newCategory = '';
        },
        move(index, shift) {
            const newIndex = index + shift;
            if (newIndex >= 0 && newIndex < this.dataCopy.length) {
                const category = this.dataCopy.splice(index, 1)[0];
                this.dataCopy.splice(newIndex, 0, category);
            }
        },
        deleteCategory(category) {
            this.$alertify.confirm('Deleting item', () => {
                axios
                    .delete(path.menus.categories, {
                        params: { id: this.menuId, category: category }
                    })
                    .then((response) => {
                        this.$emit('refreshData');
                        this.$alertify.success('Successfully deleted');
                    })
                    .catch((error) => {
                        this.axiosErrorHandler(error);
                    });
            });
        },
        closeOverlay() {
            this.$emit('closeOverlay');
        },
        submit() {
            if (
                JSON.stringify(this.dataCopy) ===
                JSON.stringify(this.categories)
            ) {
                this.$alertify.error('No changes detected');
            } else {
                const patchData = {
                    id: this.menuId,
                    categories: this.dataCopy
                };

                this.loading = true;
                axios
                    .patch(path.menus.categories, patchData)
                    .then((response) => {
                        this.$emit('refreshData');
                        this.$alertify.success('Succesfully Added');
                    })
                    .catch((error) => {
                        this.axiosErrorHandler(error);
                    })
                    .then(() => {
                        this.loading = false;
                    });
            }
        }
    },
    watch: {
        categories() {
            this.dataCopy = [...this.categories];
        },
        newCategory() {
            if (this.newCategory) {
                this.newCategory = this.newCategory.toUpperCase();
                if (
                    this.newCategory.length > 0 &&
                    !this.dataCopy.includes(this.newCategory)
                ) {
                    this.valid = true;
                } else {
                    this.valid = false;
                }
            } else {
                this.valid = false;
            }
        }
    }
};
</script>

<style scoped>
.manage-category-wrapper {
    width: 100vw !important;
}
</style>
