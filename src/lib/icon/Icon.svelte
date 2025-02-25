<script lang="ts">

    import utils from "../common/utils";
    import type {MouseClickHandler} from "../common/MouseClickHandler";

    export let name: string;
    export let onClick: MouseClickHandler | null = null;
    export let style: string = '';
    export {className as class};

    let className: string = '';
    let respClick: boolean = true;

    const handleClickEvent = async (e: MouseEvent) => {
        if (onClick != null && respClick) {
            respClick = false;
            onClick?.(e);
            await utils.sleep(0.2);
            respClick = true;
        }
    }


</script>
<div class="uniface-icon {className}" class:clickable={onClick!=null} {style} aria-hidden="true" on:click={handleClickEvent}>
    <i class={name}></i>
</div>
