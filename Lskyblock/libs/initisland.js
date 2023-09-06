// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 





function initisland(pl, filename) {
    let tf = Boolean;
    const config_all = new JsonConfigFile("./plugins/Lskyblock/config.json");
    //总配置文件
    const INIT_LAND = config_all.get("INIT_LAND");
    const init_pos = new IntPos(INIT_LAND.pos.x + 4, INIT_LAND.pos.y + 5, INIT_LAND.pos.z + 2, INIT_LAND.pos.dimid);//初始坐标
    if (File.exists("./plugins/Lskyblock/structures/" + filename + ".mcstructure")) {
        mc.runcmd("structure load " + filename + " " + INIT_LAND.pos.x + " " + INIT_LAND.pos.y + " " + INIT_LAND.pos.z + " 0_degrees none true true true");
        pl.tell("§a已成功为你初始化岛屿，请等待2秒");
        setTimeout(() => {
            pl.teleport(init_pos)
            pl.setTitle("§a此岛为主城岛屿");
            pl.runcmd("setworldspawn");
            pl.runcmd("spawnpoint");
            tf = true;
        }, 2000);
    }
    else{
        pl.tell("§4该结构文件不存在！");
        tf = false;
    }
    return tf;
}

function init_config() {
    const config_all = new JsonConfigFile("./plugins/Lskyblock/config.json");
    //总配置文件
    const config_create = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const INIT_LAND = config_all.get("INIT_LAND");
    const config = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
    const initpos = {
        x: INIT_LAND.pos.x,
        y: INIT_LAND.pos.y,
        z: INIT_LAND.pos.z,
        dimid: INIT_LAND.pos.dimid,
    }
    config.init("pos", initpos);
    config_create.init("module",{});
    config.set("status", 1);
}


module.exports = { initisland, init_config };


