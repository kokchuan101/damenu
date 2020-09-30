const url = `${process.env.VUE_APP_API_HOST}`;
const assetUrl = url + '/public';

const path =
{
    menus:
    {
        index: '/menus',
        categories: '/menus/categories',
        user: '/menus/user'
    },
    items:
    {
        index: '/items'
    },
    accounts:
    {
        index: '/accounts',
        login: '/accounts/login',
        resetPassword: '/accounts/reset'
    }
};

for (const key in path) {
    const obj = path[key];
    for (const key2 in obj) {
        path[key][key2] = url + path[key][key2];
    }
}

export { url, path, assetUrl };
