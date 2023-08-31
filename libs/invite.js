// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

function invite(pl, ipl) {
    const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/member.json");
    const player_conf = new JsonConfigFile("./plugins/Lskyblock/players/"+ipl.name+".json");
    const member = member_conf.get("member");
    const i = 1;
    for (const i in member) {
        if (member[i] == ipl.name) {
            pl.tell("§a该玩家已经是你的岛屿成员了");
            i = 0;
        }
    }
    if (i) {
        member.push(ipl.name);
        member_conf.set("member", member);
        player_conf.set("right","member");
        player_conf.set("Owning_land",pl.name);
        const owning_land = player_conf.get("Owning_land");
        const spp_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + owning_land + "/land.json");
        const spawnpoint = spp_conf.get("island_pos");
        pl.tell("§a已将玩家添加入你的岛屿");
        ipl.tell("§a你已加入岛屿");
        ipl.teleport(spawnpoint.x, spawnpoint.y, spawnpoint.z, spawnpoint.dimid);
    }
}

module.exports = { invite };