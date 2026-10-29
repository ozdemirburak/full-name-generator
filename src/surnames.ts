import type { Surnames } from './data-types';
export type { Surnames } from './data-types';

import at from './surnames/at';
import cz from './surnames/cz';
import de from './surnames/de';
import es from './surnames/es';
import fi from './surnames/fi';
import fr from './surnames/fr';
import gb from './surnames/gb';
import ie from './surnames/ie';
import it from './surnames/it';
import lu from './surnames/lu';
import lv from './surnames/lv';
import nl from './surnames/nl';
import no from './surnames/no';
import pl from './surnames/pl';
import se from './surnames/se';
import us from './surnames/us';

export const surnames: Surnames = { at, cz, de, es, fi, fr, gb, ie, it, lu, lv, nl, no, pl, se, us };
