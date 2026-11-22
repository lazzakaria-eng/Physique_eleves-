const W = x => `W(${V(x)})`;
const SQ = x => `√<span style="border-top:1.3px solid currentColor;padding:0 2px">${x}</span>`;
const H = x => F('1', '2') + x;
module.exports = {
  title: 'Correction — Série 1 : Travail et énergie cinétique — Pr. Zakaria Lazrak',
  subtitle: 'Série N°1 : Travail et énergie cinétique — 1<sup>ère</sup> Bac SM',
  html: `
${EX(1, 'Gouttière ABC')}
<p>1) Au point M, le mobile est soumis à son poids ${V('P')} et à la réaction ${V('R')} de la gouttière</p>
<p class="ind">(perpendiculaire à la trajectoire, puisque AB est lisse).</p>
<p>2) θ est l’angle entre OB (verticale) et OM : M est à r cos θ au-dessous de A.</p>
<p class="ind">${B('W<sub>A→M</sub>(' + V('P') + ') = m g r cos θ')} (moteur) ; ${B('W<sub>A→M</sub>(' + V('R') + ') = 0')} (${V('R')} ⊥ déplacement)</p>
<p>3) T.E.C entre A et M : ${H('m V<sub>M</sub>²')} − ${H('m V<sub>A</sub>²')} = m g r cos θ ⇒ ${B('V<sub>M</sub> = ' + SQ('V<sub>A</sub>² + 2 g r cos θ'))}</p>
<p>4) En B, θ = 0 : V<sub>B</sub> = ${SQ('5² + 2 × 10 × 1')} = ${SQ('45')} ⇒ ${B('V<sub>B</sub> ≈ 6,71 m/s')}</p>
<p>5) T.E.C entre B et C : ${W('P')} = ${W('R<sub>N</sub>')} = 0 et ${W('f')} = −f L</p>
<p class="ind">${H('m V<sub>C</sub>²')} − ${H('m V<sub>B</sub>²')} = −f L ⇒ ${B('f = ' + F('m (V<sub>B</sub>² − V<sub>C</sub>²)', '2 L'))} = ${F('0,1 × (45 − 25)', '2 × 1,5')} ⇒ ${B('f ≈ 0,67 N')}</p>

${EX(2, 'Piste de lancement d’un projectile')}
<p>Hauteur de D : z<sub>D</sub> = r (1 − cos α) = 1 × (1 − 0,5) = 0,5 m (A, B, C au niveau 0).</p>
<p>1) T.E.C entre A et D (sans frottement) : ${H('m<sub>1</sub> V<sub>D</sub>²')} − 0 = F · AB − m<sub>1</sub> g z<sub>D</sub> = 150 − 2,5</p>
<p class="ind">${B('V<sub>D</sub> = ' + SQ('2 (F·AB − m<sub>1</sub> g z<sub>D</sub>) / m<sub>1</sub>'))} = ${SQ('590')} ⇒ ${B('V<sub>D</sub> ≈ 24,3 m/s')}</p>
<p>2) Pour atteindre D, il faut V<sub>D</sub> ≥ 0 : F · AB ≥ m<sub>1</sub> g z<sub>D</sub> ⇒ F<sub>min</sub> = ${F('m<sub>1</sub> g z<sub>D</sub>', 'AB')} ⇒ ${B('F<sub>min</sub> = 2,5 N')}</p>
<p>3) Longueur de la piste : ℓ = AB + BC + r α = 1 + 0,5 + ${F('π', '3')} ≈ 2,55 m ; ${W('f')} = −f ℓ ≈ −2,55 J</p>
<p class="ind">${H('m<sub>1</sub> V<sub>D</sub>²')} = 150 − 2,5 − 2,55 = 144,95 J ⇒ ${B('V<sub>D</sub> ≈ 24,1 m/s')}</p>
<p>4) De D à E, seul le poids travaille (chute libre) : ${H('m<sub>1</sub> V<sub>E</sub>²')} − ${H('m<sub>1</sub> V<sub>D</sub>²')} = m<sub>1</sub> g z<sub>D</sub></p>
<p class="ind">V<sub>E</sub> = ${SQ('V<sub>D</sub>² + 2 g z<sub>D</sub>')} = ${SQ('579,8 + 10')} ⇒ ${B('V<sub>E</sub> ≈ 24,3 m/s')}</p>

${EX(3, 'Freinage d’une machine tournante')}
<p>1) ω = ${F('2π N', '60')} = ${F('2π × 200', '60')} ≈ 20,9 rad/s ; ΔE<sub>c</sub> = 0 − ${H('J<sub>Δ</sub> ω²')} = −${H('50 × 20,9²')} ⇒ ${B('ΔE<sub>c</sub> ≈ −1,10×10<sup>4</sup> J')}</p>
<p>2) Force tangentielle à la distance R = ${F('d', '2')} = 0,4 m, opposée au mouvement :</p>
<p class="ind">ℳ<sub>Δ</sub>(${V('f')}) = −f R = −150 × 0,4 ⇒ ${B('ℳ<sub>Δ</sub>(f) = −60 N·m')}</p>
<p>3) T.E.C : ΔE<sub>c</sub> = ℳ<sub>Δ</sub> Δθ ⇒ Δθ = ${F('−1,10×10<sup>4</sup>', '−60')} ≈ 183 rad ; n = ${F('Δθ', '2π')} ⇒ ${B('n ≈ 29 tours')}</p>

${EX(4, 'Parcours ABCDE')}
<p>z<sub>B</sub> = AB sin α = 1 m ; z<sub>C</sub> = z<sub>B</sub> + r (1 − cos α) = 1 + 1,15 × 0,134 ≈ 1,15 m = z<sub>D</sub></p>
<p>1) T.E.C entre A et B : ${H('m V<sub>B</sub>²')} = F · AB − m g AB sin α = 40 − 5 = 35 J</p>
<p class="ind">${B('V<sub>B</sub> = ' + SQ('2 AB (F − m g sin α) / m'))} = ${SQ('140')} ⇒ ${B('V<sub>B</sub> ≈ 11,8 m/s')}</p>
<p>2) T.E.C entre B et C : ${H('m V<sub>C</sub>²')} = ${H('m V<sub>B</sub>²')} − m g r (1 − cos α) = 35 − 0,77 ≈ 34,2 J</p>
<p class="ind">${B('V<sub>C</sub> = ' + SQ('V<sub>B</sub>² − 2 g r (1 − cos α)'))} ⇒ ${B('V<sub>C</sub> ≈ 11,7 m/s')}</p>
<p>3) T.E.C entre C et D (V<sub>D</sub> = 0) : −${H('m V<sub>C</sub>²')} = −f · CD ⇒ f = ${F('34,2', '2')} ⇒ ${B('f ≈ 17,1 N')}</p>
<p>4) Le centre de DE est au niveau de D ; E est à la hauteur z<sub>E</sub> = r (1 − cos θ) = 0,575 m</p>
<p class="ind">${B('V<sub>E</sub> = ' + SQ('2 g (z<sub>D</sub> − z<sub>E</sub>)'))} = ${SQ('2 × 10 × 0,58')} ⇒ ${B('V<sub>E</sub> ≈ 3,4 m/s')}</p>
<p>5) De D à F (z<sub>F</sub> = 0), seul le poids travaille : ${B('V<sub>F</sub> = ' + SQ('2 g z<sub>D</sub>'))} = ${SQ('2 × 10 × 1,15')} ⇒ ${B('V<sub>F</sub> ≈ 4,8 m/s')}</p>

${EX(5, 'Disque et corps suspendu')}
<p>1.1) AB = n · 2π r = 5 × 2π × 0,2 ⇒ ${B('AB ≈ 6,28 m')} ; V<sub>B</sub> = r ω<sub>1</sub> = 0,2 × 15 ⇒ ${B('V<sub>B</sub> = 3 m/s')}</p>
<p>1.2) T.E.C au solide : ${H('m V<sub>B</sub>²')} − 0 = m g AB + ${W('T')} ⇒ ${W('T')} = 0,45 − 6,28 ⇒ ${B(W('T') + ' ≈ −5,83 J')} : ${R('résistant')}</p>
<p>1.3) T.E.C au disque : ${H('J<sub>Δ</sub> ω<sub>1</sub>²')} = W(${V("T'")}) = −${W('T')} ⇒ J<sub>Δ</sub> = ${F('2 × 5,83', '15²')} ⇒ ${B('J<sub>Δ</sub> ≈ 5,2×10<sup>-2</sup> kg·m²')}</p>
<p>2) T.E.C au disque : 0 − ${H('J<sub>Δ</sub> ω<sub>1</sub>²')} = ℳ · Δθ avec Δθ = 25 × 2π = 50π rad</p>
<p class="ind">ℳ = −${F('5,83', '50π')} ⇒ ${B('ℳ ≈ −3,7×10<sup>-2</sup> N·m')}</p>

${EX(6, 'Disque, couple de frottement et corps suspendu')}
<p>1) J<sub>Δ</sub> = ${H('M r²')} = ${H('2 × 0,2²')} ⇒ ${B('J<sub>Δ</sub> = 0,04 kg·m²')} ; E<sub>c0</sub> = ${H('J<sub>Δ</sub> ω<sub>0</sub>²')} ⇒ ${B('E<sub>c0</sub> = 2 J')}</p>
<p>2) T.E.C : 0 − E<sub>c0</sub> = ℳ<sub>f</sub> Δθ avec Δθ = 40 × 2π = 80π ⇒ ℳ<sub>f</sub> = −${F('2', '80π')} ⇒ ${B('ℳ<sub>f</sub> ≈ −8,0×10<sup>-3</sup> N·m')}</p>
<p>3.1) Système {disque + (S)} : poids du disque, réaction de l’axe (appliqués sur l’axe, travail nul)</p>
<p class="ind">et poids ${V('P')} de (S) ; les tensions du fil sont des forces intérieures (travail total nul).</p>
<p>3.2) T.E.C : ${H('m V²')} + ${H('J<sub>Δ</sub> ω²')} = m g h avec ω = ${F('V', 'r')} et J<sub>Δ</sub> = ${H('M r²')} : V² (${F('m', '2')} + ${F('M', '4')}) = m g h</p>
<p class="ind">Ici M = 2m : ${F('m', '2')} + ${F('M', '4')} = m ⇒ V² = g h = 4 r g ⇒ ${B('V = 2 ' + SQ('r g'))} = 2 ${SQ('2')} ⇒ ${B('V ≈ 2,83 m/s')}</p>
<p>3.3) ω = ${F('V', 'r')} = ${F('2,83', '0,2')} ⇒ ${B('ω ≈ 14,1 rad/s')}</p>

${EX(7, 'Pendule simple')}
<p>1) T.E.C entre A et M (${W('T')} = 0) : la bille descend de L (cos α − cos α<sub>0</sub>)</p>
<p class="ind">${H('m V<sub>M</sub>²')} = m g L (cos α − cos α<sub>0</sub>) ⇒ ${B('V<sub>M</sub> = ' + SQ('2 g L (cos α − cos α<sub>0</sub>)'))}</p>
<p>2) α = 0 : V<sub>0</sub> = ${SQ('2 × 10 × 0,8 × (1 − cos 40°)')} ⇒ ${B('V<sub>0</sub> ≈ 1,94 m/s')}</p>
<p>3) La vitesse s’annule en θ<sub>2</sub> = 60°. T.E.C entre α = 30° et α = 60° :</p>
<p class="ind">0 − E<sub>c0</sub> = −m g L (cos 30° − cos 60°)</p>
<p class="ind">E<sub>c0</sub> = 0,2 × 10 × 0,8 × (0,866 − 0,5) ⇒ ${B('E<sub>c0</sub> ≈ 0,59 J')}</p>
<p>4) Pour monter de 2L jusqu’à l’équilibre instable, il faut :</p>
<p class="ind">m g (2L) = 0,2 × 10 × 1,6 = 3,2 J.</p>
<p class="ind">Or E<sub>c0</sub> = 2,5 J &lt; 3,2 J : le pendule ${R('n’atteint pas')} sa position d’équilibre instable.</p>

${EX(8, 'Pendule pesant à masselottes')}
<p>1) Origine O, axe vers A : OG = ${F('6m × 0 + 3m × L − 7m × L', '16m')} = −${F('L', '4')} : ${B('G sur OB, à OG = L/4 = 0,20 m')}</p>
<p>2) J<sub>Δ</sub> = ${F('1', '12')} (6m)(2L)² + 3m L² + 7m L² = 12 m L² = 12 × 0,05 × 0,8² ⇒ ${B('J<sub>Δ</sub> = 0,384 kg·m²')}</p>
<p>3) Masse totale 16m = 0,8 kg ; G descend de OG (1 − cos α) :</p>
<p class="ind">${H('J<sub>Δ</sub> ω<sub>0</sub>²')} = 16m g OG (1 − cos α)</p>
<p class="ind">ω<sub>0</sub> = ${SQ('2 × 0,8 × 9,8 × 0,2 × (1 − cos 50°) / 0,384')} ⇒ ${B('ω<sub>0</sub> ≈ 1,71 rad/s')}</p>
<p>4) V<sub>B</sub> = L ω<sub>0</sub> = 0,8 × 1,71 ⇒ ${B('V<sub>B</sub> ≈ 1,37 m/s')}</p>

${EX(9, 'Poulie à deux gorges')}
<p>1) Moments moteurs : m<sub>1</sub> g r<sub>1</sub> = 30 × 10 × 0,3 = 90 N·m &gt; m<sub>2</sub> g sin α · r<sub>2</sub> = 60 × 10 × 0,5 × 0,15 = 45 N·m</p>
<p class="ind">⇒ ${R('(S<sub>1</sub>) descend et (S<sub>2</sub>) monte')} le long du plan incliné.</p>
<p>2) ω = ${F('V<sub>1</sub>', 'r<sub>1</sub>')} et V<sub>2</sub> = r<sub>2</sub> ω = ${F('V<sub>1</sub>', '2')} : ${B('E<sub>c</sub> = ' + H('V<sub>1</sub>² (m<sub>1</sub> + ' + F('m<sub>2</sub>', '4') + ' + ' + F('J<sub>Δ</sub>', 'r<sub>1</sub>²') + ')'))}</p>
<p>3) (S<sub>1</sub>) descend de h ; (S<sub>2</sub>) parcourt ${F('h', '2')} et monte de ${F('h', '2')} sin α. Avec m<sub>2</sub> = 2m<sub>1</sub> :</p>
<p class="ind">E<sub>c</sub> − 0 = m<sub>1</sub> g h − m<sub>2</sub> g ${F('h', '2')} sin α = m<sub>1</sub> g h (1 − sin α) ⇒ ${B('V<sub>1</sub> = ' + SQ(F('2 m<sub>1</sub> g h (1 − sin α)', '3m<sub>1</sub>/2 + J<sub>Δ</sub>/r<sub>1</sub>²')))}</p>
<p class="ind">h = 2 m : V<sub>1</sub> = ${SQ(F('600', '45 + 24,4'))} ⇒ ${B('V<sub>1</sub> ≈ 2,94 m/s')} ; V<sub>2</sub> ≈ 1,47 m/s</p>
<p>4) T.E.C à (S<sub>1</sub>) : ${H('m<sub>1</sub> V<sub>1</sub>²')} = m<sub>1</sub> g h − T<sub>1</sub> h ⇒ T<sub>1</sub> = 300 − ${F('30 × 8,64', '4')} ⇒ ${B('T<sub>1</sub> ≈ 235 N')}</p>
<p class="ind">T.E.C à (S<sub>2</sub>) : ${H('m<sub>2</sub> V<sub>2</sub>²')} = T<sub>2</sub> ${F('h', '2')} − m<sub>2</sub> g ${F('h', '2')} sin α ⇒ 64,8 = T<sub>2</sub> − 300 ⇒ ${B('T<sub>2</sub> ≈ 365 N')}</p>
<p>5) Après la rupture, (S<sub>2</sub>) n’est soumis qu’à ${V('P')} et ${V('R')} : il continue à monter en ralentissant</p>
<p class="ind">(mouvement rectiligne uniformément retardé), s’arrête, puis redescend en accélérant.</p>
<p>6) Montée supplémentaire d : 0 − ${H('m<sub>2</sub> V<sub>2</sub>²')} = −m<sub>2</sub> g d sin α ⇒ d = ${F('V<sub>2</sub>²', '2 g sin α')} = ${F('2,16', '10')} ≈ 0,22 m</p>
<p class="ind">D = 2 (${F('h', '2')} + d) = 2 (1 + 0,22) ⇒ ${B('D ≈ 2,43 m')}</p>
<p>7) Descente de 1,22 m sans frottement : V = ${SQ('2 g sin α × 1,22')} = ${SQ('12,2')} ⇒ ${B('V ≈ 3,5 m/s')}</p>

${EX(10, 'Gouttières circulaires')}
<p>1) h = r (1 − cos α) ⇒ cos α = 1 − ${F('h', 'r')} = 0,7 ⇒ ${B('α ≈ 45,6°')}</p>
<p>2) T.E.C entre A et O : ${H('m V<sub>O</sub>²')} = m g r (1 − cos α) ⇒ ${B('V<sub>O</sub> = ' + SQ('2 g r (1 − cos α)'))} = ${SQ('6')} ⇒ ${B('V<sub>O</sub> ≈ 2,45 m/s')}</p>
<p>3) Entre O et M, le solide descend de r (1 − cos θ) : ${B('V<sub>M</sub> = ' + SQ('2 g [ h + r (1 − cos θ) ]'))}</p>
<p>4) R = m g (cos θ − ${F('2 [h + r (1 − cos θ)]', 'r')}) avec h = 0,3 r : ${B('R = m g (3 cos θ − 2,6)')}</p>
<p>5) R est maximale pour cos θ = 1, soit θ = 0 (au point O) : R<sub>max</sub> = 0,4 m g ⇒ ${B('R<sub>max</sub> = 0,4 N')}</p>
<p>6) Perte de contact : R = 0 ⇒ cos θ<sub>D</sub> = ${F('2,6', '3')} ≈ 0,867 ⇒ ${B('θ<sub>D</sub> ≈ 29,9°')}</p>
<p class="ind">V<sub>D</sub>² = g r cos θ<sub>D</sub> = 8,67 ⇒ ${B('V<sub>D</sub> ≈ 2,94 m/s')}</p>
<p>7) Le sol est au niveau de O<sub>2</sub> : z<sub>D</sub> = r cos θ<sub>D</sub> ≈ 0,867 m ; V<sub>C</sub> = ${SQ('V<sub>D</sub>² + 2 g z<sub>D</sub>')} = ${SQ('26')} ⇒ ${B('V<sub>C</sub> ≈ 5,1 m/s')}</p>
<p>8) On garde la position de D (θ<sub>D</sub> ≈ 29,9°).</p>
<p class="ind">Trajet : ℓ = r α + r θ<sub>D</sub> = 0,795 + 0,522 ≈ 1,32 m ; z<sub>A</sub> − z<sub>D</sub> = 1,3 − 0,867 = 0,433 m</p>
<p class="ind">T.E.C : ${H('m V<sub>D</sub>²')} = m g (z<sub>A</sub> − z<sub>D</sub>) − f ℓ</p>
<p class="ind">f = ${F('0,433 − 0,2', '1,32')} ⇒ ${B('f ≈ 0,18 N')}</p>

${EX(11, 'Poulie, moteur et plan incliné')}
<p>1) (S) monte à vitesse constante v = r ω = 2 m/s : ΔE<sub>c</sub> = 0 ⇒ T = m g sin α = 0,8 × 10 × 0,5 ⇒ ${B('T = 4 N')}</p>
<p class="ind">La poulie tourne à ω constante : ℳ<sub>m</sub> − T r = 0 ⇒ ℳ<sub>m</sub> = 4 × 0,1 ⇒ ${B('ℳ<sub>m</sub> = 0,4 N·m')}</p>
<p>2) 𝒫 = ℳ<sub>m</sub> ω = 0,4 × 20 ⇒ ${B('𝒫 = 8 W')}</p>
<p>3) T.E.C entre B et C : 0 − ${H('m v²')} = −(m g sin α + f) BC ⇒ BC = ${F('0,8 × 2²', '2 × (4 + 0,9)')} ⇒ ${B('BC ≈ 0,33 m')}</p>
<p>4) La courbe est une droite : E<sub>c</sub>(0) = 4 J et E<sub>c</sub>(4π) = 3 J ⇒ ${B('E<sub>c</sub> = 4 − ' + F('θ', '4π'))} (J ; rad)</p>
<p>5) E<sub>c</sub>(16π) = 4 − 4 = 0 ⇒ ${B('ΔE<sub>c</sub> = −4 J')}</p>
<p>6) ω<sub>0</sub> = ${SQ('2 E<sub>c</sub>(0) / J<sub>Δ</sub>')} = ${SQ('800')} ⇒ ${B('ω<sub>0</sub> ≈ 28,3 rad/s')} ; E<sub>c</sub>(16π) = 0 ⇒ ${B('ω<sub>1</sub> = 0')}</p>
<p>7) T.E.C : ΔE<sub>c</sub> = W<sub>m</sub> + ℳ'<sub>f</sub> Δθ ⇒ W<sub>m</sub> = −4 + 0,08 × 16π ⇒ ${B('W<sub>m</sub> ≈ 2×10<sup>-2</sup> J')}</p>
<p class="ind">ℳ<sub>m</sub> = ${F('W<sub>m</sub>', 'Δθ')} = ${F('0,02', '16π')} ⇒ ${B('ℳ<sub>m</sub> ≈ 4×10<sup>-4</sup> N·m')} : le couple moteur est pratiquement nul.</p>
<p>8) Sans moteur, arrêt après 2 tours (Δθ = 4π) à partir de E<sub>c0</sub> = 4 J : 0 − 4 = ℳ'' × 4π ⇒ ${B("ℳ'' ≈ −0,32 N·m")}</p>

${EX(12, 'Balle lancée verticalement')}
<p>1) T.E.C entre A et le sommet (v = 0) : 0 − ${H('m V<sub>0</sub>²')} = −m g (H<sub>max</sub> − h<sub>0</sub>) ⇒ ${B('H<sub>max</sub> = h<sub>0</sub> + ' + F('V<sub>0</sub>²', '2g'))} = 4 + 0,8 = ${B('4,8 m')}</p>
<p>2) T.E.C entre A et le sol : ${H('m V<sub>S</sub>²')} − ${H('m V<sub>0</sub>²')} = m g h<sub>0</sub> ⇒ V<sub>S</sub> = ${SQ('16 + 80')} ⇒ ${B('V<sub>S</sub> ≈ 9,8 m/s')}</p>
<p>3.1) Après le rebond, la vitesse vaut 0,8 V<sub>S</sub> ; T.E.C jusqu’au sommet : ${H('m (0,8 V<sub>S</sub>)²')} = m g h<sub>1</sub></p>
<p class="ind">${B('h<sub>1</sub> = 0,64 (h<sub>0</sub> + ' + F('V<sub>0</sub>²', '2g') + ')')} = 0,64 × 4,8 ⇒ ${B('h<sub>1</sub> ≈ 3,07 m')}</p>
<p>3.2) Pendant le choc : ${W('f')} = ΔE<sub>c</sub> = ${H('m (0,64 − 1) V<sub>S</sub>²')} = −0,18 m V<sub>S</sub>² ⇒ ${B(W('f') + ' ≈ −17,3 × m')} (J, m en kg)</p>
<p>3.3) À chaque rebond la vitesse est multipliée par 0,8 : ${B('V<sub>S<sub>n</sub></sub> = 0,8<sup>n</sup> V<sub>S</sub>')} ; V<sub>S<sub>4</sub></sub> = 0,8<sup>4</sup> × 9,8 ⇒ ${B('V<sub>S<sub>4</sub></sub> ≈ 4,0 m/s')}</p>

${EX(13, 'Pendule : tige et solide coulissant')}
<p>Données : 2L = 1,6 m (L = 0,8 m) ; BG<sub>0</sub> = 1,2 L = 0,96 m ; masses m = 0,2 kg (tige et solide).</p>
<p>1) Relation barycentrique à partir de B : BG<sub>0</sub> = ${F('m × L + m × (2L − x)', '2m')} ⇒ 0,96 = ${F('2,4 − x', '2')} ⇒ ${B('x = 0,48 m = 48 cm')}</p>
<p>2) a = OG<sub>0</sub> = BG<sub>0</sub> − d = 0,36 m ; conservation de l’énergie (référence en O) :</p>
<p class="ind">E<sub>c0</sub> − 2m g a cos 60° = 0 − 2m g a cos θ<sub>m</sub> ⇒ cos θ<sub>m</sub> = 0,5 − ${F('0,5', '0,4 × 10 × 0,36')} ≈ 0,153 ⇒ ${B('θ<sub>m</sub> ≈ 81°')}</p>
<p>3) Tige : J<sub>G</sub> = J<sub>A</sub> − m L² = ${F('1', '3')} m (2L)² − m L² ≈ 0,0427 kg·m² ; Huygens (OG<sub>tige</sub> = 0,2 m) :</p>
<p class="ind">J<sub>tige</sub> = 0,0427 + 0,2 × 0,2² ≈ 0,0507 ; solide à OS = 1,12 − 0,6 = 0,52 m : J<sub>S</sub> = 0,2 × 0,52² ≈ 0,0541</p>
<p class="ind">${B('J<sub>O</sub> ≈ 0,105 kg·m²')}</p>
<p>4) La vitesse est maximale à la verticale (θ = 0) : E<sub>c,max</sub> = E<sub>c0</sub> + 2m g a (1 − cos 60°) = 0,5 + 0,72 = 1,22 J</p>
<p class="ind">ω<sub>max</sub> = ${SQ('2 × 1,22 / 0,105')} ≈ 4,83 rad/s ; V<sub>m</sub> = OS × ω<sub>max</sub> = 0,52 × 4,83 ⇒ ${B('V<sub>m</sub> ≈ 2,5 m/s')}</p>
`};
