var BezierSetup = function(){
  EnsembleVect.call(this);
  var nbChangementConvexite=0;
  var Convex=0;
  this.debut=function(){
    return this.get(0).debut();
  }
  this.end=function(){
    return this.get(this.length()-1).fin();
  }


  //c : composante connexe
  this.takeVect=function(c){
    this.put(c.get(c.length()-1));
    var tmp=c.get(c.length()-1).coefDir();
    var diffC;
    c.remove(c.length()-1);
    for(var i=0;i<c.length();i++){
      if(this.end().x-c.get(i).debut().x <=1 && this.end().y-c.get(i).debut().y <=1){
        diffC=tmp-c.get(i).coefDir;
        if(diffC * this.Convex < 0){
          this.nbChangementConvexite++;
          if(this.nbChangementConvexite > 3)
            return;
        }
        this.Convex=diffC;
        this.put(c.get(i));
        c.remove(i);
      }
    }
    for(var i=0;i<c.length();i++){
      if(this.debut().x-c.get(i).debut().x <=1 && this.debut().y-c.get(i).debut().y <=1){
        diffC=tmp-c.get(i).coefDir;
        if(diffC * this.Convex < 0){
          this.nbChangementConvexite++;
          if(this.nbChangementConvexite > 3)
            return;
        }
        this.Convex=diffC;
        this.unshift(c.get(i));
        c.remove(i);
      }
    }
  }
}
