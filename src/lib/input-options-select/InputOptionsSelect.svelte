<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import {tick} from "svelte";
    import type {LazyLoader} from "../list-box/types"

    import loading from "../assets/loading.gif"
    import CommonPicker from "$lib/common/CommonPicker.svelte";
    import i18n from "@ticatec/i18n";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let text: string = '';
    export let value: any = null;
    export let keyField: string = "code";
    export let textField: string = "text";
    export let menu$height: number = 0;
    export let style: string = '';
    export let placeholder: string = "";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let itemRender: any = null;
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;
    export let lazyLoader: LazyLoader;

    let editor: any;
    let inputText: string;
    let oldValue: any = value;
    let options: Array<any> = [];
    let scrollElement: any;

    let idleTime = 0;
    let interval: any;
    let pageNo: number;
    let isBusy: boolean;
    let hasMore: boolean;

    const handleInputText = () => {
        if ((text ?? '').trim().length > 0 && lazyLoader != null) {
            if (interval == null) {
                idleTime = 0;
                interval = setInterval(delayReload, 50)
            } else {
                idleTime = 0;
            }
        }
    }
    const lazyLoad = async (clean: boolean = true) => {
        console.log('开始读取数据...', text)
        isBusy = true;
        try {
            let result = await lazyLoader?.(text, pageNo);
            if (result) {
                if (clean) {
                    options = result.list;
                } else {
                    options = [...options, ...result.list];
                }
                hasMore = result.hasMore;
            }
            showPopup = true;
        } finally {
            isBusy = false;
        }
    }

    const delayReload = async () => {
        idleTime++;
        if (idleTime > 10) {
            clearInterval(interval);
            interval = null;
            pageNo = 1;
            if (showPopup) {
                scrollElement.scrollTop = 0;
            }
            await lazyLoad();
            await tick();
            editor.focus();
        }
    }

    const handleItemClick = (data: any) => () => {
        value = data[keyField];
        text = data[textField];
        if (value != oldValue) {
            onChange?.(data);
        }
        editor.focus();
        showPopup = false;
    }

    let composing: boolean = false;

    const handleInput = () => {
        if (composing == false) {
            text = inputText;
            value = null;
            handleInputText();
        }
    };
    const handleCompositionStart = (event: CompositionEvent) => {
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        composing = false;
        text = inputText;
        value = null;
        handleInputText();
    };

    const clean = () => {
        value = null;
        text = '';
        onChange?.(value);
        showPopup = false;
        editor.focus();
    }

    let showPopup: boolean = false;

    let mh;

    $: mh = `min-height: 80px; height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;

    $: showPopup = options && options.length > 0;

    $: inputText = text;

    const loadMore = async () => {
        editor.focus();
        if (lazyLoader && !isBusy && hasMore) {
            pageNo++;
            await lazyLoad(false);
        }
    }

    $: if (!showPopup && value == null) {
        text = '';
    }


</script>
<!-- 待解决浏览模式显示的问题 -->

<CommonPicker {displayMode} {variant} {style} {compact}
              bind:showPopup canClean={value!=null} autoFit {clean} textValue={text} {readonly} {disabled}>
    <input style="width: 100%" bind:this={editor} {placeholder}
           class="text-editor" bind:value={inputText} readonly={isBusy}
           on:input={handleInput}
           on:compositionstart={handleCompositionStart} on:compositionend={handleCompositionEnd}/>
    {#if isBusy}
        <div style="position: absolute; top: 0px; bottom: 0px; right: 8px">
            <div style="position: relative; top: 50%; transform: translateY(-50%)">
                <img src={loading} width="16" height="16"/>
            </div>
        </div>
    {/if}
    <div class="options-popover" bind:this={scrollElement} style={mh} slot="popup-panel">
        {#each options as op}
            <div class="option-item" on:click={handleItemClick(op)} aria-hidden="true">
                {#if itemRender != null}
                    <svelte:component this={itemRender} item={op}/>
                {:else}
                    <div style="padding: 6px 8px">
                        <span>{op[textField]}</span>
                    </div>
                {/if}
            </div>
        {/each}
        {#if hasMore}
            <div class="more-indicator-footer" on:click={loadMore}>
                {i18n.getText('uniface.loadMore', 'Load more')}
            </div>
        {/if}
        {#if isBusy}
            <div class="popover-mask-overlay">

            </div>
        {/if}
    </div>
</CommonPicker>