Ext.define('EExplorer.model.Blocks', {
    extend: 'EExplorer.model.Base',

    fields: [
        'header_signature', 
        'consensus', 
        'batch_ids',
        'signer_public_key',
        'previous_block_id',
		'transaction_count',
		'batch_count',
		'state_root_hash',
		'block_num'
    ]
});
