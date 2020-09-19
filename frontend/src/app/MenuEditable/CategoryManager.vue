<template>
    <v-row>
        <v-col cols="12">
            <v-card light width="100%">
                <v-card-title>Manage Category</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" lg="8">
                            <v-text-field
                                v-model="newCategory"
                                label="New Category"
                                dense
                                clearable
                                :rules="rules"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4">
                            <v-btn
                                width="100%"
                                color="success"
                                :disabled="!valid"
                                @click="add">Add</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-title>Category Order</v-card-title>
                <v-card-text v-for="(category,index) in dataCopy" :key="index">
                    <v-card elevation="10" class="p-2">
                        {{index + 1}}&nbsp;&nbsp;{{category}}
                        <v-btn
                            class="ml-5"
                            :disabled="index===0"
                            @click="move(index, -1)">Up</v-btn>
                        <v-btn
                            :disabled="index===dataCopy.length-1"
                            @click="move(index, 1)">Down</v-btn>
                        <v-btn color="red" @click="deleteCategory(category)">Delete</v-btn>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="submit" width="50%" color="green">Save</v-btn>
                    <v-btn @click="closeOverlay" width="50%">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { path } from '@/constant.js';
import axios from 'axios';

export default {
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
            ]
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
            axios
                .delete(path.menus.categories, {
                    params: { id: this.menuId, category: category }
                })
                .then((response) => {
                    this.$emit('refreshData');
                    this.$alertify.success('Successfully deleted');
                })
                .catch((error) => {
                    this.$alertify.error(error.response.data.message);
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

                axios
                    .patch(path.menus.categories, patchData)
                    .then((response) => {
                        this.$emit('refreshData');
                        this.$alertify.success('Succesfully Added');
                    })
                    .catch((error) => {
                        this.$alertify.error(error.response.data.message);
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

<style>
</style>
