var Matrix=function(largeur,hauteur){
  MatrixAbs.call(this,largeur,hauteur);
  for(var y=0;y<hauteur;y++)
    for(var x=0;x<largeur;x++)
      this.set(x,y,0);

  this.add=function(MatrixB){
    if(MatrixB.largeur != this.largeur || MatrixB.hauteur != this.hauteur){
      console.log("Argument invalide pour l'addition de matrice");
      return new Matrix(0,0);
    }
    var newMat=new Matrix(this.largeur,this.hauteur);
    for(var y=0;y<this.hauteur;y++)
      for(var x=0;x<this.largeur;x++)
        newMat.set(x,y,this.get(x,y)+MatrixB.get(x,y));
    return newMat;
  }

  //Multiplication de matrices this * MatrixB
  this.mult=function(MatrixB){
    if(this.largeur != MatrixB.hauteur){
      console.log("Argument invalide pour la multiplication de matrice");
      return new Matrix(0,0);
    }
    var newMat=new Matrix(MatrixB.largeur,this.hauteur);
    for(var i=0;i<this.hauteur;i++)
  		for(var j=0;j<MatixB.largeur;j++)
  			for(var k=0;k<MatrixB.hauteur;k++)
          newMat.set(i,j,newMat.get(i,j)+MatrixB.get(i,k)*this.get(k,j));
    return newMat;
  }

  this.transpose=function(){
    var trans=new Matrix(this.hauteur,this.largeur);
  	for(i=0;i<this.hauteur;i++)
  		for(j=0;j<this.largeur;j++)
        trans.set(i,j,this.get(j,i));
  				setElt(trans,j,i,getElt(m,i,j));
  	return trans;
  }
}
