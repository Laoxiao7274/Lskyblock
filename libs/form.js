// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

//表单系统

/* 岛屿创建表单 */
function create(pl){
    const structures = File.getFilesList("./plugins/Lskyblock/structures/");
    const fm = mc.newCustomForm();
    fm.setTitle("空岛创建");
    fm.addDropdown("选择空岛模版",structures);
    
}
/* 岛屿创建表单 */
