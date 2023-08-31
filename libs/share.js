// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

function share(pl,spl){
    const spl_member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/"+pl.name+"/member.json");
    const spl_member = spl_member_conf.get("member");
    if(!spl_member.includes(spl.name)){
        const share_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/"+pl.name+"/share/"+spl.name+".json");
        const share_permissions = {
            BREAK_BLOCK: false,
            PLACE_BLOCK: false,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: false,
            ATTACK_ENTITY: false,
            OPEN_CRAFTING_TABLE: false,
            OPEN_FURNACE: false,
            OPEN_BLAST_FURNACE: false,
            OPEN_SMOKER: false,
            OPEN_BREWING_STAND: false,
            OPEN_ANVIL: false,
            OPEN_ENCHANTING_TABLE: false,
            OPEN_BARREL: false,
            OPEN_CHEST: false,
            OPEN_STONECUTTER_BLOCK: false,
            OPEN_DISPENSER: false,
            OPEN_DROPPER: false,
            OPEN_HOPPER: false,
            OPEN_BEACON: false,
            USE_FLINE_AND_STEEL: false,
            USE_BUCKET: false,
            USE_FRAME: false,
        }
        share_conf.init("permissions",share_permissions);
        pl.tell("§a该玩家已成功添加！");
        spl.tell("§a你已被"+pl.name+"添加至共享名单");
    }
    else{
        pl.tell("§a该玩家已存在！");
    }
}

function remove(pl,spl){
    if(File.delete("./plugins/Lskyblock/dataBase/island/"+pl.name+"/share/"+spl.name+".json")){
        pl.tell("§a已为你移除该共享玩家");
    }
    else{
        pl.tell("§4该玩家不在共享名单");
    }
}
module.exports = { share , remove };

