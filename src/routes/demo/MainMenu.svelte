<script lang="ts">

    import NavigatorMenu, {type OnMenuClick} from "$lib/nav-menu";
    import type MenuItem from "../../lib/nav-menu/MenuItem";
    import ButtonDemo from "./buttons/ButtonDemo.svelte";
    import IconButtonDemo from "./buttons/IconButtonDemo.svelte";
    import TextButtonDemo from "./buttons/TextButtonDemo.svelte";
    import ActionBarDemo from "./buttons/ActionBarDemo.svelte";
    import TextEditorDemo from "./editors/TextEditorDemo.svelte";
    import CommonEditorDemo from "./editors/CommonEditorDemo.svelte";
    import MemoEditorDemo from "./editors/MemoEditorDemo.svelte";
    import NumberEditorDemo from "./editors/NumberEditorDemo.svelte";
    import UnitNumberEditorDemo from "./editors/UnitNumberEditorDemo.svelte";
    import TimeEditorDemo from "./editors/TimeEditorDemo.svelte";
    import OptionsSelectDemo from "./pick-up/OptionsSelectDemo.svelte";
    import OptionsMultiSelectDemo from "./pick-up/OptionsMultiSelectDemo.svelte";
    import GroupCheckBoxDemo from "./group-box/GroupCheckBoxDemo.svelte";
    import DatePickupDemo from "./pick-up/DatePickupDemo.svelte";
    import DateTimePickupDemo from "./pick-up/DateTimePickupDemo.svelte";
    import BoxDemo from "./containers/box/BoxDemo.svelte";
    import TabsDemo from "./containers/tabs/TabsDemo.svelte";
    import CardsDemo from "./containers/card/CardsDemo.svelte";
    import PageDemo from "./containers/page/PageDemo.svelte";
    import AccordionDemo from "./containers/accordition/AccordionDemo.svelte";
    import FormFieldDemo from "./containers/form-field/FormFieldDemo.svelte";
    import CriteriaFieldDemo from "./containers/criteria-field/CriteriaFieldDemo.svelte";
    import ProgressBarDemo from "./progress/progress-bar/ProgressBarDemo.svelte";
    import ProgressStepsDemo from "./progress/progress-steps/ProgressStepsDemo.svelte";
    import NavigatorDemo from "./progress/navigator/NavigatorDemo.svelte";
    import ListBoxDemo from "./data-display/ListBoxDemo.svelte";
    import TreeDemo from "./data-display/treeview/TreeDemo.svelte";
    import TagDemo from "./misc/TagDemo.svelte";
    import BreadcrumbsDemo from "./misc/BreadcrumbsDemo.svelte";
    import MenuDemo from "./misc/menu/MenuDemo.svelte";
    import AppTopBarDemo from "./misc/app-top-bar/AppTopBarDemo.svelte";
    import ColorPickerDemo from "./pick-up/ColorPickerDemo.svelte";
    import ProtoBoard from "./ui-designer/ProtoBoard.svelte";
    import ResizeDemo from "./ui-designer/ResizeDemo.svelte";
    import DottedGridPanelDemo from "./ui-designer/DottedGridPanelDemo.svelte";
    import DataTableDemo from "./data-table/DataTableDemo.svelte";

    export let onItemClick: OnMenuClick;

    const menus: Array<MenuItem> = [
        {
            text: 'Basic components',
            children: [
                {
                    text: "Buttons",
                    children: [
                        {
                            text: "Button",
                            data: ButtonDemo
                        },
                        {
                            text: "Icon Button",
                            data: IconButtonDemo
                        },
                        {
                            text: "Text Button",
                            data: TextButtonDemo
                        },
                        {
                            text: "Action Bar",
                            data: ActionBarDemo
                        }
                    ],
                    expand: true
                },
                {
                    text: 'Editors',
                    children: [
                        {
                            text: "Common Editor",
                            data: CommonEditorDemo
                        },
                        {
                            text: "TextEditor",
                            data: TextEditorDemo
                        },
                        {
                            text: "NumberEditor",
                            data: NumberEditorDemo
                        },
                        {
                            text: "UnitNumberEditor",
                            data: UnitNumberEditorDemo
                        },
                        {
                            text: "TimeEditor",
                            data: TimeEditorDemo
                        },
                        {
                            text: "MemoEditor",
                            data: MemoEditorDemo
                        }
                    ],
                },
                {
                    text: "Pick up",
                    children: [
                        {
                            text: "OptionsSelect",
                            data: OptionsSelectDemo
                        },
                        {
                            text: "OptionsMultiSelect",
                            data: OptionsMultiSelectDemo
                        },
                        {
                            text: "DatePickup",
                            data: DatePickupDemo
                        },
                        {
                            text: "DateTimePickup",
                            data: DateTimePickupDemo
                        },
                        {
                            text: "Color Picker",
                            data: ColorPickerDemo
                        }
                    ]
                },
                {
                    text: "GroupBox",
                    children: [
                        {
                            text: "GroupCheckBox",
                            data: GroupCheckBoxDemo
                        },
                        {
                            text: "GroupRadioBox",
                            data: OptionsMultiSelectDemo
                        }
                    ]
                }
            ],
            expand: true
        },
        {
            text: 'Container components',
            children: [
                {
                    text: "Box",
                    data: BoxDemo
                },
                {
                    text: "Card",
                    data: CardsDemo
                },
                {
                    text: "Tabs",
                    data: TabsDemo
                },
                {
                    text: "Page",
                    data: PageDemo
                },
                {
                    text: "Accordion",
                    data: AccordionDemo
                },
                {
                    text: "Form Field",
                    data: FormFieldDemo
                },
                {
                    text: "Criteria Field",
                    data: CriteriaFieldDemo
                }
            ]
        },
        {
            text: "Data display",
            children: [
                {
                    text: "ListBox",
                    data: ListBoxDemo
                },
                {
                    text: "TreeView",
                    data: TreeDemo
                },
                {
                    text: "Data Table",
                    data: DataTableDemo
                }
            ]
        },
        {
            text: "Progress",
            children: [
                {
                    text: "Progress Bar",
                    data: ProgressBarDemo
                },
                {
                    text: "Progress steps",
                    data: ProgressStepsDemo
                },
                {
                    text: "Navigator",
                    data: NavigatorDemo
                }
            ]
        },
        {
            text: "Misc",
            children: [
                {
                    text: "Tag",
                    data: TagDemo
                },
                {
                    text: "Breadcrumbs",
                    data: BreadcrumbsDemo
                },
                {
                    text: "Menu",
                    data: MenuDemo
                },
                {
                    text: "AppTopBar",
                    data: AppTopBarDemo
                },
                {
                    text: "UI Designer",
                    data: ProtoBoard
                },
                {
                    text: "Resize Demo",
                    data: ResizeDemo
                },
                {
                    text: "Dotted Grid Panel",
                    data: DottedGridPanelDemo
                }
            ]
        }
    ]


</script>
<NavigatorMenu menuItems={menus} {onItemClick}>

</NavigatorMenu>