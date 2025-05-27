<script lang="ts">

    import TreeView, {type CheckIsDirectory, type CheckIsRoot, type CompareFun, type GetText, type TreeNode} from "$lib/tree-view";
    import utils from "$lib/common/utils";
    import ContextMenu from "$lib/context-menu";
    import type {OnContextMenu} from "$lib/context-menu";
    import Box from "$lib/box";
    import TreeNodes from "$lib/lib/TreeNodes";
    import type {LazyLoader} from "$lib/tree-view";

    let list = [
        {
            text: "北京",
            code: "100000",
            parentCode: null
        }, {
            text: "东城区",
            code: "100001",
            parentCode: '100000'
        },
        {
            text: "西城区",
            code: "100002",
            parentCode: '100000'
        },
        {
            text: "海淀区",
            code: "100003",
            parentCode: '100000'
        },
        {
            text: "朝阳区",
            code: "100004",
            parentCode: '100000'
        },
        {
            text: "天津",
            code: '110000'
        },
        {
            text: "河北",
            code: '120000'
        },
        {
            text: "石家庄",
            code: "120100",
            parentCode: '120000'
        },
        {
            text: "新华区",
            code: "120101",
            parentCode: '120100'
        },
        {
            text: "桥西区",
            code: "120102",
            parentCode: '120100'
        },
        {
            text: "桥东区",
            code: "120103",
            parentCode: '120100'
        },
        {
            text: "长安区",
            code: "120104",
            parentCode: '120100'
        },
        {
            text: "唐山",
            code: "120200",
            parentCode: '120000'
        },
        {
            text: "保定",
            code: "120300",
            parentCode: '120000'
        }
    ]

    function compareStrings(str1: string, str2: string) {
        const result = str1.localeCompare(str2);
        if (result < 0) {
            return -1;
        } else if (result > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    const checkIsDirectory = (node: TreeNode<any>): boolean => {
        console.log('检查是不是目录', node.children == null)
        return node.children != null
    }

    let zones = new TreeNodes({
        keyField: 'code',
        textField: 'text',
        parentKeyField: 'parentCode',
        checkIsRoot: (item: any) => item.parentCode == null,
        checkIsDirectory,
        compareFun: (o1: any, o2: any) => compareStrings(o1.code, o2.code),
        expendDepth: 1
    });

    zones.setData(list);


    /*
    let firstLevels: Array<TreeNode<any>> = [
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
    ]*/


    let tags = ['A', 'B', 'C', 'D', 'E'];
    let levels = ['一级', '二级', '三级', '四级', '五级'];

    const loadMoreNodes = (node: TreeNode<any>): Array<TreeNode<any>> => {
        //let level = node.length;
        let list: Array<TreeNode<any>> = [];
        // for (let i = 0; i < 5; i++) {
        //     let item: TreeNode<any> = {
        //         data: {},
        //         isLeaf: level == 4,
        //         parent: node,
        //         text: `${node.text}-${levels[level]}${tags[i]}`,
        //         value: `${node.value}${i}`
        //     }
        //     list.push(item)
        // }
        return list;
    }

    let lazyLoader: LazyLoader = {
        isBranch(node: TreeNode<any>): boolean {
            return node.item.isLeaf == false;
        },

        async load(item: TreeNode<any>): Promise<Array<TreeNode<any>>> {
            await utils.sleep(3);
            return loadMoreNodes(item);
        }
        //{iconLoader}
    }

    const onSelectionChange = async (node: TreeNode<any>): Promise<boolean> => {
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
//    {lazyLoader}
    $: console.log(zones.nodes, checkIsDirectory)
</script>
<Box style="width: 300px; height: 100%;" title="树状节点">
    <TreeView nodes={zones.nodes} textField="text"  {checkIsDirectory} onSelectionChange={onSelectionChange} {onContextMenu}
              isVisible={()=>true}/>
</Box>
<ContextMenu bind:this={contextMenu}/>