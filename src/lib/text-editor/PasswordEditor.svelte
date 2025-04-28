<script lang="ts">


    import prefixFilter from "../utils/prefixFilter";
    import CommonEditor from "../common-editor/CommonEditor.svelte";

    const excludeAttrs = ['type', 'readonly', 'disabled', 'required', "form", "wrap"]

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let style: string = '';
    export let value: string = '';
    export {className as class};

    let className: string = '';
    let input$:any;
    let type="password"

    const toggleType = () => {
        if (!readonly && !disabled) {
            type = type == "password" ? "text" : "password";
        }
    }

    $: input$ = prefixFilter($$props, "input$", excludeAttrs);


</script>
<CommonEditor {style} {value} {readonly} {variant} {compact} class={className}>
    {#if type=="password"}
        <input type="password" style="flex: 1 1 auto" bind:value={value} {disabled} {...input$}
           on:blur on:focus />
    {:else}
        <input type="text" style="flex: 1 1 auto" bind:value={value} {disabled} {...input$}
               on:blur on:focus />
    {/if}
    <div slot="trailing-icon" class="editor-embed-icon">
        {#if (!readonly && !disabled)}
            <i class={type == "password" ? "icon_google_remove_red_eye" : "icon_google_visibility_off"} on:click={toggleType}></i>
        {/if}
    </div>
</CommonEditor>


