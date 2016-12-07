var Matrix=function(largeur,hauteur){
  MatrixAbs.call(this,largeur,hauteur);
  for(var y=0;y<hauteur;y++)
    for(var x=0;x<largeur;x++)
      this.set(x,y,0);

  this.copie=function(){
    var newM=new Matrix(this.largeur,this.hauteur);
    for(var y=0;y<hauteur;y++)
      for(var x=0;x<largeur;x++)
        newM.set(x,y,this.get(x,y));
    return newM;
  }

  this.multTab = function(coeff){
    var i; var j;
    for(i=0;i<this.hauteur;i++)
        for(j=0;j<this.largeur;j++)
            this.set(j,i, this.get(j,i) * coeff);
  }

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

  this.swapLine=function(l1,l2){
    if(l1==l2)
      return;
    var j,e;
    for(j=0;j<this.largeur;j++){
      tmp=this.get(l1,j);
      this.set(l1,j,this.get(l2,j));
      this.set(l2,j,tmp);
    }
  }

  this.combineLine=function(c1,l1,c2,l2){
    var j;
    for(j=0;j<this.largeur;j++){
      this.set(l2,j,c1*this.get(l1,j)+c2*this.get(l2,j));
    }
  }

  this.gauss=function(b){
    var X=new Matrix(b.largeur,b.hauteur);
    var D=this.copie();
    var Bcpy=b.copie();
    var i,j,k,tmp,pivot;
    for(k=0;k<(D.hauteur);k++){
      tmp=k;
      while(tmp<(D.hauteur-1) && Math.abs(pivot=this.get(tmp,k))<0.0001){
        tmp++;
      }
      D.swapLine(tmp,k);
      Bcpy.swapLine(tmp,k);
      for(i=k+1;i<D.hauteur;i++){
        Bcpy.combineLine((-D.get(i,k)/pivot),k,1,i);
        D.combineLine((-D.get(i,k)/pivot),k,1,i);
      }
    }
    for(i=D.hauteur-1;i>=0;i--){
      X.set(i,0,Bcpy.get(i,0));
      for(j=i+1;j<D.hauteur;j++){
        X.set(i,0,X.get(i,0)-D.get(i,j)*X.get(j,0));
      }
      X.set(i,0,X.get(i,0)/D.get(i,j));
    }
    return X;
  }

  this.Bezier=function(){
    var A1,A2,B1,B2;
    //Création des matrice
    A1=new Matrix(4,this.hauteur);
    A2=new Matrix(4,this.hauteur);
    B1=new Matrix(1,this.hauteur);
    B2=new Matrix(1,this.hauteur);
    var i,tmp,tmp2;

    //Phase d'initialisation des matrices
    for(i=0;i<this.hauteur;i++){
      //Initialisation des matrices A1 les info sur x B1 sur y
      tmp=this.get(0,i);
      B1.set(0,i,tmp);
      A1.set(0,i,tmp);
      tmp2=tmp*tmp;
      A1.set(1,i,tmp2);
      tmp2*=tmp;
      A1.set(2,i,tmp2);
      A1.set(3,i,1);
      //Meme chose avec A2 et B2 mais on inverse x et y
      tmp=this.get(1,i);
      B2.set(0,i,tmp);
      A2.set(0,i,tmp);
      tmp2=tmp*tmp;
      A2.set(1,i,tmp2);
      tmp2*=tmp;
      A2.set(2,i,tmp2);
      A2.set(3,i,1);
    }

    //Moindre carre sur les x
    var A1t=A1.transpose();
    var RX=A1t.mult(A1).gauss(A1t.mult(B1));
    //Moindre carre sur les y
    var A2t=A2.transpose();
    var RY=A2t.mult(A2).gauss(A2t.mult(B2));

    var p0x=RX.get(0,3);
    RX.set(0,0,(3*p0x+RX.get(0,0))/3);
    var p1x=RX.get(0,0);
    RX.set(0,1,(RX.get(0,1)-3*p0x+6*p1x)/3);
    var p2x=RX.get(0,1);
    RX.set(0,2,RX.get(0,2)+p0x-3*p1x+3*p2x);

    var p0y=RY.get(0,3);
    RY.set(0,0,(3*p0y+RY.get(0,0))/3);
    var p1y=RY.get(0,0);
    RY.set(0,1,(RY.get(0,1)-3*p0y+6*p1y)/3);
    var p2y=RY.get(0,1);
    RY.set(0,2,RY.get(0,2)+p0y-3*p1y+3*p2y);

    var p0=new Point(p0x,p0y);
    var p1=new Point(p1x,p1y);
    var p2=new Point(p2x,p2y);
    var p3=new Point(p3x,p3y);

    var result=[p0,p1,p2,p3];

    return result;
  }
}
