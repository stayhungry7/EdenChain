Ext.define('EExplorer.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modDashboard',

    data: {
        greeting: null,
        range: 'upcoming',
        time: null,
    },

    stores: {
        storeState: {
            type: 'stoStates',
            autoLoad: true,
            pageSize: 1000
        },
        storeTransaction: {
            type: 'stoTransactions',
            autoLoad: true,
            pageSize: 1000
        },
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
