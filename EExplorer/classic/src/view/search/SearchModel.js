Ext.define('EExplorer.view.search.SearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modSearch',

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
            autoLoad: false,
            pageSize: 1000
        }
    }
});
