const Init = require("./initisland.js");
const Create = require("./create.js");
const Invite = require("./invite.js");
const Share = require("./share.js");

//命令注册

var ivt = false;
var ivt_pl = {};
var master_pl = {};
var del = false;
var del_pl = {};
//邀请介质


function init_iland() {
    const is = mc.newCommand("is", "空岛指令", PermType.Any);
    is.setEnum("init", ["init"]);
    is.setEnum("create", ["create"]);
    is.setEnum("delete", ["delete"]);
    is.setEnum("reldel",["reldel"]);
    is.setEnum("invite", ["invite"]);
    is.setEnum("accept", ["accept", "refuse"]);
    is.setEnum("home", ["home"]);
    is.setEnum("sethome", ["sethome"]);
    is.setEnum("share", ["share"]);
    is.setEnum("help", ["help"]);
    is.setEnum("delmb", ["delmb"]);
    is.setEnum("range",["range"]);
    is.setEnum("add", ["add", "remove"]);
    is.mandatory("action", ParamType.Enum, "init", 1);
    is.mandatory("action", ParamType.Enum, "create", 1);
    is.mandatory("action", ParamType.Enum, "delete", 1);
    is.mandatory("action",ParamType.Enum,"reldel",1);
    is.mandatory("action", ParamType.Enum, "invite", 1);
    is.mandatory("action", ParamType.Enum, "accept", 1);
    is.mandatory("action", ParamType.Enum, "home", 1);
    is.mandatory("action", ParamType.Enum, "sethome", 1);
    is.mandatory("action", ParamType.Enum, "help", 1);
    is.mandatory("action", ParamType.Enum, "share", 1);
    is.mandatory("action", ParamType.Enum, "delmb", 1);
    is.mandatory("action",ParamType.Enum,"range",1);
    is.mandatory("add", ParamType.Enum, "add", 1);
    is.mandatory("name", ParamType.Player);
    is.mandatory("string", ParamType.RawText);
    is.mandatory("number",ParamType.Int);
    is.overload(["help"]);
    is.overload(["init", "string"]);
    is.overload(["invite", "name"]);
    is.overload(["delmb", "string"]);
    is.overload(["create", "string"]);
    is.overload(["delete"]);
    is.overload(["reldel"]);
    is.overload(["accept"]);
    is.overload(["home"]);
    is.overload(["sethome"]);
    is.overload(["share", "add", "name"]);
    is.overload(["range","add","string","number"]);
    is.setCallback((cmd, ori, output, res) => {
        const conf_init = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
        const conf_pl = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/");
        switch (res.action) {
            case "init":
                if (Number(conf_init.get("status")) == 0) {
                    if (Init.initisland(ori.player, res.string)) {
                        Init.init_config();
                    }
                }
                else {
                    ori.player.tell("§a主城岛屿已经初始化过了");
                }
                break;
            case "create":
                if (!File.exists("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/")) {
                    if (Number(conf_init.get("status")) == 1) {
                        if (File.exists("./plugins/Lskyblock/structures/" + res.string + ".mcstructure")) {
                            Create.create(ori.player, res.string);
                        }
                        else {
                            ori.player.tell("§4该结构文件不存在！");
                        }
                    }
                    else {
                        ori.player.tell("§a请先初始化岛屿");
                    }
                }
                else {
                    ori.player.tell("§a你已经拥有岛屿了");
                }
                break;
            case "delete":
                if (File.exists("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/")) {
                    if (!del) {
                        ori.player.tell("§a是否确认删除岛屿，如确认请输入/is reldel");
                        del = true;
                        del_pl = ori.player;
                        setTimeout(() => {
                            if (del) {
                                del_pl.tell("§4删除消息已过期!");
                                del = false;
                            }
                        },10000);
                    }
                }
                else {
                    ori.player.tell("§4您还没有岛屿");
                }
                break;
            case "reldel":
                if(del){
                    if (del_pl.name == ori.player.name) {
                        log(1)
                        const delpl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + ori.player.name + ".json");
                        delpl_conf.set("Owning_land", "none");
                        delpl_conf.set("right", "none");
                        if (File.delete("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/")) {
                            ori.player.tell("§a删除成功");
                            const init_land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
                            const pos = init_land_conf.get("pos");
                            ori.player.teleport(pos.x+4, pos.y+5, pos.z+2, pos.dimid);
                            del = false;
                        }
                    }
                }
                else{
                    ori.player.tell("§4暂时没有消息处理！");
                }
                break;
            case "invite":
                if (File.exists("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/")) {
                    const conf = new JsonConfigFile("./plugins/Lskyblock/config.json");
                    const max = conf.get("MaxInvitePlayer");
                    const in_pls_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/member.json");
                    const in_pls = in_pls_conf.get("member");
                    log(in_pls)
                    if (!(in_pls.length > max)) {
                        const player_right = new JsonConfigFile("./plugins/Lskyblock/players/" + ori.player.name + ".json");
                        if (player_right.get("right") == "master") {
                            if (!ivt) {
                                const owning = new JsonConfigFile("./plugins/Lskyblock/players/" + res.name[0].name + ".json");
                                const ow = owning.get("Owning_land");
                                if (ow == "none") {
                                    res.name[0].tell("§a-----------------\n邀请信息\n岛主:" + ori.player.name + "\n邀请你加入他的岛屿\n同意：/is accept\n拒绝：/is refuse\n请在三十秒内作出选择\n-----------------");
                                    ivt = true;
                                    ivt_pl = res.name[0];
                                    master_pl = ori.player;
                                    setTimeout(() => {
                                        if (ivt) {
                                            res.name[0].tell("§a邀请已过期");
                                            ori.player.tell("§a邀请已过期");
                                            ivt = false;
                                        }
                                    }, 30000);
                                }
                                else {
                                    ori.player.tell("§a该玩家已经拥有岛屿了");
                                }

                            }
                            else {
                                ori.player.tell("§a邀请信息暂未完成或过期，请稍等片刻");
                            }
                        }
                        else {
                            ori.player.tell("§a只有岛主才能邀请人哦！");
                        }
                    }
                    else {
                        ori.player.tell("§4你岛屿邀请人数已达上限!");
                    }
                }
                else {
                    ori.player.tell("§4您还没有岛屿！");
                }
                break;
            case "delmb":
                const pl_land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/member.json");
                let pl_member = pl_land_conf.get("member");
                if (pl_member.includes(res.string)) {
                    pl_member = pl_member.filter(item => item !== res.string);
                    const delpl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + res.string + ".json");
                    pl_land_conf.set("member", pl_member);
                    delpl_conf.set("Owning_land", "none");
                    delpl_conf.set("right", "none");
                    ori.player.tell("§a已成功移除该玩家");
                }
                else {
                    ori.player.tell("§4该玩家不是你的岛屿成员");
                }
                break;
            case "accept":
                if (ivt_pl.name == ori.player.name) {
                    if (ivt) {
                        Invite.invite(master_pl, ivt_pl);
                        ivt = false;
                        ivt_pl = {};
                    }
                    else {
                        ori.player.tell("§a暂未有邀请信息处理");
                    }
                }
                else {
                    ori.player.tell("§a暂未有邀请信息处理");
                }
                break;
            case "refuse":
                if (ivt_pl.name == ori.player.name) {
                    if (ivt) {
                        ivt = false;
                        ivt_pl = {};
                        master_pl.tell("§a玩家拒绝加入你的岛屿");
                        ori.player.tell("§a你已拒绝加入岛屿");
                    }
                    else {
                        ori.player.tell("§a暂未有邀请信息处理");
                    }
                }
                else {
                    ori.player.tell("§a暂未有邀请信息处理");
                }
                break;
            case "home":
                if (is_land(ori.player)) {
                    ori.player.tell("§a你还没有空岛");
                }
                else {
                    const ownership_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + ori.player.name + ".json");
                    const ownership = ownership_conf.get("Owning_land");
                    const home_pos_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ownership + "/land.json");
                    let home_pos = home_pos_conf.get("island_pos");
                    const hpos = new IntPos(home_pos.x, home_pos.y, home_pos.z, home_pos.dimid);
                    ori.player.teleport(hpos);
                    ori.player.tell("§a已将你传送回岛屿");
                }
                break;
            case "sethome":
                if (is_land(ori.player)) {
                    ori.player.tell("§a你还没有空岛");
                }
                else {
                    const land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ori.player.name + "/land.json");
                    const land_pos = land_conf.get("island_pos");
                    const land_range = land_conf.get("island_range");
                    const pos = ori.player.blockPos;
                    if (pos.x <= land_pos.x + land_range && pos.x >= land_pos.x - land_range && pos.y <= land_pos.y + land_range && pos.y >= land_pos.y - land_range) {
                        const ownership_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + ori.player.name + ".json");
                        const ownership = ownership_conf.get("Owning_land");
                        const home_pos_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + ownership + "/land.json");
                        let home_pos = home_pos_conf.get("home_pos");
                        home_pos = {
                            x: ori.player.blockPos.x,
                            y: ori.player.blockPos.y,
                            z: ori.player.blockPos.z,
                            dimid: ori.player.blockPos.dimid
                        }
                        home_pos_conf.set("island_pos", home_pos);
                        ori.player.tell("§a已成功设置岛屿重生点");
                    }
                    else {
                        ori.player.tell("§4您不在你的岛屿范围内！");
                    }
                }
                break;
            case "help":
                ori.player.tell("§a--------------------------");
                ori.player.tell("§a      Lskyblock指令大全    ");
                ori.player.tell("§a--------------------------");
                ori.player.tell("§a/is create 结构文件名    创建空岛");
                ori.player.tell("§a/is init   结构文件名    初始化空岛");
                ori.player.tell("§a/is invite 玩家名        邀请玩家入岛");
                ori.player.tell("§a/is accept               同意入岛");
                ori.player.tell("§a/is refuse               拒绝入岛");
                ori.player.tell("§a/is delmb  玩家名        移除岛屿成员");
                ori.player.tell("§a/is share  玩家名        分享玩家权限");
                ori.player.tell("§a/is home                 回到岛屿");
                ori.player.tell("§a/is sethome              设置岛屿出生点");
                ori.player.tell("§a/is delete               删除岛屿");
                ori.player.tell("§a/is reldel               确认删除岛屿");
                ori.player.tell("§a--------------------------");
                break;
            case "share":
                if (res.add == "add") {
                    if (ori.player.name != res.name[0].name) {
                        Share.share(ori.player, res.name[0]);
                    }
                    else {
                        ori.player.tell("§4请不要输入自己的名字");
                    }
                }
                else if (res.add == "remove") {
                    if (ori.player.name != res.name[0].name) {
                        Share.remove(ori.player, res.name[0]);
                    }
                    else {
                        ori.player.tell("§4请不要输入自己的名字");
                    }
                }
                break;
            case "range":
                if(res.add == "add"){
                    /*
                       检测是否存在该玩家的岛屿
                       增加岛屿范围
                       减少岛屿范围（不推荐）
                    */
                }
                break;
        }
    })
    is.setup();
}

function is_land(pl) {
    const pl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    if (pl_conf.get("Owning_land") == "none") {
        return true;
    }
    else {
        return false;
    }
}

module.exports = { init_iland };