Ext.define('EExplorer.view.transaction.TransactionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modTransaction',

    data: {
        greeting: null,
        range: 'upcoming',
        time: null,
        recordBlock: {
            block_id: '',
            signer_public_key: '',
            previous_block_id: '',
            batch_ids: '',
            block_num: '',
            consensus: '',
            state_root_hash: '',
            batch_count: '',
            transaction_count: '',
        },
    },

    stores: {
        storeTransaction: {
            type: 'stoTransactions',
            autoLoad: true,
            pageSize: 1000
        }
    }
});
