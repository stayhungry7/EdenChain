Ext.define('EExplorer.view.state.StateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modState',

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
