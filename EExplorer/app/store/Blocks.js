Ext.define('EExplorer.store.Blocks', {
    extend: 'Ext.data.Store',

    alias: 'store.stoBlocks',

    model: 'EExplorer.model.Blocks',

    proxy: {
        type: 'ajax',
        url: EExplorer.service.Const.BASE_URL+'apis/blocks',
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
