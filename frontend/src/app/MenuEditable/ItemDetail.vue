<template>
    <div class="item-card">
        <v-form v-model="valid" ref="form" @submit.prevent="handleSubmit" class="row no-gutters">
            <div class="col-4 col-lg-2">
                <input type="hidden" name="menuId" :value="dataCopy.menuId" />
                <img class="item-img" :src="imgUrl" />
                <v-file-input v-if="isEdit||isCreate" name="img" @change="previewImg"></v-file-input>
            </div>
            <div class="col-8 col-lg-10 row">
                <div class="col-12 col-lg-4">
                    <v-text-field
                        name="code"
                        class="item-code"
                        v-model.trim="dataCopy.code"
                        label="Code"
                        counter="4"
                        :rules="rules.code"
                        :filled="!(isEdit||isCreate)"
                        :readonly="!(isEdit||isCreate)"
                        :clearable="isEdit||isCreate"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        class="item-name"
                        v-model.trim="dataCopy.name"
                        label="Name"
                        :rules="rules.name"
                        :filled="!(isEdit||isCreate)"
                        :readonly="!(isEdit||isCreate)"
                        :clearable="isEdit||isCreate"
                    ></v-text-field>
                </div>
                <div class="col-12 col-lg-3">
                    <v-autocomplete
                        class="item-category"
                        v-model.trim="dataCopy.category"
                        :items="categories"
                        label="Category"
                        :rules="rules.category"
                        :filled="!(isEdit||isCreate)"
                        :readonly="!(isEdit||isCreate)"
                        :clearable="isEdit||isCreate"
                    ></v-autocomplete>
                    <v-text-field
                        name="price"
                        class="item-price"
                        v-model="dataCopy.price"
                        @blur="formatPrice"
                        label="Price"
                        :rules="rules.price"
                        :filled="!(isEdit||isCreate)"
                        :readonly="!(isEdit||isCreate)"
                        :clearable="isEdit||isCreate"
                        prefix="RM"
                        type="number"
                        step=".01"
                    ></v-text-field>
                </div>
                <div class="col-12 col-lg-5">
                    <v-textarea
                        name="description"
                        label="Description"
                        v-model.trim="dataCopy.description"
                        :rules="rules.description"
                        :filled="!(isEdit||isCreate)"
                        :readonly="!(isEdit||isCreate)"
                        :clearable="isEdit||isCreate"
                    ></v-textarea>
                </div>
            </div>
            <div class="col-12">
                <div v-if="isEdit||isCreate" class="float-right">
                    <v-btn color="success" type="submit" key="submit">Save</v-btn>
                    <v-btn @click="onCancel" key="cancel">Cancel</v-btn>
                </div>
                <div v-else class="float-right">
                    <v-btn color="info" @click="isEdit=true">Edit</v-btn>
                    <v-btn color="error" @click="onDelete">Delete</v-btn>
                </div>
            </div>
        </v-form>
    </div>
</template>

<script>
import { assetUrl, path } from '@/constant.js'
import axios from 'axios'
import alertify from 'alertifyjs'
import validationMixin from '@/app/mixins/validation.mixin.js'

export default {
    mixins: [validationMixin],
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
                price: [this.required('Price'), this.numeric('Price')]
            }
        }
    },
    created() {
        this.isEdit = false
        this.initializeData()
    },
    methods: {
        initializeData() {
            this.item.price = parseFloat(this.item.price).toFixed(2)
            this.dataCopy = { ...this.item }
            this.imgUrl = assetUrl + this.dataCopy.img
        },
        formatPrice() {
            if (this.dataCopy.price) {
                this.dataCopy.price = parseFloat(this.dataCopy.price).toFixed(2)
            } else {
                this.dataCopy.price = parseFloat(0.0).toFixed(2)
            }
        },
        handleSubmit(event) {
            if (this.$refs.form.validate()) {
                const form = new FormData(event.target)
                form.append('category', this.dataCopy.category)

                if (this.isCreate) {
                    axios
                        .post(path.items.index, form)
                        .then((response) => {
                            this.$alertify.success('Succesfully Added')
                            this.$emit('refreshData', this.item.category, true)
                        })
                        .catch((error) => {
                            this.$alertify.error(error.response.data.message[0])
                        })
                } else {
                    form.append('id', this.dataCopy._id)

                    if (
                        JSON.stringify(this.dataCopy) ===
                        JSON.stringify(this.item)
                    ) {
                        this.$alertify.error(
                            'Unable to update, no change detected.'
                        )
                    } else {
                        axios
                            .patch(path.items.index, form)
                            .then((response) => {
                                this.$alertify.success('Succesfully updated')
                                this.refreshData()
                            })
                            .catch((error) => {
                                this.$alertify.error(error.response.data.message[0])
                            })
                    }
                }
            } else {
                this.$alertify.error('Validation error, please rectify fields')
            }
        },
        previewImg(file) {
            if (file) {
                this.imgUrl = URL.createObjectURL(file)
            }
        },
        onCancel() {
            if (this.isEdit) {
                this.initializeData()
                this.isEdit = false
            } else {
                this.$emit('cancelCreate')
            }
        },
        onDelete() {
            this.$alertify.confirm('Deleting item', () => {
                axios
                    .delete(path.items.index + `/${this.dataCopy._id}`)
                    .then((response) => {
                        alertify.success('Succesfully updated')
                        this.refreshData()
                    })
                    .catch((error) => {
                        this.$alertify.error(error)
                    })
            })
        },
        refreshData() {
            this.$emit('refreshData', this.item.category)
            this.isEdit = false
        }
    },
    watch: {
        item() {
            this.initializeData()
        }
    }
}
</script>

<style scoped>
.item-img {
    max-height: 90%;
    max-width: 90%;
}

.item-card {
    background-color: aliceblue;
    border-bottom: 2px black solid;
}

@media screen and (max-width: 991px) {
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
}
</style>
