
/*
* This is to initialize all.
* This includes:
* - field types.
*
*/

// @ts-ignore
import Registry from 'digimaker-ui/Registry'

import Treemenu from './leftmenu/menutype/Treemenu'
import Listmenu from './leftmenu/menutype/Listmenu'

import Copy from './actions/Copy';
import Filter from './actions/Filter';
import Delete from './actions/Delete'
import Move from './actions/Move'
import SetToTop from './actions/SetToTop'
import AssignRole from './actions/user/AssignRole'
import SetPriority from './actions/SetPriority';


Registry.register( 'action', 'copy', Copy );
Registry.register( 'action', 'delete', Delete );
Registry.register( 'action', 'move', Move );
Registry.register( 'action', 'set_priority', SetPriority );
Registry.register( 'action', 'set_to_top', SetToTop );
Registry.register( 'action', 'assign_role', AssignRole );
Registry.register( 'action', 'filter', Filter );


Registry.register( 'leftmenu', 'treemenu', Treemenu );
Registry.register( 'leftmenu', 'listmenu', Listmenu );
