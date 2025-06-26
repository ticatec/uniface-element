<script lang="ts">

    import InlineCellEditor from "./InlineCellEditor.svelte";
    import {acceptProps} from "$lib/inline-cell-editor/acceptProps";
    import OptionsSelect from "$lib/options-select";
    import {getNestObject} from "$lib/inline-cell-editor/getNestObject";

    export let data: any;
    export let readonly: boolean = false;
    export let field: any;
    export let props: any;
    export let active: boolean;

    const accepts = ['mandatory', 'keyField', 'textField', 'menu$height', 'placeholder', 'disableOptions', 'hideOptions', 'itemRender', 'compact']

    let attrs: any = acceptProps(props, accepts);

    let options: Array<any> = props.options ?? [];

    let {parent, keyField} = getNestObject(data, field)

    let editor: any;

    $: if (active) {
        editor.setFocus();
    }
</script>
<InlineCellEditor>
    <OptionsSelect bind:this={editor} variant="plain" bind:value={parent[keyField]} readonly={readonly || !active} {options} {...attrs}/>
</InlineCellEditor>