

function spawn_pl() {
    mc.listen("onRespawn", (player) => {
        const config = new JsonConfigFile('./plugins/Lskyblock/config.json');
        const init_point = config.get("INIT_LAND").pos;
        const spawnpoint_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + player.name + ".json");
        const owning_land = spawnpoint_conf.get("Owning_land");
        if (owning_land != "none") {
            const spp_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + owning_land + "/land.json");
            const spawnpoint = spp_conf.get("island_pos");
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

module.exports = { spawn_pl };