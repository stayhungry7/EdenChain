/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.transaction.Transaction', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewTransaction',
    itemId: 'view_transaction',
    reference: 'view_transaction',
    controller: 'ctlTransaction',
    title: '',

    requires: [
        'EExplorer.store.Transactions',    
    ],

    viewModel: {
        type: 'modTransaction'
    },

    layout: {
        type: 'card',
        align: 'stretch'
    },

    cls: 'has-gradient-transparent-background',

    bodyPadding: EExplorer.service.Const.DEFAULT_PADDING,

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
                    reference: 'lbl_tx_detail',
                    itemId: 'footer_tx',
                    cls: 'label-text',
                    html: '<h3><span>Transaction ID</span></h3>',
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Copy',
                    cls: 'action-button',
                    handler: function() {
                        this.fireEvent('onClickTXCopy');
                    }
                }
            ]
        }
    ],

    items: 
    [
        {
            xtype: 'container',
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            cls: 'has-transparent-background listing-content-container',
            items:
            [
                {
                    xtype: 'widgetPaging',
                    reference: 'widget_paging_tx'
                },
                {
                    xtype: 'grid',
                    reference: 'grid_tx_list',
                    id: 'card-tx-0',                    
                    cls: 'transparent-grid listing-container',
                    bind: '{storeTransaction}',

                    columns: [
                        { text: 'Namespace', dataIndex: 'namespace', width:140 },
                        { text: 'Transaction ID',  dataIndex: 'transaction_id',flex:1 },
                        { text: 'Size', dataIndex: 'size', width:80 },
                        { text: 'Nonce', dataIndex: 'nonce', width: 180 },
                        { text: 'Signer Public Key', dataIndex: 'signer_public_key', flex: 1 },
                        { text: 'Batcher Public Key', dataIndex: 'batcher_public_key', flex: 1 },
                    ],
                    listeners: {
                        itemclick: function(grid, record) 
                        {
                            var a_controller = this.getView().getController();
                            console.log('Transaction.itemclick',a_controller);

                            //this.getController().updateBlockDetail(record);
                            this.fireEvent('updateTransactionDetail',record);
                        },
                    },
                },
            ]
        },
        {
            xtype: 'pnlTransactionDetail',
            id: 'card-tx-1',
        }
    ]
});
