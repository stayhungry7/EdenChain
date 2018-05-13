Ext.define('EExplorer.store.States', {
    extend: 'Ext.data.Store',

    alias: 'store.stoStates',

    model: 'EExplorer.model.State',

    proxy: {
        type: 'ajax',
        url: EExplorer.service.Const.BASE_URL+'apis/states',
        method: 'GET',
        cors: true,
        contentType: 'application/json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad:true
});
