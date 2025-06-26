<script lang="ts">

    import PageHeader from "./PageHeader.svelte";
    import type {PageAction} from "$lib/page/PageAction";

    export let title: string = '';
    export let comment: string = null as unknown as string;
    export let header$style: string = '';
    export let content$style: string = '';
    export let round: boolean = false;
    export let shadow: boolean = true;
    export let goBack: PageAction | null = null;
    export let reload: PageAction | null = null;
    export let style: string = '';

</script>

<div class="uniface-page-wrapper" {style}>
    <div class="uniface-page" class:shadow class:round>
        <div class="uniface-page-header" style={header$style}>
            <slot name="page-header">
                <PageHeader {title} {comment} {goBack} {reload}>
                    <slot name="header-ext"></slot>
                </PageHeader>
            </slot>
        </div>
        <div class="page-container" style={content$style}>
            <slot></slot>
        </div>
    </div>
</div>

