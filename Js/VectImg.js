var VectImg=function(){
  this.TabVect=new Array();
  this.ToVect=function(img){
    var i;
    for(i=0;i<img.hauteur;i++){
      for(j=0;j<img.largeur;j++){
        if(img.tab2D[i][j]==255){
          //Debut d'un vecteur
          var v=new VectorD();
          v.add(new Point(j,i));
          img.set(j,i,0);
          v.continueVect(new Point(j,i),img);
          this.TabVect.push(v);
        }
      }
    }
  }

  this.draw=function(context){
    var i=0;
    for(;i<this.TabVect.length;i++)
      this.TabVect[i].draw(context);
  }
}
