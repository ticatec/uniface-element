import AccordionDemo from "./accordition/AccordionDemo.svelte";
import SidebarLayoutDemo from "./app-layout/SidebarLayoutDemo.svelte";
import HeaderBarLayoutDemo from "./app-layout/HeaderBarLayoutDemo.svelte";
import PropertyEditorDemo from "./property-editor/PropertyEditorDemo.svelte";
import BoxDemo from "./box/BoxDemo.svelte";
import TreeDemo from "./treeview/TreeDemo.svelte";
import ProgressBarDemo from "./progress-bar/ProgressBarDemo.svelte";
import ProgressStepsDemo from "./progress-steps/ProgressStepsDemo.svelte";
import NavigatorDemo from "./navigator/NavigatorDemo.svelte";
import AttachmentFieldDemo from "./attachment-files-field/AttachmentFieldDemo.svelte";
import ImagesUploadDemo from "./images-field/ImagesUploadDemo.svelte";
import ButtonDemo from "./button/ButtonDemo.svelte";
import CardsDemo from "./card/CardsDemo.svelte";
import TabsDemo from "./tabs/TabsDemo.svelte";
import DataTableDemo from "./data-table/DataTableDemo.svelte";
import TagDemo from "./tag/TagDemo.svelte";
import PageDemo from "./page/PageDemo.svelte";
import PaginationDemo from "./pagination/PaginationDemo.svelte";
import OptionsSelectorDemo from "./options-selector/OptionsSelectorDemo.svelte";
import ActionBarDemo from "./action-bar/ActionBarDemo.svelte";


const list: Array<any> = [
    {
        name: "Accordion",
        component: AccordionDemo
    },
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
        name: "Box",
        component: BoxDemo
    },
    {
        name: "Button",
        component: ButtonDemo
    },
    {
        name: "Card",
        component: CardsDemo
    },
    {
        name: "Date Table",
        component: DataTableDemo
    },
    {
        name: "Image Upload",
        component: ImagesUploadDemo
    },
    {
        name: "Navigator",
        component: NavigatorDemo
    },
    {
        name: "Options Selector",
        component: OptionsSelectorDemo
    },
    {
        name: "Page",
        component: PageDemo
    },
    {
        name: "Pagination",
        component: PaginationDemo
    },
    {
        name: "ProgressBar",
        component: ProgressBarDemo
    },
    {
        name: "ProgressSteps",
        component: ProgressStepsDemo
    },
    {
        name: "Property Editor",
        component: PropertyEditorDemo
    },
    {
        name: "Tabs",
        component: TabsDemo
    },
    {
        name: "Tag",
        component: TagDemo
    },
    {
        name: "TreeView",
        component: TreeDemo
    }
]

export default list;