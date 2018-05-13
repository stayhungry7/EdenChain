/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.block.Block', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewBlock',
    controller: 'ctlBlock',
    title: '',
    reference: 'view_block',

    requires: [
        'EExplorer.store.Blocks',
        'EExplorer.view.block.BlockDetail',
    ],


    viewModel: {
        type: 'modBlock'
    },

    layout: {
        type: 'card',
    },

    bodyPadding: EExplorer.service.Const.DEFAULT_PADDING,
    cls: 'has-gradient-transparent-background',
    dockedItems: 
    [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            fixed: true,
            ui: 'footer',
            cls: 'docked-toolbar-footer',
            itemId: 'form_block_bottom',
            padding: EExplorer.service.Const.DEFAULT_PADDING_BOTTOM_BLOCK,
            height: 80,
            items:
            [
                {
                    xtype: 'component',
                    reference: 'lbl_block_detail',
                    itemId: 'footer_block',
                    cls: 'label-text',
                    html: '<h3><span>Block ID</span></h3>',
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Copy',
                    cls: 'action-button',
                    handler: function() {
                        this.fireEvent('onClickBlockCopy');
                    }
                }
            ]
        }
    ],


    items: 
    [
        {
            xtype: 'viewBlockList',
            //title: 'Block List',
            reference: 'grid_block_list',
            flex: 1,
            id: 'card-0',
        },
        {
            xtype: 'pnlBlockdetail',
            id: 'card-1',
        }
    ]
});
