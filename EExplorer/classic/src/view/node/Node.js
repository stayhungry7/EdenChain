/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.node.Node', {
    extend: 'Ext.container.Container',
    xtype: 'viewNode',
    controller: 'ctlNode',
    title: 'Node',
    reference: 'view_node',

    requires: [
        'EExplorer.store.Blocks',
        'EExplorer.view.block.BlockDetail',
    ],


    viewModel: {
        type: 'modNode'
    },

    items: [
        {
            xtype: 'grid',
            title: 'Block List',
            flex: 1,
            bind: '{storeBlock}',
            tools: 
            [
                { 
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'x-fa fa-wrench',
                    handler: function() 
                    {
                        console.log('BlockDetail.handler');
                        this.fireEvent('onClickBlockRefresh');
                    }
                },
            ],                        
            columns: [
                { text: 'Block ID',  dataIndex: 'header_signature',flex:1 },
                { text: 'Previous Block ID', dataIndex: 'previous_block_id', flex: 1 },
                { text: 'Block Num', dataIndex: 'block_num' },
                { text: 'batch count', dataIndex: 'batch_count' },
                { text: 'TX count', dataIndex: 'transaction_count' },
            ],
            listeners: {
                itemclick: function(grid, record) 
                {
                    var a_controller = this.getView().getController();
                    console.log('Blocks.itemclick',a_controller);

                    this.fireEvent('updateBlockDetail',record);
                },
                itemdblclick: function(grid, record) 
                {
                    console.log('itemdblclick');
                    var params = {'back':'EExplorer.view.main.Main','cmd':'viewTransaction','data':record};
                    var a_controller = EExplorer.app.getController('EController');
                    a_controller.movePage('EExplorer.view.txdetail.Txdetail',params);
                }
            },

        },
        {
        }
    ]
});
