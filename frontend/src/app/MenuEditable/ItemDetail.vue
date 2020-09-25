<template>
    <div class="item-card shadow mb-2">
        <v-form v-model="valid" ref="form" @submit.prevent="handleSubmit" class="row no-gutters pr-2">
            <div class="col-12 col-lg-2 d-flex justify-content-center my-2">
                <input type="hidden" name="menuId" :value="dataCopy.menuId" />
                <div>
                    <img class="item-img" :src="imgUrl" />
                    <v-file-input
                        v-if="isEdit||isCreate"
                        name="img" @change="previewImg"
                        :rules="rules.file"
                        @click:clear="clearImg"></v-file-input>
                </div>
            </div>
            <div class="col-12 col-lg-3 px-2 pt-lg-2 mb-2">
                <v-text-field
                    name="code"
                    class="item-code mb-2"
                    v-model.trim="dataCopy.code"
                    label="Code"
                    counter="4"
                    :rules="isEdit||isCreate ?rules.code: []"
                    :hide-details="!(isEdit||isCreate)"
                    :filled="!(isEdit||isCreate)"
                    :readonly="!(isEdit||isCreate)"
                    :clearable="isEdit||isCreate"
                ></v-text-field>
                <v-text-field
                    name="name"
                    class="item-name"
                    v-model.trim="dataCopy.name"
                    label="Name"
                    :rules="isEdit||isCreate ?rules.name: []"
                    :hide-details="!(isEdit||isCreate)"
                    :filled="!(isEdit||isCreate)"
                    :readonly="!(isEdit||isCreate)"
                    :clearable="isEdit||isCreate"
                ></v-text-field>
            </div>
            <div class="col-12 col-lg-2 px-2 pt-lg-2 mb-2">
                <v-autocomplete
                    class="mb-2"
                    v-model.trim="dataCopy.category"
                    :items="categories"
                    label="Category"
                    :rules="isEdit||isCreate ?rules.category: []"
                    :hide-details="!(isEdit||isCreate)"
                    :filled="!(isEdit||isCreate)"
                    :readonly="!(isEdit||isCreate)"
                    :clearable="isEdit||isCreate"
                ></v-autocomplete>
                <v-text-field
                    name="price"
                    class="mb-2"
                    v-model="dataCopy.price"
                    @blur="formatPrice"
                    label="Price"
                    :rules="isEdit||isCreate ?rules.price: []"
                    :hide-details="!(isEdit||isCreate)"
                    :filled="!(isEdit||isCreate)"
                    :readonly="!(isEdit||isCreate)"
                    :clearable="isEdit||isCreate"
                    prefix="RM"
                    type="number"
                    step=".01"
                ></v-text-field>
            </div>
            <div class="col-12 col-lg-5 px-2 pt-lg-2 mb-2">
                <v-textarea
                    name="description"
                    label="Description"
                    v-model.trim="dataCopy.description"
                    :rules="isEdit||isCreate ?rules.description: []"
                    :hide-details="!(isEdit||isCreate)"
                    :filled="!(isEdit||isCreate)"
                    :readonly="!(isEdit||isCreate)"
                    :clearable="isEdit||isCreate"
                ></v-textarea>
            </div>
            <div v-if="isEdit||isCreate" class="col-12 d-flex justify-content-end px-2 mb-2 control-buttons">
                    <v-btn color="success"
                        class="mr-lg-2"
                        type="submit"
                        key="submit"
                        :loading="loading">Save</v-btn>
                    <v-btn
                        @click="onCancel"
                        key="cancel"
                        :disabled="loading">Cancel</v-btn>
            </div>
            <div v-else class="col-12 d-flex justify-content-end px-2 mb-2 control-buttons">
                <v-btn
                    color="info"
                    class="mr-lg-2"
                    @click="isEdit=true"
                    :disabled="loading">Edit</v-btn>
                <v-btn
                    color="error"
                    @click="onDelete"
                    :loading="loading">Delete</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import { assetUrl, path } from '@/constant.js';
import axios from 'axios';
import ValidationMixin from '@/app/mixins/validation.mixin.js';
import AxiosHandlerMixin from '@/app/mixins/axiosHandler.mixin.js';

export default {
    mixins: [ValidationMixin, AxiosHandlerMixin],
    props: {
        item: {
            type: Object,
            required: true
        },
        isCreate: {
            type: Boolean,
            default: false
        },
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dataCopy: {},
            isEdit: false,
            imgUrl: '',
            valid: false,
            rules: {
                code: [this.required('Code'), this.max(4, 'Code')],
                name: [this.required('Name')],
                category: [this.required('Category')],
                price: [this.required('Price'), this.numeric('Price')],
                file: [this.image()]
            },
            loading: false
        };
    },
    created() {
        this.isEdit = false;
        this.initializeData();
    },
    methods: {
        initializeData() {
            this.item.price = parseFloat(this.item.price).toFixed(2);
            this.dataCopy = { ...this.item };

            this.clearImg();
        },
        formatPrice() {
            if (this.dataCopy.price) {
                this.dataCopy.price = parseFloat(this.dataCopy.price).toFixed(
                    2
                );
            } else {
                this.dataCopy.price = parseFloat(0.0).toFixed(2);
            }
        },
        handleSubmit(event) {
            if (this.$refs.form.validate()) {
                const form = new FormData(event.target);
                form.append('category', this.dataCopy.category);

                if (this.isCreate) {
                    this.loading = true;
                    axios
                        .post(path.items.index, form)
                        .then((response) => {
                            this.$alertify.success('Succesfully Added');
                            this.$emit('refreshData', this.item.category, true);
                        })
                        .catch((error) => {
                            this.axiosErrorHandler(error);
                        })
                        .then(() => {
                            this.loading = false;
                        });
                } else {
                    form.append('id', this.dataCopy._id);

                    if (
                        JSON.stringify(this.dataCopy) ===
                        JSON.stringify(this.item)
                    ) {
                        this.$alertify.error(
                            'Unable to update, no change detected.'
                        );
                    } else {
                        this.loading = true;
                        axios
                            .patch(path.items.index, form)
                            .then((response) => {
                                this.$alertify.success('Succesfully updated');
                                this.refreshData();
                            })
                            .catch((error) => {
                                this.axiosErrorHandler(error);
                            })
                            .then(() => {
                                this.loading = false;
                            });
                    }
                }
            } else {
                this.$alertify.error('Validation error, please rectify fields');
            }
        },
        previewImg(file) {
            if (file) {
                this.imgUrl = URL.createObjectURL(file);
                this.dataCopy.img = this.imgUrl;
            }
        },
        onCancel() {
            if (this.isEdit) {
                this.initializeData();
                this.isEdit = false;
            } else {
                this.$emit('cancelCreate');
            }
        },
        onDelete() {
            this.$alertify.confirm('Are you sure on deleting this item?', () => {
                this.loading = true;
                axios
                    .delete(path.items.index + `/${this.dataCopy._id}`)
                    .then((response) => {
                        this.$alertify.success('Succesfully updated');
                        this.refreshData();
                    })
                    .catch((error) => {
                        this.axiosErrorHandler(error);
                    })
                    .then(() => {
                        this.loading = false;
                    });
            });
        },
        refreshData() {
            this.$emit('refreshData', this.item.category);
            this.isEdit = false;
        },
        clearImg() {
            if (this.item.img) {
                this.imgUrl = assetUrl + this.item.img;
                this.dataCopy.img = this.item.img;
            } else {
                this.imgUrl = assetUrl + '/placeholder.png';
                delete this.dataCopy.img;
            }
        }
    },
    watch: {
        item() {
            this.initializeData();
        }
    }
};
</script>

<style scoped>
.item-card {
    background-color: white;
}

@media screen and (max-width: 991px) {
    .item-img {
        height: 150px;
        width: 100%;
    }

    .control-buttons button {
        width: 50%;
    }
}

@media screen and (min-width: 992px) {
    .item-code {
        width: 30%;
        display: inline-block;
        padding-right: 5%;
    }

    .item-name {
        width: 60%;
        display: inline-block;
    }

    .item-img {
        height: 180px;
        width: 100%;
    }
}
</style>
