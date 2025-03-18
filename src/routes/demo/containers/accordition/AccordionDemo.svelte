<script lang="ts">

    import AccordionPanel from "$lib/accordion";
    import type AccordionItem from "$lib/accordion/AccordionItem";
    import AccPanel from "./AccPanel.svelte";
    import Box from "$lib/box";
    import {onMount} from "svelte";
    import Button from "$lib/button";
    import DemoBlock from "../../DemoBlock.svelte";
    import Page from "$lib/page";

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

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/3; height: 600px" title="普通Accordion">
            <AccordionPanel {accordions}>

            </AccordionPanel>
        </DemoBlock>

        <DemoBlock style="grid-column: 3/5; height: 600px" title="单一打开">
            <AccordionPanel exclusive accordions={accordions1} >

            </AccordionPanel>
        </DemoBlock>

        <DemoBlock style="grid-column: 5/7; height: 600px" title="紧凑类型">
            <AccordionPanel exclusive compact accordions={accordions1} >

            </AccordionPanel>
        </DemoBlock>
    </div>
</div>


