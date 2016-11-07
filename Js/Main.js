window.onload = function()
{
    //-------- creation d'un élément image --------
    var img = document.createElement("img");
    img.src = "mire.png";
    document.body.appendChild(img);
    var largeur = img.naturalWidth;  // On récupère la largeur
    var hauteur = img.naturalHeight; // et la hauteur de l'image

    //-------- creation d'un élément canvas --------
    var canv = document.createElement("canvas");
    canv.width = largeur;
    canv.height = hauteur;
    document.body.appendChild(canv);

    //-------- récupération du contexte  --------
    var ctxt = canv.getContext('2d');

    //------- chargement de l'image de départ dans le canvas -----
    ctxt.drawImage(img, 0, 0);
    var imgData = ctxt.getImageData(0,0,largeur,hauteur);

    //--------------------------------------------------
    //------------- Traitement de imgData --------------
    //--------------------------------------------------



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
}
