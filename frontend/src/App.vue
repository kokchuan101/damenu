<template>
    <v-app style="background:#E0E0E0">
        <v-app-bar
            app
            dense
            v-if="user"
        >

            <v-app-bar-nav-icon
                v-if="$vuetify.breakpoint.lgAndDown"
                @click.stop="drawer = true">
            </v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <div v-if="$vuetify.breakpoint.lgAndUp">
                <v-btn text><v-icon>mdi-account</v-icon>{{user}}</v-btn>
                <v-btn @click=logout dark>Logout</v-btn>
            </div>
        </v-app-bar>

        <v-navigation-drawer
            app
            v-if="$vuetify.breakpoint.lgAndDown"
            v-model="drawer">
            <v-list>
                <v-list-item class="h4 font-weight-bold"><v-icon class="mr-3">mdi-account</v-icon>{{user}}</v-list-item>
                <v-divider></v-divider>
                <v-list-item><v-btn @click=logout block dark>Logout</v-btn></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view :key="$route.path"/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            drawer: false,
            user: null
        };
    },
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.push({ name: 'LoginView' });
        }
    },
    updated() {
        this.$nextTick(() => {
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user).name;
            } else {
                this.user = null;
            }
        });
    }
};
</script>
