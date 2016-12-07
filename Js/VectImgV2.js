var VectImgV2=function(){
  this.TabConnex=new Array();
  this.TabColor=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#000000"];
  this.TabBezier=new Array();
  this.get=function(i){
    return this.TabConnex[i];
  }
  this.add=function(c){
    this.TabConnex.push(c);
  }
  this.length=function(){
    return this.TabConnex.length;
  }
  this.ToV2=function(imgVect){
    while(imgVect.length() > 0){
      var newComp=new CompoConnex();
      newComp.takeVect(imgVect);
      this.add(newComp);
    }
    while(this.TabConnex.length > 0){
      while(this.TabConnex[0].length() > 0){
        var newBezier=new BezierSetup();
        newBezier.takeVect(this.TabConnex[0]);
        this.TabBezier.push(newBezier);
      }
      this.TabConnex.shift();
    }
  }
  this.draw=function(context){
    for(var i=0;i<this.length();i++){
      this.get(i).draw(context,this.TabColor[i%this.TabColor.length]);
    }
  }
}
