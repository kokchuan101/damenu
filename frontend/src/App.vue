<template>
    <v-app>
        <v-main>
            <router-view :key="$route.path"/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App'
};
</script>
