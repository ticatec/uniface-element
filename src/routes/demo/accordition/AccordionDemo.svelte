<script lang="ts">

    import AccordionPanel from "$lib/Accordion";
    import type AccordionItem from "$lib/accordion/AccordionItem";
    import AccPanel from "./AccPanel.svelte";
    import Box from "$lib/box";
    import {onMount} from "svelte";

    let accordions: Array<AccordionItem> = [
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        }
    ]


    let accordions1: Array<AccordionItem> = [
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1fjslk lksdfjlksdfj lksadjlks;afjlksfjkalk;sfjks;dfjk;sfjk;flsk;df jlskdfj;lsdk;fj lksf;j saf; ds",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        },
        {
            title: "项目1",
            component: AccPanel,
            params: {
                text: "text 1"
            }
        }
    ]

    onMount(() => {
        console.log('加载手风琴组件')
    })

</script>

<div style="padding: 12px; box-sizing: border-box; height: 100%; width: 100%; overflow: auto; display: flex; flex-direction: row">

    <Box style="width: 320px; height: 600px; margin-right: 10px; border: none">
        <div slot="header"
             style="width: 100%; padding: 0 6px; box-sizing: border-box; line-height: 24px; background-color: #f7f7f7; color: #374151; border-bottom: 1px solid #7f7f7f">
            <span>组件1</span>
        </div>
        <AccordionPanel {accordions}>

        </AccordionPanel>
    </Box>
    <Box style="width: 320px; height: 600px; margin-right: 10px">
        <AccordionPanel exclusive accordions={accordions1} header="组件1" compact>

        </AccordionPanel>
    </Box>
</div>