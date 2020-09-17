var url = 'http://localhost:3000'
var assetUrl = url + '/public'

var path =
{
    menus:
    {
        index: '/menus'
    },
    items:
    {
        index: '/items'
    }
}

for (var key in path) {
    var obj = path[key]
    for (var key2 in obj) {
        path[key][key2] = url + path[key][key2]
    }
}

export { url, path, assetUrl }
