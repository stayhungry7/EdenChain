Ext.define('EExplorer.view.batch.BatchChart',{
	extend: 'Ext.panel.Panel',
	//alias: 'chartNamespace',
	xtype: 'chartBatch',
	closable: false,
    collapsible: false,
    reference: 'pnl_batch_chart',
    cls: 'custom-chart-style',   
	title: 'Batch Summary',

	items: 
    [
		{
            background: 'rgba(0,0,0,1)',
            xtype: 'cartesian',
            reference: 'chart_batch',
            flex:1,
            width: '100%',
            height: 500,
            captions: {
                title: {
                    text: 'Stat Data',
                    align: 'center'
                }
            },
            store: {},
          
            axes: [{
                type: 'numeric',
                position: 'left',
                minimum: 0,
                titleMargin: 20,
                title: {
                    text: '',
                },
                grid: {
                    opacity: 1,
                    lineWidth: 1
                },
                style: {
                    strokeStyle: '#ddd'
                },
                label: {
                    textBaseline: 'middle',
                    textAlign: 'center',
                    font: '14px Helvetica',
                    color: '#FFFFFF'
                },
                listeners: {
                    //rangechange: 'onAxisRangeChange'
                }
            }, {
                type: 'category',
                position: 'bottom',
                label: {
                    textBaseline: 'middle',
                    textAlign: 'center',
                    font: '14px Helvetica',
                    color: '#FFFFFF'
                },
                style: {
                    strokeStyle: '#ddd'
                }
            }],
            animation: Ext.isIE8 ? false : true,
            series: {
                type: 'area',
                xField: 'name',
                yField: 'value',
                
                subStyle: {
                    fill: ['#4D6276']
                },

                style: {
                    minGapWidth: 20,
                    stroke: '#FFFFFF',
                    opacity: 0.60
                },
                highlight: {
                    strokeStyle: 'black',
                    fillStyle: 'gold'
                },

                marker: {
                    opacity: 0,
                    scaling: 0.01,
                    fx: {
                        duration: 200,
                        easing: 'easeOut'
                    }
                },
                highlightCfg: {
                    opacity: 1,
                    scaling: 1.5
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml(record.get(item.field));
                    }
                },

                label: {
                    stroke: '#FFFFFF',
                }
            }

		}
	]
});