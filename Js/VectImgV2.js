var VectImgV2=function(){
  this.TabConnex=new Array();
  this.TabColor=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#000000"];
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
  }
  this.draw=function(context){
    for(var i=0;i<this.length();i++){
      this.get(i).draw(context,this.TabColor[i%this.TabColor.length]);
    }
  }
}
