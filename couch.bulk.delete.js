function delete_doc(doc_url) {
	$.ajax({
		url: doc_url,
		type: 'DELETE',
		success: function() { console.log('Deleted: ' + doc_url); },
		error: function() { console.log('Error: ' + doc_url); }
	});
}

$(document).ready(function() {
	$('ul#toolbar').append('<li><button id="bulk_delete_enable">Enable Bulk Delete</button></li>');
	$('#bulk_delete_enable').click(function() {
		$(this).text('Delete Documents');
		$(this).attr('id','bulk_delete');
		$(this).unbind('click');
		enable_bulk_delete();
	});
});

function enable_bulk_delete() {
	$('tbody.content tr').each(function() {
		doc = $(this).children('td.key').children('a').attr('href').split('?');
		doc_id = '';
		if(doc.length == 2)
			doc_id = doc[1];
		rev=$(this).children('td.value').find('code.string').text().split('"');
		$(this).append($('<td><input class="doc_bulk_select" type="checkbox" doc_link="/'+ doc_id +'?rev=' + rev[1] + '" ></input></td>')); 
	});
	$('#bulk_delete').click(function() {
		$('input.doc_bulk_select:checked').each(function(){
			delete_doc($(this).attr('doc_link'));
		});
	});
}
