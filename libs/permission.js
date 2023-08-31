// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const { share } = require("./share");

function derection(pl, pos, per) {
    let all_conf = File.getFilesList("./plugins/Lskyblock/dataBase/island/");
    all_conf = all_conf.filter(item => !item.endsWith("data.json"));
    for (let i in all_conf) {
        const land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + all_conf[i] + "/land.json");
        const land_pos = land_conf.get("island_pos");
        const land_range = land_conf.get("island_range");
        if (pos.x <= land_pos.x + land_range && pos.x >= land_pos.x - land_range && pos.y <= land_pos.y + land_range && pos.y >= land_pos.y - land_range) {
            const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + all_conf[i] + "/member.json");
            const member = member_conf.get("member");
            if (member.includes(pl.name) || all_conf[i] == pl.name) {
                return 1;
            }
            else if(File.exists("./plugins/Lskyblock/dataBase/island/" + all_conf[i] + "/share/"+pl.name+".json")){
                const share_per_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + all_conf[i] + "/share/"+pl.name+".json");
                const share_per = share_per_conf.get("permissions");
                if(share_per[per]){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            else {
                const permi = land_conf.get("permissions");
                if (permi[per]) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
    }
    const config = new JsonConfigFile("./plugins/Lskyblock/config.json");
    const permissions = config.get("permissions");
    if (permissions[per]) { 
        return 1;
    }
    else {
        return 0;
    }


    /*const all_conf = File.getFilesList("./plugins/Lskyblock/dataBase/island");
    all_conf = all_conf.filter(item => !item.endsWith(".json"));*/

}

module.exports = { derection };