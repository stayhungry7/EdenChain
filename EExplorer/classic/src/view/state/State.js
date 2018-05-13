/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.state.State', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewState',
    reference: 'view_state',
    controller: 'ctlState',
    title: '',
    
    bodyPadding: EExplorer.service.Const.DEFAULT_PADDING,
    //padding: '20 20 20 20',

    requires: [
        'EExplorer.store.States',    
    ],

    viewModel: {
        type: 'modState'
    },
    
    cls: 'has-gradient-transparent-background',

    layout: {
        type: 'card',
        align: 'stretch'
    },

    listeners: {
        afterrender: function() {
           this.fireEvent('onAfterRender');
        },
        resize: function(view, width, height, oldWidth, oldHeight, eOpts) {
            //this.fireEvent('onResize',view, width, height, oldWidth, oldHeight, eOpts);
        }
    },

    dockedItems: 
    [
        {
            xtype: 'toolbar',
            fixed: true,
            ui: 'footer',
            cls: 'docked-toolbar-footer',
            dock: 'bottom',
            itemId: 'form_state_bottom',
            height: 80,
            padding: EExplorer.service.Const.DEFAULT_PADDING_BOTTOM_BLOCK,
            items:
            [
                {
                    xtype: 'component',
                    reference: 'lbl_state_detail',
                    cls: 'label-text',
                    itemId: 'footer_state',
                    html: '<h4><span>State ID</span></h4>',
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Copy',
                    cls: 'action-button',
                    handler: function() {
                        this.fireEvent('onClickStateCopy');
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
                align: 'stretch',
            },

            cls: 'has-transparent-background listing-content-container', 
            items:
            [
                {
                    xtype: 'widgetPaging',
                    //region: 'top',
                    
                },
                {
                    xtype: 'grid',
                    cls: 'transparent-grid listing-container',
                    //region: 'center',
                    reference: 'grid_state_list',
                    itemId: 'grid_state_list',
                    flex: 1,
                    bind: '{storeState}',

                    columns: 
                    [
                        { text: 'Head',  dataIndex: 'head', flex:1 },
                        { text: 'Paging Start', dataIndex: 'paging_start', width: 200 },
                        { text: 'Paging Limit', dataIndex: 'paging_limit', width: 200 },
                    ],

                    listeners: {
                        itemclick: function(grid, record) 
                        {
                            var a_controller = this.getView().getController();
                            this.fireEvent('updateStateDetail',record);
                        }
                    },

                }
            ]
        },
        {
            xtype: 'pnlStateDetail',
            flex: 1,
        }
    ]
});
