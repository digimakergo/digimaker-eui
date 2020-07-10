
/*
* This is to initialize all.
* This includes:
* - field types.
*/

// @ts-ignore
import FieldRegister from './ui/FieldRegister'
import {lazy} from 'react';
import Config from './dm.json';
import * as React from 'react';
import Registry from 'digimaker-ui/Registry'

import Dashboard from './leftmenu/menutype/Dashboard'
import Treemenu from './leftmenu/menutype/Treemenu'
import Listmenu from './leftmenu/menutype/Listmenu'

//todo: make it load from other package
for( let key of Object.keys( Config.components ) ){
    let path = Config.components[key];
    let arr = key.split(':');
    let com = React.lazy(() => import(`${path}`));
    Registry.register( arr[0], arr[1], com );
}

Registry.register( 'leftmenu', 'dashboard', Dashboard );
Registry.register( 'leftmenu', 'treemenu', Treemenu );
Registry.register( 'leftmenu', 'listmenu', Listmenu );
