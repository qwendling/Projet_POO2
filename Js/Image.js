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
	MatrixAbs.call(this,largeur,hauteur);

	this.fromImageData=function(data){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.set(k,j,new Couleur(data[j*4*this.largeur+k*4],data[j*4*this.largeur+k*4+1],data[j*4*this.largeur+k*4+2],data[j*4*this.largeur+k*4+3]));
			}
		}
	}

	this.toImgData=function(data){
		var c,j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				c=this.get(k,j);
				data[j*4*this.largeur+k*4]=c.r;
				data[j*4*this.largeur+k*4+1]=c.g;
				data[j*4*this.largeur+k*4+2]=c.b;
				data[j*4*this.largeur+k*4+3]=c.opac;
			}
		}
	}
	this.print=function(comp){
		var buffer="";
		var j,k;
		for(j=0;j<this.hauteur;j++){
			buffer=buffer+j+"(";
			for(k=0;k<this.largeur;k++){
				buffer=buffer+" "+this.get(k,j)[comp];
			}
			buffer=buffer+")\n";
		}
		console.log(buffer);
	}
	this.negate=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).negate();
			}
		}
	}

	this.coef=function(co){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).coef(co);
			}
		}
	}

	this.niveauGris=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).niveauGris();
			}
		}
	}

	this.seuil=function(s){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).seuil(s);
			}
		}
	}

	this.permuteComposante=function(comp1,comp2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).permuteComposante(comp1,comp2);
			}
		}
	}

	this.copie=function(){
		var nouv=new MonImage(this.largeur,this.hauteur);
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				nouv.set(k,j,this.get(k,j).copie());
			}
		}
		return nouv;
	}

	this.effacerPartie=function(){
		var j,k;
		for(j=0;j<this.hauteur;j+=2){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).opac=0;
			}
		}
	}

	this.effacerFond=function(couleurFond){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				if(this.get(k,j).memeCouleur(couleurFond))
					this.get(k,j).opac=0;
			}
		}
	}

	this.convPixel=function(noyau,x,y){
		var j,k,c;
		var couleurSomme = new Couleur();
		for(j=0;j<3;j++){
			for(k=0;k<3;k++){
				if(!(x+(k-1)<0 || y+(j-1)<0 || x+(k-1)>=this.largeur || y+(j-1)>=this.hauteur)){
					this.get(x+k-1,y+j-1)
					c=new Couleur(this.get(x+k-1,y+j-1).r,this.get(x+k-1,y+j-1).g,this.get(x+k-1,y+j-1).b,this.get(x+k-1,y+j-1).opac);
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
				cp.set(k,j,this.convPixel(noyau,k,j));
			}
		}
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.set(k,j,cp.get(k,j));
			}
		}
	}

	this.add=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).r+=img2.get(k,j).r;
				this.get(k,j).g+=img2.get(k,j).g;
				this.get(k,j).b+=img2.get(k,j).b;
			}
		}
	}

	this.mult=function(img2){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).r*=img2.get(k,j).r;
				this.get(k,j).g*=img2.get(k,j).g;
				this.get(k,j).b*=img2.get(k,j).b;
			}
		}
	}

	this.sqrtall=function(){
		var j,k;
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				this.get(k,j).r=Math.sqrt(this.get(k,j).r);
				this.get(k,j).g=Math.sqrt(this.get(k,j).g);
				this.get(k,j).b=Math.sqrt(this.get(k,j).b);
			}
		}
	}

    this.ToNiveauGris=function(){
        var newNivGris = new Image_NvGris(this.largeur, this.hauteur);
        var i; var j;
        for(i=0;i<this.hauteur;i++){
            for(j=0;j<this.largeur;j++){
								newNivGris.set(j,i,parseInt(this.get(j,i).intensite()));
            }
        }
        return newNivGris;
    }

	this.sobel=function(){
		var noyau1=tab3x3(1,0,-1,2,0,-2,1,0,-1);
		var noyau2=tab3x3(1,2,1,0,0,0,-1,-2,-1);
		var gx=this.ToNiveauGris();
		var gy=this.ToNiveauGris();
		gx.convolution(noyau1);
		gy.convolution(noyau2);
		gx.mult(gx);
		gy.mult(gy);
		gx.add(gy);
		gx.sqrtall();
		for(j=0;j<this.hauteur;j++){
			for(k=0;k<this.largeur;k++){
				if(gx.tab2D[j][k]>255.)
					this.set(k,j,new Couleur(255,255,255,255));
				else
					this.set(k,j,new Couleur(gx.get(k,j),gx.get(k,j),gx.get(k,j)));
			}
		}
	}

	this.deriche=function(alpha){
	var i; var j;
	var k=  (Math.pow( 1- Math.exp( -alpha ),2 )) /
			(1 + 2 / alpha * Math.exp(-alpha) - Math.exp( -2 * alpha));
	var a1 =0;
	var a2 = 1;
	var a3 = -1;
	var a4 = 0;
	var a5 = k;
	var a6 = k * Math.exp( - alpha ) * (alpha -1);
	var a7 = k * Math.exp( - alpha) * (alpha + 1);
	var a8 = -k * Math.exp(-2 * alpha);
	var b1= 2 * Math.exp(-alpha);
	var b2= -Math.exp(-2 * alpha);
	var c1 = -1 * Math.pow( 1-Math.exp(-alpha) ,2);
	var copie = this.ToNiveauGris();
	var y1= new Image_NvGris(this.largeur, this.hauteur);
	var y2=new Image_NvGris(this.largeur, this.hauteur);
	var tabTmp = new Image_NvGris(this.largeur, this.hauteur);
	var tabTmp2 = new Image_NvGris(this.largeur, this.hauteur);
	var valeur;

			/* smoothing */

					//première étape
	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
					 valeur= copie.calcY1(y1,i,j,b1,b2,a5,a6);
					 y1.set(j,i,valeur);
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
				valeur = copie.calcY2(y2,i,j,b1,b2,a7,a8);
					y2.set(j,i, valeur);
				}
	//tabTmp.tab2D = (( y1.add(y2)).multTab(c1)).tab2D;
	tabTmp= y1.copie();
	tabTmp.add(y2);
	// deuxième étape

	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
				valeur = copie.calc2Y1(y1,i,j,b1,b2,a5,a6,tabTmp);
					y1.set(j,i,valeur);
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
				valeur = copie.calc2Y2(y2,i,j,b1,b2,a7,a8,tabTmp);
					y2.set(j,i,valeur);
				}
	copie = y1.copie();
	copie.add(y2);


	/*x'*/
	/* première étape */
	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
					 valeur= copie.calcY1(y1,i,j,b1,b2,a1,a2);
					 y1.set(j,i,valeur);
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
				valeur = copie.calcY2(y2,i,j,b1,b2,a3,a4);
					y2.set(j,i, valeur);
				}
	//tabTmp.tab2D = (( y1.add(y2)).multTab(c1)).tab2D;
	tabTmp= y1.copie();
			tabTmp.add(y2);
	tabTmp.multTab(c1);
	/* deuxième étape */

	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
				valeur = copie.calc2Y1(y1,i,j,b1,b2,a5,a6,tabTmp);
					y1.set(j,i,valeur);
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
				valeur = copie.calc2Y2(y2,i,j,b1,b2,a7,a8,tabTmp);
					y2.set(j,i,valeur);
				}
	tabTmp = y1.copie();
	tabTmp.add(y2);

	/*y' */
					/* première étape */

	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
				valeur = copie.calcY1(y1,i,j,b1,b2,a5,a6);
					y1.set(j,i,valeur);
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
				valeur = copie.calcY2(y2,i,j,b1,b2,a7,a8);
					y2.set(j,i,valeur);
				}
	tabTmp2 = y1.copie();
	tabTmp2.add(y2);
	// deuxième étape
	for(i=0;i<this.hauteur;i++)
			for(j=0;j<this.largeur;j++){
				valeur = copie.calc2Y1(y1,i,j,b1,b2,a1,a2,tabTmp2);
					y1.set(j,i,valeur);
					//console.log(y1.get(j,i));
				}
	for(i=this.hauteur-1;i>=0;i--)
			for(j=this.largeur-1;j>=0;j--){
					valeur = copie.calc2Y2(y2,i,j,b1,b2,a3,a4,tabTmp2);
					y2.set(j,i,valeur);

				}

		 // console.log(y2);
			//console.log(y1);
			//console.log(c1);
	y1.add(y2);
			//console.log(y1);
			//console.log(y1);
	y1.multTab(c1);
			console.log("achtung");
			console.log(tabTmp);
			console.log(y1);
	//tabTmp2 = y1.copie();

			//console.log(tabTmp2);
			//console.log(tabTmp2);

	tabTmp.mult(tabTmp);
	y1.mult(y1);
	tabTmp.add(y1);
	tabTmp.sqrtall();


	for(j=0;j<this.hauteur;j++){
		for(k=0;k<this.largeur;k++){
			if(tabTmp.get(k,j)>255.)
				this.set(k,j,new Couleur(255,255,255,255));
			else
				this.set(k,j,new Couleur(tabTmp.get(k,j),tabTmp.get(k,j),tabTmp.get(k,j)));
		}
	}
}

}
