/**
 * This view is an example list of people.
 */
Ext.define('EExplorer.view.main.Home', {
    extend: 'Ext.container.Container',
    xtype: 'view_home',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    itemId: 'view_home',
    
    requires: [
    ],

    title: 'Home',

    items: [
        {
            xtype:'panel',
            title:'test2',
            flex: 1,
        },
        {
            xtype: 'mainlist',
            flex: 1,
        }
    ]

});
