<script lang="ts">

    import {Resize} from "./Types";

    export let resize: Resize = Resize.Both;
    export let component: any;
    export let marginVertical: number;
    export let marginHorizontal: number;

    export let width: number;

    export let height: number;

</script>

<div style="">
    <div>
        <svelte:fragment this={component}/>
    </div>
    {#if resize == Resize.Horizontal || resize == Resize.Both}
        <!-- 绘制横向可以控制resize的点 -->
    {/if}
    {#if resize == Resize.Vertical || resize == Resize.Both}
        <!-- 绘制纵向可以控制resize的点 -->
    {/if}
    {#if resize == Resize.Both}
        <!-- 绘制四个顶点可以控制resize的点 -->
    {/if}
</div>
