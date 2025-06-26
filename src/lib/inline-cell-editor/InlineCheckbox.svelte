<script lang="ts">


    import InlineCellEditor from "./InlineCellEditor.svelte";
    import {acceptProps} from "$lib/inline-cell-editor/acceptProps";
    import Checkbox from "$lib/checkbox";
    import {getNestObject} from "$lib/inline-cell-editor/getNestObject";

    export let data: any;
    export let readonly: boolean = false;
    export let field: any;
    export let props: any;
    export let active: boolean;

    const accepts = ['indeterminate', 'compact']

    let filteredProps: any = acceptProps(props, accepts);

    let {parent, keyField} = getNestObject(data, field)


    let checkbox: any;

    $: if (active) {
        checkbox.setFocus();
    }

</script>
<InlineCellEditor style="text-align: center" on:focus={() => checkbox.focus() }>
    <Checkbox bind:this={checkbox} style="position: relative; top: 50%; transform: translateY(-50%)"
              bind:checked={parent[keyField]} readonly={readonly || !active} {...filteredProps}/>
</InlineCellEditor>