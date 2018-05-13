/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.block.BlockDetailPrev', {
    extend: 'Ext.panel.Panel',
    xtype: 'pnlBlockdetailPrev',
    reference: 'pnl_block_previous',

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    requires: [
        'EExplorer.store.Blocks',
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,

    items: 
    [
        {
            xtype: 'form',
            reference: 'form_prev_block_detail',
            title: 'Previous Block Detail',
            cls: 'form-detail-style purple-decoration',
            bodyPadding: 0,                        
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
                        value:'{recordPrevBlock.block_id}'
                    },
                    reference: 'txt_prev_block_id',
                    padding: '10 0 0 0',
                },
                {
                    fieldLabel: 'Signer Public Key',
                    bind: '{recordPrevBlock.signer_public_key}',
                    reference: 'txt_prev_signer_public_key',
                },
                {
                    fieldLabel: 'Previous Block ID',
                    bind: '{recordPrevBlock.previous_block_id}',
                    reference: 'txt_prev_previous_block_id',
                },
                {
                    fieldLabel: 'Batch ID',
                    bind: '{recordPrevBlock.batch_ids}',
                    reference: 'txt_prev_batch_ids',
                },
                {
                    fieldLabel: 'Block Number',
                    bind: '{recordPrevBlock.block_num}',
                    reference: 'txt_prev_block_num',
                },
                {
                    fieldLabel: 'Consensus',
                    bind: '{recordPrevBlock.consensus}',
                    reference: 'txt_prev_consensus',
                },                
                {
                    fieldLabel: 'State Root Hash',
                    bind: '{recordPrevBlock.state_root_hash}',
                    reference: 'txt_prev_state_root_hash',
                },
                {
                    fieldLabel: 'Batch Count',
                    bind: '{recordPrevBlock.batch_count}',
                    reference: 'txt_prev_batch_count',
                },
                {
                    fieldLabel: 'Transaction Count',
                    bind: '{recordPrevBlock.transaction_count}',
                    reference: 'txt_prev_transaction_count',
                },
            ]
        },
        {
            xtype: 'grid',
            reference: 'grid_prev_block_batch',
            title: 'Related Batch List',
            padding: '20 0 0 0',
            flex: 1,
            cls: 'grid-detail-style transparent-grid purple-decoration',
            columns: 
            {
                padding: '10 0 0 0',
                items:
                [
                    { text: 'Batch ID',  dataIndex: 'batch_id',flex:1 },
                    { text: 'Size', dataIndex: 'size' },
                    { text: 'Signer Public Key', dataIndex: 'signer_public_key' },
                    { xtype: 'actioncolumn', width: 50, 
                        items: [
                            {
                                iconCls: 'x-fa fa-check green',
                                handler: 'onClickPrevBatch'
                            }
                        ]
                    }
                ]
            }            
        }
    ],

});
