<script lang="ts">

    import {clickOutside} from "$lib/common/uniface-utils";
    import {onDestroy, onMount} from "svelte";

    export let closeCallback: ()=>void;
    export let parentRect: DOMRect;

    const close = () => {
        closeCallback?.();
    }

    let panel: any;
    let rect: DOMRect;
    let resizeObserver: ResizeObserver;
    let style: string = "top: 50%;"

    const checkPosition = () => {
        rect = panel.getBoundingClientRect();
        if (rect.y + 10 > parentRect.height) {
            style = "bottom: 50%;"
        } else {
            style = "top: 50%;"
        }
    }

    export function outerClick(node: HTMLElement, callback: () => void) {
        const handleClick = (event: MouseEvent) => {
            // 如果点击目标不在node内，则触发回调
            if (!node.contains(event.target as Node)) {
                callback();
            }
        };

        // 监听全局点击事件（useCapture=true，避免事件冒泡造成的问题）
        document.addEventListener('click', handleClick, true);

        // 清理事件监听器
        onDestroy(() => {
            document.removeEventListener('click', handleClick, true);
        });

        // action 必须返回一个对象，可以选实现 update 和 destroy
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            checkPosition();
        });
        resizeObserver.observe(panel);
        checkPosition();
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    });

</script>

<div bind:this={panel} style="position: absolute; right: 8px; {style}; background-color: #FFFFFF; border: 1px solid #e1e1e1; z-index: 5"
     use:clickOutside use:outerClick={close}>
    <slot></slot>
</div>