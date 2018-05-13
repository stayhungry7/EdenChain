Ext.define('EExplorer.store.Batches', {
    extend: 'Ext.data.Store',

    alias: 'store.stoBatches',

    model: 'EExplorer.model.Batch',

    proxy: {
        type: 'ajax',
        url: EExplorer.service.Const.BASE_URL+'apis/batches',
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
