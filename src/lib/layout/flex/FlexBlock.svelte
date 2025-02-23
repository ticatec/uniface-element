<script lang="ts">

    export let fixed: boolean = false;
    export let style: string = '';
    export {className as class };
    export let direction: 'horizontal' | 'vertical' = 'horizontal';
    export let flex: boolean = false;
    export let autoFit: boolean = false;
    export let grow: boolean = false;
    export let shrink: boolean = false;

    let className:string = '';

</script>
<div class:flex class="flex-block {flex ? direction : ''}" class:fixed class:grow class:shrink class:auto_fit={autoFit} {style}>
    <slot/>
</div>