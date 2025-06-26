<script lang="ts">


    import InlineCellEditor from "./InlineCellEditor.svelte";
    import {acceptProps} from "$lib/inline-cell-editor/acceptProps";
    import DatePicker from "$lib/date-picker";
    import {getNestObject} from "$lib/inline-cell-editor/getNestObject";

    export let data: any;
    export let readonly: boolean = false;
    export let field: any;
    export let props: any;
    export let active: boolean;

    const accepts = ['placeholder',  'max', 'min', 'mandatory', 'compact'];

    let attrs: any = acceptProps(props, accepts);

    let {parent, keyField} = getNestObject(data, field)

    let editor: any;

    $: if (active) {
        editor.setFocus();
    }



</script>
<InlineCellEditor>
    <DatePicker bind:this={editor} bind:value={parent[keyField]} readonly={readonly || !active} variant="plain" {...attrs} />
</InlineCellEditor>