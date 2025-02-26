<script lang="ts">
    import Button, {IconButton, TextButton} from "$lib/button";
    import Separator from "$lib/separator";
    import {HeaderLayout} from "$lib/app-layout";
    import ActionBar from "$lib/action-bar";


    const handleButtonClick = (e: MouseEvent) => {
        window.MessageBox.showInfo("已经成功解除", "动作表单管理")
    }

    const handleButtonClick1 = (e: MouseEvent) => {
        window.Toast.show("指定的用户不存在")
    }


</script>

<HeaderLayout>
    <div style="padding: 10px 0; background-color: #F6F8FF" slot="header">
        <div style="padding: 0 12px; height: 24px">

        </div>
    </div>
    <div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
        <div style="padding: 30px; background-color: #FFFFFF;">
            <div style="margin-top: 6px; background-color: #FFFFFF; position: relative; display: flex; flex-direction: row; height: 40px; align-items: center">
                <ActionBar>
                    <Button label="确认" type="default" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="primary" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="secondary" onClick={handleButtonClick}></Button>
                    <Separator/>
                    <Button label="确认" type="third" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="forth" onClick={handleButtonClick}></Button>
                    <Separator/>
                    <Button label="确认" disabled type="default" onClick={handleButtonClick}></Button>
                </ActionBar>
            </div>
            <ActionBar style="margin-top: 20px">
                <Button label="确认" size="big" type="default" onClick={handleButtonClick}></Button>
                <Button label="确认" size="big" type="primary" onClick={handleButtonClick}></Button>
                <Button label="确认" size="big" type="secondary" onClick={handleButtonClick}></Button>
                <Separator height="28px"/>
                <Button label="确认" size="big" type="third" onClick={handleButtonClick}></Button>
                <Button label="确认" size="big" type="forth" onClick={handleButtonClick}></Button>
                <Separator height="28px"/>
                <Button label="确认" size="big" disabled type="default" onClick={handleButtonClick}></Button>
            </ActionBar>
            <ActionBar style="margin-top: 20px">
                <Button label="确认" size="mini" type="default" onClick={handleButtonClick}></Button>
                <Button label="确认" size="mini" type="primary" onClick={handleButtonClick}></Button>
                <Button label="确认" size="mini" type="secondary" onClick={handleButtonClick}></Button>
                <Separator height="16px"/>
                <Button label="确认" size="mini" type="third" onClick={handleButtonClick}></Button>
                <Button label="确认" size="mini" type="forth" onClick={handleButtonClick}></Button>
                <Separator height="16px"/>
                <Button label="确认" size="mini" disabled type="default" onClick={handleButtonClick}></Button>
            </ActionBar>
            <ActionBar style="margin-top: 20px">
                <Button label="确认" variant="plain" type="default" onClick={handleButtonClick}></Button>
                <Button label="确认" variant="plain" type="primary" onClick={handleButtonClick}></Button>
                <Button label="确认" variant="plain" type="secondary" onClick={handleButtonClick}></Button>
                <Separator/>
                <Button label="确认" variant="plain" type="third" onClick={handleButtonClick}></Button>
                <Button label="确认" variant="plain" type="forth" onClick={handleButtonClick}></Button>
                <Separator/>
                <Button label="确认" variant="plain" disabled type="default" onClick={handleButtonClick}></Button>
            </ActionBar>


            <ActionBar style="margin-top: 20px">
                <TextButton label="确认" type="default" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="primary" onClick={handleButtonClick}></TextButton>
                <Separator height="12px"/>
                <TextButton label="确认" type="secondary" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="third" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="forth" onClick={handleButtonClick}></TextButton>
                <Separator height="12px"/>
                <TextButton label="确认" disabled type="default" onClick={handleButtonClick}></TextButton>
            </ActionBar>

            <ActionBar style="margin-top: 20px">
                <TextButton label="确认" size="big" type="default" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" size="big" type="primary" onClick={handleButtonClick}></TextButton>
                <Separator height="12px"/>
                <TextButton label="确认" size="big" type="secondary" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" size="big" type="third" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" size="big" type="forth" onClick={handleButtonClick}></TextButton>
                <Separator height="12px"/>
                <TextButton label="确认" size="big" disabled type="default" onClick={handleButtonClick}></TextButton>
            </ActionBar>

            <ActionBar style="margin-top: 20px">
                <IconButton icon="uniface-icon-edit-3" type="default" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="secondary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="third" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="forth" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" disabled type="default" onClick={handleButtonClick}></IconButton>
            </ActionBar>

            <ActionBar style="margin-top: 20px">
                <IconButton icon="uniface-icon-edit-3" size="big" type="default" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="big" type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="big" type="secondary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="big" type="third" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="big" type="forth" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="big" disabled type="default" onClick={handleButtonClick}></IconButton>
            </ActionBar>

            <ActionBar style="margin-top: 20px">
                <IconButton icon="uniface-icon-edit-3" size="mini" type="default" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="mini" type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="mini" type="secondary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="mini" type="third" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="mini" type="forth" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" size="mini" disabled type="default" onClick={handleButtonClick}></IconButton>
            </ActionBar>
        </div>

    </div>
</HeaderLayout>
