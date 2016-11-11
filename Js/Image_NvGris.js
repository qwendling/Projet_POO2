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
}
