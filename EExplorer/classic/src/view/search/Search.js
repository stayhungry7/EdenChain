/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.search.Search', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewSearch',
    controller: 'ctlSearch',
    reference: 'view_search',
    itemId: 'view_search',

    requires: [
        'EExplorer.store.Blocks',
        'EExplorer.view.block.BlockDetail',
    ],


    viewModel: {
        type: 'modSearch'
    },

    bodyPadding: EExplorer.service.Const.DEFAULT_PADDING,
    cls: 'has-gradient-transparent-background',
    
    dockedItems: 
    [
        {
            xtype: 'toolbar',
            dock: 'top',
            itemId: 'toolbar_search_header',
            layout: 'hbox',

            defaults: {
                textAlign:'left',
            },
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side'
            },            
            cls: 'search-form-container',
            items:
            [
                {
                    xtype: 'textfield',
                    fieldLabel: '',
                    emptyText: 'Search by Transaction ID',
                    submitEmptyText: false,
                    reference: 'txt_search_keyword',
                    cls: 'search-input-field',
                    width: '90%',
                },
                '->',
                {
                    iconCls: 'fa fa-search',
                    cls: 'search-icon-btn',
                    xtype: 'button',
                    align: 'right',
                    handler: function()
                    {
                        this.fireEvent('onClickSearchData');
                    }
                }
            ]
        }
    ],

    items: 
    [
        {
            xtype: 'panel',
            cls: 'has-transparent-background listing-content-container',
            items:
            [
                {
                    xtype: 'displayfield',
                    reference: 'lbl_search_result',
                    fieldLabel: '',
                    labelWidth: 500,
                    cls: 'search-result-text',
                    padding: '20 0 0 10',
                    width: '100%',                    
                    value: ''
                },
                {
                    xtype: 'grid',
                    cls: 'transparent-grid listing-container',
                    bind: '{storeTransaction}',
                    flex: 1,
                    columns: 
                    [
                        { text: 'Namespace', dataIndex: 'namespace', width:160 },
                        { text: 'Transaction ID',  dataIndex: 'transaction_id',flex:1 },
                        { text: 'Size', dataIndex: 'size', width:80 },
                        { text: 'Nonce', dataIndex: 'nonce', width:180 },
                        { text: 'Signer Public Key', dataIndex: 'signer_public_key', flex: 1 },
                        { text: 'Batcher Public Key', dataIndex: 'batcher_public_key', flex: 1 },
                        { xtype: 'actioncolumn', width: 50, 
                            items: [
                                {
                                    text: 'Select',
                                    iconCls: 'x-fa fa-check green',
                                    handler: 'onClickSearchTX'
                                }
                            ]
                        }                                

                    ],
                    listeners: 
                    {
                        itemclick: function(grid, record) 
                        {
                            console.log('Search.itemclick');
                            this.fireEvent('showTXDetail',record);
                        },
                    },

                },
            ]
        },
    ]
});
