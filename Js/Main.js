var m_img;
var ctxt;
var SeuilImg=100;
var svg;
window.onload = function()
{
	svg=document.createElementNS('http://www.w3.org/2000/svg',"svg");
	document.body.appendChild(svg);
	document.getElementById("SliderSeuil").value=SeuilImg;
  //-------- creation d'un élément image --------
  var img = new Image();
  img.crossorigin="anonymous";
  img.className="col-md-6";
  img.style.verticalAlign="initial";
  img.id="img"
  document.getElementById("main").appendChild(img);
  var canv = document.createElement("canvas");
	canv.id="canvS";
  document.getElementById("main").appendChild(canv);
  canv.className="col-md-6";
	document.getElementById("PlusSeuil").onclick=(function(){
	  SeuilImg++;
	  document.getElementById("ValueSeuil").innerHTML = "Seuil : "+SeuilImg;
	  var tmpImg=m_img.copie();
	  tmpImg.seuil(SeuilImg);
	  var imgData = ctxt.getImageData(0,0,tmpImg.largeur,tmpImg.hauteur);
	  tmpImg.toImgData(imgData.data);
	  ctxt.putImageData(imgData,0,0);
	});
	document.getElementById("MinusSeuil").onclick=(function(){
	  SeuilImg--;
	  document.getElementById("ValueSeuil").innerHTML = "Seuil : "+SeuilImg;
	  var tmpImg=m_img.copie();
	  tmpImg.seuil(SeuilImg);
	  var imgData = ctxt.getImageData(0,0,tmpImg.largeur,tmpImg.hauteur);
	  tmpImg.toImgData(imgData.data);
	  ctxt.putImageData(imgData,0,0);
	});
	document.getElementById("SliderSeuil").onmouseup=(function(){
		SeuilImg=this.value;
		document.getElementById("ValueSeuil").innerHTML = "Seuil : "+SeuilImg;
		var tmpImg=m_img.copie();
		tmpImg.seuil(SeuilImg);
		var imgData = ctxt.getImageData(0,0,tmpImg.largeur,tmpImg.hauteur);
		tmpImg.toImgData(imgData.data);
		ctxt.putImageData(imgData,0,0);
	});
	document.getElementById("commitImg").onclick=(function(){
		document.getElementById("img").src=document.getElementById("inputfile").value;
	});

	document.getElementById("InputVect").onclick=(function(){
		var tmpImg=m_img.copie();
		tmpImg.seuil(SeuilImg);
		tmpImg=tmpImg.ToNiveauGris();
		var Vecto=new VectImg();
		var prec=document.getElementById("PrecVect").value;
		Vecto.ToVect(tmpImg,prec);
		//var testV2=new VectImgV2();
		//testV2.ToV2(Vecto);
		var canvasVect=document.getElementById("Vect");
		var img=document.getElementById("img");
		var largeur = img.naturalWidth;  // On récupère la largeur
	  var hauteur = img.naturalHeight; // et la hauteur de l'image
		canvasVect.width=largeur;
		canvasVect.height=hauteur;
		var context=canvasVect.getContext('2d');
		svg.setAttribute('height',hauteur);
		svg.setAttribute('width',largeur);
		//Vecto.draw(context);
		Vecto.drawsvg(svg);
	});

	document.getElementById("Filter").onclick=(function(){
		var img=document.getElementById("img");
		var canv=document.getElementById("canvS");
		var largeur = img.naturalWidth;  // On récupère la largeur
	  var hauteur = img.naturalHeight; // et la hauteur de l'image
		canv.width = largeur;
	  canv.height = hauteur;
		ctxt = canv.getContext('2d');
	  //------- chargement de l'image de départ dans le canvas -----
	  ctxt.drawImage(img, 0, 0);
	  var imgData = ctxt.getImageData(0,0,largeur,hauteur);
	  //--------------------------------------------------
	  //------------- Traitement de imgData --------------
	  //--------------------------------------------------
	  m_img=new MonImage(largeur,hauteur);
	  m_img.fromImageData(imgData.data);
	  m_img.sobel();
	  var tmpImg=m_img.copie();
	  tmpImg.seuil(SeuilImg);
	  tmpImg.toImgData(imgData.data);
	  //---- afficher la tailles ----
	  console.log(imgData.width + " x " + imgData.height);




	  //--------------------------------------------------
	  //------------- Fin des Traitements ----------------
	  //--------------------------------------------------

	  // visualiser imgData modifié

	  ctxt.putImageData(imgData,0,0);
	});

}
