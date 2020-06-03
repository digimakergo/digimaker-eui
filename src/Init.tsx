
/*
* This is to initialize all.
* This includes:
* - field types.
*/

// @ts-ignore
import FieldRegister from './ui/FieldRegister'
import Registry from './ui/Registry'
import Dashboard from './leftmenu/menutype/Dashboard'
import Treemenu from './leftmenu/menutype/Treemenu'
import Listmenu from './leftmenu/menutype/Listmenu'
import Structure from './main/content/Structure'
import Copy from './actions/Copy';


//Registry.register( 'edit', 'before', CommentOnEdit );

Registry.register( 'leftmenu', 'dashboard', Dashboard );
Registry.register( 'leftmenu', 'treemenu', Treemenu );
Registry.register( 'leftmenu', 'listmenu', Listmenu );

Registry.register( 'main', 'content_structure', Structure );

Registry.register( 'action', 'copy', Copy );
