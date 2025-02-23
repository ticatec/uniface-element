<script lang="ts">

    import type AccordionItem from "$lib/accordion/AccordionItem";
    import Accordion from "$lib/accordion/Accordion.svelte";

    export let style: string = '';
    export {className as class};
    export let compact: boolean = false;
    export let accordions: Array<AccordionItem> = [];
    export let exclusive: boolean = false;
    export let activeAccordion: AccordionItem = null as unknown as AccordionItem;
    export let header: string = null as unknown as string;
    export let header$style: string = '';

    let className: string = '';

    const handleAccordionClick = (accordion: AccordionItem) => (event: MouseEvent) => {
        if (exclusive) {
            if (activeAccordion != accordion) {
                if (activeAccordion) {
                    activeAccordion.isOpen = false;
                }
                activeAccordion = accordion;
                accordion.isOpen = true;
            }
        } else {
            accordion.isOpen = !accordion.isOpen;
        }
        accordions = [...accordions];
    }

</script>

<div class="uniface-accordion-panel {className}" {style} class:compact>
    {#if $$slots['header'] || header}
        <div class="accordion-header" style={header$style}>
            <slot name="header">
                <span>{header}</span>
            </slot>
        </div>
    {/if}
    <div class="accordion-container">
        {#each accordions as accordion}
            <Accordion title={accordion.title} isOpen={accordion.isOpen} onClick={handleAccordionClick(accordion)}>
                <svelte:component this={accordion.component} {...accordion.params}/>
            </Accordion>
        {/each}
    </div>
</div>