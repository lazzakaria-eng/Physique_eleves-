const W = x => `W(${V(x)})`;
const SQ = x => `√<span style="border-top:1.3px solid currentColor;padding:0 2px">${x}</span>`;
module.exports = {
  title: 'Correction — Série 2 : Énergie potentielle et énergie mécanique — Pr. Zakaria Lazrak',
  subtitle: 'Série N°2 : Énergie potentielle de pesanteur et énergie mécanique — 1<sup>ère</sup> Bac SM',
  html: `
${EX(1, 'Questions de cours')}
<p>1) L’énergie potentielle de pesanteur est l’énergie que possède un corps du fait de sa</p>
<p class="ind">${R('position')} (son altitude) dans le champ de pesanteur (interaction Terre – corps).</p>
<p>2) L’état de référence est la position choisie arbitrairement pour laquelle ${R('E<sub>pp</sub> = 0')}.</p>
<p>3) Axe Oz vertical orienté vers le haut : ${B('E<sub>pp</sub> = m g z + C')} (C dépend de l’état de référence).</p>

${EX(2, 'Établissement de l’expression de E<sub>pp</sub>')}
<p>E<sub>pp</sub> = m g z + C = 2 × 10 z + C ⇒ E<sub>pp</sub> = 20 z + C (E<sub>pp</sub> en J, z en m)</p>
<p>1) E<sub>pp</sub> = 0 pour z = 0 ⇒ C = 0 : ${B('E<sub>pp</sub> = 20 z')}</p>
<p>2) E<sub>pp</sub> = 0 pour z = 2 m : 0 = 40 + C ⇒ C = −40 J : ${B('E<sub>pp</sub> = 20 z − 40')}</p>
<p>3) E<sub>pp</sub> = 0 pour z = −3 m : 0 = −60 + C ⇒ C = 60 J : ${B('E<sub>pp</sub> = 20 z + 60')}</p>

${EX(3, 'Choix de l’état de référence')}
<p>E<sub>pp</sub> = m g z + C avec m g = 0,2 × 10 = 2 N.</p>
<p>1) Référence au sol (z = 0) : C = 0 ⇒ ${B('E<sub>pp</sub> = 2 z')}</p>
<p>2) Référence au support (z = h = 1 m) : C = −m g h = −2 J ⇒ ${B('E<sub>pp</sub> = 2 z − 2')}</p>

${EX(4, 'Vrai ou faux')}
<p>1) ${R('Faux')} : en général E<sub>m</sub> = ${F('1', '2')}mv² + mgz + C ; l’expression ${F('1', '2')}mv² + mgz n’est valable</p>
<p class="ind">que si l’état de référence est en z = 0.   2) ${R('Vrai')}.</p>
<p>3) ${R('Vrai')} : la réaction normale ne travaille pas, donc ΔE<sub>m</sub> = ${W('f')}.</p>
<p>4) ${R('Faux')} : ${W('f')} &lt; 0 donc ΔE<sub>m</sub> &lt; 0 : l’énergie mécanique ${R('diminue')}.</p>
<p>5) ${R('Vrai')} : seul le poids travaille, l’énergie mécanique se conserve.</p>

${EX(5, 'Vitesse et conservation de l’énergie mécanique')}
<p>1) E<sub>pp</sub> = m g z + C et E<sub>pp</sub> = 0 pour z = z<sub>A</sub> = DA ⇒ C = −m g DA :</p>
<p class="ind">${B('E<sub>pp</sub> = m g (z − DA)')} soit ${B('E<sub>pp</sub> = 8 (z − 1,5)')}</p>
<p>2) Seul le poids travaille : E<sub>m</sub>(B) = E<sub>m</sub>(A)</p>
<p class="ind">${F('1', '2')}m v<sub>B</sub>² + m g (z<sub>B</sub> − DA) = ${F('1', '2')}m v<sub>A</sub>² + m g (z<sub>A</sub> − DA) avec z<sub>B</sub> = 0 et z<sub>A</sub> = DA</p>
<p class="ind">${B('v<sub>B</sub> = ' + SQ('v<sub>A</sub>² + 2 g DA'))} = ${SQ('4² + 2 × 10 × 1,5')} = ${SQ('46')} ⇒ ${B('v<sub>B</sub> ≈ 6,78 m/s')}</p>

${EX(6, 'Conservation de l’énergie mécanique')}
<p>1) Le solide monte de h = OA sin α : ${B(W('P') + ' = −m g OA sin α')}</p>
<p class="ind">A.N. ${W('P')} = −0,1 × 10 × 0,5 × sin 30° ⇒ ${B(W('P') + ' = −0,25 J')} : travail ${R('résistant')}.</p>
<p>2) T.E.C entre O et A : E<sub>c</sub>(A) − E<sub>c</sub>(O) = ${W('P')} + ${W('R')} ⇒ ${W('R')} = E<sub>c</sub>(A) − E<sub>c</sub>(O) − ${W('P')}</p>
<p class="ind">Graphiquement E<sub>c</sub>(O) = 0,45 J et E<sub>c</sub>(A) = 0,20 J : ${W('R')} = 0,20 − 0,45 + 0,25 = ${B('0')}</p>
<p class="ind">${V('R')} est perpendiculaire au plan : le contact se fait ${R('sans frottement')}.</p>
<p>3) Seul le poids travaille : E<sub>m</sub> se conserve. En O : E<sub>pp</sub>(O) = 0</p>
<p class="ind">E<sub>m</sub> = E<sub>c</sub>(O) + E<sub>pp</sub>(O) = 0,45 + 0 ⇒ ${B('E<sub>m</sub> = 0,45 J')}</p>

${EX(7, 'Représentation de deux courbes d’énergie')}
<p>1) W<sub>O→A</sub>(${V('P')}) = −m g OA sin α = −0,2 × 10 × 2,5 × 0,5 ⇒ ${B(W('P') + ' = −2,5 J')}</p>
<p>2) v<sub>A</sub> = 0 : ΔE<sub>c</sub> = −${F('1', '2')}m v<sub>O</sub>² = −${F('1', '2')} × 0,2 × 5² ⇒ ${B('ΔE<sub>c</sub> = −2,5 J')}</p>
<p>3) T.E.C : ${W('R')} = ΔE<sub>c</sub> − ${W('P')} = −2,5 − (−2,5) ⇒ ${B(W('R') + ' = 0')} : contact ${R('sans frottement')}.</p>
<p>4.1) C = 0 et z = x sin α : E<sub>pp</sub> = (m g sin α) x soit ${B('E<sub>pp</sub> = x')} (J ; m)</p>
<p>4.2) Sans frottement E<sub>m</sub> = cte = ${F('1', '2')}m v<sub>O</sub>² = ${B('2,5 J')} : droite horizontale ;</p>
<p class="ind">E<sub>pp</sub> = x : droite passant par l’origine, jusqu’à (2,5 m ; 2,5 J).</p>
<div class="snap" style="margin-left:6mm"><svg width="300" height="150" viewBox="0 0 300 150" fill="none" stroke="#22409f" stroke-width="1.8" stroke-linecap="round">
  <path d="M30 130 H280 M30 130 V12 M274 126 l6 4 -6 4 M26 18 l4 -6 4 6"/><path d="M30 30 H230" stroke="#c8102e" stroke-width="2.2"/><path d="M30 130 L230 30" stroke-width="2.2"/>
  <path d="M130 130 V80 M30 80 H130" stroke-dasharray="4 4" stroke-width="1.2"/><circle cx="130" cy="80" r="3" fill="#c8102e" stroke="none"/>
  <g fill="#22409f" stroke="none" font-family="K, cursive" font-size="13"><text x="236" y="34" fill="#c8102e">E<tspan dy="3" font-size="9">m</tspan></text><text x="200" y="74">E<tspan dy="3" font-size="9">pp</tspan></text>
  <text x="2" y="34">2,5</text><text x="0" y="84">1,25</text><text x="118" y="146">1,25</text><text x="220" y="146">2,5</text><text x="264" y="146">x (m)</text><text x="36" y="16">E (J)</text></g></svg></div>
<p>4.3) E<sub>c</sub> = E<sub>pp</sub> ⇔ E<sub>m</sub> = 2E<sub>pp</sub> ⇔ E<sub>pp</sub> = ${F('E<sub>m</sub>', '2')} = 1,25 J : intersection ⇒ ${B('x = 1,25 m')} (milieu de OA)</p>

${EX(8, 'Solide en mouvement sur un plan incliné')}
<p>1) Le solide descend de h = L sin α : W<sub>A→B</sub>(${V('P')}) = m g L sin α = 0,4 × 10 × 1,2 × 0,5 ⇒ ${B(W('P') + ' = 2,4 J')}</p>
<p>2) T.E.C entre A et B (${W('R')} = 0) : ${F('1', '2')}m v<sub>B</sub>² − ${F('1', '2')}m v<sub>A</sub>² = ${W('P')}</p>
<p class="ind">${B('v<sub>B</sub> = ' + SQ('v<sub>A</sub>² + 2W(P)/m'))} = ${SQ('2² + 2 × 2,4 / 0,4')} ⇒ ${B('v<sub>B</sub> = 4 m/s')}</p>
<p>3.1) E<sub>m</sub>(A) = ${F('1', '2')}m v<sub>A</sub>² + m g L sin α = 0,8 + 2,4 ⇒ ${B('E<sub>m</sub>(A) = 3,2 J')}</p>
<p class="ind">E<sub>m</sub>(B) = ${F('1', '2')}m v<sub>B</sub>² + 0 = ${F('1', '2')} × 0,4 × 4² ⇒ ${B('E<sub>m</sub>(B) = 3,2 J')}</p>
<p>3.2) E<sub>m</sub>(A) = E<sub>m</sub>(B) : l’énergie mécanique se ${R('conserve')} quand il n’y a pas de frottement.</p>
<p>4) T.E.C entre B et C : ${W('P')} = ${W('R<sub>N</sub>')} = 0 ; ${W('f')} = −f · BC ; v<sub>C</sub> = 0</p>
<p class="ind">−${F('1', '2')}m v<sub>B</sub>² = −f · BC ⇒ ${B('BC = ' + F('m v<sub>B</sub>²', '2f'))} = ${F('0,4 × 4²', '2 × 2')} ⇒ ${B('BC = 1,6 m')}</p>
<p>5) De C vers B : ${F('1', '2')}m v'<sub>B</sub>² − ${F('1', '2')}m v² = −f · CB   (1)</p>
<p class="ind">De B vers A (sans frottement, arrivée avec v = 0) : 0 − ${F('1', '2')}m v'<sub>B</sub>² = −W<sub>A→B</sub>(${V('P')})   (2)</p>
<p class="ind">(1) + (2) : ${F('1', '2')}m v² = f · CB + W<sub>A→B</sub>(${V('P')}) ⇒ ${B('v = ' + SQ('2(f·CB + W(P)) / m'))}</p>
<p class="ind">A.N. v = ${SQ('2 (2 × 1,6 + 2,4) / 0,4')} = ${SQ('28')} ⇒ ${B('v ≈ 5,29 m/s')}</p>

${EX(9, 'Énergie potentielle en différentes positions')}
<p>1) T.E.C entre A et O : ${F('1', '2')}m v<sub>O</sub>² − ${F('1', '2')}m v<sub>A</sub>² = ${W('P')} + ${W('R<sub>N</sub>')} + ${W('f')} avec ${W('R<sub>N</sub>')} = 0</p>
<p class="ind">et ${W('P')} = m g L sin α ⇒ ${B(W('f') + ' = m [ (v<sub>O</sub>² − v<sub>A</sub>²)/2 − g L sin α ]')}</p>
<p class="ind">A.N. ${W('f')} = 0,2 [ ${F('1,17² − 0,4²', '2')} − 10 × 0,2 × 0,5 ] ⇒ ${B(W('f') + ' ≈ −8×10<sup>-2</sup> J')}</p>
<p class="ind">${W('f')} = −f · L ⇒ f = −${F(W('f'), 'L')} = ${F('8×10<sup>-2</sup>', '0,2')} ⇒ ${B('f = 0,4 N')}</p>
<p>2.1) E<sub>pp</sub> = m g z + C avec E<sub>pp</sub> = 0 en z<sub>B</sub> = −OB sin α = −0,1 m ⇒ C = 0,2 J : E<sub>pp</sub> = 2z + 0,2</p>
<p class="ind">en A : z<sub>A</sub> = 0,1 m ⇒ ${B('E<sub>pp</sub>(A) = 0,4 J')} ; en O : ${B('E<sub>pp</sub>(O) = 0,2 J')} ; en B : ${B('E<sub>pp</sub>(B) = 0')}</p>
<p>2.2) Avec frottement : E<sub>m</sub>(B) − E<sub>m</sub>(O) = W<sub>O→B</sub>(${V('f')}) = W<sub>A→O</sub>(${V('f')}) (car OA = OB)</p>
<p class="ind">E<sub>m</sub>(B) = ${F('1', '2')} × 0,2 × 1,17² + 0,2 − 0,08 ⇒ ${B('E<sub>m</sub>(B) ≈ 0,257 J')}</p>

${EX(10, 'Déplacement sur un rail circulaire')}
<p>1) W<sub>A→B</sub>(${V('P')}) = −m g (z<sub>B</sub> − z<sub>A</sub>) avec z<sub>B</sub> − z<sub>A</sub> = −r : ${B(W('P') + ' = m g r')} = 0,75 × 10 × 2</p>
<p class="ind">${B(W('P') + ' = 15 J')} : travail ${R('moteur')}.</p>
<p>2) E<sub>pp</sub> = 0 en z<sub>B</sub> = −r ⇒ C = m g r : E<sub>m</sub> = ${F('1', '2')}m v² + m g (z + r)</p>
<p class="ind">En A : v<sub>A</sub> = 0 et z<sub>A</sub> = 0 ⇒ ${B('E<sub>m</sub>(A) = m g r')} soit ${B('E<sub>m</sub>(A) = 15 J')}</p>
<p>3) E<sub>m</sub>(B) − E<sub>m</sub>(A) = ${W('f')} = −f × ${F('πr', '2')} et E<sub>m</sub>(B) = ${F('1', '2')}m v<sub>B</sub>² (z<sub>B</sub> = −r)</p>
<p class="ind">${F('1', '2')}m v<sub>B</sub>² − m g r = −${F('f π r', '2')} ⇒ ${B('v<sub>B</sub> = ' + SQ('(2g − fπ/m) r'))}</p>
<p class="ind">A.N. v<sub>B</sub> = ${SQ('(20 − 3π/0,75) × 2')} ⇒ ${B('v<sub>B</sub> ≈ 3,86 m/s')}</p>

${EX(11, 'Valeur théorique et valeur expérimentale d’une vitesse')}
<p>1.1) T.E.C entre A et B : E<sub>c</sub>(B) − 0 = ${W('P')} + ${W('R')} avec ${W('R')} = 0 et ${W('P')} = m g AB sin θ</p>
<p class="ind">${B('E<sub>c</sub>(B) = m g AB sin θ')} = 0,4 × 10 × 2 × sin 60° ⇒ ${B('E<sub>c</sub>(B) ≈ 6,93 J')}</p>
<p>1.2) E<sub>c</sub>(B) = ${F('1', '2')}m v<sub>B</sub>² ⇒ v<sub>B</sub> = ${SQ('2E<sub>c</sub>(B)/m')} = ${SQ('2 × 6,93 / 0,4')} ⇒ ${B('v<sub>B</sub> ≈ 5,88 m/s')}</p>
<p>1.3) E<sub>pp</sub> = m g z et z<sub>A</sub> = r(1 − cos θ) + AB sin θ :</p>
<p class="ind">${B('E<sub>pp</sub>(A) = m g [ r(1 − cos θ) + AB sin θ ]')} = 4 × [0,5 + 1,732] ⇒ ${B('E<sub>pp</sub>(A) ≈ 8,93 J')}</p>
<p>2.1) T.E.C entre B et C (${W('R')} = 0 ; ${W('P')} = m g r (1 − cos θ)) :</p>
<p class="ind">${B('v<sub>C</sub> = ' + SQ('v<sub>B</sub>² + 2 g r (1 − cos θ)'))} = ${SQ('5,88² + 2 × 10 × 1 × 0,5')} ⇒ ${B('v<sub>C</sub> ≈ 6,68 m/s')}</p>
<p>2.2) v'<sub>C</sub> &lt; v<sub>C</sub> : il y a des ${R('frottements')} sur BC. T.E.C : ${F('1', '2')}m v'<sub>C</sub>² − E<sub>c</sub>(B) = m g r (1 − cos θ) + ${W('R')}</p>
<p class="ind">${W('R')} = ${F('1', '2')} × 0,4 × 6,2² − 6,93 − 2 ⇒ ${B(W('R') + ' ≈ −1,24 J')}</p>

${EX(12, 'Déplacements sur différentes trajectoires')}
<p>1.1) z<sub>B</sub> = r(1 − cos 30°) = 3(1 − cos 30°) ⇒ ${B('z<sub>B</sub> ≈ 0,4 m')} ; z<sub>C</sub> = z<sub>B</sub> + BC sin α = 0,4 + 1,2 ⇒ ${B('z<sub>C</sub> ≈ 1,6 m')}</p>
<p class="ind">${B('z<sub>D</sub> = z<sub>C</sub> ≈ 1,6 m')} ; z<sub>E</sub> = z<sub>D</sub> + DE sin α = 1,6 + 1 ⇒ ${B('z<sub>E</sub> ≈ 2,6 m')}</p>
<p>1.2) W<sub>A→E</sub>(${V('P')}) = −m g (z<sub>E</sub> − z<sub>A</sub>) = −5 × 10 × 2,6 ⇒ ${B(W('P') + ' = −130 J')}</p>
<p>1.3) T.E.C (${W('R')} = 0) : v<sub>E</sub> = ${SQ('v<sub>A</sub>² + 2W(P)/m')} = ${SQ('64 − 52')} ⇒ ${B('v<sub>E</sub> ≈ 3,46 m/s')}</p>
<p>1.4) Conservation de E<sub>m</sub> : ${F('1', '2')}m v<sub>C</sub>² + m g z<sub>C</sub> = ${F('1', '2')}m v<sub>A</sub>² + 0 ⇒ v<sub>C</sub> = ${SQ('v<sub>A</sub>² − 2 g z<sub>C</sub>')} = ${SQ('64 − 32')}</p>
<p class="ind">${B('v<sub>C</sub> ≈ 5,66 m/s')}</p>
<p>2.1) Pas de frottement entre A et C : v<sub>C</sub> ≈ 5,66 m/s. T.E.C entre C et D : ${W('P')} = ${W('R<sub>N</sub>')} = 0 ;</p>
<p class="ind">${W('f')} = −f · CD ⇒ ${B('f = ' + F('m (v<sub>C</sub>² − v<sub>D</sub>²)', '2 CD'))} = ${F('5 × (32 − 16)', '2 × 2')} ⇒ ${B('f ≈ 20 N')}</p>
<p>2.2) Sur DE (sans frottement) E<sub>m</sub> se conserve ; v<sub>F</sub> = 0 : ${F('1', '2')}m v<sub>D</sub>² = m g (z<sub>F</sub> − z<sub>D</sub>)</p>
<p class="ind">${B('z<sub>F</sub> = z<sub>D</sub> + ' + F('v<sub>D</sub>²', '2g'))} = 1,6 + ${F('16', '20')} ⇒ ${B('z<sub>F</sub> ≈ 2,4 m')} (&lt; z<sub>E</sub> : le corps s’arrête avant E)</p>

${EX(13, 'Détermination du moment d’inertie d’un disque')}
<p>1.1) ω = 2π × ${F('400', '60')} ≈ 41,9 rad/s ; 𝒫 = ℳ<sub>C</sub> ω ⇒ ℳ<sub>C</sub> = ${F('𝒫', 'ω')} = ${F('800', '41,9')} ⇒ ${B('ℳ<sub>C</sub> ≈ 19,1 N·m')}</p>
<p>1.2) Rotation uniforme : ℳ<sub>C</sub> + ℳ<sub>f</sub> = 0 ⇒ ${B('ℳ<sub>f</sub> = −ℳ<sub>C</sub> ≈ −19,1 N·m')}</p>
<p>1.3) ℳ<sub>C</sub> = F · 2r ⇒ F = ${F('ℳ<sub>C</sub>', '2r')} = ${F('19,1', '1,2')} ⇒ ${B('F ≈ 15,9 N')}</p>
<p>2.1) W<sub>f</sub> = ℳ<sub>f</sub> · Δθ avec Δθ = 150 × 2π = 300π rad ⇒ ${B('W<sub>f</sub> ≈ −1,8×10<sup>4</sup> J')} (travail ${R('résistant')})</p>
<p>2.2) T.E.C (rotation) : 0 − ${F('1', '2')}J<sub>Δ</sub> ω² = W<sub>f</sub> (${W('P')} = ${W('R')} = 0)</p>
<p class="ind">J<sub>Δ</sub> = −${F('2W<sub>f</sub>', 'ω²')} = ${F('3,6×10<sup>4</sup>', '41,9²')} ⇒ ${B('J<sub>Δ</sub> ≈ 20,5 kg·m²')}</p>

${EX(14, 'Puissances instantanées des forces appliquées sur un corps')}
<p>1.1) Graphiquement : v<sub>O</sub>² = 0 et pour x<sub>A</sub> = OA = 2 m, v<sub>A</sub>² = 5 m²/s²</p>
<p class="ind">ΔE<sub>c</sub> = ${F('1', '2')}m v<sub>A</sub>² − 0 = ${F('1', '2')} × 0,4 × 5 ⇒ ${B('ΔE<sub>c</sub> = 1 J')}</p>
<p>1.2) T.E.C : ΔE<sub>c</sub> = ${W('P')} + ${W('F')} + ${W('R')} avec ${W('P')} = −m g OA sin α et ${W('F')} = F · OA</p>
<p class="ind">${W('R')} = ΔE<sub>c</sub> + m g OA sin α − F · OA = 1 + 0,8 − 1,8 ⇒ ${B(W('R') + ' = 0')} : contact ${R('sans frottement')}.</p>
<p>1.3) Pour x<sub>I</sub> = 1,6 m : v<sub>I</sub>² = 4 m²/s² ⇒ v<sub>I</sub> = 2 m/s</p>
<p class="ind">• 𝒫(${V('P')}) = −m g v<sub>I</sub> sin α = −0,4 × 10 × 2 × 0,1 ⇒ ${B('𝒫(P) = −0,8 W')}</p>
<p class="ind">• 𝒫(${V('F')}) = F v<sub>I</sub> = 0,9 × 2 ⇒ ${B('𝒫(F) = 1,8 W')} ;  • ${V('R')} ⊥ ${V('v')} ⇒ ${B('𝒫(R) = 0')}</p>
<p>2) T.E.C entre A et B : 0 − ${F('1', '2')}m v<sub>A</sub>² = −m g AB sin α ⇒ ${B('AB = ' + F('v<sub>A</sub>²', '2 g sin α'))} = ${F('5', '2 × 10 × 0,1')} ⇒ ${B('AB = 2,5 m')}</p>

${EX(15, 'Le skieur')}
<p>1.1) ${W('F')} = F · AB · cos β = 650 × 400 × cos 60° ⇒ ${B(W('F') + ' = 1,3×10<sup>5</sup> J')}</p>
<p>1.2) 𝒫(${V('F')}) = F v cos β = 650 × 4 × 0,5 ⇒ ${B('𝒫(F) = 1300 W')}</p>
<p class="ind">Vitesse constante : Δt = ${F(W('F'), '𝒫')} = ${F('1,3×10<sup>5</sup>', '1300')} ⇒ ${B('Δt = 100 s')}</p>
<p>2.1) En C : E<sub>c</sub>(C) = 0 et E<sub>pp</sub>(C) = m g z<sub>C</sub> ⇒ E<sub>m</sub>(C) = 70 × 10 × 120 ⇒ ${B('E<sub>m</sub>(C) = 8,4×10<sup>4</sup> J')}</p>
<p>2.2) Entre C et D les frottements sont négligeables : E<sub>m</sub> se conserve ⇒ ${B('E<sub>m</sub>(D) = 8,4×10<sup>4</sup> J')}</p>
<p>2.3) E<sub>m</sub>(D) = ${F('1', '2')}m v<sub>D</sub>² + m g z<sub>D</sub> ⇒ ${B('v<sub>D</sub> = ' + SQ('2 (E<sub>m</sub>(D)/m − g z<sub>D</sub>)'))}</p>
<p class="ind">A.N. v<sub>D</sub> = ${SQ('2 (8,4×10<sup>4</sup>/70 − 10 × 75)')} ⇒ ${B('v<sub>D</sub> = 30 m/s')}</p>
<p>2.4) T.E.C entre D et O (v<sub>O</sub> = 0) : −${F('1', '2')}m v<sub>D</sub>² = ${W('P')} + ${W('f')} avec ${W('P')} = m g z<sub>D</sub></p>
<p class="ind">et ${W('f')} = −f · DO = −f ${F('z<sub>D</sub>', 'sin α')} ⇒ ${B('f = m (g + ' + F('v<sub>D</sub>²', '2 z<sub>D</sub>') + ') sin α')}</p>
<p class="ind">A.N. f = 70 × (10 + ${F('30²', '2 × 75')}) × sin 13° ⇒ ${B('f ≈ 252 N')}</p>

${EX(16, 'Exploitation d’une courbe de l’énergie potentielle')}
<p>1.1) ${W('F')} = F · BC · cos α ⇒ cos α = ${F(W('F'), 'F · BC')} = ${F('6,78', '4 × 2')} = 0,8475 ⇒ ${B('α ≈ 32°')}</p>
<p>1.2) ΔE<sub>c</sub> = ${F('1', '2')}m (v<sub>C</sub>² − v<sub>B</sub>²) = ${F('1', '2')} × 2,4 × (9 − 4) ⇒ ${B('ΔE<sub>c</sub> = 6 J')}</p>
<p>1.3) T.E.C : ΔE<sub>c</sub> = ${W('P')} + ${W('R')} + ${W('F')} avec ${W('P')} = 0 :</p>
<p class="ind">${W('R')} = 6 − 6,78 = −0,78 J ≠ 0 : il existe des ${R('frottements')}.</p>
<p>1.4) ${W('R')} = ${W('f')} = −f · BC ⇒ f = ${F('0,78', '2')} ⇒ ${B('f = 0,39 N')}</p>
<p>1.5) 𝒫<sub>B</sub>(${V('f')}) = f v<sub>B</sub> cos π = −0,39 × 2 ⇒ ${B('𝒫<sub>B</sub>(f) = −0,78 W')}</p>
<p>2.1) Référence en C : E<sub>pp</sub> = m g z avec z<sub>M</sub> = r − r cos θ = r (1 − cos θ) = r x ⇒ ${B('E<sub>pp</sub>(M) = m g r x')}</p>
<p>2.2.a) Graphiquement x<sub>max</sub> = 0,5 et E<sub>pp,max</sub> = 10,8 J ; cos θ<sub>max</sub> = 0,5 ⇒ ${B('θ<sub>max</sub> = 60°')}</p>
<p>2.2.b) r = ${F('E<sub>pp,max</sub>', 'm g x<sub>max</sub>')} = ${F('10,8', '2,4 × 10 × 0,5')} ⇒ ${B('r = 0,9 m')}</p>
<p>2.2.c) T.E.C entre C et N : ${F('1', '2')}m v<sub>N</sub>² − ${F('1', '2')}m v<sub>C</sub>² = −${F('E<sub>pp,max</sub>', '2')}</p>
<p class="ind">${B('v<sub>N</sub> = ' + SQ('v<sub>C</sub>² − E<sub>pp,max</sub>/m'))} = ${SQ('9 − 4,5')} ⇒ ${B('v<sub>N</sub> ≈ 2,12 m/s')}</p>

${EX(17, 'Fonctionnement d’un treuil')}
<p>1.1) La charge monte de la longueur de câble enroulée : z<sub>1</sub> = n<sub>1</sub> · 2πr = 6 × 2π × 0,1 ⇒ ${B('z<sub>1</sub> ≈ 3,77 m')}</p>
<p class="ind">v<sub>1</sub> = r ω<sub>1</sub> = 0,1 × 27,5 ⇒ ${B('v<sub>1</sub> = 2,75 m/s')}</p>
<p>1.2) T.E.C : ${F('1', '2')}m v<sub>1</sub>² − 0 = ${W('P')} + ${W('T')} = −m g z<sub>1</sub> + T z<sub>1</sub> ⇒ ${B('T = m (g + ' + F('v<sub>1</sub>²', '2 z<sub>1</sub>') + ')')}</p>
<p class="ind">A.N. T = 100 × (10 + ${F('2,75²', '2 × 3,77')}) ⇒ ${B('T ≈ 1100 N')}</p>
<p>1.3) E<sub>pp</sub> = m g z. À t<sub>0</sub> : z<sub>0</sub> = 0 et v<sub>0</sub> = 0 ⇒ ${B('E<sub>m0</sub> = 0')}</p>
<p class="ind">À t<sub>1</sub> : E<sub>m1</sub> = ${F('1', '2')} × 100 × 2,75² + 100 × 10 × 3,77 ⇒ ${B('E<sub>m1</sub> ≈ 4148 J')}</p>
<p class="ind">${R('Conclusion')} : E<sub>m</sub> ne se conserve pas : la charge subit ${V('T')}, dont le travail est moteur.</p>
<p>2.1) v<sub>1</sub> = r ω constante ⇒ ω = 27,5 rad/s constante : rotation ${R('uniforme')}.</p>
<p>2.2) T.E.C sur le treuil : ΔE<sub>c</sub> = 0 = W(${V("T'")}) + W(${V("P'")}) + ${W('R')} + W<sub>m</sub> avec W(${V("P'")}) = ${W('R')} = 0</p>
<p class="ind">W<sub>m</sub> = ℳ Δθ et W(${V("T'")}) = −T' r Δθ ⇒ ${B("ℳ = T' r")} = 1,1×10<sup>3</sup> × 0,1 ⇒ ${B('ℳ = 110 N·m')}</p>
<p class="ind">𝒫 = ℳ ω<sub>1</sub> = 110 × 27,5 ⇒ ${B('𝒫 = 3025 W')}</p>

${EX(18, 'Détermination du moment d’un couple moteur')}
<p>1) W<sub>A→B</sub>(${V('P')}) = −m g AB sin α = −1,25 × 10 × 1,5 × 0,5 ⇒ ${B(W('P') + ' = −9,375 J')}</p>
<p>2) T.E.C : ${F('1', '2')}m v<sub>B</sub>² − 0 = ${W('P')} + ${W('R')} + ${W('T')} avec ${W('R')} = 0 et ${W('T')} = T · AB</p>
<p class="ind">${B('T = ' + F('m v<sub>B</sub>² − 2W(P)', '2 AB'))} = ${F('1,25 × 9 + 18,75', '3')} ⇒ ${B('T = 10 N')}</p>
<p>3) C = 0 et z<sub>B</sub> = AB sin α : E<sub>m</sub>(B) = ${F('1', '2')}m v<sub>B</sub>² + m g AB sin α = 5,625 + 9,375 ⇒ ${B('E<sub>m</sub>(t<sub>1</sub>) = 15 J')}</p>
<p>4) ω<sub>1</sub> = ${F('v<sub>B</sub>', 'r')} = ${F('3', '0,1')} ⇒ ${B('ω<sub>1</sub> = 30 rad/s')}</p>
<p>5) T.E.C sur la poulie : ${F('1', '2')}J<sub>Δ</sub> ω<sub>1</sub>² − 0 = W(${V('P<sub>p</sub>')}) + W(${V('R<sub>p</sub>')}) + W(${V("T'")}) + W<sub>m</sub> avec W(${V('P<sub>p</sub>')}) = W(${V('R<sub>p</sub>')}) = 0</p>
<p class="ind">W(${V("T'")}) = −${W('T')} = −T · AB = −15 J ; W<sub>m</sub> = ℳ<sub>m</sub> Δθ avec Δθ = ${F('AB', 'r')} = 15 rad</p>
<p class="ind">ℳ<sub>m</sub> = ${F('½ J<sub>Δ</sub> ω<sub>1</sub>² + T · AB', 'AB / r')} = ${F('0,45 + 15', '15')} ⇒ ${B('ℳ<sub>m</sub> ≈ 1,03 N·m')}</p>
<p>6) Après la rupture, seul le poids travaille (${W('R')} = 0) ; en D : v<sub>D</sub> = 0</p>
<p class="ind">0 − ${F('1', '2')}m v<sub>B</sub>² = −m g BD sin α ⇒ ${B('BD = ' + F('v<sub>B</sub>²', '2 g sin α'))} = ${F('9', '2 × 10 × 0,5')} ⇒ ${B('BD = 0,9 m')}</p>
`};
