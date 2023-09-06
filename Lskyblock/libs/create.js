//空岛创建

const { share } = require("./share");

function create(pl,filename) {
    const config = new JsonConfigFile("./plugins/Lskyblock/config.json");
    const init_config = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
    const conf_ol_land = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/" + "land.json");
    const conf_member = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/" + "member.json");
    const conf_landdata = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/data.json");
    const land_range = config.get("land_range");
    const land_protect_range = config.get("land_protect_range");
    const total = conf_landdata.get("total");
    const init_pos = init_config.get("pos");
    const distance = (total / 8) * land_range;
    const direction = (total % 8);
    switch (direction) {
        case 0:
            init_pos.x += distance;
            init_pos.z += distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos0 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos0 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos0 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos0)
                island_config(conf_ol_land,ipos0,land_protect_range,conf_member,pos0);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 1:
            init_pos.x += distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos1 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos1 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos1 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos1)
                island_config(conf_ol_land,ipos1,land_protect_range,conf_member,pos1);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 2:
            init_pos.z += distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos2 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos2 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos2 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos2)
                island_config(conf_ol_land,ipos2,land_protect_range,conf_member,pos2);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 3:
            init_pos.z -= distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos3 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos3 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos3 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos3)
                island_config(conf_ol_land,ipos3,land_protect_range,conf_member,pos3);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 4:
            init_pos.z -= distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos4 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos4 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos4 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos4)
                island_config(conf_ol_land,ipos4,land_protect_range,conf_member,pos4);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 5:
            init_pos.x += distance;
            init_pos.z -= distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos5 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos5 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos5 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos5)
                island_config(conf_ol_land,ipos5,land_protect_range,conf_member,pos5);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 6:
            init_pos.x -= distance;
            init_pos.z += distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos6 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos6 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos6 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos6)
                island_config(conf_ol_land,ipos6,land_protect_range,conf_member,pos6);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
        case 7:
            init_pos.x -= distance;
            init_pos.z -= distance;
            mc.runcmd("structure load " + filename + " " + init_pos.x + " " + init_pos.y + " " + init_pos.z + " 0_degrees none true true true");
            pl.tell("§a已成功为你初始化岛屿，请等待2秒");
            const tp_pos7 = new IntPos(init_pos.x + 4, init_pos.y + 5, init_pos.z + 2, 0);
            const ipos7 = {
                x:init_pos.x + 4,
                y:init_pos.y + 5,
                z:init_pos.z + 2,
                dimid: 0
            }
            const pos7 = {
                x:init_pos.x,
                y:init_pos.y,
                z:init_pos.z,
                dimid: 0
            }
            setTimeout(() => {
                pl.teleport(tp_pos7)
                island_config(conf_ol_land,ipos7,land_protect_range,conf_member,pos7);
                player_init(pl);
                pl.setTitle("§a岛屿已成功创建");
                conf_landdata.set("total", total + 1);
            }, 2000);
            break;
    }

    function island_config(island_conf,ipos,irange,conf_member,pos){
        const maxinvite_conf = new JsonConfigFile("./plugins/Lskyblock/config.json");
        const maxinvite = maxinvite_conf.get("MaxInvitePlayer");
        const member = [];
        const permissions = {
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
        const share_permissions = {
            BREAK_BLOCK: true,
            PLACE_BLOCK: true,
            DROP_ITEM: true,
            TAKE_ITEM: true,
            ATTACK_PLAYER: true,
            ATTACK_ENTITY: true,
            OPEN_CRAFTING_TABLE: true,
            OPEN_FURNACE: true,
            OPEN_BLAST_FURNACE: true,
            OPEN_SMOKER: true,
            OPEN_BREWING_STAND: true,
            OPEN_ANVIL: true,
            OPEN_ENCHANTING_TABLE: true,
            OPEN_BARREL: true,
            OPEN_CHEST: true,
            OPEN_STONECUTTER_BLOCK: true,
            OPEN_DISPENSER: true,
            OPEN_DROPPER: true,
            OPEN_HOPPER: true,
            OPEN_BEACON: true,
            USE_FLINE_AND_STEEL: true,
            USE_BUCKET: true,
            USE_FRAME: true,
        }
        island_conf.init("island_pos",pos);
        island_conf.init("home_pos",ipos);
        island_conf.init("island_range",irange);
        island_conf.init("MaxInvitePlayer",maxinvite);
        island_conf.init("permissions",permissions);
        island_conf.init("share_permissions",share_permissions);
        conf_member.set("member",member);
    }
}

function create_init() {
    const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/data.json");
    conf.init("total", 8);
}

function player_init(pl){
    const conf = new JsonConfigFile("./plugins/Lskyblock/players/"+pl.name+".json");
    conf.set("Owning_land",pl.name);
    conf.set("right","master");
}

module.exports = { create, create_init };