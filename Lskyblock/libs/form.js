// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 

const INIT = require("./initisland.js");
const CREATE = require("./create.js");
const HOME = require("./spawnpoint.js");
const INVITE = require("./invite.js");
const SHARE = require("./share.js");

//表单系统

/* 检测是否有岛屿 */
function is_land(pl) {
    const pl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    if (pl_conf.get("Owning_land") == "none") {
        return true;
    }
    else {
        return false;
    }
}
/* 检测是否有岛屿 */

/* 查询岛主 */
function search_master(pl) {
    const pl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    const pl_own = pl_conf.get("Owning_land");
    return pl_own
}
/* 查询岛主 */

/* 岛屿总表单 */
function form(pl) {
    const conf_init = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
    const right_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    const right = right_conf.get("right");
    if (Number(conf_init.get("status")) == 0) {
        init(pl);
    }
    else if (Number(conf_init.get("status")) == 1) {
        if (!is_land(pl)) {
            if (right == "master") {
                bd(pl);
            }
            else {
                pl_bd(pl);
            }
        }
        else {
            create(pl);
        }
    }
}
/* 岛屿总表单 */

/* 岛屿初始化表单 */
function init(pl) {
    const structures = File.getFilesList("./plugins/Lskyblock/structures/");
    const fm = mc.newCustomForm();
    fm.setTitle("空岛初始化");
    fm.addDropdown("选择空岛模版", structures);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            const filename = structures[data[0]].split('.')[0];
            INIT.initisland(player, filename);
            INIT.init_config();
        }
    })
}
/* 岛屿初始化表单 */

/* 岛屿创建表单 */
function create(pl) {
    const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const module = conf.get("module");
    let structures = [];
    for (let i in module) {
        structures.push(String(i));
    }
    const fm = mc.newCustomForm();
    fm.setTitle("空岛创建");
    fm.addDropdown("选择空岛模版", structures);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            create_form(player, structures[data[0]], module);
        }
    })
}
/* 岛屿创建表单 */

/* 岛屿创建表单2 */
function create_form(pl, name, module) {
    const fm = mc.newSimpleForm();
    fm.setTitle(name);
    fm.setContent("请确认是否创建该空岛\n介绍：   " + module[name].introduce + "\n花费：   " + module[name].Money + "   金币");
    fm.addButton("是");
    fm.addButton("否");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                if (pl.reduceMoney(Number(module[name].Money))) {
                    const filename = module[name].file.split('.')[0];
                    CREATE.create(pl, filename);
                }
                else {
                    pl.tell("§4你没有足够的金币");
                }
            }
        }
    }
    )
}
/* 岛屿创建表单2 */

/* 传送系统 */
function tp(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿传送系统");
    fm.addButton("重生点设置", "textures/blocks/respawn_anchor_side3.png");
    fm.addButton("公共岛屿","textures/items/gold_horse_armor.png");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                HOME.sethome(search_master(player), player);
            }
            else if(data == 1){
                public_tp(player);
            }
        }
    })
}
/* 传送系统 */

/* 公共岛屿传送 */
function public_tp(pl){
    const public_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/public.json");
    const public_land = public_conf.get("public_land");
    const fm = mc.newCustomForm();
    fm.setTitle("公共岛屿传送");
    fm.addDropdown("选择要传送的岛屿",Object.keys(public_land));
    pl.sendForm(fm,(player,data)=>{
        if(data != undefined){
            let pos = public_land[Object.keys(public_land)[data[0]]];
            player.teleport(pos.x,pos.y,pos.z,pos.dimid);
            player.tell("§a已将你传送至公共空岛");
        }
    })
}
/* 公共岛屿传送 */

/* 岛屿管理表单 */
function manage(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿管理");
    fm.addButton("删除岛屿", "textures/blocks/tnt_side.png");
    fm.addButton("权限设置", "textures/blocks/ladder.png");
    fm.addButton("共享设置", "textures/items/paper.png");
    fm.addButton("公共设置", "textures/items/hopper.png");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                delete_form(player);
            }
            else if (data == 1) {
                per_setting(player);
            }
            else if (data == 2) {
                share_setting(player);
            }
            else if (data == 3) {
                public(player);
            }
        }
    })
}
/* 岛屿管理表单 */

/* 共享权限设置 */
function share_setting(pl) {
    const per_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/land.json");
    const per = per_conf.get("share_permissions");
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿权限设置");
    fm.addSwitch("破坏方块", per.BREAK_BLOCK);
    fm.addSwitch("放置方块", per.PLACE_BLOCK);
    fm.addSwitch("丢弃物品", per.DROP_ITEM);
    fm.addSwitch("拾取物品", per.TAKE_ITEM);
    fm.addSwitch("攻击玩家", per.ATTACK_PLAYER);
    fm.addSwitch("攻击生物", per.ATTACK_ENTITY);
    fm.addSwitch("工作台交互", per.OPEN_CRAFTING_TABLE);
    fm.addSwitch("熔炉交互", per.OPEN_FURNACE);
    fm.addSwitch("高炉交互", per.OPEN_BLAST_FURNACE);
    fm.addSwitch("烟熏炉交互", per.OPEN_SMOKER);
    fm.addSwitch("酿造台交互", per.OPEN_BREWING_STAND);
    fm.addSwitch("铁砧交互", per.OPEN_ANVIL);
    fm.addSwitch("附魔台交互", per.OPEN_ENCHANTING_TABLE);
    fm.addSwitch("木桶交互", per.OPEN_BARREL);
    fm.addSwitch("箱子交互", per.OPEN_CHEST);
    fm.addSwitch("切石机交互", per.OPEN_STONECUTTER_BLOCK);
    fm.addSwitch("发射器交互", per.OPEN_DISPENSER);
    fm.addSwitch("投掷器交互", per.OPEN_DROPPER);
    fm.addSwitch("漏斗交互", per.OPEN_HOPPER);
    fm.addSwitch("信标交互", per.OPEN_BEACON);
    fm.addSwitch("使用打火石", per.USE_FLINE_AND_STEEL);
    fm.addSwitch("使用桶", per.USE_BUCKET);
    fm.addSwitch("展示框交互", per.USE_FRAME);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            per.BREAK_BLOCK = data[0];
            per.PLACE_BLOCK = data[1];
            per.DROP_ITEM = data[2];
            per.TAKE_ITEM = data[3];
            per.ATTACK_PLAYER = data[4];
            per.ATTACK_ENTITY = data[5];
            per.OPEN_CRAFTING_TABLE = data[6];
            per.OPEN_FURNACE = data[7];
            per.OPEN_BLAST_FURNACE = data[8];
            per.OPEN_SMOKER = data[9];
            per.OPEN_BREWING_STAND = data[10];
            per.OPEN_ANVIL = data[11];
            per.OPEN_ENCHANTING_TABLE = data[12];
            per.OPEN_BARREL = data[13];
            per.OPEN_CHEST = data[14];
            per.OPEN_STONECUTTER_BLOCK = data[15];
            per.OPEN_DISPENSER = data[16];
            per.OPEN_DROPPER = data[17];
            per.OPEN_HOPPER = data[18];
            per.OPEN_BEACON = data[19];
            per.USE_FLINE_AND_STEEL = data[20];
            per.USE_BUCKET = data[21];
            per.USE_FRAME = data[22];
            per_conf.set("permissions", per);
            pl.tell("§a已成功设置权限");
        }
    })
}
/* 共享权限设置 */

/* 岛屿删除 */
function delete_form(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿删除");
    fm.setContent("是否确认删除岛屿");
    fm.addButton("是");
    fm.addButton("否");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                del(player);
            }
        }
    })
}
/* 岛屿删除 */

/* 岛屿权限设置 */
function per_setting(pl) {
    const per_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/land.json");
    const per = per_conf.get("permissions");
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿权限设置");
    fm.addSwitch("破坏方块", per.BREAK_BLOCK);
    fm.addSwitch("放置方块", per.PLACE_BLOCK);
    fm.addSwitch("丢弃物品", per.DROP_ITEM);
    fm.addSwitch("拾取物品", per.TAKE_ITEM);
    fm.addSwitch("攻击玩家", per.ATTACK_PLAYER);
    fm.addSwitch("攻击生物", per.ATTACK_ENTITY);
    fm.addSwitch("工作台交互", per.OPEN_CRAFTING_TABLE);
    fm.addSwitch("熔炉交互", per.OPEN_FURNACE);
    fm.addSwitch("高炉交互", per.OPEN_BLAST_FURNACE);
    fm.addSwitch("烟熏炉交互", per.OPEN_SMOKER);
    fm.addSwitch("酿造台交互", per.OPEN_BREWING_STAND);
    fm.addSwitch("铁砧交互", per.OPEN_ANVIL);
    fm.addSwitch("附魔台交互", per.OPEN_ENCHANTING_TABLE);
    fm.addSwitch("木桶交互", per.OPEN_BARREL);
    fm.addSwitch("箱子交互", per.OPEN_CHEST);
    fm.addSwitch("切石机交互", per.OPEN_STONECUTTER_BLOCK);
    fm.addSwitch("发射器交互", per.OPEN_DISPENSER);
    fm.addSwitch("投掷器交互", per.OPEN_DROPPER);
    fm.addSwitch("漏斗交互", per.OPEN_HOPPER);
    fm.addSwitch("信标交互", per.OPEN_BEACON);
    fm.addSwitch("使用打火石", per.USE_FLINE_AND_STEEL);
    fm.addSwitch("使用桶", per.USE_BUCKET);
    fm.addSwitch("展示框交互", per.USE_FRAME);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            per.BREAK_BLOCK = data[0];
            per.PLACE_BLOCK = data[1];
            per.DROP_ITEM = data[2];
            per.TAKE_ITEM = data[3];
            per.ATTACK_PLAYER = data[4];
            per.ATTACK_ENTITY = data[5];
            per.OPEN_CRAFTING_TABLE = data[6];
            per.OPEN_FURNACE = data[7];
            per.OPEN_BLAST_FURNACE = data[8];
            per.OPEN_SMOKER = data[9];
            per.OPEN_BREWING_STAND = data[10];
            per.OPEN_ANVIL = data[11];
            per.OPEN_ENCHANTING_TABLE = data[12];
            per.OPEN_BARREL = data[13];
            per.OPEN_CHEST = data[14];
            per.OPEN_STONECUTTER_BLOCK = data[15];
            per.OPEN_DISPENSER = data[16];
            per.OPEN_DROPPER = data[17];
            per.OPEN_HOPPER = data[18];
            per.OPEN_BEACON = data[19];
            per.USE_FLINE_AND_STEEL = data[20];
            per.USE_BUCKET = data[21];
            per.USE_FRAME = data[22];
            per_conf.set("permissions", per);
            pl.tell("§a已成功设置权限");
        }
    })
}
/* 岛屿权限设置 */

/* 岛屿模版设置 */
function create_setting(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("创建岛屿模版设置");
    fm.addButton("添加模版");
    fm.addButton("删除模版");
    fm.addButton("管理模版");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                addModule(player);
            }
            else if (data == 1) {
                module_delete(player);
            }
            else if (data == 2) {
                module_manage(player);
            }
        }
    })
}
/* 岛屿模版设置 */

/* 岛屿模版添加 */
function addModule(pl) {
    const structures = File.getFilesList("./plugins/Lskyblock/structures/");
    const fm = mc.newCustomForm();
    const module_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const module = module_conf.get("module");
    fm.setTitle("岛屿模版添加");
    fm.addLabel("请选择一个模版");
    fm.addDropdown("选择空岛模版", structures);
    fm.addInput("请输入该模版显示的名称", "模版名称");
    fm.addInput("请输入模版介绍", "模版介绍");
    fm.addInput("请输入创建所需的钱数", "输入0则不需要金钱");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data[2] != "" && data[3] != "" && data[4] != "") {
                if (isPositiveNumber(data[4])) {
                    const name = data[2];
                    const land_module = structures[data[1]];
                    const intro = data[3];
                    const money = Number(data[4])
                    module[name] = {
                        file: land_module,
                        introduce: intro,
                        Money: money,
                    }
                    module_conf.set("module", module);
                    player.tell("§a已成功添加岛屿模版");
                }
                else {
                    player.tell("§4请输入一个正数");
                }
            }
            else {
                player.tell("§4内容不能为空")
            }
        }
    })
}
/* 岛屿模版添加 */

/* 岛屿模版删除 */
function module_delete(pl) {
    const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const module = conf.get("module");
    let structures = [];
    for (let i in module) {
        structures.push(String(i));
    }
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿模版删除");
    fm.addDropdown("选择空岛模版", structures);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            delete module[structures[data[0]]];
            conf.set("module", module);
            player.tell("§a已成功删除岛屿模版");
        }
    })
}
/* 岛屿模版删除 */

/* 岛屿模版管理 */
function module_manage(pl) {
    const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const module = conf.get("module");
    let structures = [];
    for (let i in module) {
        structures.push(String(i));
    }
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿模版管理");
    fm.addDropdown("选择空岛模版", structures);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            module_setting(player, structures[data[0]]);
        }
    })
}
/* 岛屿模版管理 */

/* 岛屿模版设置 */
function module_setting(pl, name) {
    const conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/create.json");
    const module = conf.get("module");
    const structures = File.getFilesList("./plugins/Lskyblock/structures/");
    const show = structures.indexOf(module[name].file);
    const fm = mc.newCustomForm();
    fm.setTitle(name + "管理");
    fm.addDropdown("模版文件", structures, show);
    fm.addInput("模版介绍", "输入模版介绍", module[name].introduce);
    fm.addInput("所需金钱", "请输入正数(0为不需要)", String(module[name].Money));
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data[2] != "" && data[1] != "" && isPositiveNumber(data[2])) {
                module[name].file = structures[data[0]];
                module[name].introduce = data[1];
                module[name].Money = Number(data[2]);
                conf.set("module", module);
                player.tell("§a已成功修改模版");
            }
        }
    })
}
/* 岛屿模版设置 */


/* 岛主岛屿表单 */
function bd(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛主空岛菜单");
    fm.addButton("返回岛屿", "textures/blocks/grass_side_carried.png");
    fm.addButton("传送系统", "textures/blocks/beacon.png");
    fm.addButton("岛屿管理", "textures/items/name_tag.png");
    fm.addButton("成员管理", "textures/items/totem.png");
    fm.addButton("转让岛屿", "textures/items/lead.png");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                pl.runcmd("is home");
            }
            else if (data == 1) {
                tp(player);
            }
            else if (data == 2) {
                manage(player);
            }
            else if (data == 3) {
                member(player);
            }
            else if (data == 4) {
                give(player);
            }
        }
    })
}
/* 岛主岛屿表单 */

/* 成员岛屿菜单 */
function pl_bd(pl) {
    const pl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    const pl_own = pl_conf.get("Owning_land");
    const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl_own + "/invite/" + pl.name + ".json");
    const tp_manage = member_conf.get("tp");
    const member_manage = member_conf.get("member_manage");
    const fm = mc.newSimpleForm();
    fm.setTitle("成员空岛菜单");
    fm.addButton("返回岛屿", "textures/blocks/grass_side_carried.png");
    if (tp_manage) {
        fm.addButton("传送系统", "textures/blocks/beacon.png");
    }
    if (member_manage) {
        fm.addButton("成员管理", "textures/items/totem.png");
    }
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                pl.runcmd("is home");
            }
            if (tp_manage) {
                if (data == 1) {
                    tp(player);
                }
                if (data == 2) {
                    member(player);
                }
            }
            else {
                if (data == 1) {
                    member(player);
                }
            }
        }
    })
}
/* 成员岛屿菜单 */

/* 岛屿成员表单 */
function member(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿成员");
    fm.addButton("岛屿成员管理");
    fm.addButton("共享成员管理");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                land_member(player);
            }
            else if (data == 1) {
                share_member(player);
            }
        }
    })
}
/* 岛屿成员表单 */

/* 邀请成员管理表单 */
function land_member(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿成员管理");
    fm.addButton("邀请成员");
    fm.addButton("删除成员");
    fm.addButton("管理成员");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                add_invite_member(search_master(player), player);
            }
            else if (data == 1) {
                del_invite_member(search_master(player), player);
            }
            else if (data == 2) {
                man_invite_member(search_master(player), player);
            }
        }
    })
}
/* 邀请成员管理表单 */

/* 添加岛屿成员 */
function add_invite_member(pl, mpl) {
    const land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/land.json");
    let max = land_conf.get("MaxInvitePlayer");
    const in_pls_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/member.json");
    const in_pls = in_pls_conf.get("member");
    const players = mc.getOnlinePlayers();
    let players_name = players.map((ele) => { return ele.name; });
    players_name = players_name.filter(ele => ele != pl);
    const fm = mc.newCustomForm();
    fm.setTitle("添加岛屿成员");
    fm.addDropdown("玩家列表", players_name);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            const ivt_pl = players_name[data[0]];
            const ivt_pl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + ivt_pl + ".json");
            const own_ivt = ivt_pl_conf.get("Owning_land");
            if (!(in_pls.length > max)) {
                if (own_ivt == "none") {
                    accept(pl, mc.getPlayer(ivt_pl), mpl);
                }
                else {
                    mpl.tell("§4该玩家已经拥有岛屿了");
                }
            }
            else {
                mpl.tell("§4岛屿成员已达上限");
            }
        }
    })
}
/* 添加岛屿成员 */

/* 成员接受界面 */
function accept(pl, ipl, mpl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("岛屿邀请");
    fm.setContent("岛主" + pl + "邀请你加入他的岛屿\n\n你是否接受");
    fm.addButton("是");
    fm.addButton("否");
    ipl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                INVITE.invite(pl, player, mpl);
            }
            else if (data == 1) {
                pl.tell("§4该玩家已拒绝你的邀请");
            }
        }
        else {
            pl.tell("§4该玩家已拒绝你的邀请");
        }
    })
}
/* 成员接受界面 */

/* 删除岛屿成员 */
function del_invite_member(pl, mpl) {
    const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/member.json");
    let member = member_conf.get("member");
    const fm = mc.newCustomForm();
    fm.setTitle("移除岛屿成员");
    fm.addDropdown("成员列表", member);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            const delpl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + member[data[0]] + ".json");
            member = member.filter(item => item !== member[data[0]]);
            member_conf.set("member", member);
            delpl_conf.set("Owning_land", "none");
            delpl_conf.set("right", "none");
            player.tell("§a已成功移除该玩家");
        }
    })
}
/* 删除岛屿成员 */

/* 管理岛屿成员 */
function man_invite_member(pl, mpl) {
    const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/member.json");
    let member = member_conf.get("member");
    const fm = mc.newCustomForm();
    fm.setTitle("管理岛屿成员");
    fm.addDropdown("选择岛屿成员", member);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            const cpl = mc.getPlayer(member[data[0]]);
            man_member(pl, cpl, mpl);
        }
    })
}
/* 管理岛屿成员 */

/* 管理成员界面 */
function man_member(pl, cpl, mpl) {
    const invite_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/invite/" + cpl.name + ".json");
    const tp = invite_conf.get("tp");
    const land_manage = invite_conf.get("land_manage");
    const member_manage = invite_conf.get("member_manage");
    const fm = mc.newCustomForm();
    fm.setTitle("管理岛屿成员");
    fm.addSwitch("传送系统开关", Boolean(tp));
    fm.addSwitch("成员管理开关", Boolean(member_manage));
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            invite_conf.set("tp", data[0]);
            invite_conf.set("member_manage", data[1]);
            player.tell("§a你已经成功设置！");
        }
    })
}
/* 管理成员界面 */

/* 共享成员表单 */
function share_member(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("共享成员界面");
    fm.addButton("添加共享成员");
    fm.addButton("删除共享成员");
    fm.addButton("管理共享成员");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                add_share_member(search_master(player), player);
            }
            else if (data == 1) {
                del_share_member(search_master(player), player);
            }
            else if (data == 2) {
                man_share_member(search_master(player), player);
            }
        }
    })
}
/* 共享成员表单 */

/* 添加共享成员 */
function add_share_member(pl, mpl) {
    const players = mc.getOnlinePlayers();
    let players_name = players.map((ele) => { return ele.name; });
    players_name = players_name.filter(ele => ele != pl);
    const fm = mc.newCustomForm();
    fm.setTitle("添加共享成员");
    fm.addDropdown("选择玩家", players_name);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            SHARE.share(pl, mc.getPlayer(players_name[data[0]]), mpl);
        }
    })
}
/* 添加共享成员 */

/* 删除共享成员 */
function del_share_member(pl, mpl) {
    const share_member = File.getFilesList("./plugins/Lskyblock/dataBase/island/" + pl + "/share/");
    let sharename = share_member.map((ele) => { return ele.replace(".json", "") });
    const fm = mc.newCustomForm();
    fm.setTitle("删除共享成员");
    fm.addDropdown("选择共享成员", sharename);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            SHARE.remove(pl, mc.getPlayer(sharename[data[0]]), mpl);
        }
    })
}
/* 删除共享成员 */

/* 管理共享成员 */
function man_share_member(pl, mpl) {
    const share_member = File.getFilesList("./plugins/Lskyblock/dataBase/island/" + pl + "/share/");
    let sharename = share_member.map((ele) => { return ele.replace(".json", "") });
    const fm = mc.newCustomForm();
    fm.setTitle("管理共享成员");
    fm.addDropdown("选择共享成员", sharename);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            manage_share(pl, mc.getPlayer(sharename[data[0]]), mpl);
        }
    })
}
/* 管理共享成员 */

/* 共享成员管理界面 */
function manage_share(pl, spl, mpl) {
    const share_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl + "/share/" + spl.name + ".json");
    let per = share_conf.get("permissions");
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿权限设置");
    fm.addSwitch("破坏方块", per.BREAK_BLOCK);
    fm.addSwitch("放置方块", per.PLACE_BLOCK);
    fm.addSwitch("丢弃物品", per.DROP_ITEM);
    fm.addSwitch("拾取物品", per.TAKE_ITEM);
    fm.addSwitch("攻击玩家", per.ATTACK_PLAYER);
    fm.addSwitch("攻击生物", per.ATTACK_ENTITY);
    fm.addSwitch("工作台交互", per.OPEN_CRAFTING_TABLE);
    fm.addSwitch("熔炉交互", per.OPEN_FURNACE);
    fm.addSwitch("高炉交互", per.OPEN_BLAST_FURNACE);
    fm.addSwitch("烟熏炉交互", per.OPEN_SMOKER);
    fm.addSwitch("酿造台交互", per.OPEN_BREWING_STAND);
    fm.addSwitch("铁砧交互", per.OPEN_ANVIL);
    fm.addSwitch("附魔台交互", per.OPEN_ENCHANTING_TABLE);
    fm.addSwitch("木桶交互", per.OPEN_BARREL);
    fm.addSwitch("箱子交互", per.OPEN_CHEST);
    fm.addSwitch("切石机交互", per.OPEN_STONECUTTER_BLOCK);
    fm.addSwitch("发射器交互", per.OPEN_DISPENSER);
    fm.addSwitch("投掷器交互", per.OPEN_DROPPER);
    fm.addSwitch("漏斗交互", per.OPEN_HOPPER);
    fm.addSwitch("信标交互", per.OPEN_BEACON);
    fm.addSwitch("使用打火石", per.USE_FLINE_AND_STEEL);
    fm.addSwitch("使用桶", per.USE_BUCKET);
    fm.addSwitch("展示框交互", per.USE_FRAME);
    mpl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            per.BREAK_BLOCK = data[0];
            per.PLACE_BLOCK = data[1];
            per.DROP_ITEM = data[2];
            per.TAKE_ITEM = data[3];
            per.ATTACK_PLAYER = data[4];
            per.ATTACK_ENTITY = data[5];
            per.OPEN_CRAFTING_TABLE = data[6];
            per.OPEN_FURNACE = data[7];
            per.OPEN_BLAST_FURNACE = data[8];
            per.OPEN_SMOKER = data[9];
            per.OPEN_BREWING_STAND = data[10];
            per.OPEN_ANVIL = data[11];
            per.OPEN_ENCHANTING_TABLE = data[12];
            per.OPEN_BARREL = data[13];
            per.OPEN_CHEST = data[14];
            per.OPEN_STONECUTTER_BLOCK = data[15];
            per.OPEN_DISPENSER = data[16];
            per.OPEN_DROPPER = data[17];
            per.OPEN_HOPPER = data[18];
            per.OPEN_BEACON = data[19];
            per.USE_FLINE_AND_STEEL = data[20];
            per.USE_BUCKET = data[21];
            per.USE_FRAME = data[22];
            share_conf.set("permissions", per);
            mpl.tell("§a已成功设置权限");
        }
    })
}
/* 共享成员管理界面 */

/* 转让岛屿 */
function give(pl) {
    const member_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + pl.name + "/member.json");
    const member = member_conf.get("member");
    const fm = mc.newCustomForm();
    fm.setTitle("转让岛屿");
    fm.addDropdown("选择成员", member);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            shure_give(player, member[data[0]]);
        }
    })
}
/* 转让岛屿 */

/* 转让岛屿确认界面 */
function shure_give(pl, gpl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("确认界面");
    fm.setContent("是否转让岛屿给该玩家");
    fm.addButton("是");
    fm.addButton("否");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            let File1 = File.createDir("./plugins/Lskyblock/dataBase/island/" + pl.name + "/");
            const master_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
            const member_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + gpl.name + ".json");
            master_conf.set("right", "member");
            member_conf.set("right", "master");
            File1.rename(gpl.name);
            player.tell("§a已成功转让");
        }
    })
}
/* 转让岛屿确认界面 */

/* 公共岛屿 */
function public(pl) {
    let a = false;
    const public_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/public.json");
    let public_land = public_conf.get("public_land");
    for (let i in public_land) {
        if (pl.name == i) {
            a = true;
            break;
        }
    }
    if (a) {
        const fm = mc.newSimpleForm();
        fm.setTitle("删除公共传送点");
        fm.setContent("您的岛屿已是公共岛屿\n是否关闭公共可见");
        fm.addButton("是");
        fm.addButton("否")
        pl.sendForm(fm, (player, data) => {
            if (data != undefined) {
                if (data == 0) {
                    delete public_land[pl.name];
                    player.tell("§a已成功删除该公共岛屿");
                }
            }
        })
    }
    else {
        const fm = mc.newSimpleForm();
        fm.setTitle("添加公共传送点");
        fm.setContent("是否将岛屿添加至公共传送岛屿");
        fm.addButton("是");
        fm.addButton("否");
        pl.sendForm(fm, (player, data) => {
            if (data != undefined) {
                if (data == 0) {
                    const player_land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/island/" + player.name + "/land.json");
                    let pl_pos = player_land_conf.get("home_pos");
                    public_land[player.name] = pl_pos;
                    public_conf.set("public_land",public_land);
                    player.tell("§a已成功添加至公共岛屿!");
                }
            }
        })
    }
}
/* 公共岛屿 */

/* OP表单 */
function op_form(pl) {
    const fm = mc.newSimpleForm();
    fm.setTitle("OP管理表单");
    fm.addButton("创建设置");
    fm.addButton("权限设置");
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            if (data == 0) {
                create_setting(player);
            }
            else if (data == 1) {
                all_per_set(player);
            }
        }
    })
}
/* OP表单 */

/* 世界权限设置 */
function all_per_set(pl) {
    const per_conf = new JsonConfigFile("./plugins/Lskyblock/config.json");
    const per = per_conf.get("permissions");
    const fm = mc.newCustomForm();
    fm.setTitle("岛屿权限设置");
    fm.addSwitch("破坏方块", per.BREAK_BLOCK);
    fm.addSwitch("放置方块", per.PLACE_BLOCK);
    fm.addSwitch("丢弃物品", per.DROP_ITEM);
    fm.addSwitch("拾取物品", per.TAKE_ITEM);
    fm.addSwitch("攻击玩家", per.ATTACK_PLAYER);
    fm.addSwitch("攻击生物", per.ATTACK_ENTITY);
    fm.addSwitch("工作台交互", per.OPEN_CRAFTING_TABLE);
    fm.addSwitch("熔炉交互", per.OPEN_FURNACE);
    fm.addSwitch("高炉交互", per.OPEN_BLAST_FURNACE);
    fm.addSwitch("烟熏炉交互", per.OPEN_SMOKER);
    fm.addSwitch("酿造台交互", per.OPEN_BREWING_STAND);
    fm.addSwitch("铁砧交互", per.OPEN_ANVIL);
    fm.addSwitch("附魔台交互", per.OPEN_ENCHANTING_TABLE);
    fm.addSwitch("木桶交互", per.OPEN_BARREL);
    fm.addSwitch("箱子交互", per.OPEN_CHEST);
    fm.addSwitch("切石机交互", per.OPEN_STONECUTTER_BLOCK);
    fm.addSwitch("发射器交互", per.OPEN_DISPENSER);
    fm.addSwitch("投掷器交互", per.OPEN_DROPPER);
    fm.addSwitch("漏斗交互", per.OPEN_HOPPER);
    fm.addSwitch("信标交互", per.OPEN_BEACON);
    fm.addSwitch("使用打火石", per.USE_FLINE_AND_STEEL);
    fm.addSwitch("使用桶", per.USE_BUCKET);
    fm.addSwitch("展示框交互", per.USE_FRAME);
    pl.sendForm(fm, (player, data) => {
        if (data != undefined) {
            per.BREAK_BLOCK = data[0];
            per.PLACE_BLOCK = data[1];
            per.DROP_ITEM = data[2];
            per.TAKE_ITEM = data[3];
            per.ATTACK_PLAYER = data[4];
            per.ATTACK_ENTITY = data[5];
            per.OPEN_CRAFTING_TABLE = data[6];
            per.OPEN_FURNACE = data[7];
            per.OPEN_BLAST_FURNACE = data[8];
            per.OPEN_SMOKER = data[9];
            per.OPEN_BREWING_STAND = data[10];
            per.OPEN_ANVIL = data[11];
            per.OPEN_ENCHANTING_TABLE = data[12];
            per.OPEN_BARREL = data[13];
            per.OPEN_CHEST = data[14];
            per.OPEN_STONECUTTER_BLOCK = data[15];
            per.OPEN_DISPENSER = data[16];
            per.OPEN_DROPPER = data[17];
            per.OPEN_HOPPER = data[18];
            per.OPEN_BEACON = data[19];
            per.USE_FLINE_AND_STEEL = data[20];
            per.USE_BUCKET = data[21];
            per.USE_FRAME = data[22];
            per_conf.set("permissions", per);
            player.tell("§a已成功设置权限");
        }
    })
}
/* 世界权限设置 */

/* 删除岛屿函数 */
function del(pl) {
    const delpl_conf = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
    delpl_conf.set("Owning_land", "none");
    delpl_conf.set("right", "none");
    if (File.delete("./plugins/Lskyblock/dataBase/island/" + pl.name + "/")) {
        pl.tell("§a删除成功");
        const init_land_conf = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
        const pos = init_land_conf.get("pos");
        pl.teleport(pos.x + 4, pos.y + 5, pos.z + 2, pos.dimid);
    }
}
/* 删除岛屿函数 */

/* 检测字符串是否为正数 */
function isPositiveNumber(str) {
    const num = parseFloat(str);
    return !isNaN(num) && num >= 0;
}
/* 检测字符串是否为正数 */

module.exports = { form, op_form };