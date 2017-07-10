$(document).ready(function(){
    $('#borrar').onclick(function(){
        this.form.method='POST';
        console.log('button');
        var productId = $(this).${product._id};
        $.ajax({
            method: "POST",
            url: '/producto/delete',
            data:{'productoId': productoId}
        })
    });

});
