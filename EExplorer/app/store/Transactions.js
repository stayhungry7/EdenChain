Ext.define('EExplorer.store.Transactions', {
    extend: 'Ext.data.Store',
    alias: 'store.stoTransactions',
    model: 'EExplorer.model.Transaction',

    proxy: {
        type: 'ajax',
        url: EExplorer.service.Const.BASE_URL+'apis/transactions',
        method: 'GET',
        //params: { 'tx_id':'' },
        cors: true,
        contentType: 'application/json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad:true
});
