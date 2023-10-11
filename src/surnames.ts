export type Surnames = Record<string, string[] | Record<number, string[]>>;

import ar from './surnames/ar';
import be from './surnames/be';
import br from './surnames/br';
import cz from './surnames/cz';
import dk from './surnames/dk';
import es from './surnames/es';
import fi from './surnames/fi';
import fr from './surnames/fr';
import gb from './surnames/gb';
import ie from './surnames/ie';
import il from './surnames/il';
import is from './surnames/is';
import it from './surnames/it';
import kr from './surnames/kr';
import lv from './surnames/lv';
import mx from './surnames/mx';
import nz from './surnames/nz';
import no from './surnames/no';
import pl from './surnames/pl';
import se from './surnames/se';
import si from './surnames/si';
import tr from './surnames/tr';
import tw from './surnames/tw';
import us from './surnames/us';

export const surnames: Surnames = {
    ar, be, br, cz, dk, es, fi, fr, gb, ie,
    il, is, it, kr, lv, mx, no, nz, pl, se,
    si, tr, tw, us
};
