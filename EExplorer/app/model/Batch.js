Ext.define('EExplorer.model.Batch', {
    extend: 'EExplorer.model.Base',

    fields: [
        'header_signature', 
        'size', 
        'signer_public_key',
        'transaction_ids',
        'transactions',
    ]
});
