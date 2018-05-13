/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EExplorer.view.main.MainContainer', {
    extend: 'Ext.tab.Panel',
    xtype: 'appcontainer',
    itemId: 'view_container',
    requires: [],

    ui: 'navigation',
    scrollable: 'y',
    layout: {
        type: 'fit',
    },
    
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    tabPosition: 'left',

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'left'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
    {
        title: 'Dashboard',
        iconCls: 'fa-home',
        items: [{
            xtype: 'viewDashboard'
        }]
    }, {
        title: 'Block',
        iconCls: 'fa-user',
        items: [{
            xtype: 'viewBlock'
        }]
    }, {
        title: 'Batch',
        iconCls: 'fa-users',
        items: [{
            xtype: 'viewBatch'
        }]
    }, {
        title: 'Transaction',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'viewTransaction'
        }]
    }, {
        title: 'State',
        iconCls: 'fa-cog',
        items: [{
            xtype: 'viewState'
        }]
    }, {
        title: 'Search',
        iconCls: 'fa-cog',
        width: 10,
        items: [{
            xtype: 'viewSearch'
        }]
    }],


});
