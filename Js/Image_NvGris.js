var Image_NvGris=function(largeur,hauteur){
  MonImage.call(this,largeur,hauteur);
  this.convPixel=function(noyau,x,y){
		var j,k,c;
		var somme=0;
		for(j=0;j<3;j++){
			for(k=0;k<3;k++){
				if(!(x+(k-1)<0 || y+(j-1)<0 || x+(k-1)>=this.largeur || y+(j-1)>=this.hauteur)){
          somme+=this.tab2D[y+(j-1)][x+(k-1)]*(noyau[j][k]);
				}
			}
		}
		return somme;
	}
  this.copie=function(){
      var i; var j;
      var cop = new Image_NvGris(this.largeur, this.hauteur);
      for(i=0;i<this.hauteur;i++){
          for(j=0;j<this.largeur;j++){
              cop.tab2D[i][j]=this.tab2D[i][j];
          }
      }
      return cop;
  }
  this.print=function(){
		var buffer="";
		var j,k;
		for(j=0;j<this.hauteur;j++){
			buffer=buffer+j+"(";
			for(k=0;k<this.largeur;k++){
				buffer=buffer+" "+this.tab2D[j][k];
			}
			buffer=buffer+")\n";
		}
		console.log(buffer);
	}

  this.add=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k]+=img2.tab2D[j][k];
			}
		}
	}
  this.mult=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k]*=img2.tab2D[j][k];
			}
		}
	}
  this.sqrtall=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k]=Math.sqrt(this.tab2D[j][k]);
			}
		}
	}

    this.calcY1=function(y1,i,j,b1,b2,a1,a2){
      var a;
      var b;
      var c;
      if(j-1 < 0){
          a = 0;
          c = 0;
      }
      else{
          a = y1.get(j-1,i);
          c = this.get(j-1,i)
      }
      if(j-2 < 0)
          b = 0;
      else
          b = y1.get(j-2,i);
      return  a1 * this.get(j,i) + a2 * c + b1 * a + b2 * b;
  }

  this.calcY2=function(y2,i,j,b1,b2,a3,a4){
      var a;
      var b;
      var c;
      var d;
      if(j + 1 >= this.largeur){
          a= 0;
          c=0
      }
      else{
          a = y2.get(j+1,i);
          c = this.get(j+1,i)
      }
      if(j + 2 >= this.largeur){
          b=0;
          d=0;
      }
      else{
          b=y2.get(j+2,i);
          d=this.get(j+2,i);
      }
      return a3 * c + a4 * d + b1 * a + b2 * b;
  }

  this.calc2Y1=function(y1,i,j,b1,b2,a5,a6,tab){
      var a;
      var b;
      var c;
      if(i-1 < 0){
          a = 0;
          c = 0;
      }
      else{
          a = y1.get(j,i-1);
          c = tab.get(j,i-1);
      }
      if(i-2 < 0)
          b = 0;
      else
          b = y1.get(j,i-2);
      return a5 * tab.get(j,i) + a6 * c + b1 * a + b2 * b;
  }

  this.calc2Y2=function(y2,i,j,b1,b2,a7,a8,tab){
  var a,b,c,d;
      if(i + 1 >= this.hauteur){
          a= 0;
          c = 0;
      }
      else{
          a = y2.get(j,i+1);
          c = tab.get(j,i+1);
      }
      if(i + 2 >= this.hauteur){
          b=0;
          d = 0;
      }
      else{
          b=y2.get(j,i+2);
          d = tab.get(j,i+2);
      }
      return a7 * c + a8 * d + b1 * a + b2 * b;
  }

}
