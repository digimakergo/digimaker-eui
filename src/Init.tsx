
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
import Delete from './actions/Delete'
import Move from './actions/Move'
import SetPriority from './actions/SetPriority'
import AssignRole from './actions/user/AssignRole'


Registry.register( 'action', 'copy', Copy );
Registry.register( 'action', 'delete', Delete );
Registry.register( 'action', 'move', Move );
Registry.register( 'action', 'set_priority', SetPriority );
Registry.register( 'action', 'assign_role', AssignRole );

Registry.register( 'leftmenu', 'treemenu', Treemenu );
Registry.register( 'leftmenu', 'listmenu', Listmenu );
