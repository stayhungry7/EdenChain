Ext.define('EExplorer.view.batch.BatchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modBatch',

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
        storeBatch: {
            type: 'stoBatches',
            autoLoad: true,
            pageSize: 1000
        },
        storeTransaction: {
            type: 'stoTransactions',
            autoLoad: true,
            pageSize: 1000
        }        
    }
});
