// on fait une liste des mots potentiellement élisés devant une voyelle pour éviter qu'ils soient considérés comme faisant partie du même mot que celui qui les suit
// c' d' j' jusqu' l' lorsqu' m' n' puisqu' qu' s' t'
var apoliste = [["c","'"],["d","'"],["j","'"],["j","u","s","q","u","'"],["l","'"],["l","o","r","s","q","u","'"],["m","'"],["n","'"],["p","u","i","s","q","u","'"],["q","u","'"],["s","'"],["t","'"]];
// on fait une liste des mots potentiellement ajoutés après un tiret pour éviter qu'ils soient considérés comme faisant partie du même mot que celui qui les précède
// -ce -ci -en -elle -elles -il -ils -je -là -leur -lui -moi -nous -t- -toi -tu -vous -y         quasi- ?
var tirliste = [["-","c","e"],["-","c","i"],["-","e","n"],["-","e","l","l","e"],["-","e","l","l","e","s"],["-","i","l"],["-","i","l","s"],["-","j","e"],["-","l","à"],["-","l","e","u","r"],["-","l","u","i"],["-","m","o","i"],["-","n","o","u","s"],["-","t"],["-","t","o","i"],["-","t","u"],["-","v","o","u","s"],["-","y"]];

// texte2 va recevoir les mots séparément
var texte2 = [];

// valeur donne le numéro des lettres (dans l'alphabet)
var valeur = function (lettre){
   switch (lettre){
      case "e":
         return 5;
         break;
      case "a":
         return 1;
         break;
      case "i":
         return 9;
         break;
      case "s":
         return 19;
         break;
      case "n":
         return 14;
         break;
      case "r":
         return 18;
         break;
      case "t":
         return 20;
         break;
      case "o":
         return 15;
         break;
      case "l":
         return 12;
         break;
      case "u":
         return 21;
         break;
      case "d":
         return 4;
         break;
      case "c":
         return 3;
         break;
      case "m":
         return 13;
         break;
      case "p":
         return 16;
         break;
      case "é":
         return 5;
         break;
      case "g":
         return 7;
         break;
      case "b":
         return 2;
         break;
      case "v":
         return 22;
         break;
      case "h":
         return 8;
         break;
      case "f":
         return 6;
         break;
      case "q":
         return 17;
         break;
      case "y":
         return 25;
         break;
      case "x":
         return 24;
         break;
      case "j":
         return 10;
         break;
      case "è":
         return 5;
         break;
      case "à":
         return 1;
         break;
      case "k":
         return 11;
         break;
      case "w":
         return 23;
         break;
      case "z":
         return 26;
         break;
      case "ê":
         return 5;
         break;
      case "'":
         return 27;
         break;
      case "ç":
         return 3;
         break;
      case "ô":
         return 15;
         break;
      case "â":
         return 1;
         break;
      case "î":
         return 9;
         break;
      case "û":
      case "ù":
         return 21;
         break;
      case "-":
         return 27;
         break;
      case "ï":
         return 9;
         break;
      case "ü":
         return 21;
         break;
      case "ë":
         return 5;
         break;
      case "ö":
      case "œ":
         return 15;
         break;
      case "ä":
      case "æ":
         return 1;
         break;
      case "ÿ":
         return 25;
         break;
      default:
         return 0;
   }
}

// valeur2 sépare ensuite les lettres avec un diacritique (ordre un peu arbitraire)
var valeur2 = function (lettre){
   switch (lettre){
      case "a":
         return 0;
         break;
      case "à":
         return 1;
         break;
      case "e":
         return 0;
         break;
      case "é":
         return 1;
         break;
      case "è":
         return 2;
         break;
      case "u":
         return 0;
         break;
      case "û":
         return 2;
         break;
      case "ù":
         return 1;
         break;
      case "ê":
         return 3;
         break;
      case "ë":
         return 4;
         break;
      case "o":
         return 0;
         break;
      case "ô":
         return 1;
         break;
      case "â":
         return 2;
         break;
      case "ä":
      return 3;
      break;
      case "æ":
         return -1;
         break;
      case "c":
         return 0;
         break;
      case "ç":
         return 1;
         break;
      case "i":
         return 0;
         break;
      case "î":
         return 1;
         break;
      case "ï":
         return 2;
         break;
      case "ö":
         return 2;
         break;
      case "œ":
         return -1;
         break;
      case "ü":
         return 3;
         break;
      case "y":
         return 0;
         break;
      case "ÿ":
         return 1;
         break;
      case "'":
         return 9998;
         break;
      case "-":
         return 9999;
         break;
      case undefined:   
         return -1;
         break;
   }
}

// on fait une égalité de tableaux, on ne manipule pas d'autres objets ici ; on reste un peu générique en autorisant les tableaux de tableaux de ...
var eqtab = function (t1,t2) {
   if (t1 === t2) {
      return true;
   } else if ((typeof(t1) === "object") && (typeof(t2) === "object")) {
      var len = t1.length;
      if (t2.length === len) {
         for (var i=0;i<len;i++) {
            if (!(eqtab(t1[i],t2[i]))) {
               break;
            }
         }
         return (i === len);
      } else {
         return false;
      }
   } else {
      return false;
   }
}

// on vérifie si un préfixe de la liste est le début du mot et si oui, on sépare et on réitère : on renvoie une liste des mots (potentiellement) séparés
// à utiliser pour les apostrophes
var estdeb = function (mot,liste) {
   var len = liste.length;
   var b = false;
   var lent;
   var pref;
   for (var i=0;i<len;i++) {
      pref = liste[i];
      lent = pref.length;
      if (eqtab(pref,mot.slice(0,lent))) {
         b = true;
         break;
      }
   }
   if (b) {
      return ([mot.slice(0,(lent-1))].concat(estdeb(mot.slice(lent),liste)));
   } else {
      return [mot];
   }
}

// on vérifie si un suffixe de la liste est la fin du mot et si oui, on sépare et on réitère : on renvoie une liste des mots (potentiellement) séparés
// à utiliser pour les tirets
var estfin = function (mot,liste) {
   var len = liste.length;
   var b = false;
   var lent;
   var suff;
   for (var i=0;i<len;i++) {
      suff = liste[i];
      lent = suff.length;
      if (eqtab(suff,mot.slice(-lent))) {
         b = true;
         break;
      }
   }
   if (b) {
      var res = estfin(mot.slice(0,-lent),liste);
      res.push(mot.slice(-lent+1));
      return res;
   } else {
      return [mot];
   }
}

// pourtexte2 coupe les mots du texte dans texte2 sans garder de mot vide
var pourtexte2 = function (texte) {
   textelgr = texte.length;
   texte2 = [];
   var mot = [];
   var lettre;
   var val;
   var bapo = false;
   var btir = false;
   var mott;
   var lent;
   for (var i=0;i<textelgr;i++){
      lettre = texte.charAt(i);
      val = valeur(lettre);
      if (val === 0){
         // si on change de mot
         if (bapo) {
            // si dans le mot qu'on vient de finir, il y a une apostrophe, on vérifie les préfixes
            mott = estdeb(mot,apoliste);
            lent = mott.length-1;
            for (var j=0;j<lent;j++) {
               texte2.push(mott[j]);
            }
            if (btir) {
               // si dans le mot qu'on vient de finir, il y a un tiret, on vérifie les suffixes
               mot = mott[lent];
               mott = estfin(mot,tirliste);
               lent = mott.length;
               for (var j=0;j<lent;j++) {
                  texte2.push(mott[j]);
               }
               btir = false;
            } else {
               texte2.push(mott[lent]);
            }
            bapo = false;
            mot = [];
         } else if (btir) {
            // si dans le mot qu'on vient de finir, il y a un tiret, on vérifie les suffixes
            mott = estfin(mot,tirliste);
            lent = mott.length;
            for (var j=0;j<lent;j++) {
               texte2.push(mott[j]);
            }
            btir = false;
            mot = [];
         }else if (mot.length > 0) {
            texte2.push(mot);
            mot = [];
         }
      } else {
         // si on est dans le mot en cours, on ajoute la lettre et on actualise la présence d'apostrophe ou tiret si besoin
         mot.push(lettre);
         if (lettre === "'") {
            bapo = true;
         } else if (lettre === "-") {
            btir = true;
         }
      }
   }
   if (mot.length > 0) {
      texte2.push(mot);
   }
}

// pour comparer les mots alphabétiquement, on commence par dédoubler les æ et œ, supprime les ' et - (on comparera plus finement ensuite si besoin)
var pourcompare = function (mot) {
   var motlgr = mot.length;
   var mot1 = [];
   var i = 0;
   while (i < motlgr) {
      var lettre = mot[i];
      if (lettre === "œ"){
         mot1.push("o");
         mot1.push("e");
      } else if (lettre === "æ"){
         mot1.push("a");
         mot1.push("e");
      } else if ((lettre !== "'") && (lettre !== "-")) {
         mot1.push(lettre);
      }
      i++;
   }
   return mot1;
}

// on compare deux mots largement (leurs versions avec dédoublement et suppression, en ne s'intéressant qu'à la place des lettres dans l'alphabet)
// résultats : 0 sont "égaux" ; 1 premier avant deuxième ; 2 deuxième avant premier
var comparelarge = function (mot1, mot2) {
   var b = true;
   var a;
   var mot1lgr = mot1.length;
   var mot2lgr = mot2.length;
   var val1;
   var val2;
   var i = 0;
   while (b) {
      if (i === mot1lgr) {
         if (i === mot2lgr) {
            // si les deux sont finis, ils sont "égaux"
            a = 0;
         } else {
            // si le premier est fini mais pas le deuxième, le premier est avant
            a = 1;
         }
         b = false;
      } else {
         if (i === mot2lgr) {
            // si le deuxième est fini mais pas le premier, le deuxième est avant
            a = 2;
            b = false;
         } else {
            // sinon, on compare les lettres et si elles sont identiques on passe à la prochaine
            val1 = valeur(mot1[i]);
            val2 = valeur(mot2[i]);
            if (val1 < val2) {
               a = 1;
               b = false;
            } else if (val1 > val2) {
               a = 2;
               b = false;
            } else {
               i++;
            }
         }
      }
   }
   return a;
}

// on compare les mots originels s'ils étaient indifférentiables sans tenir compte des caractères spéciaux
var compare2 = function (mot1, mot2) {
   var b = true;
   var a;
   var lettre1;
   var lettre2;
   var val1;
   var val2;
   var i = 0;
   while (b) {
      lettre1 = mot1[i];
      lettre2 = mot2[i];
      if (lettre1 === lettre2) {
         i++;
      } else {
         val1 = valeur2(lettre1);
         val2 = valeur2(lettre2);
         if (val1 < val2) {
            a = 1;
            b = false;
         } else if (val1 > val2) {
            a = 2;
            b = false;
         } else {
            i++;
         }
      }
   }
   return a;
}

// on va trier les mots par ordre alphabétique avec leur nombre d'occurences
var textetrie = [];

// insere les mots à leur place, trié, avec le nombre d'occurences
var insere = function (texte) {
   textetrie = [];
   var textelgr = texte.length;
   var textetrielgr = 0;
   var b;
   var jd, je, jf;
   var mot1;
   var mot1b;
   var triple;
   var mot2;
   var mot2b;
   var n;
   var c1;
   var c2;
   for (var i=0;i<textelgr;i++) {
      // pour chaque mot, on initialise des variables pour trouver où le placer
      b = true;
      jd = -1;
      jf = textetrielgr;
      mot1 = texte[i];
      mot1b = pourcompare(mot1);
      while (b) {
         if ((jf-jd) === 1) {
            // quand on a trouvé un truc avant et un truc après consécutif, le mot se place entre les deux
            textetrie.splice(jf, 0, [mot1,1,mot1b]);
            textetrielgr += 1;
            b = false;
         } else {
            // sinon, on regarde au milieu de notre intervalle et on le met à jour (sauf si on tombe sur le même mot)
            je = Math.floor((jd+jf)/2);
            triple = textetrie[je];
            mot2 = triple[0];
            mot2b = triple[2];
            // on compare d'abord largement
            c1 = comparelarge(mot1b, mot2b);
            if (c1 === 1) {
               jf = je;
            } else if (c1 === 2) {
               jd = je;
            } else {
               // si ce n'est pas suffisant, on affine la comparaison
               if (eqtab(mot1, mot2)) {
                  n = triple[1]+1;
                  textetrie[je] = [mot1,n,mot1b];
                  b = false;
               } else {
                  c2 = compare2(mot1, mot2);
                  if (c2 === 1) {
                     jf = je;
                  } else {
                     jd = je;
                  }
               }
            }            
         }
      }
   }
}

// on va trier les mots par nombre d'occurences décroissant (à nombre égal d'occurences, on garde l'ordre alphabétique)
var textenbr = [];

var insere2 = function (texte) {
   textenbr = [];
   var textelgr = texte.length;
   var b;
   var jd, je, jf;
   var couple1;
   var n1;
   var couple2;
   var n2;
   for (var i=0;i<textelgr;i++) {
      couple1 = texte[i];
      n1 = couple1[1];
      jd = -1;
      jf = i;
      while ((jf-jd) > 1) {
         je = Math.floor((jd+jf)/2);
         couple2 = textenbr[je];
         n2 = couple2[1];
         if (n1 > n2) {
            jf = je;
         } else {
            jd = je;
         }
      }
      textenbr.splice(jf,0,couple1);
   }
}

var textetrielex = [];

// on trie lexicographiquement
var inserelex = function (texte) {
   textetrielex = [];
   var textelgr = texte.length;
   var textetrielgr = 0;
   var b;
   var jd, je, jf;
   var mot1;
   var mot1b;
   var triple;
   var mot2;
   var mot2b;
   var l1;
   var l2;
   var n;
   var c1;
   var c2;
   for (var i=0;i<textelgr;i++) {
      b = true;
      jd = -1;
      jf = textetrielgr;
      mot1 = texte[i];
      mot1b = pourcompare(mot1);
      l1 = mot1.length;
      while (b) {
         if ((jf-jd) === 1) {
            textetrielex.splice(jf, 0, [mot1,1,mot1b]);
            textetrielgr += 1;
            b = false;
         } else {
            je = Math.floor((jd+jf)/2);
            triple = textetrielex[je];
            mot2 = triple[0];
            mot2b = triple[2];
            l2 = mot2.length;
            if (l1 < l2) {
               jf = je;
            } else if (l1 > l2) {
               jd = je;
            } else {
               c1 = comparelarge(mot1b, mot2b);
               if (c1 === 1) {
                  jf = je;
               } else if (c1 === 2) {
                  jd = je;
               } else {
                  if (eqtab(mot1, mot2)) {
                     n = triple[1]+1;
                     textetrielex[je] = [mot1,n,mot1b];
                     b = false;
                  } else {
                     c2 = compare2(mot1, mot2);
                     if (c2 === 1) {
                        jf = je;
                     } else {
                        jd = je;
                     }
                  }
               }
            }
         }
      }
   }
}

// on crée une table de fréquence de nombre d'occurences (voir le texte de la déclaration de la variable contenuTable)
var toTable = function () {
   var len = textenbr.length;
   var i = 0;
   var j = 0;
   var tuple, n, b, k;
   var contenuTable = "<p>Vous trouverez ci-dessous la fréquence du nombre d'occurences des mots de votre texte (lire \"x&#8239;: y\" comme \"Il y a y mots apparaissant x fois\")&#8239;:</p><table><tr>";
   while (i < len) {
      tuple = textenbr[i];
      n = tuple[1];
      if (j === 10) {
         // toutes les dix cases, on change de ligne
         j = 0;
         contenuTable += "</tr><tr>";
      }
      contenuTable += "<td>" + n + "&#8239;: ";
      k = i;
      if (n === 1) {
         i = len;
      } else {
         b = true;
         while (b) {
            if (i === len) {
               b = false;
            } else {
               tuple = textenbr[i];
               if (n === tuple[1]) {
                  i++;
               } else {
                  b = false;
               }
            }
         }
      }
      k = i-k;
      contenuTable += k + "</td>";
      j++;
   }
   contenuTable += "</tr></table>";
   return contenuTable;
}

var nbcartot = 0;
var nbcar = 0;
var nbmot = 0;
var nbmotd = 0;

// on compte les caractères inclus dans un mot (on en fait la somme sur tous les mots)
var somme = function (tableau) {
   var n = 0;
   var lgr = tableau.length;
   for (var i=0;i<lgr;i++){
      n += (tableau[i]).length;
   }
   return n;
}

// on compte les mots sans tri et on met à jour les variables globales
var compte = function (texte) {
   nbcartot = texte.length;
   pourtexte2((texte.toLowerCase()));
   nbcar = somme(texte2);
   nbmot = texte2.length;   
}

// on trie par ordre alphabétique et on a le nombre de mots différents en plus
var genere1 = function (texte) {
   compte(texte);
   insere(texte2);
   nbmotd = textetrie.length;
}

// on trie par nombre d'occurences
var genere2 = function (texte) {
   genere1(texte);
   insere2(textetrie);
}

// on trie lexicographiquement
var generel = function (texte) {
   compte(texte);
   inserelex(texte2);
   nbmotd = textetrielex.length;
}

var resultat = document.getElementById("resultat");
var contenu = "";

// une fonction d'affichage sur la page
var genere = function (texte) {
   var lgr = texte.length;
   var couple;
   var mot;
   var n;
   var motlgr;
   contenu = "<p>Le texte comprend " + nbcar + " caractères (parmi " + nbcartot + "), répartis dans " + nbmot + " mots, dont " + nbmotd + " différents.</p>";
   contenu += "<p> Les voici&#8239;:<ol>";
   for (var i=0;i<lgr;i++){
      couple = texte[i];
      mot = couple[0];
      n = couple[1];
      contenu = contenu + "<li value=\"" + n + "\">" + mot.join("") + "</li>";
   }
   contenu += "</ol></p>";
   resultat.innerHTML = contenu;
}

// des fonctions pour le déclenchement au clic
var comptea = function () {
   var texte1 = document.getElementById("texte").value;
   compte (texte1);
   resultat.innerHTML = "<p>Le texte comprend " + nbcar + " caractères (parmi " + nbcartot + "), répartis dans " + nbmot + " mots.</p>";
}

var generealpha = function () {
   var texte1 = document.getElementById("texte").value;
   genere1(texte1);
   genere(textetrie);
}

var generenum = function () {
   var texte1 = document.getElementById("texte").value;
   genere2(texte1);
   genere(textenbr);
   resultat.innerHTML += toTable();
}

var generelex = function () {
   var texte1 = document.getElementById("texte").value;
   generel(texte1);
   genere(textetrielex);
}

var raz = function () {
   resultat.innerHTML = "";
   document.getElementById("texte").value = "";
   texte2 = [];
   textetrie = [];
   textenbr = [];
}

var bouton0 = document.getElementById("bouton0");
bouton0.innerHTML = "<button>Compter</button>";
bouton0.addEventListener("click", comptea);
var bouton1 = document.getElementById("bouton1");
bouton1.innerHTML = "<button>Tri alphabétique</button>";
bouton1.addEventListener("click", generealpha);
var bouton2 = document.getElementById("bouton2");
bouton2.innerHTML = "<button>Tri par occurences</button>";
bouton2.addEventListener("click", generenum);
var bouton3 = document.getElementById("bouton3");
bouton3.innerHTML = "<button>Tri lexicographique</button>";
bouton3.addEventListener("click", generelex);
var bouton4 = document.getElementById("bouton4");
bouton4.innerHTML = "<button>Remise à zéro</button>";
bouton4.addEventListener("click", raz);
