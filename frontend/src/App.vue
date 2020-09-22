<template>
    <v-app style="background:#E0E0E0">
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
