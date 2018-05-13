/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.block.BlockDetail', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlBlockdetail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'detail-content-container',
    requires: [
        'EExplorer.store.Blocks',
    ],

    viewModel: {
        type: 'modBlock'
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
                    fieldLabel: 'Block #',
                    reference: 'txt_block_header_no',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Block ID',
                    reference: 'txt_block_header_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Time Stamp',
                    name: 'txt_block_time',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Batch Ct',
                    reference: 'txt_block_batch_count',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'TX Ct',
                    reference: 'txt_block_transaction_count',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Previous Block ID',
                    reference: 'txt_block_previous_block_id',
                    flex: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-arrow-left',
                    align: 'right',
                    handler: function()
                    {
                        this.fireEvent('onClickBlockBack');
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
                    cls: 'form-detail-style block-detail-style',
                    reference: 'form_block_detail',
                    title: 'Selected Block Details',        
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 130,
                        width: '100%',
                        readOnly: true,
                    },
                    items: 
                    [
                        {
                            fieldLabel: 'Block ID',
                            bind: {
                                value:'{recordBlock.block_id}'
                            },
                            reference: 'txt_block_id',
                            padding: '10 0 0 0',
                        },
                        {
                            fieldLabel: 'Signer Public Key',
                            bind: '{recordBlock.signer_public_key}',
                            reference: 'txt_signer_public_key',
                        },
                        {
                            fieldLabel: 'Previous Block ID',
                            bind: '{recordBlock.previous_block_id}',
                            reference: 'txt_previous_block_id',
                        },
                        {
                            fieldLabel: 'Batch ID',
                            bind: '{recordBlock.batch_ids}',
                            reference: 'txt_batch_ids',
                        },
                        {
                            fieldLabel: 'Block Number',
                            bind: '{recordBlock.block_num}',
                            reference: 'txt_block_num',
                        },
                        {
                            fieldLabel: 'Consensus',
                            bind: '{recordBlock.consensus}',
                            reference: 'txt_consensus',
                        },                
                        {
                            fieldLabel: 'State Root Hash',
                            bind: '{recordBlock.state_root_hash}',
                            reference: 'txt_state_root_hash',
                        },
                        {
                            fieldLabel: 'Batch Count',
                            bind: '{recordBlock.batch_count}',
                            reference: 'txt_batch_count',
                        },
                        {
                            fieldLabel: 'Transaction Count',
                            bind: '{recordBlock.transaction_count}',
                            reference: 'txt_transaction_count',
                        },
                    ]
                },
                {
                    xtype: 'grid',
                    reference: 'grid_block_batch',
                    title: 'Related Batch List',
                    padding: '20 0 0 0',
                    cls: 'grid-detail-style transparent-grid',
                    flex: 1,
                    columns: 
                    {
                        items:
                        [
                            { text: 'Batch ID',  dataIndex: 'batch_id',flex:1 },
                            { text: 'Size', dataIndex: 'size' },
                            { text: 'Signer Public Key', dataIndex: 'signer_public_key' },
                            { xtype: 'actioncolumn', width: 50, 
                                items: [
                                    {
                                        iconCls: 'x-fa fa-check green',
                                        handler: 'onClickBatch'
                                    }
                                ]
                            }
                        ]
                    },
                    listeners: {
                        itemdblclick: function(grid, record) 
                        {
                            this.fireEvent('onBlockItemDblClick',record);
                        },
                    }                                
                }
            ]
        },
        {
            xtype: 'chartBlock',
            flex: 1
        },
        {
            xtype: 'panel',
            title: 'Previous Block Details',
            text: 'Previous',
            cls: 'accordion-panel-detail',
            //width: 50,
            flex: 1,
            collapsed: true,
            collapsible: true,
            collapseDirection: 'right',
            headerPosition: 'left',
            header: {
                titleAlign: 'left',
                titleRotation: 2
            },
            animCollapse: false,
            listeners: {
                beforecollapse : function(p,direction,animate,eOpts) {
                    console.log('beforecollapse');
                    this.fireEvent('onPanelCollapse',p,direction,animate,eOpts);
                },
                beforeexpand : function(p,animate,eOpts) {
                    console.log('beforeexpand');
                    this.fireEvent('onPanelBeforeExpand',p,animate,eOpts);
                },                
                expand: function(p,eOpts) {
                    console.log('expand');
                    this.fireEvent('onPanelExpand',p,eOpts);
                }
            },
            items:
            [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    flex: 1,

                    items: [
                        {
                            width: 20,
                            bodyStyle: {
                                background: 'none'
                            }
                        },
                        {
                            xtype: 'pnlBlockdetailPrev'
                        }
                    ]
                },
            ]
        }

    ],

});
