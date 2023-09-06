// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

function Move() {
    let pls = {};
    setInterval(() => {
        const players = mc.getOnlinePlayers();
        if (!players) return;
        players.forEach((ele, index) => {
            if (ele.blockPos) {
                pls[ele.name] = {
                    x: ele.blockPos.x,
                    y: ele.blockPos.y,
                    z: ele.blockPos.z,
                    dimid: ele.blockPos.dimid,
                };
            }
        });
    }, 500);
    setInterval(() => {
        const players = mc.getOnlinePlayers();
        if (!players || Object.keys(pls).length === 0) return;
        players.forEach((ele, index) => {
            if (ele.blockPos && pls[ele.name]) {
                before_name = pls[ele.name];
                if (ele.blockPos.x != before_name.x || ele.blockPos.y != before_name.y || ele.blockPos.z != before_name.z || ele.blockPos.dimid != before_name.dimid) {
                    let pos = ele.blockPos;
                    let all_conf = File.getFilesList("./plugins/Lskyblock/dataBase/island/");
                    all_conf = all_conf.filter(item => !item.endsWith("data.json"));
                    for (let i in all_conf) {
                        const land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + all_conf[i] + "/land.json");
                        const land_pos = land_conf.get("island_pos");
                        const land_range = land_conf.get("island_range");
                        if ((pos.x <= land_pos.x + land_range) && (pos.x >= land_pos.x - land_range) && (pos.z <= land_pos.z + land_range) && (pos.z >= land_pos.z - land_range)){
                            if(!((before_name.x <= land_pos.x + land_range) && (before_name.x >= land_pos.x - land_range) && (before_name.z <= land_pos.z + land_range) && (before_name.z >= land_pos.z - land_range))){
                                ele.setTitle("你已进入玩家"+all_conf[i]+"的岛屿");
                            }
                        }
                    }
                }
            }
        });
    }, 510);
}

module.exports = { Move };