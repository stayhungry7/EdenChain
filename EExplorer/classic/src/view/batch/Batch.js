/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.batch.Batch', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewBatch',
    reference: 'view_batch',
    controller: 'ctlBatch',
    
    title: '',

    bodyPadding: EExplorer.service.Const.DEFAULT_PADDING,

    requires: [
        'EExplorer.store.Batches',    
    ],

    viewModel: {
        type: 'modBatch'
    },
    
    cls: 'has-gradient-transparent-background',
    
    layout: {
        type: 'card',
    },

    dockedItems: 
    [
        {
            xtype: 'toolbar',
            fixed: true,
            ui: 'footer',
            cls: 'docked-toolbar-footer',
            dock: 'bottom',
            itemId: 'form_block_bottom',
            height: 80,
            padding: EExplorer.service.Const.DEFAULT_PADDING_BOTTOM_BLOCK,
            items:
            [
                {
                    xtype: 'component',
                    reference: 'lbl_batch_detail',
                    itemId: 'footer_batch',
                    cls: 'label-text',
                    html: '<h3><span>Batch ID</span></h3>',
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Copy',
                    cls: 'action-button',
                    handler: function() {
                        this.fireEvent('onClickBatchCopy');
                    }
                }
            ]
        }
    ],


    items: 
    [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            cls: 'has-transparent-background listing-content-container',
            items:
            [
                {
                    xtype: 'widgetPaging',
                },
                {
                    xtype: 'grid',
                    reference: 'grid_batch_list',
                    id: 'card-batch-0',
                    cls: 'transparent-grid listing-container',
                    flex: 1,
                    bind: '{storeBatch}',
                    columns: [
                        { text: 'Batch ID',  dataIndex: 'header_signature',flex:1 },
                        { text: 'Size', dataIndex: 'size', width:100 },
                        { text: 'Signer Public Key', dataIndex: 'signer_public_key', width:280 },
                    ],
                    listeners: {
                        itemclick: function(grid, record) 
                        {
                            var a_controller = this.getView().getController();
                            console.log('Batch.itemclick',a_controller);

                            //this.getController().updateBlockDetail(record);
                            this.fireEvent('updateBatchDetail',record);
                        },
                    },

                }
            ]

        },
        {
            xtype: 'pnlBatchdetail',
            id: 'card-batch-1',
            flex: 1,
        }
    ]
});
