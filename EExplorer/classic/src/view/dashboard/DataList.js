/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.dashboard.DataList', {
    extend: 'Ext.panel.Panel',
    xtype: 'grdData',
    layout: {
        type: 'fit',
        align: 'stretch'
    },

    requires: [
        'EExplorer.ux.Mediator',
        'EExplorer.store.Blocks',
        'EExplorer.store.Transactions',
    ],
    cls: 'custom-chart-style',
    items: 
    [
    
        {
            xtype: 'grid',
            title: 'Newest Transactions',
            flex: 1,
            cls: 'newest-transactions-dashboard',
            layout: {
                type:'fit',
                align: 'stretch',
                pack:'start',
            },

            store: {
                type: 'stoTransactions'
            },
            padding: '10 10 10 10',

            columns: 
            [
                { text: 'TX ID',  dataIndex: 'transaction_id',flex:1 },
                { text: 'Size', dataIndex: 'size', width: 60 },
                { text: 'Namespace', dataIndex: 'namespace', width:120 },
                {
                    xtype: 'actioncolumn',
                    text: 'Select',
                    width: 80,
                    menuDisabled: true,
                    sortable: false,

                    items: 
                    [
                        {
                            iconCls: 'x-fa fa-check green',
                            handler: 'onSelectTX'
                        }
                    ]
                },                
            ],

            listeners: {
                itemdblclick: function(grid, record) 
                {
                    var params = {'data':record};
                    var a_controller = EExplorer.app.getController('EController');
                    a_controller.movePage('EExplorer.view.transaction.Transaction',params);
                } 
            },
        },
    ],

});
