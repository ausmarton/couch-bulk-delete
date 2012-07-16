function delete_doc(doc_url) {
	$.ajax({
		url: doc_url,
		type: 'DELETE',
		success: function() { 
			console.log('Deleted: ' + doc_url);
			$('#' + doc_url.replace(/\/|\?|\=/g,'')).remove(); 
		},
		error: function() { console.log('Error: ' + doc_url); }
	});
}

$(document).ready(function() {
	$('ul#toolbar').append('<li><button id="bulk_delete">Delete Documents</button></li>');
	$('thead tr').each(function() {
		$(this).append('<th><input id="select_all" type="checkbox"></input></th>');
		$('#select_all').change(function() {
			all=$('input.doc_bulk_select').length;
			if(all == 0)
				create_checkboxes();
			checked=$('input.doc_bulk_select:checked').length;
			if(all == checked && $(this).attr('checked') == false) {
				$('input.doc_bulk_select:checked').each(function() {
                                        $(this).attr('checked',false);
                                });
			} else {	
				$('input.doc_bulk_select').not(':checked').each(function() {
					$(this).attr('checked',true);
				});
			}
		});
	});
	$('#bulk_delete').click(function() {
		$('input.doc_bulk_select:checked').each(function(){
			delete_doc($(this).attr('doc_link'));
		});
	});
});

function create_checkboxes() {
        $('tbody.content tr').each(function() {
		if($(this).children('td').length == 3)
			return;
                doc = $(this).children('td.key').children('a').attr('href').split('?');
                doc_id = '';
                if(doc.length == 2)
                        doc_id = doc[1];
                rev=$(this).children('td.value').find('code.string').text().split('"');
                doc_url = '/'+ doc_id +'?rev=' + rev[1];
		$(this).append($('<td><input class="doc_bulk_select" type="checkbox" doc_link="' + doc_url + '" ></input></td>'));
		$(this).attr('id',doc_url.replace(/\/|\?|\=/g,''));
        });
}
