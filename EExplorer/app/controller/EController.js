Ext.define('EExplorer.controller.EController', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView:'#view_container',
			transactionView:'#view_transaction',
			searchView:'#view_search',
		}
	},

	data: {
		currentRecord: null,
		currentValue: null,
	},

	clearView: function() 
	{
		console.log('EController.clearView');		
		var a_view = this.getMainView();
		a_view.removeAll();
	},

	updateView: function(url, title) 
	{
		console.log('EController.updateView');
		
		var a_view = this.getMainView();
		//console.log('EController.updateView2');
		this.clearView();

		var a_panel = Ext.create(url, {
			autoShow: true,
			autoDestroy: true
		});

		a_view.add(a_panel);
		return a_panel;
	},

	movePage: function(url,params)
	{
		var a_view = this.updateView(url,'');
		a_view.getController().updateView(params);
	},

	showPage: function(index,params)
	{
		var a_view = this.getMainView();
		a_view.setActiveTab(index);
		return a_view;
	},

	showTXPage: function(params)
	{
		var a_view = this.getMainView();
		a_view.setActiveTab(3);
		this.getTransactionView().getController().updateView(params);
	},

	clearFormPanel: function(ctrl,ref_form)
	{
		console.log('EController.clearFormPanel');

        var a_form = ctrl.lookupReference(ref_form);
        var fields = a_form.query('[isFormField][name!="name"]');
            
        for (var i = 0, len = fields.length; i < len; i++) {
            fields[i].reset();
        }
	},

	search: function(query_type,value)
	{
		this.showPage(6,'');
		this.getSearchView().getController().updateView(query_type,value);
	},

    doCardNavigation: function (view,page_index) 
    {
        var a_card = view.getView().getLayout();

        a_card.setActiveItem(page_index);
    },


});