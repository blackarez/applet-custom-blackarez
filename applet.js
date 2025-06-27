const Applet = imports.ui.applet;
const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const GLib = imports.gi.GLib;
const ByteArray = imports.byteArray;

const script1 = "./megaSinc.sh";
const script2 = "./xmodmap_toggle_media/toggle_xmodmap.sh";
const pathFileExists = "/tmp/xmodmap_media_on";
const readFileStatus = "/tmp/warp_status.txt";

let warpConnected = false;

const menuItemSwitchMedia = new PopupMenu.PopupSwitchMenuItem('Multimedia keyboard',
    true, {});
const menuItemSwitchWarp = new PopupMenu.PopupSwitchMenuItem('Cloudflare',
    false, {});

function MyApplet(metadata, orientation, panelHeight, instanceId) {
    this._init(metadata, orientation, panelHeight, instanceId);
}

// start - custom function
function createButtonIcon(iconName, iconStyle, buttonStyle, onClickCallback) {
    let icon = new St.Icon({
        icon_name: iconName,
        style_class: iconStyle
    });
    let button = new St.Button({
        child: icon,
        style_class: buttonStyle
    });
    button.connect('clicked', onClickCallback);
    return button;
}

function createButtonIconLabel(iconName, iconStyle, textLabel, buttonStyle, onClickCallback) {
    let containerButton = new St.BoxLayout({
        vertical: false,
        style_class: "container-button"
    });

    let icon = new St.Icon({
        icon_name: iconName,
        style_class: iconStyle
    });
    let label = new St.Label({ text: textLabel });
    containerButton.add(icon);
    containerButton.add(label);

    let button = new St.Button({
        child: containerButton,
        style_class: buttonStyle
    });

    button.connect('clicked', onClickCallback);
    return button;
}

function cloudflareChanceStatus() {
    let commandWarp = warpConnected ? "warp-cli disconnect" : "warp-cli connect";
    GLib.spawn_command_line_async(commandWarp);
    cloudflareStatus(true);
}

function cloudflareStatus(showStatus) {
    GLib.spawn_command_line_async("bash -c 'warp-cli status > /tmp/warp_status.txt && echo OK || echo ERR'");
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
        try {
            let statusFind = GLib.file_get_contents(readFileStatus)[1].toString();
            if (!statusFind) return;
            warpConnected = statusFind.includes("Connected");
            menuItemSwitchWarp.setToggleState(warpConnected);
            if (showStatus)
            Main.notify("Estado de Warp", statusFind);
        } catch (e) {
            global.logError(e);
        }
        return GLib.SOURCE_REMOVE;
    });
}

function groupButtonSync(menu) {
    let container = new St.BoxLayout({
        vertical: true,
        style_class: "container-menu"
    });

    let labelSync = new St.Label({ text: 'Sync my files' });
    container.add(labelSync);
    // button sync
    let botonSync = createButtonIconLabel(
        "state-sync",  // icon
        "icon-sync", // class icon
        " Sync", //label
        "button-sync", // class button
        () => {
            GLib.spawn_command_line_async(script1);
            menu.toggle();
        }
    );
    container.add(botonSync);
    return container;
}

function updateMediaButton() {
    let statusMedia = GLib.file_test(pathFileExists, GLib.FileTest.EXISTS)
    menuItemSwitchMedia.setToggleState(statusMedia);
}

function updateStatusSwitch() {
    updateMediaButton();
    cloudflareStatus(false);
}

// end - custom function

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function (metadata, orientation, panelHeight, instanceId) {
        Applet.IconApplet.prototype._init.call(this, orientation, panelHeight, instanceId);

        //icon and tooltip - applet menu bar
        this.set_applet_icon_name("org.gnome.Settings");
        this.set_applet_tooltip("Custom Applet");

        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);

        //Looking Glass - logs applets
        this.menu.addAction("Looking Glass", function (event) {
            Main.createLookingGlass().open();
        });
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        //media control
        menuItemSwitchMedia.connect('toggled', (item, state) => {
            GLib.spawn_command_line_async(script2);
        });
        this.menu.addMenuItem(menuItemSwitchMedia);
        
        // button Warp
        menuItemSwitchWarp.connect('toggled', (item, state) => {
            cloudflareChanceStatus();
        });
        this.menu.addMenuItem(menuItemSwitchWarp);

        // button sync
        let botonSync = groupButtonSync(this.menu)
        this.menu.box.add(botonSync);

    },

    // action click icon on menu bar
    on_applet_clicked: function () {
        // Main.notify("Notificación", "button toggle");
        this.menu.toggle();
        updateStatusSwitch();
    }
};

function main(metadata, orientation, panelHeight, instanceId) {
    return new MyApplet(metadata, orientation, panelHeight, instanceId);
}
