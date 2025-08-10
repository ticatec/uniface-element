export function clickOutside(node:Node) {

    const handleClick = (event: MouseEvent) => {
        // @ts-ignore 因为 event.target 是 EventTarget，不能直接传给 contains
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('outerClick', {
                    bubbles: true,      // 通常自定义事件要冒泡，方便捕获
                    cancelable: true,   // 可取消
                    detail: { originalEvent: event }  // 可选：传递原始事件信息
                })
            );
            event.stopPropagation();
            event.preventDefault();
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}

