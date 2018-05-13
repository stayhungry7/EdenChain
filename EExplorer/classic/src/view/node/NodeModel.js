Ext.define('EExplorer.view.node.NodeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modNode',

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
        storeState: {
            type: 'stoStates',
            autoLoad: true,
            pageSize: 1000
        }
    }
});
