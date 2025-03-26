
import SidebarLayoutDemo from "./app-layout/SidebarLayoutDemo.svelte";
import HeaderBarLayoutDemo from "./app-layout/HeaderBarLayoutDemo.svelte";
import PropertyEditorDemo from "./property-editor/PropertyEditorDemo.svelte";
import TreeDemo from "./data-display/treeview/TreeDemo.svelte";
import AttachmentFieldDemo from "./attachment-files-field/AttachmentFieldDemo.svelte";
import ImagesUploadDemo from "./pick-up/images-field/ImagesUploadDemo.svelte";
import DataTableDemo from "./data-table/DataTableDemo.svelte";
import PaginationDemo from "./misc/PaginationDemo.svelte";
import ActionBarDemo from "./buttons/ActionBarDemo.svelte";
import PickerDemo from "./pickup/PickerDemo.svelte";
import MenuDemo from "./misc/menu/MenuDemo.svelte";
import DialogDemo from "./dialog/DialogDemo.svelte";
import ClassicLayoutDemo from "./app-layout/ClassicLayoutDemo.svelte";
import SummaryTableDemo from "./summary-table/SummaryTableDemo.svelte";
import SimpleListBoxDemo from "./data-display/list-box/SimpleListBoxDemo.svelte";
import CombineLayout from "./app-layout/CombineLayout.svelte";
import BreadcrumbsDemo from "./misc/BreadcrumbsDemo.svelte";


const list: Array<any> = [


    {
        name: "Action Bar",
        component: ActionBarDemo
    },
    {
        name: "Attachment Files",
        component: AttachmentFieldDemo
    },
    {
        name: "SidebarLayout",
        component: SidebarLayoutDemo
    },
    {
        name: "HeaderBarLayout",
        component: HeaderBarLayoutDemo
    },
    {
        name: "ClassicLayout",
        component: ClassicLayoutDemo
    },
    {
        name: "Combine Layout",
        component: CombineLayout
    },

    {
        name: "Breadcrumbs",
        component: BreadcrumbsDemo
    },
    {
        name: "ListBox",
        component: SimpleListBoxDemo
    },


    {
        name: "Date Table",
        component: DataTableDemo
    },
    {
        name: "Summary Table",
        component: SummaryTableDemo
    },

    {
        name: "Dialog",
        component: DialogDemo
    },
    {
        name: "Picker/Selector",
        component: PickerDemo
    },

    {
        name: "Image Upload",
        component: ImagesUploadDemo
    },

    {
        name: "Navigator Menu",
        component: MenuDemo
    },


    {
        name: "Pagination",
        component: PaginationDemo
    },

    {
        name: "Property Editor",
        component: PropertyEditorDemo
    },


    {
        name: "TreeView",
        component: TreeDemo
    }
]

export default list;