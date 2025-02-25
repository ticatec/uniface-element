<script lang="ts">
    import Button, {IconButton, TextButton} from "$lib/button";
    import Separator from "$lib/separator";
    import {HeaderLayout} from "$lib/app-layout";


    const handleButtonClick = (e: MouseEvent) => {
        window.MessageBox.showInfo("已经成功解除", "动作表单管理")
    }

    const handleButtonClick1 = (e: MouseEvent) => {
        window.Toast.show("指定的用户不存在")
    }


</script>

<HeaderLayout>
    <div style="padding: 10px 0; background-color: #F6F8FF" slot="header">
        <div style="padding: 0 12px">
            <Button label="确认" onClick={handleButtonClick}></Button>
            <TextButton label="确认" onClick={handleButtonClick1}></TextButton>
            <IconButton icon="uniface-icon-edit-3" type="primary"></IconButton>
        </div>
    </div>
    <div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
        <div style="padding: 30px; background-color: #FFFFFF;">
            <div style="margin-top: 6px; background-color: #FFFFFF; position: relative; display: flex; flex-direction: row; height: 40px; align-items: center">

                    <Button label="确认" type="default" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="primary" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="secondary" onClick={handleButtonClick}></Button>


                    <Button label="确认" type="third" onClick={handleButtonClick}></Button>
                    <Button label="确认" type="forth" onClick={handleButtonClick}></Button>

            </div>


            <div style="margin-top: 6px; letter-spacing: 6px;">
                <Button label="确认" disabled type="default" onClick={handleButtonClick}></Button>
                <Button label="确认" disabled type="primary" onClick={handleButtonClick}></Button>
                <Button label="确认" disabled type="secondary" onClick={handleButtonClick}></Button>
                <Button label="确认" disabled type="third" onClick={handleButtonClick}></Button>
                <Button label="确认" disabled type="forth" onClick={handleButtonClick}></Button>
            </div>

            <div style="margin-top: 6px">
                <TextButton label="确认" type="default" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="primary" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="secondary" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="third" onClick={handleButtonClick}></TextButton>
                <TextButton label="确认" type="forth" onClick={handleButtonClick}></TextButton>
            </div>

            <div style="margin-top: 6px; position: relative; display: flex; flex-direction: row; height: 40px; align-items: center">
                <div>两组</div>

                    <TextButton label="确认" disabled type="default" onClick={handleButtonClick}></TextButton>
                    <TextButton label="确认" disabled type="primary" onClick={handleButtonClick}></TextButton>
                    <TextButton label="确认" disabled type="secondary" onClick={handleButtonClick}></TextButton>


                    <TextButton label="确认" disabled type="third" onClick={handleButtonClick}></TextButton>
                    <TextButton label="确认" disabled type="forth" onClick={handleButtonClick}></TextButton>

            </div>

            <div style="margin-top: 6px">
                <IconButton icon="uniface-icon-edit-3" type="default" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="secondary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="third" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" type="forth" onClick={handleButtonClick}></IconButton>
            </div>

            <div style="margin-top: 6px">
                <IconButton icon="uniface-icon-edit-3" disabled type="default" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" disabled type="primary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" disabled type="secondary" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" disabled type="third" onClick={handleButtonClick}></IconButton>
                <IconButton icon="uniface-icon-edit-3" disabled type="forth" onClick={handleButtonClick}></IconButton>
            </div>
        </div>

    </div>
</HeaderLayout>
