

function spawn_pl() {
    mc.listen("onRespawn", (player) => {
        const config = new JsonConfigFile('./plugins/Lskyblock/config.json');
        const init_point = config.get("INIT_LAND").pos;
        const spawnpoint_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + player.name + ".json");
        const owning_land = spawnpoint_conf.get("Owning_land");
        if (owning_land != "none") {
            const spp_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + owning_land + "/land.json");
            const spawnpoint = spp_conf.get("home_pos");
            setTimeout(() => {
                player.teleport(spawnpoint.x, spawnpoint.y, spawnpoint.z, spawnpoint.dimid);
                player.tell("§a已将你传送至空岛重生点");
            }, 200)
        }
        else {
            setTimeout(() => {
                player.teleport(init_point.x + 4, init_point.y + 5, init_point.z + 2, init_point.dimid);
                player.tell("§a已将你传送至世界重生点");
            }, 200);
        }
    })
}

function sethome(pl,ipl) {
    const land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/land.json");
    const land_pos = land_conf.get("island_pos");
    const land_range = land_conf.get("island_range");
    const pos = ipl.blockPos;
    if (pos.x <= land_pos.x + land_range && pos.x >= land_pos.x - land_range && pos.y <= land_pos.y + land_range && pos.y >= land_pos.y - land_range) {
        const ownership_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl + ".json");
        const ownership = ownership_conf.get("Owning_land");
        const home_pos_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ownership + "/land.json");
        let home_pos = home_pos_conf.get("home_pos");
        home_pos = {
            x: ipl.blockPos.x,
            y: ipl.blockPos.y,
            z: ipl.blockPos.z,
            dimid: ipl.blockPos.dimid
        }
        home_pos_conf.set("home_pos", home_pos);
        ipl.tell("§a已成功设置岛屿重生点");
    }
    else {
        ipl.tell("§4您不在你的岛屿范围内！");
    }
}

module.exports = { spawn_pl, sethome };