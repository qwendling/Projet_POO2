var EnsembleVect=function(){
  this.TabVect=new Array();
  this.draw=function(context,color){
    var i=0;
    for(;i<this.TabVect.length;i++)
      this.TabVect[i].draw(context,color);
  }

  this.drawsvg=function(svg){
    var i=0;
    for(;i<this.TabVect.length;i++){
      this.TabVect[i].drawsvg(svg);
    }
  }

  this.put=function(v){
    this.TabVect.push(v);
  }
  this.get=function(i){
    return this.TabVect[i];
  }
  this.length=function(){
    return this.TabVect.length;
  }
  this.remove=function(i){
    this.TabVect.splice(i,1);
  }
}
