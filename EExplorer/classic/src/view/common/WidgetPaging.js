Ext.define('EExplorer.view.common.WidgetPaging', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'widgetPaging',
    title: '',
    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center',
    },

    height: 70,
    padding: '10 0 20 0',

    data: {
        max_value: 10,
    },

    items: 
    [
        {
            xtype: 'button',
            text: '<<',
            handler: function() {
                console.log('widgetPaging.First');
                this.fireEvent('onPagingClick','first');
            }
        },
        {
            xtype: 'button',
            text: '<',
            handler: function() {
                console.log('widgetPaging.Prev');
                this.fireEvent('onPagingClick','prev');                
            }            
        },
        {
            xtype: 'slider',
            //anchor: '95%',
            width: '80%',
            fieldLabel: '',
            value: 1,
            minValue: 1,
            maxValue: 1,
            bind: {
                maxValue: '{max_value}',
            },
            increment: 1,
            //name: 'slider_paging',
            reference: 'slider_paging',
            setMaxValue: function(value) {
                this.maxValue = value;
            },
            listeners: {
                beforeChange: function(slider, newValue, oldValue, thumb, type, eOpts) 
                {
                    console.log('widgetPaging.beforeChange');
                    this.fireEvent('onPagingChange',slider, newValue, oldValue);
                }
            }
        },
        {
            xtype: 'button',
            text: '>',
            handler: function() {
                //console.log('widgetPaging.Next');
                this.fireEvent('onPagingClick','next');                
            }            
        },
        {
            xtype: 'button',
            text: '>>',
            handler: function() {
                console.log('widgetPaging.Last');
                this.fireEvent('onPagingClick','last');
            }            
        },                        
    ],

    initComponent: function()
    {
        var me = this;
        me.callParent(arguments);
    },
    
    updateWidget: function(start_page,curr_page,end_page)
    {
        console.log('widgetPaging.update');
        this.update({
            max_value:end_page
        });
    },

});