function tab3x3(a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0){
	var tab2D=new Array(3);
	var k;
	for(k=0;k<3;k++)
		tab2D[k]=new Array(3);
	tab2D[0][0]=a;
	tab2D[0][1]=b;
	tab2D[0][2]=c;
	tab2D[1][0]=d;
	tab2D[1][1]=e;
	tab2D[1][2]=f;
	tab2D[2][0]=g;
	tab2D[2][1]=h;
	tab2D[2][2]=i;
	return tab2D;
}

var MonImage=function(largeur,hauteur){
	this.largeur=largeur;
	this.hauteur=hauteur;
	this.tab2D=new Array(hauteur);
	var i;
	for(i=0;i<hauteur;i++)
		this.tab2D[i]=new Array(largeur);

	this.fromImageData=function(data){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k]=new Couleur(data[j*4*this.largeur+k*4],data[j*4*this.largeur+k*4+1],data[j*4*this.largeur+k*4+2],data[j*4*this.largeur+k*4+3]);
			}
		}
	}

	this.toImgData=function(data){
		var c,j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				c=this.tab2D[j][k];
				data[j*4*this.largeur+k*4]=c.r;
				data[j*4*this.largeur+k*4+1]=c.g;
				data[j*4*this.largeur+k*4+2]=c.b;
				data[j*4*this.largeur+k*4+3]=c.opac;
			}
		}
	}

	this.get=function(x,y){
		return this.tab2D[x][y];
	}

	this.set=function(x,y,couleur){
		this.tab2D[x][y]=couleur;
	}

	this.print=function(comp){
		var buffer="";
		var j,k;
		for(j=0;j<this.hauteur;j++){
			buffer=buffer+j+"(";
			for(k=0;k<this.largeur;k++){
				buffer=buffer+" "+this.tab2D[j][k][comp];
			}
			buffer=buffer+")\n";
		}
		console.log(buffer);
	}
	this.negate=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].negate();
			}
		}
	}

	this.coef=function(co){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].coef(co);
			}
		}
	}

	this.niveauGris=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].niveauGris();
			}
		}
	}

	this.seuil=function(s){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].seuil(s);
			}
		}
	}

	this.permuteComposante=function(comp1,comp2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].permuteComposante(comp1,comp2);
			}
		}
	}

	this.copie=function(){
		var nouv=new MonImage(this.largeur,this.hauteur);
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				nouv.tab2D[j][k]=this.tab2D[j][k];
			}
		}
		return nouv;
	}

	this.effacerPartie=function(){
		var j,k;
		for(j=0;j<this.hauteur;j+=2){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].opac=0;
			}
		}
	}

	this.effacerFond=function(couleurFond){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				if(this.tab2D[j][k].memeCouleur(couleurFond))
					this.tab2D[j][k].opac=0;
			}
		}
	}

	this.convPixelPourCommencer=function(noyau){
		var j,k;
		var couleurSomme = new Couleur();
		var c;
		for(j=0;j<3;j++){
			for(k=0;k<3;k++){
				c=new Couleur(this.tab2D[y+(j-1)][x+(k-1)].r,this.tab2D[y+(j-1)][x+(k-1)].g,this.tab2D[y+(j-1)][x+(k-1)].b,this.tab2D[y+(j-1)][x+(k-1)].opac);
				c.coef(noyau[j][k]);
				couleurSomme.ajouteCouleurPonderee(c,1);
			}
		}
		return couleurSomme;
	}

	this.convPixel=function(noyau,x,y){
		var j,k,c;
		var couleurSomme = new Couleur();
		for(j=0;j<3;j++){
			for(k=0;k<3;k++){
				if(!(x+(k-1)<0 || y+(j-1)<0 || x+(k-1)>=this.largeur || y+(j-1)>=this.hauteur)){
					c=new Couleur(this.tab2D[y+(j-1)][x+(k-1)].r,this.tab2D[y+(j-1)][x+(k-1)].g,this.tab2D[y+(j-1)][x+(k-1)].b,this.tab2D[y+(j-1)][x+(k-1)].opac);
					c.r*=(noyau[j][k]);
					c.g*=(noyau[j][k]);
					c.b*=(noyau[j][k]);
					couleurSomme.r+=c.r;
					couleurSomme.g+=c.g;
					couleurSomme.b+=c.b;
				}
			}
		}
		return couleurSomme;
	}

	this.convolution=function(noyau){
		var j,k;
		var cp=this.copie();
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				cp.tab2D[j][k]=this.convPixel(noyau,k,j);
			}
		}
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k]=cp.tab2D[j][k];
			}
		}
	}

	this.add=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].r+=img2.tab2D[j][k].r;
				this.tab2D[j][k].g+=img2.tab2D[j][k].g;
				this.tab2D[j][k].b+=img2.tab2D[j][k].b;
			}
		}
	}

	this.mult=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].r*=img2.tab2D[j][k].r;
				this.tab2D[j][k].g*=img2.tab2D[j][k].g;
				this.tab2D[j][k].b*=img2.tab2D[j][k].b;
			}
		}
	}

	this.sqrtall=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.tab2D[j][k].r=Math.sqrt(this.tab2D[j][k].r);
				this.tab2D[j][k].g=Math.sqrt(this.tab2D[j][k].g);
				this.tab2D[j][k].b=Math.sqrt(this.tab2D[j][k].b);
			}
		}
	}

}
