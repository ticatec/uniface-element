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
    import DataTableDemo from "./data-table/DataTableDemo.svelte";
    import GroupRadioBoxDemo from "./group-box/GroupRadioBoxDemo.svelte";
    import FlexRowFormDemo from "./form-container/FlexRowFormDemo.svelte";
    import FlexFormDemo from "./form-container/FlexFormDemo.svelte";
    import GridFormDemo from "./form-container/GridFormDemo.svelte";
    import SimpleListBoxDemo from "./data-display/list-box/SimpleListBoxDemo.svelte";
    import TransferDemo from "./containers/transfer/TransferDemo.svelte";
    import DialogDemo from "./dialog/DialogDemo.svelte";

    export let onItemClick: OnMenuClick;

    const menus: Array<MenuItem> = [
        {
            item: {
                text: 'Basic components',
            },
            children: [
                {
                    item: {
                        text: "Buttons",
                    },
                    children: [
                        {
                            item: {
                                text: "Button",
                                data: ButtonDemo
                            }
                        },
                        {
                            item: {
                                text: "Icon Button",
                                data: IconButtonDemo
                            }
                        },
                        {
                            item: {
                                text: "Text Button",
                                data: TextButtonDemo
                            }
                        },
                        {
                            item: {
                                text: "Action Bar",
                                data: ActionBarDemo
                            }
                        }
                    ],
                    expand: true
                },
                {
                    item: {text: 'Editors'},
                    children: [
                        {
                            item: {
                                text: "Common Editor",
                                data: CommonEditorDemo
                            }
                        },
                        {
                            item: {
                                text: "TextEditor",
                                data: TextEditorDemo
                            }
                        },
                        {
                            item: {
                                text: "NumberEditor",
                                data: NumberEditorDemo
                            }
                        },
                        {
                            item: {
                                text: "UnitNumberEditor",
                                data: UnitNumberEditorDemo
                            }
                        },
                        {
                            item: {
                                text: "TimeEditor",
                                data: TimeEditorDemo
                            }
                        },
                        {
                            item: {
                                text: "MemoEditor",
                                data: MemoEditorDemo
                            }
                        }
                    ],
                },
                {
                    item: {text: "Pick up"},
                    children: [
                        {
                            item: {
                                text: "OptionsSelect",
                                data: OptionsSelectDemo
                            }
                        },
                        {
                            item: {
                                text: "OptionsMultiSelect",
                                data: OptionsMultiSelectDemo
                            }
                        },
                        {
                            item: {
                                text: "DatePickup",
                                data: DatePickupDemo
                            }
                        },
                        {
                            item: {
                                text: "DateTimePickup",
                                data: DateTimePickupDemo
                            }
                        },
                        {
                            item: {
                                text: "Color Picker",
                                data: ColorPickerDemo
                            }
                        }
                    ]
                },
                {
                    item: {text: "GroupBox"},
                    children: [
                        {
                            item: {
                                text: "GroupCheckBox",
                                data: GroupCheckBoxDemo
                            }
                        },
                        {
                            item: {
                                text: "GroupRadioBox",
                                data: GroupRadioBoxDemo
                            }
                        }
                    ]
                }
            ],
            expand: true
        },
        {
            item: {
                text: 'Container components'
            },
            children: [
                {
                    item: {
                        text: "Box",
                        data: BoxDemo
                    }
                },
                {
                    item: {
                        text: "Card",
                        data: CardsDemo
                    }
                },
                {
                    item: {
                        text: "Tabs",
                        data: TabsDemo
                    }
                },
                {
                    item: {
                        text: "Dialog",
                        data: DialogDemo
                    }
                },
                {
                    item: {
                        text: "Page",
                        data: PageDemo
                    }
                },
                {
                    item: {
                        text: "Accordion",
                        data: AccordionDemo
                    }
                },
                {
                    item: {
                        text: "Form Field",
                        data: FormFieldDemo
                    }
                },
                {
                    item: {
                        text: "Criteria Field",
                        data: CriteriaFieldDemo
                    }
                },
                {
                    item: {
                        text: "Flex Row Form",
                        data: FlexRowFormDemo
                    }
                },
                {
                    item: {
                        text: "Flex Form",
                        data: FlexFormDemo
                    }
                },
                {
                    item: {
                        text: "Grid Form",
                        data: GridFormDemo
                    }
                },
                {
                    item: {
                        text: "Transfer",
                        data: TransferDemo
                    }
                }
            ]
        },
        {
            item: {text: "Data display"},
            children: [
                {
                    item: {
                        text: "ListBox",
                        data: SimpleListBoxDemo
                    }
                },
                {
                    item: {
                        text: "TreeView",
                        data: TreeDemo
                    }
                },
                {
                    item: {
                        text: "Data Table",
                        data: DataTableDemo
                    }
                }
            ]
        },
        {
            item: {text: "Progress"},
            children: [
                {
                    item: {
                        text: "Progress Bar",
                        data: ProgressBarDemo
                    }
                },
                {
                    item: {
                        text: "Progress steps",
                        data: ProgressStepsDemo
                    }
                },
                {
                    item: {
                        text: "Navigator",
                        data: NavigatorDemo
                    }
                }
            ]
        },
        {
            item: {text: "Misc"},
            children: [
                {
                    item: {
                        text: "Tag",
                        data: TagDemo
                    }
                },
                {
                    item: {
                        text: "Breadcrumbs",
                        data: BreadcrumbsDemo
                    }
                },
                {
                    item: {
                        text: "Menu",
                        data: MenuDemo
                    }
                },
                {
                    item: {
                        text: "AppTopBar",
                        data: AppTopBarDemo
                    }
                }
            ]
        }
    ]


</script>
<NavigatorMenu menuItems={menus} {onItemClick} textField="text">

</NavigatorMenu>