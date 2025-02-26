<!-- ContextMenu.svelte -->
<script lang="ts">
    import Portal from "svelte-portal";
    import {onMount, onDestroy, tick} from 'svelte';
    import type {ContextMenuItem} from "$lib/context-menu/ContextMenuItem";

    let items: Array<ContextMenuItem> = [];  // 菜单项，应该是一个数组
    let menuWidth = 150; // 菜单的宽度
    let menuHeight = 150; // 菜单的高度

    let menuVisible = false;
    let menuPosition = {x: 0, y: 0};

    // 处理右键点击事件
    export const show = async (event: MouseEvent, list: Array<ContextMenuItem>, width: number = 150, height: number = 150) => {
        event.preventDefault(); // 阻止默认的右键菜单

        if (menuVisible) {
            menuVisible = false;
            await tick();
        }

        let x = event.clientX;
        let y = event.clientY;

        items = list;
        menuWidth = width;
        menuHeight = height;

        // 获取视窗宽高
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 判断右键点击位置，调整菜单位置
        if (x + menuWidth > windowWidth) {
            x = windowWidth - menuWidth;
        }

        if (y + menuHeight > windowHeight) {
            y = windowHeight - menuHeight;
        }

        menuPosition = {x, y};
        menuVisible = true;
    }



    // 在页面其他地方点击时隐藏菜单
    const handleClickOutside = (event: MouseEvent) => {
        if (menuPanel && !menuPanel.contains(event.target as Node)) {
            event.stopPropagation();
            event.preventDefault();
            menuVisible = false;
        }
    }

    let menuPanel: any;

    onMount(() => {
        window.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        window.removeEventListener('click', handleClickOutside);
    });

    const handleMenuItemClick = (item: ContextMenuItem) => (event: MouseEvent) => {
        item.action?.();
        menuVisible = false;
    }
</script>

{#if menuVisible}
<Portal>
    <div bind:this={menuPanel} class="uniface-context-menu" style="left: {menuPosition.x}px; top: {menuPosition.y}px">
        {#each items as item}
            <div class="menu-item" on:click={handleMenuItemClick(item)} aria-hidden="true">
                {item.text}
            </div>
        {/each}
    </div>
</Portal>
{/if}

