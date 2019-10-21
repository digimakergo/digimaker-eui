
/*
* This is to initialize all.
* This includes:
* - field types.
*/

// @ts-ignore
import FieldRegister from './ui/FieldRegister'
import Registry from './ui/Registry'
import Report from './Report'
import Dashboard from './leftmenu/render/Dashboard'
import Treemenu from './leftmenu/render/Treemenu'

Registry.register( 'leftmenu', 'dashboard', Dashboard );
Registry.register( 'leftmenu', 'treemenu', Treemenu );


Registry.register( 'main', 'report', Report );
