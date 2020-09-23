<template>
    <div class="row justify-content-center h-100 no-gutters">
        <div class="col-10 col-lg-8 row justify-content-center no-gutters shadow bg-white">
            <v-form class="col py-3 px-lg-10 px-3" v-model="valid" ref="form" @submit.prevent="handleSubmit">
                <div v-if="isEdit||isCreate">
                        <v-text-field
                        label="Menu Name"
                        class="name"
                        v-model="dataCopy.name"
                        :rules="rules.name"
                    ></v-text-field>
                    <v-text-field
                        label="Restaurant Name"
                        class="restaurant-name"
                        v-model="dataCopy.restaurantName"
                        :rules="rules.restaurantName"
                    ></v-text-field>
                </div>
                <div v-else class="menu-text">
                    <p>Menu Name:&nbsp;<span>{{ menu.name }}</span></p>
                    <p>Restaurant Name:&nbsp;<span>{{ menu.restaurantName }}</span></p>
                </div>
                <div v-if="isEdit||isCreate" class="d-flex justify-content-end control-buttons">
                    <v-btn color="success" type="submit" key="submit" >Save</v-btn>
                    <v-btn @click="onCancel" key="cancel" >Cancel</v-btn>
                </div>
                <div v-else class="d-flex justify-content-end control-buttons">
                    <v-btn color="info" @click="isEdit=true" >Edit</v-btn>
                    <v-btn color="error" @click="onDelete" >Delete</v-btn>
                </div>
            </v-form>
            <v-hover
                v-slot:default="{ hover }"
            >
                <div v-if="!isCreate" :class="hover? 'col-lg-4': ''" class="col-2 col-lg-2">
                    <v-btn
                        @click="$router.push({ name: 'MenuViewEditable', params: { id: dataCopy._id}})"
                        :color=" hover ? 'deep-purple darken-2' : 'deep-purple lighten-2'"
                        class="w-100 h-100">
                        <v-icon x-large>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>
            </v-hover>

        </div>
    </div>
</template>

<script>
import ValidationMixin from '@/app/mixins/validation.mixin.js';
import { path } from '@/constant.js';
import axios from 'axios';

export default {
    mixins: [ValidationMixin],
    props: {
        isCreate: {
            type: Boolean,
            default: false
        },
        menu: {
            type: Object,
            required: true
        }
    },
    created() {
        this.dataCopy = { ...this.menu };
    },
    data() {
        return {
            isEdit: false,
            valid: false,
            rules: {
                name: [this.required('Name')],
                restaurantName: [this.required('Restaurant Name')]
            },
            dataCopy: {}
        };
    },
    methods: {
        onCancel() {
            if (this.isEdit) {
                this.$refs.form.reset();
                this.dataCopy = { ...this.menu };
                this.isEdit = false;
            } else {
                this.$emit('cancelCreate');
            }
        },
        onDelete() {
            this.$alertify.confirm('Deleting item', () => {
                axios
                    .delete(path.menus.index + `/${this.dataCopy._id}`)
                    .then((response) => {
                        this.$alertify.success('Succesfully updated');
                        this.$emit('refreshData');
                    })
                    .catch((error) => {
                        this.$alertify.error(error);
                    });
            });
        },
        handleSubmit() {
            if (this.$refs.form.validate()) {
                if (this.isEdit) {
                    if (
                        JSON.stringify(this.dataCopy) ===
                        JSON.stringify(this.menu)
                    ) {
                        this.$alertify.error(
                            'Unable to update, no change detected.'
                        );
                    } else {
                        this.dataCopy.id = this.dataCopy._id;
                        axios
                            .patch(path.menus.index, this.dataCopy)
                            .then((response) => {
                                this.$alertify.success('Successfully updated');
                                this.$emit('refreshData');
                                this.isEdit = false;
                            })
                            .catch((error) => {
                                this.$alertify.error(
                                    error.response.data.message[0]
                                );
                            });
                    }
                } else {
                    this.dataCopy.userId = JSON.parse(sessionStorage.user)._id;
                    axios
                        .post(path.menus.index, this.dataCopy)
                        .then((response) => {
                            this.$alertify.success('Successfully added');
                            this.$emit('refreshData', true);
                        })
                        .catch((error) => {
                            this.$alertify.error(
                                error.response.data.message[0]
                            );
                        });
                }
            } else {
                this.$alertify.error('Validation error, please rectify fields');
            }
        }
    }
};
</script>

<style>
.menu-detail-wrapper {
    max-height: 10vh;
}

.menu-text span {
    font-weight: 700;
}

@media screen and (max-width: 991px) {
    .control-buttons button {
        width: 50%;
    }

    .menu-text p {
        font-size: 1.1em;
    }
}

@media screen and (min-width: 992px) {
    .menu-text p {
        font-size: 1.5em;
    }
}
</style>
