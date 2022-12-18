//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jstree.min
//= require bootstrap-tokenfield
//= require jquery-ui/widgets/mouse
//= require jquery-ui/widgets/draggable
//= require jquery-ui/widgets/droppable
//= require jquery-ui/widgets/resizable
//= require jquery-ui/widgets/selectable
//= require jquery-ui/widgets/sortable
//= require bootstrap-tokenfield
//= require_tree .

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("jquery")
require("jquery-ui")
global.$ = require("jquery")
// require('@nathanvda/cocoon')
import 'select2';
// require("packs/formats/format_datatable")
// require("packs/formats/datepicker")
require("packs/format_datatable")
require( 'datatables.net' )
// require("packs/commons")
// require( 'datatables.net' )
require("packs/users")
require("packs/character")