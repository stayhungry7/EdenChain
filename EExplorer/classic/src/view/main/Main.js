/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.XTemplate',
        'EExplorer.ux.*',
        'EExplorer.view.*',
        'EExplorer.store.*',
    ],
    cls: 'app-main-container',
    controller: 'main',
    viewModel: 'main',

    layout: {
        type: 'border',
        align: 'stretch'
    },

    listeners: {
        show: function() {
           this.fireEvent('onShow');
        },
        beforerender: function() {
           this.fireEvent('onBeforeRender');
        },
        afterrender: function() {
           this.fireEvent('onAfterRender');
        },
		resize: function(view, width, height, oldWidth, oldHeight, eOpts) {
            this.fireEvent('onResize',view, width, height, oldWidth, oldHeight, eOpts);
        }
    },

    items: 
    [
        {
            xtype: 'panel',
            region: 'west',
 
            dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'left',
                itemId: 'headerBar',
                cls: 'sencha-dash-dash-headerbar shadow',
                padding: 0,
                id: 'tool-bar-main-menu',
                defaults: {
                    textAlign:'left',
					anchor: '100%-10'
                },

                items: 
                [
                    {
                        id: 'main-app-logo',
                        xtype: 'component',
                        cls: 'app-logo main-logo',
                        html: ''
                    },
                    {
                        iconCls: 'dashboard-icon', 
                        xtype: 'button',
                        reference: 'btn_main_dashboard',
                        handler: function() {
                            this.fireEvent('onClickDashboard');
                        }
                    },
                    {
                        iconCls: 'console-icon',
                        xtype: 'button',
                        handler: function() {
                            this.fireEvent('onClickBlock');
                        }
                    },
                    {
                        iconCls: 'app-icon',
                        xtype: 'button',
                        handler: function() {
                            this.fireEvent('onClickBatch');
                        }
                    },
                    {
                        iconCls: 'statistic-icon',
                        xtype: 'button',
                        handler: function() {
                            this.fireEvent('onClickTX');
                        }
                    },
                    {
                        iconCls: 'setting-icon',
                        xtype: 'button',
                        handler: function() {
                            this.fireEvent('onClickState');
                        }
                    },
                    {
                        iconCls: 'search-icon',
                        xtype: 'button',
                        handler: function() 
                        {
                            this.fireEvent('onClickSearch');
                        }
                    },                
                ]
            }
            ]
        },
        {  
            xtype: 'container',
            region: 'center',
            reference: 'view_container',
            itemId: 'view_container',
            cls: 'right-main-container',
            scrollable: true,
        },
    ]

});
