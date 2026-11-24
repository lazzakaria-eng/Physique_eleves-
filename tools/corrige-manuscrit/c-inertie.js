const OG = (a, b) => V(a + b);
module.exports = {
  title: 'Correction — Série : Principe d’inertie (Tronc commun) — Pr. Zakaria Lazrak',
  subtitle: 'Série : Principe d’inertie — Centre d’inertie et relation barycentrique — Tronc commun',
  html: `
<h2 class="ex"><span>Questions de cours</span></h2>
<p>1) Une force peut mettre un corps en mouvement, modifier sa trajectoire et/ou sa vitesse, ou le déformer.</p>
<p>2) ${R('Isolé')} : soumis à aucune force (ex. : sonde spatiale loin de tout astre).</p>
<p class="ind">${R('Pseudo-isolé')} : soumis à des forces qui se compensent, Σ${V('F')} = ${V('0')} (ex. : autoporteur sur une table horizontale).</p>
<p>3) Le centre d’inertie G est le point du solide dont le mouvement est le plus simple : si le solide est pseudo-isolé, G est immobile ou en mouvement rectiligne uniforme.</p>
<p>4) ${R('Principe d’inertie')} : dans un référentiel galiléen, le centre d’inertie d’un solide isolé ou pseudo-isolé est au repos ou en mouvement rectiligne uniforme : ${B('Σ' + V('F') + ' = ' + V('0') + ' ⇔ ' + V('v<sub>G</sub>') + ' = cte')}</p>
<p class="ind">Référentiel galiléen : référentiel où le principe d’inertie est vérifié (ex. : référentiel terrestre).</p>
<p>5) (Σ m<sub>i</sub>) ${OG('OG', '')} = Σ m<sub>i</sub> ${V('OG<sub>i</sub>')} soit ${B(V('OG') + ' = ' + F('Σ m<sub>i</sub> ' + V('OG<sub>i</sub>'), 'Σ m<sub>i</sub>'))}</p>
<p>6) G est confondu avec le ${R('centre de symétrie')} ; s’il existe un axe de symétrie, G est ${R('sur cet axe')}.</p>
<p>7) ${R('au repos ou en mouvement rectiligne uniforme')}.   8) ${R('Σ' + V('F') + ' ≠ ' + V('0'))}.</p>
<p>9) ${R('continue vers la droite d’un mouvement rectiligne uniforme')}.   10) ${R('circulaire')}.</p>

${EX(1, 'Solide suspendu à un fil')}
<p>Le solide n’est soumis qu’à ${V('P')} et ${V('T')}, verticales.</p>
<p>• Cas 1, 2 et 3 : G immobile ou en mouvement rectiligne uniforme ⇒ ${V('P')} + ${V('T')} = ${V('0')} ⇒ ${B('T = P')}</p>
<p>• 4) Il monte en accélérant : la résultante est vers le haut ⇒ ${B('T &gt; P')}</p>
<p>• 5) Il monte en ralentissant : la résultante est vers le bas ⇒ ${B('T &lt; P')}</p>
<p>• 6) Il descend en accélérant : la résultante est vers le bas ⇒ ${B('T &lt; P')}</p>

${EX(2, 'Le parachutiste')}
<p>1) Système {parachutiste + matériel} : le poids ${V('P')} (action à distance de la Terre) et la force ${V('f')} exercée par l’air (frottements).</p>
<p>2) Mouvement rectiligne uniforme ⇒ ${V('P')} + ${V('f')} = ${V('0')}</p>
<p class="ind">${V('P')} : appliqué en G, verticale, vers le bas, P = m g = 92 × 9,8 ⇒ ${B('P ≈ 902 N')}</p>
<p class="ind">${V('f')} : verticale, vers le haut (appliquée en G par simplification) ⇒ ${B('f = P ≈ 902 N')}</p>
<p>3.1) À l’ouverture la vitesse ${R('diminue')} : le mouvement n’est plus uniforme, les forces ne se compensent plus (f &gt; P).</p>
<p>3.2) C’est l’action de l’air sur le parachute (force de frottement beaucoup plus grande).</p>
<p>3.3) Nouvelle vitesse constante : mouvement rectiligne uniforme, les forces se compensent : ${B('f = P')}</p>
<p>3.4) Le caméraman continue sa chute rapide : il voit le parachutiste ${R('monter')} par rapport à lui.</p>

${EX(3, 'Le passager du bus')}
<p>1) Dans le référentiel terrestre, Abdelhakim a un mouvement rectiligne uniforme (comme le bus) : d’après le principe d’inertie, les forces (poids et action du siège) ${R('se compensent')}.</p>
<p>2.1) Référentiel terrestre : le bus ralentit ; Abdelhakim, soumis à ${V('P')} et ${V('R')} qui se compensent, ${R('conserve sa vitesse')} par inertie : il continue tout droit, donc il avance par rapport au bus.</p>
<p>2.2) Référentiel du bus : le bus est immobile ; Abdelhakim, soumis aux mêmes forces qui se compensent, ${R('se met en mouvement')} vers l’avant.</p>
<p>3) Dans le référentiel du bus, les forces se compensent mais Abdelhakim passe du repos au mouvement : le principe d’inertie ${R('n’est pas vérifié')}. Le bus qui freine n’est pas galiléen ; on applique le principe d’inertie dans le ${R('référentiel terrestre')}.</p>
<p>4) Dans le virage à droite, Abdelhakim tend à continuer en ligne droite : par rapport au bus, il est « projeté » vers la ${R('gauche')} (vers l’extérieur du virage).</p>

${EX(4, 'Centre d’inertie de quatre sphères')}
<p>1) (Σ m<sub>i</sub>) ${V('OG')} = Σ m<sub>i</sub> ${V('OG<sub>i</sub>')}</p>
<p>2) En cm : S<sub>2</sub>(0 ; 0) ; S<sub>3</sub>(60 ; 0) ; S<sub>1</sub>(0 ; 30) ; S<sub>4</sub>(60 ; 30) ; Σ m<sub>i</sub> = 1 + 3 + 2 + 4 = 10 kg</p>
<p>3) x<sub>G</sub> = ${F('m<sub>1</sub>×0 + m<sub>2</sub>×0 + m<sub>3</sub>×60 + m<sub>4</sub>×60', '10')} = ${F('(2 + 4) × 60', '10')} ⇒ ${B('x<sub>G</sub> = 36 cm')}</p>
<p class="ind">y<sub>G</sub> = ${F('m<sub>1</sub>×30 + m<sub>2</sub>×0 + m<sub>3</sub>×0 + m<sub>4</sub>×30', '10')} = ${F('(1 + 4) × 30', '10')} ⇒ ${B('y<sub>G</sub> = 15 cm')} ⇒ ${B('G (36 cm ; 15 cm)')}</p>

${EX(5, 'Cylindre composé')}
<p>1) G<sub>a</sub> est au milieu de l’alliage : ${B('OG<sub>a</sub> = 0,5 cm')} ; G<sub>b</sub> au milieu du bois : OG<sub>b</sub> = L<sub>a</sub> + ${F('L<sub>b</sub>', '2')} ⇒ ${B('OG<sub>b</sub> = 6 cm')}</p>
<p>2) V<sub>a</sub> = π r² L<sub>a</sub> = π × 9 × 1 ⇒ ${B('V<sub>a</sub> ≈ 28,3 cm³')} ; V<sub>b</sub> = π r² L<sub>b</sub> ⇒ ${B('V<sub>b</sub> ≈ 282,7 cm³')}</p>
<p>3) m<sub>a</sub> = ρ<sub>a</sub> V<sub>a</sub> = 8 × 28,3 ⇒ ${B('m<sub>a</sub> ≈ 226 g')} ; m<sub>b</sub> = ρ<sub>b</sub> V<sub>b</sub> = 0,8 × 282,7 ⇒ ${B('m<sub>b</sub> ≈ 226 g')} (masses égales)</p>
<p>4) OG = ${F('m<sub>a</sub> OG<sub>a</sub> + m<sub>b</sub> OG<sub>b</sub>', 'm<sub>a</sub> + m<sub>b</sub>')} = ${F('0,5 + 6', '2')} ⇒ ${B('OG = 3,25 cm')}</p>
<p>5) Le milieu géométrique est à 5,5 cm de O. G est plus proche de l’alliage, beaucoup plus dense : le centre d’inertie se rapproche de la partie la plus ${R('massive')}.</p>

${EX(6, 'Solide sur un plan incliné rugueux')}
<p>1) Système : le solide (S) ; référentiel terrestre, considéré comme ${R('galiléen')}.</p>
<p>2) Le poids ${V('P')} et la réaction ${V('R')} du plan incliné.</p>
<p>3) G a un mouvement rectiligne uniforme ⇒ ${B(V('P') + ' + ' + V('R') + ' = ' + V('0'))}</p>
<p>4) ${V('R')} = −${V('P')} : ${V('R')} est verticale, dirigée vers le haut, ${B('R = P = m g = 5 N')}</p>
<p>5) Deux vecteurs de ${R('5 cm')}, verticaux, de sens opposés, appliqués en G (${V('P')}) et au point de contact (${V('R')}).</p>
<p>6) ${V('R')} = ${V('f')} + ${V('R<sub>N</sub>')}. Sur Ox (vers le bas de la pente) : m g sin α − f = 0 ⇒ f = 5 × sin 15° ⇒ ${B('f ≈ 1,29 N')}</p>
<p class="ind">Sur Oy : −m g cos α + R<sub>N</sub> = 0 ⇒ R<sub>N</sub> = 5 × cos 15° ⇒ ${B('R<sub>N</sub> ≈ 4,83 N')}</p>
<p>7) k = ${F('f', 'R<sub>N</sub>')} = tan α ⇒ ${B('k ≈ 0,27')} ; tan φ = k ⇒ ${B('φ = 15° = α')}</p>
<p>8) Sans frottement : ${V('P')} et ${V('R')} = ${V('R<sub>N</sub>')} (perpendiculaire au plan) ne sont pas colinéaires : elles ${R('ne se compensent pas')}.</p>
<p>9) La résultante est parallèle au plan, vers le bas, dans le sens de la vitesse : mouvement ${R('rectiligne accéléré')}.</p>

${EX(7, 'Le camion et le morceau de glace')}
<p>1) Le poids ${V('P')} et la réaction ${V('R')} du plateau, verticale car le plateau est lisse. La glace est immobile par rapport au camion qui roule à vitesse constante : ${R('les forces se compensent')}, ${V('P')} + ${V('R')} = ${V('0')}.</p>
<p>2.1) Dans le référentiel du camion : le morceau de glace est ${R('immobile')}.</p>
<p>2.2) Dans le référentiel de la route : mouvement ${R('rectiligne uniforme')}, V<sub>0</sub> = 36 km/h = 10 m/s.</p>
<p>3.1) La vitesse du camion change : son mouvement n’est pas uniforme, les forces qui s’exercent sur lui ne se compensent pas : le camion ${R('n’est pas pseudo-isolé')}.</p>
<p>3.2) Le plateau est lisse : aucune force horizontale n’agit sur la glace, ${V('P')} + ${V('R')} = ${V('0')} reste vrai.</p>
<p class="ind">La glace garde son mouvement rectiligne uniforme : le principe est ${R('vérifié')}.</p>
<p>3.3) Par rapport à la route : ${B('v = V<sub>0</sub> = 10 m/s')}. Le camion va plus vite qu’elle : par rapport au camion, la glace se déplace ${R('vers l’arrière')}.</p>
<p>3.4) Camion (de 10 à 30 m/s régulièrement) : d<sub>C</sub> = ${F('V<sub>0</sub> + V<sub>1</sub>', '2')} Δt = ${F('10 + 30', '2')} × 0,1 ⇒ ${B('d<sub>C</sub> = 2 m')}</p>
<p class="ind">Glace : d<sub>S</sub> = V<sub>0</sub> Δt = 10 × 0,1 ⇒ ${B('d<sub>S</sub> = 1 m')} ⇒ recul : 2 − 1 = 1 m &lt; 1,5 m : la glace ${R('ne tombe pas')} pendant Δt.</p>
<p class="ind">Après Δt, la glace recule à 30 − 10 = 20 m/s ; il reste 0,5 m : elle ${R('tombe')} au bout de ${F('0,5', '20')} = ${B('0,025 s')}</p>

${EX(8, 'Plaque carrée évidée')}
<p>1) Plaque homogène : masse proportionnelle à la surface. S<sub>P</sub> = 64 − 16 = 48 cm² pour 20 g : m<sub>1</sub> = 20 × ${F('64', '48')} ⇒ ${B('m<sub>1</sub> ≈ 26,7 g')} ; m<sub>2</sub> = 20 × ${F('16', '48')} ⇒ ${B('m<sub>2</sub> ≈ 6,7 g')}</p>
<p>2) ${B('G<sub>1</sub> (4 ; 4)')} et ${B('G<sub>2</sub> (6 ; 6)')} (en cm)</p>
<p>3) m<sub>1</sub> ${V('OG<sub>1</sub>')} = m ${V('OG')} + m<sub>2</sub> ${V('OG<sub>2</sub>')} ⇒ x<sub>G</sub> = ${F('m<sub>1</sub> x<sub>1</sub> − m<sub>2</sub> x<sub>2</sub>', 'm')} = ${F('26,7 × 4 − 6,7 × 6', '20')} ⇒ ${B('x<sub>G</sub> ≈ 3,33 cm')} et par symétrie ${B('y<sub>G</sub> ≈ 3,33 cm')}</p>
<p>4) Rectangle 8 × 4 (surface 32, centre (4 ; 2)) + carré 4 × 4 (surface 16, centre (2 ; 6)) : x<sub>G</sub> = ${F('32 × 4 + 16 × 2', '48')} = ${F('160', '48')} ≈ 3,33 cm ; y<sub>G</sub> = ${F('32 × 2 + 16 × 6', '48')} ≈ 3,33 cm : ${R('même résultat')} ;</p>
<p class="ind">G est sur la diagonale OB (axe de symétrie).</p>

${EX(9, 'Rondelle évidée')}
<p>1) OP = r = 9 cm et OP = 3 OO' ⇒ ${B("OO' = 3 cm")} ; le trou passe par O : ${B("r' = OO' = 3 cm")}</p>
<p>2) M<sub>0</sub> = σ π r² = 81 π σ ; m' = σ π r'² = 9 π σ = ${F('M<sub>0</sub>', '9')} ⇒ ${B("M = M<sub>0</sub> − m' = " + F('8', '9') + ' M<sub>0</sub>')} (donc m' = ${F('M', '8')})</p>
<p>3) Disque plein (G = O) = rondelle évidée (I) + disque retiré (O') :</p>
<p class="ind">M<sub>0</sub> ${V('OO')} = ${V('0')} = M ${V('OI')} + m' ${V("OO'")} ⇒ ${V('OI')} = −${F("m'", 'M')} ${V("OO'")} = −${F('1', '8')} ${V("OO'")}</p>
<p class="ind">${B('OI = 0,375 cm')}, I étant sur la droite (OO'), ${R('du côté opposé')} à O' (et à P).</p>
<p>4) M ${V('OI')} + m ${V('OP')} = ${V('0')} avec ${V('OI')} et ${V('OP')} de sens opposés : M × 0,375 = m × 9 ⇒ ${B('m = ' + F('M', '24'))}</p>

${EX(10, 'Équilibre d’une plaque sur sa base')}
<p>1) Masses proportionnelles aux surfaces : m<sub>1</sub> ∝ 100, m<sub>2</sub> ∝ 10ℓ ; ${B('G<sub>1</sub> (5 ; 5)')} et ${B('G<sub>2</sub> (' + F('ℓ', '2') + ' ; 15)')} (en cm)</p>
<p>2) x<sub>G</sub> = ${F('100 × 5 + 10ℓ × ℓ/2', '100 + 10ℓ')} soit ${B('x<sub>G</sub> = ' + F('100 + ℓ²', '20 + 2ℓ'))}</p>
<p>3) Équilibre tant que la verticale de G coupe [AB] : ${B('0 ≤ x<sub>G</sub> ≤ 10 cm')}</p>
<p>4) ${F('100 + ℓ²', '20 + 2ℓ')} ≤ 10 ⇔ ℓ² − 20 ℓ − 100 ≤ 0. Racine positive : ℓ = 10 + √200 = 10 + 10√2</p>
<p class="ind">${B('ℓ<sub>max</sub> = 10 (1 + √2) ≈ 24,1 cm')}</p>
`};
