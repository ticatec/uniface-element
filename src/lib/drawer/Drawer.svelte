<script lang="ts">
    import {fly} from "svelte/transition";


    export let visible: boolean = false;

    let hidden: boolean = true;


    export let width:number = 300;
    export let position: 'left' | 'right' = 'left'

    $: if (visible) {
        hidden = false;
    }



    let xPos: string;

    $: xPos = position == 'left' ? `${-width}` : '100%';

</script>
<div class="uniface-drawer" aria-hidden="true" style="display: {hidden ? 'none' : 'block'}" on:click={()=>{visible=false;}}>
    {#if visible}
        <div class={position} style="width: {width}px" transition:fly={{ x: xPos, duration: 1000, opacity: 0.5 }} aria-hidden="true"
             on:outroend={()=>{hidden = !visible}} on:click|stopPropagation>
            <div>
            <slot></slot>
            </div>
        </div>
    {/if}
</div>