
<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {clickOutside} from './uniface-utils';
    import Portal from "svelte-portal";

    const dispatch = createEventDispatcher();

    export let style: string = '';
    export let target: any;
    export let align: 'left' | 'right' | 'center' = 'left';
    export let autoFit: boolean = true;

    export let margin: number = 0;

    let position = {top: 0, left: 0, width: 0, height: 0};


    const updatePosition = () => {
        if (!hidden && target) {
            let rect = target.getBoundingClientRect();
            position = {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            };
            rect = contentPanel.getBoundingClientRect();
            width = rect.width;
            vertPos = (h - position.top - position.height) > rect.height ? `top: ${(position.top + position.height)}px` : `top: ${position.top - rect.height}px`;

            if (align == 'left') {
                if (position.left + position.width < width) {
                    horzPos = "left: 0";
                } else {
                    horzPos = `right: 0`;
                }
            } else {
                if (position.left + position.width > width) {
                    horzPos = `right: 0`;
                } else {
                    horzPos = "left: 0";
                }
            }
            if (autoFit) {
                horzPos += '; width: 100%'
            }
        }
    }

    const checkPosition = () => {
        if (!hidden && target) {
            const rect = target.getBoundingClientRect();
            if (rect.top != position.top || rect.left != position.left) {
                updatePosition();
            }
        }
    }

    let hidden = true;



    onMount(() => {
        const overflowY = window.getComputedStyle(document.body).overflowY;
        console.log("overflow-y", overflowY);
        document.body.style.overflowY = 'hidden';
        setTimeout(() => {
            updatePosition();
            hidden = false;
            setTimeout(()=>{
                document.body.style.overflowY = overflowY;
            }, 50);
        }, 50);  // 延迟显示 portal
        window.addEventListener("resize", updatePosition);
        document.addEventListener("scroll", updatePosition, {passive: false});
        const interval = setInterval(checkPosition, 10); // 每 100ms 检测一次
        return () => {
            window.removeEventListener("resize", updatePosition);
            document.removeEventListener("scroll", updatePosition);
            clearInterval(interval);
        };
    });

    const close = () => {
        dispatch('close');
    };

    let contentPanel: any;

    let w: number, h: number;
    let width = 0;
    let vertPos = '';
    let horzPos = '';

</script>
<svelte:window bind:innerWidth={w} bind:innerHeight={h}/>
<Portal target="body">
    <div class="uniface-popover-wrapper" class:hidden style="{vertPos}; left: {position.left-margin}px; width: {position.width}px; ">
        <div class="uniface-popover" style="" use:clickOutside
             on:outerClick={close}>
            <div bind:this={contentPanel} style="{horzPos}">
                <div class="contents" style="{style}">
                    <div class="contents-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Portal>