Ext.define('EExplorer.view.block.BlockModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modBlock',

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
        recordPrevBlock: {
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
        record: null,
    },

    stores: {
        storeBlock: {
            type: 'stoBlocks',
            autoLoad: true,
            pageSize: 1000
        },
        storeBatch: {
            type: 'stoBatches',
            autoLoad: true,
            pageSize: 1000
        }
    }
});
