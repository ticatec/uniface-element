<script lang="ts">
    import {fly} from "svelte/transition";
    import {createEventDispatcher} from "svelte";


    export const open = () => {
        visible = true;
        hidden = false;
        dispatch('open');
    }

    export const close = () => {
        visible = false;
    }

    export let width:number = 300;
    export let position: 'left' | 'right' = 'left';

    const dispatch = createEventDispatcher();
    let hidden: boolean = true;
    let visible: boolean = false;

    $: if (visible) {
        hidden = false;
    }

    let xPos: string;

    $: xPos = position == 'left' ? `${-width}` : '100%';

</script>
<div class="uniface-drawer" style="display: {hidden ? 'none' : 'block'}" on:click={()=>{visible=false; dispatch('close')}}>
    {#if visible}
        <div class={position} style="width: {width}px" transition:fly={{ x: xPos, duration: 1000, opacity: 0.5 }}
             on:outroend={()=>{hidden = !visible}} on:click={(e)=>{e.stopPropagation()}}>
            <div>
            <slot></slot>
            </div>
        </div>
    {/if}
</div>