/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.state.StateDetail', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlStateDetail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'detail-content-container',
    requires: [],

    viewModel: {
        type: 'modState'
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
                    fieldLabel: 'State #',
                    reference: 'txt_state_header_no',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Head',
                    reference: 'txt_state_header_head',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Paging Start',
                    reference: 'txt_state_header_start',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Paging End',
                    reference: 'txt_state_header_end',
                    flex: 1
                },
                {
                    xtype: 'button',
//                    text: '<-',
                    iconCls: 'fa fa-arrow-left',
                    align: 'right',
                    handler: function()
                    {
                        this.fireEvent('onClickStateBack');
                    }
                }
            ]
        }
    ],

    items: 
    [
        {
            xtype: 'panel',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:
            [
                {
                    xtype: 'form',
                    reference: 'form_state_detail',
                    title: 'Selected State Details',
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
                            fieldLabel: 'Head',
                            reference: 'txt_state_head',
                            padding: '10 0 0 0',
                        },
                        {
                            fieldLabel: 'Paging Start',
                            reference: 'txt_state_paging_start',
                        },
                        {
                            fieldLabel: 'Paging Limit',
                            reference: 'txt_state_paging_limit',
                        },
                    
                    ]
                },

                {
                    xtype: 'chartState',
                    flex:1,
                }
            ]
        },
        {
            xtype: 'grid',
            reference: 'grid_state_parameter',
            cls: 'grid-detail-style transparent-grid',
            title: 'Parameter',
            flex: 1,  
            columns: 
            {
                padding: '10 0 0 0',
                items:
                [
                    { text: 'Address',  dataIndex: 'address',flex:0.4 },
                    { text: 'Data',  dataIndex: 'data',flex:0.6 },
                ]
            }        
        }
    ],

});
