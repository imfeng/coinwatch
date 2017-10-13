import { BrowserWindow, Tray as TrayElectron, ipcMain } from 'electron';
import path from 'path';
import { map } from 'lodash';
import TrayMenu from './TrayMenu';

class Tray {
  tray = null;
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.init();
  }

  init() {
    this.tray = new TrayElectron(path.join(__dirname, '..', 'appIcon.png'));

    const trayMenu = new TrayMenu(this);
    this.tray.setContextMenu(trayMenu.getMenu());
    this.registerHandlers();
  }

  toggleWindow() {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
      return;
    }

    this.mainWindow.show();
  }

  registerHandlers() {
    this.tray.on('click', this.toggleWindow);
    this.tray.on('double-click', this.toggleWindow);
    this.tray.on('right-click', this.toggleWindow);

    ipcMain.on('tray-update', this.onTrayUpdate.bind(this));
  }

  onTrayUpdate(event, prices) {
    console.log('IPCMAINUPDATE', prices);

    const trayDisplay = map(prices, (price, coinName) => {
      return `${coinName}: $${price.USD}`;
    });

    this.tray.setTitle(trayDisplay.join(' | '));
  }
}

export default Tray;
