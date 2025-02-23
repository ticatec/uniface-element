<script lang="ts">

    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import iconLoader from "../assets/loading.gif";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let style: string = '';
    export let value: string = '';
    export let loading: boolean = false;
    export let onChange: OnChangeHandler<string> = null as unknown as OnChangeHandler<string>;

    let composing: boolean = false;
    let inputText: string;

    $: inputText = value;

    const handleInput = () => {
        if (composing == false) {
            value = inputText;
            onChange?.(value);
        }
    };
    const handleCompositionStart = (event: CompositionEvent) => {
        //event.target.composing = true;
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        //event.target.composing = false;
        composing = false;
        value = inputText;
        onChange?.(value);
    };

</script>

<CommonEditor {variant} {compact} {style}>
    <div slot='leading-icon'>
        {#if loading}
            <img width="20" height="20" src={iconLoader} alt=""/>
        {:else}
            <i class="uniface-icon-search"></i>
        {/if}
    </div>
    <input style="width: 100%" bind:value={inputText} on:input={handleInput} on:compositionstart={handleCompositionStart}
           on:compositionend={handleCompositionEnd} />
</CommonEditor>