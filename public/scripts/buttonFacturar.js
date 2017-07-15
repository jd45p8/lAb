
$('#facturar').unbind().click(function(){
    var  dataFactura = [];
    $("table#tablaProductos tr").each(function(){
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if(tableData.length > 0){
            tableData.each(function(){arrayOfThisRow.push($(this).text());});
            dataFactura.push(arrayOfThisRow);
        }
    }); 

    console.log('here');

    $.ajax({
        url:'<%= Url.Action('addFactura','facturas.js') %>',
        success:function(){
            console.log('working');
        };
    });
}); 
