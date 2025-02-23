<script lang="ts">

    import type ProgressStep from "./ProgressStep";
    import ProgressStepBlock from "$lib/progress-step-bar/ProgressStepBlock.svelte";

    export let steps: Array<ProgressStep>;
    export let direction: 'vertical' | 'horizontal' = 'horizontal';
    export let backgroundColor: string = 'var(--uniface-progress-step-bar-bg, #ffffff)';
    export let style: string = '';

</script>

<div class="uniface-progress-step-container {direction}" style="{style}; background-color: {backgroundColor}">
    <div class="container-panel">
        {#each steps as step, idx}
            <ProgressStepBlock pos={idx+1} status={step.status} comment={step.comment} topic={step.topic} {direction}
                               {backgroundColor}></ProgressStepBlock>
        {/each}
    </div>
</div>

