export function clickOutside(node: any, callback: () => void) {
    const handleClick = (event: MouseEvent) => {
        console.log('check click position')
        // 检查点击是否发生在元素外部
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            callback();
            event.stopPropagation();
        }
    };

    function destroy() {
        // 清理事件监听
        console.log('stop listen')
        document.removeEventListener('click', handleClick, true);
    }

    // 添加事件监听
    console.log('add click event');
    document.addEventListener('click', handleClick, true);

    return {
        destroy
    };
}