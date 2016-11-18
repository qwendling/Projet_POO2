var m_img;
var ctxt;
var SeuilImg=100;
window.onload = function()
{
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
	  m_img.print("r");
	  tmpImg.toImgData(imgData.data);
	  //---- afficher la tailles ----
	  console.log(imgData.width + " x " + imgData.height);

	  //---- afficher les pixels ---
	  var buffer = "";
	  for(var n=0; n<imgData.data.length; n++)
			buffer = buffer + imgData.data[n] + " ";
	  console.log(buffer);



	  //--------------------------------------------------
	  //------------- Fin des Traitements ----------------
	  //--------------------------------------------------

	  // visualiser imgData modifié

	  ctxt.putImageData(imgData,0,0);
	});

}
