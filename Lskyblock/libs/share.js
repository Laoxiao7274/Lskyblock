// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

function share(pl,spl,mpl){
    const spl_member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/"+pl+"/member.json");
    const spl_member = spl_member_conf.get("member");
    if(!spl_member.includes(spl.name)){
        const share_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/"+pl+"/share/"+spl.name+".json");
        const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/"+pl+"/land.json");
        const share_permissions = conf.get("share_permissions");
        share_conf.init("permissions",share_permissions);
        mpl.tell("§a该玩家已成功添加！");
        spl.tell("§a你已被"+mpl.name+"添加至共享名单");
    }
    else{
        pl.tell("§a该玩家已存在！");
    }
}

function remove(pl,spl,mpl){
    log(pl)
    if(File.delete("./plugins/Lskyblock/dataBase/island/"+pl+"/share/"+spl.name+".json")){
        mpl.tell("§a已为你移除该共享玩家");
    }
    else{
        log(spl.name)
        mpl.tell("§4该玩家不在共享名单");
    }
}
module.exports = { share , remove };

