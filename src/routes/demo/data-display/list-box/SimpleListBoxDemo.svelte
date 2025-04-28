<script lang="ts">
    import ListBox from "$lib/list-box";
    import EmployeeRender from "./EmployeeRender.svelte";
    import employees from "./employees";

    let selectedItem: any;
    let selectedItem2: any;
    let selectedItem3: any;

    let selectedList:Array<any> = [];

    const filterList = (item: any, text: string) => item.name?.toLowerCase().indexOf(text.toLowerCase()) > -1;

</script>
<div style="width: 100%; height: 100%; padding: 12px; display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap; overflow: auto" >
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
        <div class="title">只读列表显示</div>
        <ListBox filter={filterList} style="width: 100%; height: 360px; position: relative"
                 list={employees} selectMode="none" itemRender={EmployeeRender}/>
    </div>
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
        <div class="title">单选列表</div>
        <ListBox style="width: 100%; height: 360px; position: relative"
                 filter={filterList} title="雇员列表"
                 list={employees} selectMode="single" itemRender={EmployeeRender}  bind:selectedItem/>
        <div style="padding-top: 8px">选中条目：{selectedItem?.name??'无'}</div>
    </div>
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
        <div class="title">带标题头</div>
        <ListBox style="width: 100%; height: 360px; position: relative"
                 list={employees} selectMode="single" itemRender={EmployeeRender}  bind:selectedItem={selectedItem2}>
            <div slot="header" style="width: 100%; background-color: #f0f0f0; padding: 8px 12px; font-size: 15px; font-weight: 600">
                <span>员工列表</span>
            </div>
        </ListBox>
        <div style="padding-top: 8px">选中条目：{selectedItem2?.name??'无'}</div>
    </div>
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
        <div class="title">带标题注脚</div>
        <ListBox style="width: 100%; height: 360px; position: relative" title="雇员列表"
                 list={employees} selectMode="single" itemRender={EmployeeRender}  bind:selectedItem={selectedItem3}>
            <div slot="footer" style="width: 100%; padding: 2px 6px; text-align: right; box-sizing: border-box">
                <span>合计：{employees.length}</span>
            </div>
        </ListBox>
        <div style="padding-top: 8px">选中条目：{selectedItem3?.name??'无'}</div>
    </div>
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
        <div class="title">多选列表框</div>
        <ListBox style="width: 100%; height: 360px; position: relative"
                 list={employees} selectMode="multiple" itemRender={EmployeeRender}  bind:selectedList>
            <div slot="header" style="width: 100%; background-color: #f0f0f0; padding: 8px 12px; font-size: 15px; font-weight: 600">
                <span>请选中员工</span>
            </div>
            <div slot="footer" style="width: 100%; padding: 2px 6px; text-align: right; box-sizing: border-box">
                <span>选中：{selectedList.length}</span>
            </div>
        </ListBox>
    </div>
    <div class="flex-demo-block" style="width: 33%; padding: 0 15px; box-sizing: border-box">
    </div>
</div>

<style>
    .title {
        margin-bottom: 8px;
    }
</style>