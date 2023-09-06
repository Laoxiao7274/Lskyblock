// LiteLoader-AIDS automatic generated
/// <reference path="d:\BDS_api/dts/llaids/src/index.d.ts"/> 
ll.require("LLMoney.dll");

const COMMAND = require("./Lskyblock/libs/command.js");
const CREATE = require("./Lskyblock/libs/create.js");
const SPAWNPOINT = require("./Lskyblock/libs/spawnpoint.js");
const PERMISSION = require("./Lskyblock/libs/permission.js");
const BORDER = require("./Lskyblock/libs/border.js");
const conf_init = new JsonConfigFile("./plugins/Lskyblock/dataBase/initland.json");
ll.registerPlugin(
    /* name */ "Lskyblock",
    /* introduction */ "一个为基岩服务的空岛插件",
    /* version */[0, 0, 1],
);
//插件注册

mc.listen("onServerStarted", () => {
    conf_init.init("status", 0);
    init_config();
    //总配置文件初始化
    CREATE.create_init();
    //创建空岛初始化
    COMMAND.init_iland();
    //初始岛屿命令
    init_player_config();
    //玩家配置文件初始化
    structure();
    //结构文件初始化
    SPAWNPOINT.spawn_pl();
    //死亡传送监听
    BORDER.Move();
});
//服务器启动准备

/* 命令注册 */



/* 命令注册 */

/* 配置文件初始化 */

function init_config() {
    const public = new JsonConfigFile("./plugins/Lskyblock/dataBase/public.json");
    const config = new JsonConfigFile("./plugins/Lskyblock/config.json");
    const initland = {
        pos: {
            x: 0,
            y: 20,
            z: 0,
            dimid: 0,
        }
    }
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
    public.init("public_land", {});
    config.init("land_range", 1000);
    config.init("land_protect_range", 200);
    config.init("MaxInvitePlayer", 3);
    config.init("INIT_LAND", initland);
    config.init("permissions", permissions);
}

function init_player_config() {
    mc.listen("onJoin", (pl) => {
        if (!File.exists("./plugins/Lskyblock/players/" + pl.name + ".json")) {
            const pl_config = new JsonConfigFile("./plugins/Lskyblock/players/" + pl.name + ".json");
            pl_config.init("right", "none");
            pl_config.init("Owning_land", "none");
        }
    })
}

/* 配置文件初始化 */

/* 结构文件初始化 */
function structure() {
    const _file = File.getFilesList("./plugins/Lskyblock/structures/");
    for (let i in _file) {
        if (!File.exists("./behavior_packs/vanilla/structures/" + _file[i])) {
            if (File.copy("./plugins/Lskyblock/structures/" + _file[i], "./behavior_packs/vanilla/structures")) {
                log("结构文件复制成功");
            }
        }
    }
}

/* 结构文件初始化 */

/* 权限事件监听 */
mc.listen("onDestroyBlock", (player, block) => {
    const yn = PERMISSION.derection(player, block.pos, "BREAK_BLOCK");
    if (!yn) {
        player.tell("§4你没有权限这么做")
        return false;
    }
    else { }
});

mc.listen("onPlaceBlock", (player, block) => {
    const yn = PERMISSION.derection(player, block.pos, "PLACE_BLOCK");
    if (!yn) {
        player.tell("§4你没有权限这么做")
        return false;
    }
    else { }
});

mc.listen("onDropItem", (player, item) => {
    const yn = PERMISSION.derection(player, player.blockPos, "DROP_ITEM");
    if (!yn) {
        player.tell("§4你没有权限这么做")
        return false;
    }
    else { }
});

mc.listen("onTakeItem", (player, entity, item) => {
    const yn = PERMISSION.derection(player, entity.blockPos, "TAKE_ITEM");
    if (!yn) {
        player.tell("§4你没有权限这么做")
        return false;
    }
    else { }
});

mc.listen("onAttackEntity", (player, entity, damage) => {
    if (entity.isPlayer()) {
        const yn = PERMISSION.derection(player, entity.blockPos, "ATTACK_PLAYER");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else {
        const yn = PERMISSION.derection(player, entity.blockPos, "ATTACK_ENTITY");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
});

mc.listen("onOpenContainer", (player, block) => {
    if (block.type == "minecraft:crafting_table") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_CRAFTING_TABLE");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:furnace") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_FURNACE");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:blast_furnace") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_BLAST_FURNACE");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:smoker") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_SMOKER");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:brewing_stand") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_BREWING_STAND");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:anvil") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_ANVIL");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:enchanting_table") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_ENCHANTING_TABLE");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:barrel") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_BARREL");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:chest") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_CHEST");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:stonecutter_block") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_STONECUTTER_BLOCK");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:dispenser") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_DISPENSER");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:dropper") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_DROPPER");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:hopper") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_HOPPER");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (block.type == "minecraft:beacon") {
        const yn = PERMISSION.derection(player, block.pos, "OPEN_BEACON");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
});

mc.listen("onUseItemOn", (player, item, block) => {
    if (item.type == "minecraft:flint_and_steel") {
        const yn = PERMISSION.derection(player, block.pos, "USE_FLINE_AND_STEEL");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }
    else if (item.type == "minecraft:bucket") {
        const yn = PERMISSION.derection(player, block.pos, "USE_BUCKET");
        if (!yn) {
            player.tell("§4你没有权限这么做")
            return false;
        }
        else { }
    }

});

mc.listen("onUseFrameBlock", (player, block) => {
    const yn = PERMISSION.derection(player, block.pos, "USE_FRAME");
    if (!yn) {
        player.tell("§4你没有权限这么做")
        return false;
    }
    else { }
})

/* 权限事件监听 */



