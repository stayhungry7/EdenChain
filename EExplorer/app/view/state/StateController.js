/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('EExplorer.view.state.StateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctlState',
    requires: [],

    control: 
    {
        '*': {
            updateStateDetail: 'updateStateDetail',
            onClickStateRefresh: 'onClickStateRefresh',
            onClickStateCopy: 'onClickStateCopy',
            onClickStateBack: 'onClickStateBack',
            onPagingClick: 'onPagingClick',            
            onPagingChange: 'onPagingChange', 
            onAfterRender: 'onAfterRender',
            onResize: 'onResize',

        }
    },

    init: function()
    {
        console.log('TxdetailController.init');
        //EExplorer.ux.Mediator.on('onCmdShow', this.onCmdOpenView, this);
    },

    updateView: function()
    {
        console.log('StateController.updateView');
    },

    clearAll: function()
    {
        EExplorer.app.getController('EController').clearFormPanel(this,'form_state_detail');

        this.lookupReference('grid_state_list').getStore().reload();        
        this.lookupReference('grid_state_parameter').getStore().reload();
    },

    drawChart:function(period)
    {
        var _this = this;

        EExplorer.service.Helper.getData(30,
            function(status,response) 
            {
                json_data = JSON.parse(response.responseText);
                EExplorer.service.Helper.drawChart(_this,'chart_state',json_data.data.data);
            },
        );
    },

    updateStateDetail: function(record)
    {
        this.lookupReference('txt_state_head').setValue(record.data.head);
        this.lookupReference('txt_state_paging_start').setValue(record.data.paging_start);
        this.lookupReference('txt_state_paging_limit').setValue(record.data.paging_limit);
        //this.lookupReference('txt_state_data').setValue(record.data.data);

        this.updateParameterGrid(record);
        this.drawChart(30);
    },

    updateStateHeader: function(record)
    {
        this.lookupReference('txt_state_header_no').setValue(record.internalId);
        this.lookupReference('txt_state_header_head').setValue(record.data.head);
        this.lookupReference('txt_state_header_start').setValue(record.data.paging_start);
        this.lookupReference('txt_state_header_end').setValue(record.data.paging_limit);
    },


    updateParameterGrid: function(record) 
    {
        console.log('updateParameterGrid',record);

        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,1);
        EExplorer.service.Helper.updateBottomBar(record,'footer_state','State ID',record.data.head,function() {});

        this.updateStateHeader(record);
        
        var store_tx = this.getViewModel().getStore('storeTransaction');
        var arr_data = [], tx_size = 0, tx_key = '', tx_id = '';

        for (var i=0;i<record.data.data.length;i++)
        {
            var a_record = record.data.data[i];

            arr_data.push([a_record.address,a_record.data]);
        }

        var a_store = Ext.create('Ext.data.ArrayStore', {
            fields: [
                {name:'address'},
                {name:'data'},
            ],
        });

        a_store.loadData(arr_data);

        this.lookupReference('grid_state_parameter').setStore(a_store);
    },


    onClickParameter: function(grid,row_index,col_index)
    {
        console.log('StateController.onClickParameter');

        var a_record = grid.getStore().getAt(row_index);
        console.log(a_record);

        var a_controller = EExplorer.app.getController('EController');
        //a_controller.showPage(2,{data:a_record});        
    },

    onClickStateRefresh: function()
    {
        this.clearAll();
    },

    onClickStateCopy: function()
    {
        console.log('StateController.onClickStateCopy');
        EExplorer.service.Helper.copyToClipboard();
        Ext.Msg.alert('Success', 'Copy to clipboard.', Ext.emptyFn);        
    },

    onClickStateBack: function()
    {
        console.log('StateController.onClickStateBack');
        var a_controller = EExplorer.app.getController('EController');
        a_controller.doCardNavigation(this,0);
    },

    onPagingClick: function(btn_text)
    {
        console.log('StateController.onPagingClick',btn_text);
    },

    onPagingChange: function(slider, new_value,old_value)
    {
        console.log('StateController.onPagingChange',slider);
    },
    
    onAfterRender: function()
    {
        var a_height = this.getView().getHeight();
        console.log('StateController.onAfterRender',a_height);
    },

    onResize: function(view, width, height, oldWidth, oldHeight, eOpts)
    {
        //console.log('StateController.onResize',height);
    },

});
