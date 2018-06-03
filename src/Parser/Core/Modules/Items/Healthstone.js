import SPELLS from 'common/SPELLS';

import Analyzer from 'Parser/Core/Analyzer';
import Abilities from 'Parser/Core/Modules/Abilities';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';

const HEALTHSTONE_SPELLS = [
  SPELLS.HEALTHSTONE,
  SPELLS.ANCIENT_HEALING_POTION,
  SPELLS.ASTRAL_HEALING_POTION,
];

const COOLDOWN_MS = 3600000; // one hour
const OUT_OF_COMBAT_COOLDOWN_MS = 60000; // one minute

class Healthstone extends Analyzer {
  static dependencies = {
    abilities: Abilities,
    spellUsable: SpellUsable,
  };

  on_initialized() {
    this.abilities.add({
      spell: HEALTHSTONE_SPELLS,
      category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
      cooldown: COOLDOWN_MS / 1000, // The cooldown does not start while in combat.
      castEfficiency: {
        suggestion: false,
      },
    });
  }

  on_toPlayer_death(event) {
    if (!this.spellUsable.isOnCooldown(HEALTHSTONE_SPELLS[0].id)){
      return;
    }
    this.spellUsable.reduceCooldown(HEALTHSTONE_SPELLS[0].id, COOLDOWN_MS - OUT_OF_COMBAT_COOLDOWN_MS);
  }

}

export default Healthstone;
