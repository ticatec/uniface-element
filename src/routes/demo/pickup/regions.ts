const regions: Array<any> = [
    {
        code: "100000",
        text: "北京市",
        abbr: "北京市",
        children: [
            {
                code: "100001",
                text: "北京市东城区",
                abbr: "东城区",
            },
            {
                code: "100002",
                text: "北京市西城区",
                abbr: "西城区",
            },
            {
                code: "100003",
                text: "北京市朝阳区",
                abbr: "朝阳区",
            }
        ]
    },
    {
        code: "130000",
        text: "河北省",
        abbr: "河北省",
        children: [
            {
                code: "130100",
                text: "河北省石家庄市",
                abbr: "石家庄市",
                children: [
                    {
                        code: "130101",
                        text: "河北省石家庄市桥西区",
                        abbr: "桥西区",
                    },
                    {
                        code: "130102",
                        text: "河北省石家庄市桥东区",
                        abbr: "桥东区",
                    },
                    {
                        code: "130103",
                        text: "河北省石家庄市长安区",
                        abbr: "长安区",
                    },
                    {
                        code: "130104",
                        text: "河北省石家庄市新华区",
                        abbr: "新华区",
                    }
                ]
            },
            {
                code: "130200",
                text: "河北省保定市",
                abbr: "保定市",
                children: [
                    {
                        code: "130201",
                        text: "河北省保定市莲花区",
                        abbr: "莲花区",
                    },
                    {
                        code: "130202",
                        text: "河北省保定市桥东区",
                        abbr: "莲花区",
                    },
                    {
                        code: "130303",
                        text: "河北省保定市大桥区",
                        abbr: "莲花区",
                    }
                ]
            },
            {
                code: "130300",
                text: "河北省唐山市",
                abbr: "唐山市",
            }
        ]
    }
]

export default regions;