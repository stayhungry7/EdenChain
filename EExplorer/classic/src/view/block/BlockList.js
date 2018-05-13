/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.block.BlockList', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewBlockList',
    title: '',
    reference: 'view_blocklist',

    viewModel: {
        type: 'modBlock'
    },    
    cls: 'has-transparent-background listing-content-container',
    items: 
    [
        {
            xtype: 'widgetPaging',
        },
        {
            xtype: 'grid',
            reference: 'grid_block_list',
            flex: 1,
            bind: '{storeBlock}',
            cls: 'transparent-grid listing-container',
                                
            columns: 
            {
                items:
                [
                    { text: 'Block #', dataIndex: 'block_num' },
                    { text: 'Block ID',  dataIndex: 'header_signature',flex:1 },
                    { text: 'Batch Ct', dataIndex: 'batch_count' },
                    { text: 'TX Ct', dataIndex: 'transaction_count' },
                    { text: 'Previous Block ID', dataIndex: 'previous_block_id', flex: 1 },                                        
                ],
            },

            listeners: 
            {
                itemclick: function(grid, record) 
                {
                    var a_controller = this.getView().getController();
                    this.fireEvent('updateBlockDetail',record);
                },
                itemdblclick: function(grid, record) 
                {
                    console.log('itemdblclick');
                    var params = {'back':'EExplorer.view.main.Main','cmd':'viewTransaction','data':record};
                    var a_controller = EExplorer.app.getController('EController');
                }
            },

        },
    ]
});
