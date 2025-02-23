<script lang="ts">

    export let spacing: number = 6;
    export let style: string = '';
    export let gap: number = 4;
    export let leftDivide: boolean = false;
    export let rightDivide: boolean = false;

</script>
<div class="uniface-button-bar" class:left={leftDivide} class:right={rightDivide}
     style="{style}; padding: 0px {gap}px; letter-spacing: {spacing}px; ">
    <slot></slot>
</div>