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
import DateTimePickerDemo from "./date-picker/DateTimePickerDemo.svelte";
import PickerDemo from "./pickup/PickerDemo.svelte";
import MenuDemo from "./menu/MenuDemo.svelte";
import DialogDemo from "./dialog/DialogDemo.svelte";
import ClassicLayoutDemo from "./app-layout/ClassicLayoutDemo.svelte";
import SummaryTableDemo from "./summary-table/SummaryTableDemo.svelte";
import FormFieldDemo from "./form-field/FormFieldDemo.svelte";
import CriteriaFieldDemo from "./criteria-field/CriteriaFieldDemo.svelte";
import SimpleListBoxDemo from "./list-box/SimpleListBoxDemo.svelte";
import CombineLayout from "./app-layout/CombineLayout.svelte";
import BreadcrumbsDemo from "./breadcrumb/BreadcrumbsDemo.svelte";


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
        name: "ClassicLayout",
        component: ClassicLayoutDemo
    },
    {
        name: "Combine Layout",
        component: CombineLayout
    },
    {
        name: "Box",
        component: BoxDemo
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
        name: "Summary Table",
        component: SummaryTableDemo
    },
    {
        name: "Form Field",
        component: FormFieldDemo
    },
    {
        name: "Criteria Field",
        component: CriteriaFieldDemo
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
        name: "Date Picker",
        component: DateTimePickerDemo
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
        name: "Navigator Menu",
        component: MenuDemo
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