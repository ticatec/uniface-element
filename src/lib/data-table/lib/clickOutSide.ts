export function clickOutside(node:Node) {

    const handleClick = (event:MouseEvent) => {
        // @ts-ignore
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                // @ts-ignore
                new CustomEvent('outerClick', node)
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}