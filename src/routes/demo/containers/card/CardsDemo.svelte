<script lang="ts">


    import type CardAction from "$lib/card/CardAction";
    import Card from "$lib/card";
    import alert from "./message_alert.png"
    import DemoBlock from "../../DemoBlock.svelte";
    import ActionBar from "$lib/action-bar";
    import {TextButton} from "$lib/button";

    let getActions = (): Array<CardAction> => [
        {
            icon: 'icon_google_remove_red_eye',
            disabled: true,
            callback: () => {
                window.Toast.show('打折好消息', "success")
            }
        },
        {
            icon: 'icon_google_disabled_by_default',
            callback: () => {
                window.MessageBox.showConfirm('确定要删除当前角色吗？', '删除确认')
            }
        },
        {
            icon: 'icon_google_account_circle',
            callback: () => {
                window.MessageBox.showInfo('干的漂亮', '信息提示')
            }
        },
        {
            icon: 'icon_google_build_circle',
            disabled: Math.random() < 0.3,
            callback: () => {
            }
        }
    ]

    let getActions1 = (): Array<CardAction> => [
        {
            icon: 'icon_google_remove_red_eye',
            disabled: true,
            callback: () => {
                window.Toast.show('打折好消息', "success")
            }
        },
        {
            icon: 'icon_google_disabled_by_default',
            callback: () => {
                window.MessageBox.showConfirm('确定要删除当前角色吗？', '删除确认')
            }
        },
        {
            icon: 'icon_google_account_circle',
            callback: () => {
                window.MessageBox.showInfo('干的漂亮', '信息提示')
            }
        },
        {
            img: alert,
            callback: () => {
            }
        }
    ]

</script>


<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/3" title="Common Card">
            <Card title="普通卡片" actions={getActions()} style="width: 300px; margin: 0 auto">
                <div style="height: 60px; width: 100%; padding: 8px">
                    <span>这是一张卡片</span>
                </div>
            </Card>
        </DemoBlock>

        <DemoBlock style="grid-column: 3/5" title="Card with shadow">
            <Card title="普通卡片" actions={getActions()} variant="3d" style="width: 300px; margin: 0 auto">
                <div style="height: 60px; width: 100%; padding: 8px">
                    <span>这是一张卡片</span>
                </div>
            </Card>

        </DemoBlock>

        <DemoBlock style="grid-column: 5/7" title="Card icons and customize color">
            <Card title="普通卡片" actions={getActions1()} variant="3d" style="width: 300px; margin: 0 auto;" iconColor="#42A5F5">
                <div style="height: 60px; width: 100%; padding: 8px">
                    <span>这是一张卡片</span>
                </div>
            </Card>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/3" title="Card without actions">
            <Card title="Active Users"  variant="3d" style="width: 300px; margin: 0 auto">
                <div style="height: 60px; width: 100%; padding: 8px">
                    <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; font-size: 36px">
                        <span>1,345</span>
                    </div>
                </div>
            </Card>
        </DemoBlock>

        <DemoBlock style="grid-column: 3/5" title="Plain Card">
            <Card style="width: 280px; margin: 0 auto">
                <div style="height: 120px; width: 100%; padding: 8px; position: relative">
                    <div style="font-size: 18px; padding: 6px">
                        <span>Revenue</span>
                    </div>
                    <div style="position: relative; top: 30%; transform: translateY(-50%); text-align: center; font-size: 36px">
                        <span>$5,235,346.00</span>
                    </div>
                </div>
            </Card>
        </DemoBlock>

        <DemoBlock style="grid-column: 5/7" title="Card with customize header">
            <Card style="width: 280px; margin: 0 auto">
                <div slot="header-bar" style="position: relative; height: 36px; font-size: 18px; padding: 0 6px; text-align: center; ">
                    <span style="position: relative; display: inline-block;  top: 50%; transform: translateY(-50%);">Revenue</span>
                    <i class="icon_google_insert_chart_outlined" style="position: absolute; top: 10px; right: 8px; cursor: pointer"></i>
                </div>
                <div style="height: 80px; width: 100%; padding: 8px; position: relative">
                    <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; font-size: 36px">
                        <span>$5,235,346.00</span>
                    </div>
                </div>
            </Card>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/3" title="Card with customize footer">
            <Card style="width: 280px; margin: 0 auto">
                <div slot="header-bar" style="position: relative; height: 36px; font-size: 18px; padding: 0 6px; text-align: center; ">
                    <span style="position: relative; display: inline-block;  top: 50%; transform: translateY(-50%);">Revenue</span>
                    <i class="icon_google_insert_chart_outlined" style="position: absolute; top: 10px; right: 8px; cursor: pointer"></i>
                </div>
                <div style="height: 80px; width: 100%; padding: 8px; position: relative">
                    <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; font-size: 36px">
                        <span>$5,235,346.00</span>
                    </div>
                </div>
                <div slot="action-bar" style="position: relative; height: 36px; padding: 0 6px; text-align: center; width: 100%">
                    <ActionBar style="margin: 0 auto">
                        <TextButton type="primary" label="详情列表"/>
                        <TextButton type="primary" label="年分解"/>
                    </ActionBar>
                </div>
            </Card>
        </DemoBlock>
    </div>
</div>


<!--<div style="width: 100%; padding: 6px; display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap">-->
<!--    -->
<!--    <Card style="" title="角色管理" actions={getActions()} variant="3d">-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--    <Card style="" title="角色管理" actions={getActions()} variant="3d">-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--    <Card style="" title="角色管理" actions={getActions()} variant="3d">-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--    <Card style="" title="角色管理" actions={getActions()}>-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--    <Card style="" title="角色管理" actions={getActions()}>-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--    <Card style="" title="角色管理" actions={getActions()}>-->
<!--        <div style="height: 60px; padding: 12px 15px; box-sizing: border-box; width: 100%">-->
<!--            <span>这是一张卡片</span>-->
<!--        </div>-->
<!--    </Card>-->
<!--</div>-->