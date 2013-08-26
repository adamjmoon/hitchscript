Package.describe({
    summary: "itchcork",
    internal: false, // optional, will not show with meteor list if false
    environments: ['client'] // optional. Supposedly specifies environments to load package, but i did not find any package that specifies this key.
});


Package.on_use(function (api) {

    api.add_files('require.js', 'client');
    api.add_files('itchcork.js', 'client');



    api.use('itchcork', 'client');
});