<script lang="ts">

    import {ProgressStepStatus} from "$lib/progress-step-bar/ProgressStep";

    export let status: ProgressStepStatus;
    export let pos: number = 1;
    export let topic: string;
    export let comment: string = null as unknown as string;
    export let style: string = '';
    export let backgroundColor: string | null;
    export let direction: 'vertical' | 'horizontal';

    let panelBg: string;
    $: panelBg = direction==='vertical' ? 'background-color: transparent' : `background-color:${backgroundColor}`;
</script>

<div class="progress-step-block {status}" {style}>
    <div class="step-indicator" style="{panelBg}">
        <div style="background-color: {backgroundColor}">
            {#if status === ProgressStepStatus.Completed}
                <span>✔</span>
            {:else}
                <span>{pos}</span>
            {/if}
        </div>
    </div>
    <div class="step-text {status}">
        <div class="step-topic" >
            <span style="{panelBg}">{topic}</span>
        </div>
        {#if comment}
            <div class="step-comment">
                <span>{comment}</span>
            </div>
        {/if}
    </div>
</div>
