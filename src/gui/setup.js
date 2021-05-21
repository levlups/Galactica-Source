import { setupInfo, setupCross,setupTitle,setupBook } from './info'
import { setupHotbar, setupInventory,setupChest } from './inventory'
import { setupChatbox } from './chat'
import { setupHand } from './hand'
import { setupTab } from './tab'
import { setupSkybox, setupClouds } from './skybox'
import { isMobile } from 'mobile-device-detect'
import { setupMobile } from './mobile'
import { setupPause } from './pause'


export function setupGuis(noa, server, socket, dataPlayer, dataLogin) {
	setupInfo(noa, server, dataLogin)
	//setupCross()
	//setupTitle()
	setupBook()
	//setupHotbar(noa, socket)
	setupInventory(noa, socket)
	//setupChest(noa, socket)
	setupChatbox(noa)
	setupTab()
	/*setTimeout(function(){ 
	setupClouds(noa)
	}, 3000);*/

	setupPause(noa)
	//setupSkybox(noa)
	//setupHand(noa)

	if ( isMobile ) setupMobile(noa)
}