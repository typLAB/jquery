load('build/runtest/env.rhino.js')

Envjs('build/build.html', {scriptTypes : {"text/javascript" : true,"text/envjs" : true}});

(function(){
    var scripts = document.getElementsByTagName("script")
    print(scripts.length)
    var ifdef = /\/\/\s*#\s*ifdef\s*([\w.])?/, //#ifdef tick
        endif = /\/\/\s*#\s*endif/ //#endif
    //get each script, and put together
    
    var result = [];
    var tick = function(src ){
        var lines = src.split('\n'), line, skip = false, keeping = [];
        for(var l=0; l < lines.length;l++){
            var line = lines[l]
            if(ifdef.test(line)){
                skip = true;
            }
            if(!skip) keeping.push(line)
                
            if( endif.test(line) ){
                skip = false;
            }
        }
        return keeping.join("\n")
    }
    
    for(var i =0; i < scripts.length; i++){
        result.push( tick(scripts[i].text)  )
    }
    
    var fout = new java.io.FileOutputStream(new java.io.File( "dist/jQueryMobile.js" ));
    
    var out     = new java.io.OutputStreamWriter(fout, "UTF-8");
    var s = new java.lang.String(result.join(""));

    var text = new java.lang.String( (s).getBytes(),  "UTF-8" );
		out.write( text, 0, text.length() );
		out.flush();
		out.close();
            
  
    

	//print( readFile($env.location(scripts[0].src.match(/([^\?#]*)/)[1], base ))  );

})();



