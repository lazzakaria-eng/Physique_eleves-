/* 2ᵉ Bac · Chimie · Évolution spontanée d’un système chimique */
'use strict';
CONTENU['2bc-spontanee'] = {
  resume: {
    intro: TX`Un système chimique évolue spontanément vers l’état d’équilibre. En comparant le <b>quotient de réaction initial</b> \(Q_{r,i}\) à la constante \(K\), on prévoit le <b>sens d’évolution</b> : c’est le critère d’évolution spontanée.`,
    sections: [
      { titre: '1. Critère d’évolution spontanée', sim: 'quotient', html: TX`<ul><li>\(Q_{r,i} < K\) : évolution dans le <b>sens direct</b> (→) ; \(Q_r\) augmente jusqu’à K.</li><li>\(Q_{r,i} > K\) : évolution dans le <b>sens inverse</b> (←).</li><li>\(Q_{r,i} = K\) : le système est déjà à l’équilibre : pas d’évolution macroscopique.</li></ul>`
        + FIG(440, 100, ARW('sp1', '#1f6fe0') + ARW('sp2', '#d93a4a') + `<line x1="20" y1="50" x2="420" y2="50" stroke="#14213d" stroke-width="2"/><line x1="220" y1="36" x2="220" y2="64" stroke="#12946a" stroke-width="3"/><text x="214" y="84" fill="#12946a" font-weight="bold">K</text><text x="410" y="84">Q_r</text><line x1="60" y1="30" x2="200" y2="30" stroke="#1f6fe0" stroke-width="2.5" marker-end="url(#sp1)"/><text x="80" y="22" fill="#1f6fe0" font-size="11">Q_r,i &lt; K : sens direct</text><line x1="390" y1="30" x2="240" y2="30" stroke="#d93a4a" stroke-width="2.5" marker-end="url(#sp2)"/><text x="260" y="22" fill="#d93a4a" font-size="11">Q_r,i &gt; K : sens inverse</text>`) },
      { titre: '2. Exemples', html: TX`<p>Avec des espèces solides : leur « concentration » n’apparaît pas dans \(Q_r\). Exemple : \(\text{Cu}^{2+} + \text{Zn} \rightleftharpoons \text{Cu} + \text{Zn}^{2+}\), \(Q_r = \dfrac{[\text{Zn}^{2+}]}{[\text{Cu}^{2+}]}\), \(K \approx 10^{37}\) : le zinc est oxydé spontanément par les ions cuivre.</p>` },
      { titre: '3. Réactions acide-base', html: TX`<p>Pour un mélange d’acide et de base de deux couples, \(K = 10^{\text{p}K_{A2} - \text{p}K_{A1}}\) ; on calcule \(Q_{r,i}\) avec les concentrations initiales (après mélange) et on compare.</p>` },
    ],
    formules: [
      { tex: TX`Q_{r,i} < K \Rightarrow \text{sens direct}`, sens: 'Évolution vers la droite' },
      { tex: TX`Q_{r,i} > K \Rightarrow \text{sens inverse}`, sens: 'Évolution vers la gauche' },
      { tex: TX`Q_{r,i} = K \Rightarrow \text{équilibre}`, sens: 'Pas d’évolution' },
    ],
    retenir: [
      'Le système évolue toujours de façon que Q_r tende vers K.',
      'Les solides et le solvant n’apparaissent pas dans Q_r.',
      'Calculer les concentrations après mélange (volume total).',
    ],
    erreurs: [
      'Inverser le critère (Q_r,i < K ⇒ sens direct).',
      'Utiliser les concentrations avant mélange.',
      'Mettre les métaux solides dans Q_r.',
    ],
  },
  experiences: {
    sims: ['quotient'],
    protocole: { titre: 'Prévoir puis vérifier le sens d’évolution', materiel: 'solutions de Fe³⁺, Fe²⁺, I⁻ et I₂ de concentrations connues, empois d’amidon, tubes à essais.',
      etapes: ['Pour 2Fe³⁺ + 2I⁻ ⇌ 2Fe²⁺ + I₂ (K ≈ 10⁵), préparer deux mélanges : l’un sans produits, l’autre riche en Fe²⁺ et I₂.', 'Calculer Q_r,i de chaque mélange.', 'Ajouter l’empois d’amidon et observer l’évolution de la couleur.'] },
    observations: TX`<ul><li>Mélange 1 : la teinte bleue (diiode) apparaît : sens direct.</li><li>Mélange 2 (Q_r,i > K) : la teinte s’atténue : sens inverse.</li></ul>`,
    conclusion: TX`<p>Le critère \(Q_{r,i}\) / K prévoit correctement le sens d’évolution.</p>`,
  },
  quiz: [
    { q: TX`\(Q_{r,i} = 10^{-3}\), \(K = 10^{2}\). Le système évolue :`, o: ['dans le sens direct', 'dans le sens inverse', 'pas du tout', 'impossible à dire'], r: 0, e: TX`\(Q_{r,i} < K\).` },
    { q: TX`Pour Cu²⁺ + Zn ⇌ Cu + Zn²⁺, Q_r =`, o: [TX`\([\text{Zn}^{2+}]/[\text{Cu}^{2+}]\)`, TX`\([\text{Cu}^{2+}]/[\text{Zn}^{2+}]\)`, TX`\([\text{Cu}][\text{Zn}^{2+}]\)`, '1'], r: 0, e: 'Les solides n’apparaissent pas.' },
    { q: 'Si Q_r,i = K :', o: ['sens direct', 'sens inverse', 'pas d’évolution', 'explosion'], r: 2, e: 'Équilibre.' },
    { q: 'Au cours d’une évolution dans le sens direct, Q_r :', o: ['augmente', 'diminue', 'reste constant', 's’annule'], r: 0, e: 'Il tend vers K.' },
    { q: 'Q_r,i = 50 et K = 2 : le système évolue :', o: ['dans le sens direct', 'dans le sens inverse', 'pas du tout', 'dans les deux sens à la fois sans changement'], r: 1, e: 'Q_r,i > K.' },
  ],
};
