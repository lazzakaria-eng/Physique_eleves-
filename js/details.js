/* Explications détaillées (« Pour bien comprendre ») affichées dans l'onglet Cours.
   DETAILS['id du chapitre'] = [{ t: 'titre', h: 'texte HTML (formules entre \( et \))', sim: 'simulation à ouvrir (facultatif)' }] */
'use strict';
const DETAILS = {
  'tc-mouvement': [
    { t: 'La relativité du mouvement', sim: 'relativite', h: TX`<p>Un corps est <b>en mouvement</b> par rapport à un autre corps si sa position par rapport à ce corps change au cours du temps ; sinon il est <b>au repos</b> par rapport à lui. Le corps par rapport auquel on étudie le mouvement s’appelle le <b>référentiel</b> (ou corps de référence).</p>
<p><b>Exemple 1 — le passager assis.</b> Un passager est assis dans un train qui roule.</p>
<ul><li>Par rapport au <b>train</b>, sa position ne change pas : il est <b>immobile</b>.</li>
<li>Par rapport au <b>quai</b>, sa position change : il est <b>en mouvement</b>, avec la vitesse du train.</li></ul>
<p>On ne peut donc pas dire « le passager bouge » ou « ne bouge pas » sans préciser le référentiel.</p>
<p><b>Exemple 2 — le passager qui marche.</b> Le train roule à \(v_t = 10\ \text{m/s}\) et le passager marche vers l’avant du train à \(v_p = 1{,}5\ \text{m/s}\) par rapport au train.</p>
<ul><li>Vitesse du passager par rapport au train : \(1{,}5\ \text{m/s}\).</li>
<li>Vitesse du passager par rapport au quai : \(10 + 1{,}5 = 11{,}5\ \text{m/s}\) (s’il marche vers l’arrière : \(10 - 1{,}5 = 8{,}5\ \text{m/s}\)).</li></ul>
<p>La <b>vitesse</b> d’un corps dépend du référentiel.</p>
<p><b>Exemple 3 — la balle lâchée dans le train.</b> Un passager lâche une balle dans le train qui roule à vitesse constante.</p>
<ul><li>Dans le référentiel du <b>train</b>, la balle tombe <b>verticalement</b> : trajectoire rectiligne.</li>
<li>Dans le référentiel du <b>quai</b>, la balle avance en même temps qu’elle tombe : trajectoire <b>courbe</b> (une parabole).</li></ul>
<p>La <b>trajectoire</b> d’un corps dépend aussi du référentiel. Même chose pour la valve d’une roue de vélo : cercle par rapport au cadre du vélo, courbe en arches (cycloïde) par rapport à la route.</p>
<p><b>Référentiels usuels.</b> Le <b>référentiel terrestre</b> (le sol, un bâtiment, le quai…) pour les mouvements sur Terre ; le <b>référentiel géocentrique</b> (centre de la Terre et trois étoiles lointaines) pour la Lune et les satellites ; le <b>référentiel héliocentrique</b> (centre du Soleil) pour les planètes.</p>
<p><b>À retenir :</b> pour décrire un mouvement, il faut toujours : 1) choisir un référentiel ; 2) lui associer un repère d’espace (une origine et des axes) ; 3) lui associer un repère de temps (une origine des dates et une unité).</p>` },
    { t: 'Repérer un mobile : enregistrement et vitesse instantanée', sim: 'mouvement', h: TX`<p>Pour étudier un mouvement, on enregistre les positions successives \(M_0, M_1, M_2, \dots\) d’un point du mobile à intervalles de temps égaux \(\tau\) (table à coussin d’air, vidéo, chronophotographie).</p>
<ul><li>Si les points sont <b>alignés</b>, la trajectoire est rectiligne.</li>
<li>Si les distances entre points successifs sont <b>égales</b>, la vitesse est constante : mouvement <b>uniforme</b>.</li>
<li>La vitesse instantanée au point \(M_i\) se calcule avec les deux points voisins : \(v_i = \dfrac{M_{i-1}M_{i+1}}{2\tau}\).</li></ul>
<p>Le <b>vecteur vitesse</b> \(\vec v_i\) a pour origine \(M_i\), pour direction la tangente à la trajectoire, pour sens celui du mouvement et pour longueur la valeur \(v_i\) à l’échelle choisie.</p>` },
  ],
  'tcc-extraction': [
    { t: 'L’extraction liquide – liquide (ampoule à décanter)', sim: 'decantation', h: TX`<p>Extraire une espèce chimique, c’est la faire passer d’un mélange vers un solvant où elle est plus soluble. Exemple : extraire le diiode d’une eau iodée.</p>
<p><b>Choix du solvant extracteur.</b> Il doit :</p>
<ul><li>dissoudre l’espèce à extraire <b>mieux que l’eau</b> ;</li>
<li><b>ne pas être miscible</b> à l’eau (sinon on n’obtient qu’une seule phase) ;</li>
<li>être le moins dangereux possible.</li></ul>
<p>Le cyclohexane convient pour le diiode ; l’éthanol ne convient pas car il se mélange à l’eau.</p>
<p><b>Protocole.</b></p>
<ol><li>Verser la solution aqueuse puis le solvant dans l’ampoule à décanter, robinet fermé.</li>
<li>Boucher, agiter vigoureusement en <b>dégazant</b> souvent (ouvrir le robinet, ampoule retournée).</li>
<li>Poser l’ampoule sur son support, enlever le bouchon et laisser <b>décanter</b> : deux phases se séparent.</li>
<li>La phase la <b>moins dense</b> est en haut : avec le cyclohexane (\(d = 0{,}78\)), la phase organique, violette, est au-dessus ; avec le dichlorométhane (\(d = 1{,}33\)), elle est en dessous.</li>
<li>Ouvrir le robinet pour recueillir la phase inférieure dans un bécher, puis la phase supérieure dans un autre.</li></ol>` },
    { t: 'L’hydrodistillation (entraînement à la vapeur)', sim: 'hydrodistillation', h: TX`<p>Elle sert à extraire les <b>huiles essentielles</b> des plantes (lavande, menthe, eucalyptus, clou de girofle…).</p>
<p><b>Montage.</b> Un ballon contenant la plante et de l’eau est chauffé par un chauffe-ballon ; il est surmonté d’un réfrigérant à eau ; on recueille le distillat dans un erlenmeyer ou une éprouvette.</p>
<p><b>Principe.</b></p>
<ol><li>L’eau bout (environ 100 °C) ; la <b>vapeur d’eau entraîne</b> les molécules odorantes de la plante.</li>
<li>Dans le réfrigérant, l’eau froide circule <b>de bas en haut</b> ; les vapeurs se <b>condensent</b>.</li>
<li>Le <b>distillat</b> recueilli contient deux phases : l’huile essentielle (peu soluble dans l’eau, moins dense) au-dessus, l’eau en dessous.</li>
<li>Pour récupérer davantage d’huile, on ajoute du sel (<b>relargage</b> : l’huile est encore moins soluble dans l’eau salée), puis on sépare les phases à l’ampoule à décanter.</li></ol>
<p>Les pierres ponce (ou grains de régulation d’ébullition) assurent une ébullition régulière.</p>` },
    { t: 'Identifier par chromatographie', sim: 'ccm', h: TX`<p>Sur une plaque de chromatographie, on dépose une goutte de chaque échantillon sur la ligne de dépôt, puis on la place dans une cuve contenant l’éluant (sous la ligne de dépôt). L’éluant monte par capillarité et entraîne les espèces, plus ou moins vite.</p>
<ul><li>Une espèce pure donne <b>une seule tache</b> ; un mélange en donne plusieurs.</li>
<li>Deux taches à la même hauteur (même éluant) correspondent à la <b>même espèce</b>.</li>
<li>Le rapport frontal \(R_f = \dfrac{h}{H}\) (h : distance parcourue par la tache, H : par l’éluant) caractérise une espèce pour un éluant donné.</li>
<li>Les taches incolores se révèlent sous lampe UV ou au diiode.</li></ul>` },
  ],
};
