module.exports = {
  title: 'Correction — Les actions mécaniques — Pr. Zakaria Lazrak',
  subtitle: 'Série : Les actions mécaniques — Tronc commun',
  html: `
${EX(1, 'Questions de cours')}
<p>1) • Unité de l’intensité d’une force : ${R('le newton (N)')}.</p>
<p class="ind">• Une force modélise ${R('l’action mécanique')}.</p>
<p class="ind">• ${V('R')} = ${V('R<sub>N</sub>')} + ${V('f')} (somme vectorielle).</p>
<p class="ind">• k = tan φ = ${F('f', 'R<sub>N</sub>')} .</p>
<p class="ind">• Avec frottement, ${V('R')} est inclinée ${R('vers l’arrière')} par rapport au sens du</p>
<p class="ind">mouvement : c’est la ${R('3<sup>e</sup> figure')} (mouvement vers la droite, R penchée à gauche).</p>
<p class="ind">• Force pressante : ${R('F = p × S')} .</p>
<p>2) Force à distance → acteur et receveur ${R('sans contact')}.</p>
<p class="ind">Force intérieure → exercée par une partie du système sur une autre partie.</p>
<p class="ind">Force de contact → acteur et receveur ${R('en contact')}.</p>
<p class="ind">Force pressante → force exercée par un fluide sur la paroi d’un objet.</p>
<p class="ind">Réaction ${V('R')} → résultante des actions réparties exercées par le plan.</p>
<p class="ind">Contact réparti → plusieurs points ; contact localisé → un seul point.</p>
<p class="ind">Force extérieure → exercée par un objet qui n’appartient pas au système.</p>

${EX(2, 'Inventaire des forces – Force pressante')}
<p>I. 1) Forces appliquées sur la personne (A) :</p>
<p class="ind">• ${V('P')} : poids de A → ${R('à distance, répartie')} ;</p>
<p class="ind">• ${V('R')} : action du sol sur les pieds de A → ${R('de contact, répartie')} ;</p>
<p class="ind">• ${V('T')} : action de la corde sur les mains de A → ${R('de contact, localisée')}.</p>
<p>2) ${V('P')} verticale vers le bas, appliquée au centre de gravité G de A ;</p>
<p class="ind">${V('R')} appliquée aux pieds, dirigée vers le haut ; ${V('T')} horizontale, appliquée</p>
<p class="ind">aux mains, dirigée de A vers B (le long de la corde).</p>
<p>3) Système {A + corde} : ${R('forces extérieures')} : ${V('P')} (poids de A), ${V('R')} (sol),</p>
<p class="ind">${V('F<sub>B</sub>')} (action de B sur la corde) ; le poids de la corde est négligeable.</p>
<p class="ind">${R('Forces intérieures')} : action de la corde sur A et action de A sur la corde.</p>
<p>II. 1) La pression atmosphérique est la pression exercée par l’air de</p>
<p class="ind">l’atmosphère sur toute surface en contact avec lui (p<sub>atm</sub> ≈ 1,013×10<sup>5</sup> Pa).</p>
<p>2) F = p × S = 101 325 × 50×10<sup>-4</sup> ⇒ ${B('F ≈ 507 N')}</p>
<p class="ind">Point d’application : centre de la face du piston en contact avec le gaz ;</p>
<p class="ind">direction : perpendiculaire au piston (verticale) ; sens : du gaz vers le piston</p>
<p class="ind">(vers le haut) ; intensité : 507 N.</p>
<p>3) Échelle 1 cm → 200 N : longueur = ${F('507', '200')} ≈ ${B('2,5 cm')} , flèche verticale vers le haut.</p>

${EX(3, 'Contact avec frottement sur un plan horizontal')}
<p>1) Forces exercées sur (S) : le poids ${V('P')} et la réaction du plan ${V('R')}.</p>
<p>2) ${V('P')} : force à distance, répartie ; ${V('R')} : force de contact, répartie.</p>
<p>3) P = m × g = 0,300 × 10 ⇒ ${B('P = 3 N')}</p>
<p>4) ${V('R')} = ${V('R<sub>N</sub>')} + ${V('f')} avec ${V('R<sub>N</sub>')} ⊥ ${V('f')} : R² = R<sub>N</sub>² + f²</p>
<p class="ind">R<sub>N</sub> = √(R² − f²) = √(16 − 4) = √12 ⇒ ${B('R<sub>N</sub> ≈ 3,46 N')}</p>
<p>5) k = ${F('f', 'R<sub>N</sub>')} = ${F('2', '3,46')} ⇒ ${B('k ≈ 0,58')} ; tan φ = 0,58 ⇒ ${B('φ = 30°')}</p>
<p>6) ${V('P')} : 3 N → ${R('1,5 cm')}, verticale vers le bas ; ${V('R')} : 4 N → ${R('2 cm')}, inclinée</p>
<p class="ind">de 30° par rapport à la verticale, vers l’arrière (vers la droite, puisque</p>
<p class="ind">le mouvement est vers la gauche).</p>

${EX(4, 'Solide sur un plan incliné')}
<p>1) Forces : le poids ${V('P')} et la réaction ${V('R')} = ${V('R<sub>N</sub>')} + ${V('f')} du plan incliné.</p>
<p>2) P = m × g = 40 × 10 ⇒ ${B('P = 400 N')}</p>
<p>3) k = tan φ = tan 30° ⇒ ${B('k ≈ 0,577')}</p>
<p>4) k = ${F('f', 'R<sub>N</sub>')} ⇒ R<sub>N</sub> = ${F('f', 'k')} = ${F('120', '0,577')} ⇒ ${B('R<sub>N</sub> ≈ 208 N')}</p>
<p>5) R² = R<sub>N</sub>² + f² = ${F('f²', 'k²')} + f² = f² (1 + ${F('1', 'k²')}) ⇒ R = f √(1 + ${F('1', 'k²')})</p>
<p class="ind">R = 120 × √(1 + 3) = 120 × 2 ⇒ ${B('R = 240 N')}</p>
<p>6) Échelle 1 cm → 80 N : f → ${R('1,5 cm')} (parallèle au plan, opposée au mouvement) ;</p>
<p class="ind">R<sub>N</sub> → ${R('2,6 cm')} (perpendiculaire au plan) ; R → ${R('3 cm')} (diagonale).</p>

${EX(5, 'Forces intérieures et extérieures – Pression')}
<p>I. 1) Forces sur la balle 3 : son poids ${V('P<sub>3</sub>')}, l’action de la balle 1 ${V('F<sub>1/3</sub>')}</p>
<p class="ind">et l’action de la balle 2 ${V('F<sub>2/3</sub>')} (la balle 3 ne touche pas les parois).</p>
<p>2) Système {balles 1, 2, 3}. Forces sur la balle 1 :</p>
<p class="ind">${R('extérieures')} : poids ${V('P<sub>1</sub>')}, action du fond de l’enceinte, action de la paroi 2 ;</p>
<p class="ind">${R('intérieures')} : action de la balle 2 ${V('F<sub>2/1</sub>')} et de la balle 3 ${V('F<sub>3/1</sub>')}.</p>
<p>II. 1) p = ${F('F', 'S')} = ${F('375', '25×10<sup>-4</sup>')} ⇒ ${B('p = 1,5×10<sup>5</sup> Pa')}</p>
<p>2) p<sub>atm</sub> = 1013 hPa = 1,013×10<sup>5</sup> Pa ; ${F('p', 'p<sub>atm</sub>')} ≈ 1,5 : la pression du gaz est</p>
<p class="ind">${R('supérieure')} à la pression atmosphérique (environ 1,5 fois plus grande).</p>

${EX(6, 'Force pressante et pression atmosphérique')}
<p>I. 1) S = π r² = π × (0,06)² ≈ 1,13×10<sup>-2</sup> m² ; p = 2 bar = 2×10<sup>5</sup> Pa</p>
<p class="ind">F = p × S = 2×10<sup>5</sup> × 1,13×10<sup>-2</sup> ⇒ ${B('F ≈ 2,26×10<sup>3</sup> N')}</p>
<p>2) S = ${F('F', 'p')} = ${F('3000', '2×10<sup>5</sup>')} = 1,5×10<sup>-2</sup> m² ; r = √(${F('S', 'π')}) ⇒ ${B('r ≈ 6,9 cm')}</p>
<p>II. 1) h = 0 : p<sub>0</sub> = 10<sup>5</sup> − 9 × 0 ⇒ ${B('p<sub>0</sub> = 10<sup>5</sup> Pa')}</p>
<p>2) p<sub>1</sub> = 10<sup>5</sup> − 9 × 1500 = 100 000 − 13 500 ⇒ ${B('p<sub>1</sub> = 8,65×10<sup>4</sup> Pa')}</p>
<p>3) La pression atmosphérique ${R('diminue')} quand l’altitude augmente.</p>
<p>4) S = L × ℓ = 30 × 1,5 = 45 m² ; F = p × S = 1,013×10<sup>5</sup> × 45 ⇒ ${B('F ≈ 4,56×10<sup>6</sup> N')}</p>

${EX(7, 'Pression et surface de contact')}
<p>1) Force pressante = poids : F = m g = 3 × 10 = 30 N.</p>
<p class="ind">Cas B (petite face 20 cm × 30 cm) : S<sub>B</sub> = 600 cm² = 0,06 m²</p>
<p class="ind">p<sub>B</sub> = ${F('F', 'S<sub>B</sub>')} = ${F('30', '0,06')} ⇒ ${B('p<sub>B</sub> = 500 Pa')}</p>
<p class="ind">Cas A (grande face 60 cm × 30 cm) : S<sub>A</sub> = 1800 cm² = 0,18 m²</p>
<p class="ind">p<sub>A</sub> = ${F('F', 'S<sub>A</sub>')} = ${F('30', '0,18')} ⇒ ${B('p<sub>A</sub> ≈ 167 Pa')}</p>
<p>2) La force pressante est la même, mais la pression est ${R('plus grande')} quand la</p>
<p class="ind">surface de contact est ${R('plus petite')} : le solide s’enfonce davantage dans le cas B.</p>
`};
