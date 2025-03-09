<script lang="ts">


    import type CardAction from "$lib/card/CardAction";
    import Card from "$lib/card";

    let actions: Array<CardAction> = [
        {
            icon: 'uniface-icon-user',
            disabled: true,
            callback: () => {
                window.Toast.show('打折好消息', "success")
            }
        },
        {
            icon: 'uniface-icon-users',
            callback: () => {
                window.MessageBox.showConfirm('确定要删除当前角色吗？', '删除确认')
            }
        },
        {
            icon: 'uniface-icon-wifi',
            callback: () => {
                window.MessageBox.showInfo('干的漂亮', '信息提示')
            }
        },
        {
            icon: 'uniface-icon-wind',
            callback: () => {
            }
        }
    ]

</script>
<div style="width: 100%; padding: 6px; display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap">
    <Card title="系统管理员 - 系统管理员 - 系统管理员 - 系统管理员" {actions}>
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions} variant="3d">
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions} variant="3d">
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions} variant="3d">
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions} variant="3d">
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions}>
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions}>
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
    <Card style="" title="角色管理" {actions}>
        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">
            <span>这是一张卡片</span>
        </div>
    </Card>
</div>