export type Names = Record<string, Record<number, string[]>>;

import ar from './names/ar';
import be from './names/be';
import br from './names/br';
import cz from './names/cz';
import dk from './names/dk';
import es from './names/es';
import fi from './names/fi';
import fr from './names/fr';
import gb from './names/gb';
import ie from './names/ie';
import il from './names/il';
import is from './names/is';
import it from './names/it';
import kr from './names/kr';
import lv from './names/lv';
import mx from './names/mx';
import no from './names/no';
import nz from './names/nz';
import pl from './names/pl';
import se from './names/se';
import si from './names/si';
import tr from './names/tr';
import tw from './names/tw';
import us from './names/us';

export const names: Names = {
    ar, be, br, cz, dk, es, fi, fr, gb, ie,
    il, is, it, kr, lv, mx, no, nz, pl, se,
    si, tr, tw, us
};
