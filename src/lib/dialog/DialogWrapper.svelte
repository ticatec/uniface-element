<script lang="ts">
    import { setContext } from 'svelte';
    export let component;
    export let params;
    export let closeDialog;

    setContext('closeDialog', closeDialog);
</script>

<svelte:component this={component} {...params} />
