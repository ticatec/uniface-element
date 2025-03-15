<script lang="ts">

    import Breadcrumbs from "$lib/breadcrumbs";

    let list = [
        {
            label: "中国",
            data: {}
        },
        {
            label: "河北省",
            data: {}
        },
        {
            label: "石家庄市",
            data: {}
        },
        {
            label: "桥西区",
            data: {}
        },
        {
            label: "西里派出所",
            data: {}
        }
    ]
    let handleItemClick = (item: any) => (event: MouseEvent) => {
        console.log(item)
    }
</script>
<div style="width: 100%">
    <Breadcrumbs items={list} onItemClick={handleItemClick}/>
</div>
