/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.batch.BatchDetail', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlBatchdetail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'detail-content-container',
    requires: [
        'EExplorer.store.Batches',
    ],

    viewModel: {
        type: 'modBatch'
    },

    dockedItems: 
    [
        {
            xtype: 'form',
            dock: 'top',
            itemId: 'form_block_header',
            'cls': 'form-block-header',
            layout: 'hbox',

            defaults: {
                textAlign:'left',
            },
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side',
                readOnly: true,                
            },            

            items:
            [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Batch #',
                    reference: 'txt_batch_header_no',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Batch ID',
                    reference: 'txt_batch_header_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Time Stamp',
                    name: 'txt_batch_header_time',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Size',
                    reference: 'txt_batch_header_size',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Signer Public Key',
                    reference: 'txt_batch_header_signer_public_key',
                    flex: 1
                },
                {
                    xtype: 'button',
//                    text: '<-',
                    iconCls: 'fa fa-arrow-left',
                    align: 'right',
                    handler: function()
                    {
                        this.fireEvent('onClickBatchBack');
                    }
                }
            ]
        }
    ],

    items: 
    [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            items:
            [
                {
                    xtype: 'form',
                    reference: 'form_batch_detail',
                    title: 'Selected Batch Details',
                    cls: 'form-detail-style',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 150,
                        width: '100%',
                        readOnly: true,                
                    },
                    items: 
                    [
                        {
                            fieldLabel: 'Batch ID',
                            reference: 'txt_batch_id',
                            padding: '20 0 0 0',
                        },
                        {
                            fieldLabel: 'Signer Public Key',
                            reference: 'txt_batch_signer_public_key',
                        },
                        {
                            fieldLabel: 'Size',
                            reference: 'txt_batch_size',
                        },
                        {
                            fieldLabel: 'Transaction ID',
                            reference: 'txt_batch_transaction_ids',
                        },                
                    ]
                },
                {
                    xtype: 'chartBatch',
                }

            ]
        },
        {
            xtype: 'grid',
            reference: 'grid_batch_tx',
            title: 'Related Transaction List',
            cls: 'grid-detail-style transparent-grid',
            flex: 1,  
            columns: 
            {
                padding: '0 0 0 0',
                items:
                [
                    { text: 'Namespace',  dataIndex: 'namespace', width:110 },
                    { text: 'TX ID',  dataIndex: 'tx_id',flex:1 },
                    { text: 'From Count', dataIndex: 'input_size' },
                    { text: 'To Count', dataIndex: 'output_size' },
                    { xtype: 'actioncolumn', width: 50, 
                        items: [
                            {
                                iconCls: 'x-fa fa-check green',
                                handler: 'onClickTransaction'
                            }
                        ]
                    }                                
                ],
            },
            listeners: {
                itemdblclick: function(grid, record) 
                {
                    this.fireEvent('onBatchItemDblClick',record);
                },
            }                                
            
        }
    ],

});
