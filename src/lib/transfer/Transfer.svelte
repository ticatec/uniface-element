<script lang="ts">
    import ListBox from "$lib/list-box";
    import IconButton from "$lib/button/IconButton.svelte";

    import type {FunFilter} from "$lib/list-box";
    import type {TransferData} from "./types";
    import i18n, {i18nUtils} from "@ticatec/i18n";
    import i18nRes from "$lib/i18nRes";


    export let style: string = '';
    export let sourceList: Array<any>;
    export let sourceTitle: string;
    export let targetList: Array<any>;
    export let targetTitle: string;

    export let itemRender: any = null;
    export let filter: FunFilter = null as unknown as FunFilter;
    export let transferData: TransferData = null as unknown as TransferData;
    export let footer$style: string = 'width: 100%; background-color: #f0f0f0; padding: 2px 6px; text-align: right; box-sizing: border-box';


    let sourceSelectedList: Array<any> = [];
    let targetSelectedList: Array<any> = [];

    const moveToTarget = async () => {
        if (sourceSelectedList.length > 0 && await transferData?.(sourceSelectedList, "right")) {
            targetList = [...targetList, ...sourceSelectedList];
            sourceList = sourceList.filter(item => sourceSelectedList.indexOf(item) === -1);
            sourceSelectedList = [];
        }
    }

    const moveToSource = async () => {
        if (targetSelectedList.length > 0 && await transferData?.(targetSelectedList, "left")) {
            sourceList = [...sourceList, ...targetSelectedList];
            targetList = targetList.filter(item => targetSelectedList.indexOf(item) === -1);
            targetSelectedList = [];
        }
    }
</script>

<div class="uniface-transfer-container">
    <ListBox class="list-container" title={sourceTitle} {filter} style="{style}; grid-column: 1/2" list={sourceList} selectMode="multiple"
             bind:selectedList={sourceSelectedList} {itemRender}>
        <div slot="footer" style={footer$style}>
            <span>{i18nUtils.formatText(i18nRes.transfer.selectIndicator, {
                selected: sourceSelectedList.length,
                total: sourceList.length
            })}</span>
        </div>
    </ListBox>
    <div class="icon-button-container" style="grid-column: 2/3;">
        <IconButton onClick={moveToSource} type="primary" disabled={targetSelectedList.length === 0}>
            <i class="icon_google_navigate_before"></i>
        </IconButton>
        <IconButton onClick={moveToTarget} type="primary" disabled={sourceSelectedList.length === 0}>
            <i class="icon_google_navigate_next"></i>
        </IconButton>
    </div>
    <ListBox class="list-container" title={targetTitle} style="{style}; grid-column: 3/4" {filter} list={targetList} selectMode="multiple"
             bind:selectedList={targetSelectedList} {itemRender}>
        <div slot="footer" style={footer$style}>
            <span>{i18nUtils.formatText(i18n.getText('uniface.transfer.selectIndicator'), {
                selected: targetSelectedList.length,
                total: targetList.length
            })}</span>
        </div>
    </ListBox>
</div>
