Ext.define('EExplorer.service.Helper', {
	singleton: true,

	getAppController: function()
	{
		var a_controller = EExplorer.app.getController('EController');
		return a_controller;
	},

    updateBottomBar: function(record,id,title,value,callback)
    {
    	console.log("EController.updateBottomBar",record);

    	a_controller = this.getAppController();
    	a_controller.data.currentRecord = record;
		a_controller.data.currentValue = value;
		
		var a_html = '<h3><span>'+title+ '</span><span style="font-size:16px;">' + value + '</span></h3>';
		var a_component = Ext.ComponentQuery.query('#'+id)[0];
		a_component.setHtml(a_html);
		callback();
    },

	copyToClipboard:function ()
	{
    	a_controller = this.getAppController();
    	var text = a_controller.data.currentValue;
    			
	    var id = "mycustom-clipboard-textarea-hidden-id";
	    var existsTextarea = document.getElementById(id);

	    if(!existsTextarea)
	    {
	        //console.log("Creating textarea");
	        var textarea = document.createElement("textarea");
	        textarea.id = id;
	        // Place in top-left corner of screen regardless of scroll position.
	        textarea.style.position = 'fixed';
	        textarea.style.top = 0;
	        textarea.style.left = 0;

	        // Ensure it has a small width and height. Setting to 1px / 1em
	        // doesn't work as this gives a negative w/h on some browsers.
	        textarea.style.width = '1px';
	        textarea.style.height = '1px';

	        // We don't need padding, reducing the size if it does flash render.
	        textarea.style.padding = 0;

	        // Clean up any borders.
	        textarea.style.border = 'none';
	        textarea.style.outline = 'none';
	        textarea.style.boxShadow = 'none';

	        // Avoid flash of white box if rendered for any reason.
	        textarea.style.background = 'transparent';
	        document.querySelector("body").appendChild(textarea);
	        //console.log("The textarea now exists :)");
	        existsTextarea = document.getElementById(id);
	    }else{
	        //console.log("The textarea already exists :3")
	    }

	    existsTextarea.value = text;
	    existsTextarea.select();

	    try {
	        var status = document.execCommand('copy');
	        if(!status){
	            //console.error("Cannot copy text");
	        }else{
	            //console.log("The text is now on the clipboard");
	        }
	    } catch (err) {
	        //console.log('Unable to copy.');
	    }
	},

    loadMask: function(msg)
    {
        if (msg.length==0) {
            msg = 'Loading, please stand by...';
        }
        var mask = Ext.getBody().mask(msg);
        return mask;
    },

    loadMaskToTarget: function(scope,ref_target,msg)
    {
        if (msg.length==0) {
            msg = 'Loading, please stand by...';
        }
        //var a_tarket = Ext.ComponentQuery.query(target_id);
		var a_target = scope.lookupReference(ref_target);
		
        var mask = new Ext.LoadMask({
        	msg: msg,
        	target: a_target
        });
        return mask;
    },


	
	request: function(a_method,a_url,a_parameter,callback) 
	{
        Ext.Ajax.request({
            url: EExplorer.service.Const.BASE_URL+a_url,
            method: a_method,
            timeout: 60000,
            params: a_parameter,

            success: function(response) 
            {
                console.log('Helper.request - success',response);
                callback('ok',response);
            },
            failure: function(response) 
            {
                console.log('Helper.request - failure',response);
                callback('error',response);
            }
        });		
	},
	
    getData: function(period,callback)
    {
        this.request('GET','apis/data',{'period':period},callback);
    },

    drawChart: function(scope,ref_chart,data) 
    {
    	console.log('Helper.drawChart',data);

        var data_chart = [];
        for (var i=0;i<data.length;i++) 
        {
            //console.log(data[i]);
            data_chart.push([ data[i]['x'],data[i]['y'] ]);
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                { name: 'name'},
                { name: 'value'}
            ],
            data: data_chart
        });

        scope.lookupReference(ref_chart).setStore(a_store);
    },


});