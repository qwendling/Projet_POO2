var CompoConnex=function(){
    EnsembleVect.call(this);
    this.takeVect=function(imgVect){
      var v=imgVect.get(0);
      this.put(v);
      imgVect.remove(0);
      for(var i=0;i<this.length();i++){
        for(var j=0;j<imgVect.length();j++){
          if(this.get(i).estEnContact(imgVect.get(j))){
            this.put(imgVect.get(j));
            imgVect.remove(j);
          }
        }
      }
    }
}
