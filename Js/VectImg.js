var VectImg=function(){
  EnsembleVect.call(this);
  this.ToVect=function(img,prec){
    var i;
    for(i=0;i<img.hauteur;i++){
      for(j=0;j<img.largeur;j++){
        if(img.tab2D[i][j]==255){
          //Debut d'un vecteur
          var v=new VectorD();
          v.add(new Point(j,i));
          img.set(j,i,0);
          v.continueVect(new Point(j,i),img,prec);
          this.TabVect.push(v);
        }
      }
    }
  }
}
