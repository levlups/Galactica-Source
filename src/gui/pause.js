import { createSettingsWindow } from './menu/settings'

var menuScreen = null

export function setupPause(noa) {
	menuScreen = document.createElement('div') // Background
	menuScreen.id = 'menu_pause'//
	menuScreen.style.display = 'none'
	//menuOptions.classList.add('pausescreen')
	
	


	var menuContainer = document.createElement('div') // Container
	menuContainer.id = 'menu_container_pause'
	menuContainer.classList.add('pausescreen')

	menuScreen.appendChild(menuContainer)
	

	var settingsWindow = createSettingsWindow(noa) // Creates and sets settingsWindow
	settingsWindow.style.display = 'none'
	menuScreen.appendChild(settingsWindow)

	// Menu options
    
	var menuOptions = document.createElement('ul')
	menuOptions.id = 'menu_options'
	menuOptions.classList.add('menu_list')

/////button quit to menu
var connectButton = document.createElement('button')
	connectButton.id = 'button'
	connectButton.classList.add('button')
	
	connectButton.innerHTML = 'Quit to Menu'
	
	menuOptions.appendChild(connectButton)
	connectButton.onclick = function() { 
		location.reload()
	}
	
	///
	
	
	/////button backtogame
var backButton = document.createElement('button')
	backButton.id = 'button'
	backButton.classList.add('button')
	
	backButton.innerHTML = 'Back to Game'
	
	menuOptions.appendChild(backButton)
	backButton.onclick = function() { 
		menuScreen.style.display = 'none'
		noa.container.canvas.requestPointerLock()
	}
	
	///
	
	/////button backsettings
var setButton = document.createElement('button')
	setButton.id = 'button'
	setButton.classList.add('button')
	
	setButton.innerHTML = 'Settings'
	
	menuOptions.appendChild(setButton)
	setButton.onclick = function() { settingsWindow.style.display = 'initial'}
	menuOptions.appendChild(setButton)
	
	///
	
	/*var playOption = document.createElement('li')
	playOption.innerHTML = 'Back to game'
	playOption.onclick = function() { 
		menuScreen.style.display = 'none'
		noa.container.canvas.requestPointerLock()
	}
	menuOptions.appendChild(playOption)*/

	var settingsOption = document.createElement('li')
	

	/*var discordOption = document.createElement('li')
	discordOption.innerHTML = 'Official discord'
	discordOption.onclick = function() { window.open('https://discord.com/invite/K9PdsDh', '_blank') }
	menuOptions.appendChild(discordOption)*/

	var leaveOption = document.createElement('li')
	settingsOption.appendChild(setButton)
	leaveOption.appendChild(connectButton)
	
		menuOptions.appendChild(settingsOption)
	menuOptions.appendChild(leaveOption)

	menuContainer.appendChild(menuOptions)

	document.body.appendChild(menuScreen)
}
