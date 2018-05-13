Ext.define('EExplorer.view.common.WidgetBox', {
    extend: 'Ext.panel.Panel',
    xtype: 'widgetBox',

    //cls: 'admin-widget-small sale-panel info-card-item shadow',

	containerColor: '',

    height: 170,

    data: {
        amount: 0,
        type: '',
        icon: ''
    },

    tpl: '<div class="info-card-item">' + 
    '<h2>{amount}</h2>' + 
    '<div>{type}</div>' + 
    '<span class="x-fa fa-{icon}"></span>' +
    '</div>',

    initComponent: function()
    {
        var me = this;

        Ext.apply(me, {
            cls: me.config.containerColor
        });

        me.callParent(arguments);
    },

    updateWidget: function(value,msg,icon_name)
    {
        this.update({
            amount: value,
            type: msg,
            icon: icon_name
        });
    }
});
