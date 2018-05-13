/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.transaction.TransactionDetail', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlTransactionDetail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'detail-content-container',
    requires: [],

    viewModel: {
        type: 'modTransaction'
    },

    dockedItems: 
    [
        {
            xtype: 'form',
            dock: 'top',
            itemId: 'form_tx_header',
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
                    fieldLabel: 'TX #',
                    reference: 'txt_tx_header_no',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Namespace',
                    reference: 'txt_tx_header_namespace',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'TX ID',
                    reference: 'txt_tx_header_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Time Stamp',
                    name: 'txt_tx_header_time',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Size',
                    reference: 'txt_tx_header_size',
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-arrow-left',
                    align: 'right',
                    handler: function()
                    {
                        this.fireEvent('onClickTXBack');
                    }
                }
            ]
        }
    ],

    items: 
    [
        {
            xtype: 'form',
            reference: 'form_transaction_detail',
            title: 'Selected Transaction Details',
            cls: 'form-detail-style',
            flex: 1,
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
                    fieldLabel: 'Namespace',
                    reference: 'txt_tx_namespace',
                    padding: '20 0 0 0',
                },
                {
                    fieldLabel: 'Transaction ID',
                    reference: 'txt_tx_id',
                },
                {
                    fieldLabel: 'Signer Public Key',
                    reference: 'txt_tx_signer_public_key',
                },
                {
                    fieldLabel: 'Batcher Public Key',
                    reference: 'txt_tx_batcher_public_key',
                },
                {
                    fieldLabel: 'Size',
                    reference: 'txt_tx_size',
                },
                {
                    fieldLabel: 'Nonce',
                    reference: 'txt_tx_nonce',
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Payload',
                    reference: 'txt_tx_payload',
                },
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:
            [
                {
                    xtype: 'grid',
                    reference: 'grid_tx_parameter',
                    cls: 'grid-detail-style transparent-grid',
                    title: 'Parameter',
                    flex: 1,  
                    columns: 
                    {
                        padding: '20 0 0 0',
                        items: 
                        [
                            { text: 'Type',  dataIndex: 'data_type',width:100 },
                            { text: 'TX ID',  dataIndex: 'tx_id',flex:1 },
                        ]            
                    } 
                },
                {
                    xtype: 'chartTX',
                }
            ]
        }
    ],

});
