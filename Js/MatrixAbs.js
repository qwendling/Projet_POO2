var MatrixAbs=function(largeur,hauteur){
  this.hauteur=hauteur;
  this.largeur=largeur;
  this.tab2D=new Array(hauteur);
  var i;
  for(i=0;i<hauteur;i++)
    this.tab2D[i]=new Array(largeur);
  this.set=function(x,y,val){
    this.tab2D[y][x]=val;
  }
  this.get=function(x,y){
    return this.tab2D[y][x];
  }
}
