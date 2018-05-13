Ext.define('EExplorer.model.Transaction', {
    extend: 'EExplorer.model.Base',

    fields: [
        'transaction_id',
        'size', 
        'payload', 
        'namespace',
        'namespace_version',
        'nonce',
        'inputs',
        'outputs',
        'dependencies',
        'signer_public_key',
        'batcher_public_key'
    ]
});
