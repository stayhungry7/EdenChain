/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'viewDashboard',
    reference: 'view_dashboard',

    controller: 'ctlDashboard',
    viewModel: 'modDashboard',

    requires: [
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Area',
        'Ext.chart.interactions.ItemHighlight'
    ],
    id: 'dashboard-container',

    title: 'Dashboard',
    layout: {
        type: 'vbox',
        align: 'stretch',
    },

    items: 
    [
        {
            xtype: 'panel',
            title: '',
            html: '<h1>Good Morning!</h1>',
            dockedItems: 
            [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'headerBar_dashboard',
                    cls: 'search-toolbar-dashboard',
                    defaults: {
                        textAlign: 'left',
                    },
                    buttonAlign: 'right',
                    items: 
                    [
                        {
                            xtype: 'component',
                            flex: 1
                        },
                     {
                            iconCls: 'fa fa-search',
                            cls: 'search-icon-btn',
                            xtype: 'button',
                            align: 'right',
                            handler: function() {
                                this.fireEvent('onClickDashboardSearch');
                            }
                        }
                    ]
                }
            ],

        },
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: 
            [
                {
                    xtype: 'panel',
                    flex: 2,
                    layout: {
                        xtype: 'vbox',
                        align: 'stretch',
                    },
                    cls: 'left-container-dashboard',
                    items: 
                    [
                        {
                            xtype: 'chartStat',
                            padding: '0 10 0 0',
                            flex:1
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            cls: 'number-box-dashboard',
                            items:
                            [
                                {
                                    xtype:'widgetBox',
                                    containerColor: 'green',
                                    reference: 'wgt_namespace',
                                    flex: 1,
                                    data: {
                                        amount: 611,
                                        type: 'Namespace',
                                    }            
                                },
                                {
                                    xtype:'widgetBox',
                                    containerColor: 'green',
                                    reference: 'wgt_blockcount',
                                    flex: 1,
                                    data: {
                                        amount: 0,
                                        type: 'Block Count',
                                    },
                                },
                                {
                                    xtype:'widgetBox',
                                    containerColor: 'green',
                                    reference: 'wgt_batchcount',
                                    flex: 1,
                                    data: {
                                        amount: 0,
                                        type: 'TX Count',
                                    },
                                },
                                {
                                    xtype:'widgetBox',
                                    containerColor: 'green',
                                    reference: 'wgt_txcount',
                                    flex: 1,
                                    data: {
                                        amount: 0,
                                        type: 'TX Count',
                                    },
                                }

                            ]                            
                        }                        
                    ]
                },
                {
                    xtype: 'grdData',
                    flex: 1,
                }
            ]

        },
    ]
});
