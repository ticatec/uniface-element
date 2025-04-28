<script lang="ts">
    import Icon from "$lib/icon";
    import type {MouseClickHandler} from "$lib/common/MouseClickHandler";
    import utils from "$lib/common/utils";

    export let size: 'big' | 'middle' | 'small' = 'middle';
    export let variant: 'borderless' | 'border' | 'round' = 'border';
    export let removable: boolean = true; //是否可以删除
    export let text: string = '';
    export let style: string = '';
    export {className as class};
    export let removeHandler: MouseClickHandler = null as unknown as MouseClickHandler;
    export let color: string = null as unknown as string;

    let className: string = '';

    let colorClass: string = '';

    $: colorClass = utils.isEmpty(color) ? '' : `color color-g${color}`;

</script>
<div class="uniface-tag" {style}>
    <div class="{size} {variant} {className} {colorClass}" class:removable={removable}>
        <span>{text}</span>
        {#if removable}
            <Icon name="icon_google_clear" class="uniface-remove-icon" onClick={removeHandler}/>
        {/if}
    </div>
</div>