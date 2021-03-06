(function(namespace, $) {
	"use strict";

	var DemoTableDynamic = function() {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function() {
			o.initialize();
		});

	};
	var p = DemoTableDynamic.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function() {
		this._initDataTables();
	};

	// =========================================================================
	// DATATABLES
	// =========================================================================

	p._initDataTables = function() {
		if (!$.isFunction($.fn.dataTable)) {
			return;
		}

		// Init the demo DataTables
		this._createDataTableOverview();
		this._createDataTableHomeVisitation();
	};

	p._createDataTableHomeVisitation = function() {
	 var table = $('#datatable-home-visitation').DataTable({
			"dom": 'frt<"row"<"col-md-12"<"col-md-6 col-xs-6"p><"#datatable-home-visitation-tools-container.datatable-tools-container col-md-6 col-xs-6">>>',
			"order": [],

			"language": {
				"lengthMenu": '_MENU_ entries per page',
				"search": '<i class="fa fa-search"></i>',
				"paginate": {
					"previous": '<i class="fa fa-angle-left"></i>',
					"next": '<i class="fa fa-angle-right"></i>'
				}
			}

		});

		var tableTools = new $.fn.dataTable.TableTools( table, {
			"sSwfPath": "../../assets/js/libs/DataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			"aButtons": [{
				"sExtends": "pdf",
				"sButtonText": "<span><i class='fa fa-print'></i>Export data</span>"
			}]
		});

		$('#datatable-home-visitation-tools-container').html(tableTools.fnContainer());

}
	p._createDataTableOverview = function() {
		var table = $('#datatable-overview').DataTable({
			"dom": 'frt<"row"<"col-md-12"<"col-md-6 col-xs-6"p><"#datatable-overview-tools-container.datatable-tools-container col-md-6 col-xs-6">>>',
			"order": [],

			"language": {
				"lengthMenu": '_MENU_ entries per page',
				"search": '<i class="fa fa-search"></i>',
				"paginate": {
					"previous": '<i class="fa fa-angle-left"></i>',
					"next": '<i class="fa fa-angle-right"></i>'
				}
			}

		});

		var tableTools = new $.fn.dataTable.TableTools( table, {
			"sSwfPath": "../../assets/js/libs/DataTables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			"aButtons": [{
				"sExtends": "pdf",
				"sButtonText": "<span><i class='fa fa-print'></i>Export data</span>"
			}]
		});

		$('#datatable-overview-tools-container').html(tableTools.fnContainer());

	}





	p._createDataTable2 = function() {
		var table = $('#datatable2').DataTable({
			"dom": 'T<"clear">lfrtip',
			"ajax": $('#datatable2').data('source'),
			"columns": [
				{
					"class": 'details-control',
					"orderable": false,
					"data": null,
					"defaultContent": ''
				},
				{"data": "name"},
				{"data": "position"},
				{"data": "office"},
				{"data": "salary"}
			],
			"tableTools": {
				"sSwfPath": $('#datatable2').data('swftools')
			},
			"order": [[1, 'asc']],
			"language": {
				"lengthMenu": '_MENU_ entries per page',
				"search": '<i class="fa fa-search"></i>',
				"paginate": {
					"previous": '<i class="fa fa-angle-left"></i>',
					"next": '<i class="fa fa-angle-right"></i>'
				}
			}
		});
		
		//Add event listener for opening and closing details
		var o = this;
		$('#datatable2 tbody').on('click', 'td.details-control', function() {
			var tr = $(this).closest('tr');
			var row = table.row(tr);

			if (row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			}
			else {
				// Open this row
				row.child(o._formatDetails(row.data())).show();
				tr.addClass('shown');
			}
		});
	};

	// =========================================================================
	// DETAILS
	// =========================================================================

	p._formatDetails = function(d) {
		// `d` is the original data object for the row
		return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
				'<tr>' +
				'<td>Full name:</td>' +
				'<td>' + d.name + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Extension number:</td>' +
				'<td>' + d.extn + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td>Extra info:</td>' +
				'<td>And any further details here (images etc)...</td>' +
				'</tr>' +
				'</table>';
	};

	// =========================================================================
	namespace.DemoTableDynamic = new DemoTableDynamic;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
