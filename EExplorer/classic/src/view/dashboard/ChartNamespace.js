Ext.define('EExplorer.view.dashboard.ChartNamespace',{
	extend: 'Ext.panel.Panel',
	//alias: 'chartNamespace',
	xtype: 'chartNamespace',
	closable: false,
	title: 'Transaction Per Namespace',

	items: [
		{
            xtype: 'cartesian',
            reference: 'chart_namespace',
            flex:1,
            width: '100%',
            padding: '20 0 0 0',
            height: 300,
            captions: {
                title: {
                    text: 'Transaction Per Namespace',
                    align: 'center'
                }
            },
            store: {},

            axes: [
            {
                type: 'numeric',
                position: 'left',
                minimum: 0,
                titleMargin: 20,
                title: {
                    text: 'TX Count'
                },
                listeners: {
                    //rangechange: 'onAxisRangeChange'
                }
            }, {
                type: 'category',
                position: 'bottom'
            }],
            animation: Ext.isIE8 ? false : true,
            series: 
            {
                type: 'bar',
                xField: 'name',
                yField: 'value',
                
                style: {
                    minGapWidth: 20
                },
                highlight: {
                    strokeStyle: 'black',
                    fillStyle: 'gold'
                },
                label: {
                    field: 'highF',
                    display: 'insideEnd',
                    //renderer: 'onSeriesLabelRender'
                }
            },
		}
	]
});