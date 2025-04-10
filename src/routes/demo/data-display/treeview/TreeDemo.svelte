<script lang="ts">

    import TreeView from "$lib/tree-view";
    import type TreeNode from "$lib/tree-view/TreeNode";
    import {type LazyLoader} from "$lib/tree-view/TreeNode";
    import utils from "$lib/common/utils";
    import ContextMenu from "$lib/context-menu";
    import type {OnContextMenu} from "$lib/context-menu";
    import Box from "$lib/box";


    let nodes: Array<TreeNode> = [
        {
            text: "北京",
            value: "100000",
            data: {},
            children: [
                {
                    text: "东城区",
                    value: "100001",
                    data: {},
                    children: []
                },
                {
                    text: "西城区",
                    value: "100002",
                    data: {},
                    children: []
                },
                {
                    text: "海淀区",
                    value: "100003",
                    data: {},
                    children: []
                },
                {
                    text: "朝阳区",
                    value: "100004",
                    data: {},
                    children: []
                }
            ],
        },
        {
            text: "天津",
            value: "110000",
            data: {},
            children: [],
        },
        {
            text: "河北",
            value: "120000",
            data: {},
            children: [
                {
                    text: "石家庄",
                    value: "120001",
                    data: {},
                    children: [
                        {
                            text: "新华区",
                            value: "120012",
                            data: {},
                            children: []
                        },
                        {
                            text: "桥西区",
                            value: "120012",
                            data: {},
                            children: []
                        },
                        {
                            text: "桥东区",
                            value: "120013",
                            data: {},
                            children: []
                        },
                        {
                            text: "长安区",
                            value: "120014",
                            data: {},
                            children: []
                        }
                    ]
                },
                {
                    text: "唐山",
                    value: "120002",
                    data: {},
                    children: []
                },
                {
                    text: "保定",
                    value: "120003",
                    data: {},
                    children: []
                }
            ],
        }
    ]

    let firstLevels: Array<TreeNode> = [
        {
            text: "一级节点A",
            value: "1",
            data: {},
            isLeaf: false
        },
        {
            text: "一级节点B",
            value: "2",
            data: {},
            isLeaf: false
        },
        {
            text: "一级节点C",
            value: "3",
            data: {},
            isLeaf: false
        },
        {
            text: "一级节点D",
            value: "4",
            data: {},
            isLeaf: false
        },
        {
            text: "一级节点E",
            value: "5",
            data: {},
            isLeaf: false
        }
    ]


    let tags = ['A', 'B', 'C', 'D', 'E'];
    let levels = ['一级', '二级', '三级', '四级', '五级'];

    const loadMoreNodes = (node: TreeNode): Array<TreeNode> => {
        let level = node.value.length;
        let list: Array<TreeNode> = [];
        for (let i = 0; i < 5; i++) {
            let item: TreeNode = {
                data: {},
                isLeaf: level == 4,
                parent: node,
                text: `${node.text}-${levels[level]}${tags[i]}`,
                value: `${node.value}${i}`
            }
            list.push(item)
        }
        return list;
    }

    let lazyLoader: LazyLoader = {
        isBranch(item: TreeNode): boolean {
            return item.isLeaf == false;
        },

        async load(item: TreeNode): Promise<Array<TreeNode>> {
            await utils.sleep(3);
            return loadMoreNodes(item);
        }
        //{iconLoader}
    }

    const onSelectionChange = async (node: TreeNode): Promise<boolean> => {
        await utils.sleep(0.3);
        return Math.random() < 0.8;
    }

    let contextMenu: any;

    const onContextMenu: OnContextMenu = (event: MouseEvent, data: any) => {
        console.log('右键显示菜单')
        contextMenu.show(event, [
            {
                text: "新增",
                action: () => {
                    console.log('新增回调', data);
                }
            }, {
                text: "修改",
                action: () => {
                    console.log('修改回调', data);
                }
            }, {
                text: "删除",
                action: () => {
                    console.log('删除回调', data);
                }
            }
        ]);
    }
</script>
<Box style="width: 300px; height: 100%;" title="树状节点">
<TreeView  nodes={firstLevels} {lazyLoader} onSelectionChange={onSelectionChange} {onContextMenu}/>
</Box>
<ContextMenu bind:this={contextMenu}/>