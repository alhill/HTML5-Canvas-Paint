$(function(){
    
    /* CREAMOS CANVAS A PANTALLA COMPLETA */
    var viewport_h = $(window).height();
    var viewport_w = $(window).width(); 
    $(".canvasito").append('<canvas id="c" width="' + (viewport_w - 50) + '" height="' + (viewport_h - 105) + '"></canvas>');
    
    /* GUARDAMOS SU POSICIÓN RESPECTO A LA VENTANA PARA PODER POSICIONAR EL RATÓN RESPECTO AL CANVAS Y NO A LA VENTANA */
    var top_offset = parseInt( $(".canvasyherr").css("margin-top") );
    var left_offset = parseInt( $("#c").position().left );
    
    var color = "rgba(0,0,0,"; /* INICIALIZAMOS EL PINCEL EN NEGRO */
    var size = 5; /* INICIALIZAMOS EL PINCEL EN TAMAÑO MEDIO */
    
    function distanceBetween(point1, point2) 
    {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    
    function angleBetween(point1, point2) 
    {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }

    var el = document.getElementById('c');
    var ctx = el.getContext('2d');
    
    /* PONEMOS EL LIENZO EN BLANCO */
    ctx.fillStyle = "rgba(255,255,255,1)"; 
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.lineJoin = ctx.lineCap = 'round';

    var isDrawing, lastPoint;

    el.onmousedown = function(e)
    {
        isDrawing = true;
        lastPoint = { x: e.clientX - left_offset , y: e.clientY - top_offset };
        
        document.getElementById("c").addEventListener("mouseout", function(){
            isDrawing = false;
        });
    };

    el.onmousemove = function(e)
    {
        if (!isDrawing) { return };
        
        var currentPoint = { x: e.clientX - left_offset, y: e.clientY - top_offset };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint)   
            for (var i = 0; i < dist; i+=5) 
            {
                x = lastPoint.x + (Math.sin(angle) * i);
                y = lastPoint.y + (Math.cos(angle) * i);

                var radgrad = ctx.createRadialGradient(x,y, size ,x,y, size*2);
        
                radgrad.addColorStop(0, color + '1)');
                radgrad.addColorStop(0.8, color + '0.5)');
                radgrad.addColorStop(1, color + '0)');
        
                ctx.fillStyle = radgrad;
                ctx.fillRect(x-(size*2), y-(size*2), (size*4), (size*4));
            }

        lastPoint = currentPoint;
    };

    el.onmouseup = function() 
    {
        isDrawing = false;
    };
    
    function borrar() 
    {
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillRect(0, 0, c.width, c.height);
    }
    
    /* CONTROLES */
    document.getElementById("pincel_s").addEventListener("click", function(){ size = 2 });
    document.getElementById("pincel_m").addEventListener("click", function(){ size = 5 });
    document.getElementById("pincel_l").addEventListener("click", function(){ size = 10 });
    document.getElementById("color_negro").addEventListener("click", function(){ color = "rgba(0,0,0,"});
    document.getElementById("color_azul").addEventListener("click", function(){ color = "rgba(0,0,255,"});
    document.getElementById("color_rojo").addEventListener("click", function(){ color = "rgba(255,0,0,"});
    document.getElementById("color_verde").addEventListener("click", function(){ color = "rgba(0,255,0,"});
    document.getElementById("color_amarillo").addEventListener("click", function(){ color = "rgba(255,255,0,"});
    document.getElementById("color_magenta").addEventListener("click", function(){ color = "rgba(255,0,255,"});
    document.getElementById("color_cyan").addEventListener("click", function(){ color = "rgba(0,255,255,"});
    document.getElementById("color_blanco").addEventListener("click", function(){ color = "rgba(255,255,255,"});
    document.getElementById("borrartodo").addEventListener("click", function(){ borrar() });
    
    document.getElementById("guardar").addEventListener("click", function(){
        var imagen_raw = document.getElementById("c");
        var imagen_png = imagen_raw.toDataURL("image/png");
        imagen_png = imagen_png.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        this.href = imagen_png;
    });
    
    
    
    /* */
});