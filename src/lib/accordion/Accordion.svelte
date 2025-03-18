<script lang="ts">

    import type AccordionItem from "$lib/accordion/AccordionItem";
    import Accordion from "$lib/accordion/AccordionItemView.svelte";
    import {onMount} from "svelte";

    export let style: string = '';
    export {className as class};
    export let compact: boolean = false;
    export let accordions: Array<AccordionItem> = [];
    export let exclusive: boolean = false;
    export let activeItem: AccordionItem = null as unknown as AccordionItem;

    let className: string = '';

    let openSet: Set<AccordionItem> = new Set();

    onMount(() => {
        if (exclusive && activeItem == null) {
            openSet.add(accordions[0]);
            accordions = [...accordions];
        }
    })

    const handleAccordionClick = (accordion: AccordionItem) => (event: MouseEvent) => {
        if (exclusive) {
            if (activeItem != accordion) {
                activeItem = accordion;
                openSet.clear();
                openSet.add(accordion);
            }
        } else {
            if (openSet.has(accordion)) {
                openSet.delete(accordion);
            } else {
                openSet.add(accordion);
            }
        }
        accordions = [...accordions];
    }


</script>

<div class="uniface-accordion-panel {className}" {style} class:compact>
    {#each accordions as accordion}
        <Accordion title={accordion.title} isOpen={openSet.has(accordion)} {exclusive}  onClick={handleAccordionClick(accordion)}>
            <svelte:component this={accordion.component} {...accordion.params}/>
        </Accordion>
    {/each}
</div>