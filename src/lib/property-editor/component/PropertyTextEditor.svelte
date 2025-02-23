<script lang="ts">

    import TextEditor from "$lib/text-editor";
    import utils from "$lib/common/utils";

    export let data: any;
    export let field: string;

    export let attrs: any;

    let key: string = field;
    let obj: any = data;

    $: if (field && data) {
        let keys = field.split('.');
        key = keys.pop() ?? '';
        obj = utils.getNestedObject(data, keys);
    }

</script>

<TextEditor variant="plain" bind:value={obj[key]} {...attrs}/>
