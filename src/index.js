import { isMobile } from 'mobile-device-detect'
///import { createSingleplayerWindow } from './gui/menu/singleplayer'
import { createMultiplayerWindow } from './gui/menu/multiplayer'
import { createSettingsWindow } from './gui/menu/settings'
import { createskinWindow } from './gui/menu/skin'
import { startGame } from './game'

//  Global informations

global.game = {
	name: 'Galactica Unbound',
	version: 'indev',
	allowCustom: true
}



// Default settings

if (localStorage.getItem('nickname') == undefined) localStorage.setItem('nickname', 'Player' + Math.round(Math.random() * 1000 ) )
if (localStorage.getItem('autostep') == undefined) localStorage.setItem('autostep', isMobile)
if (localStorage.getItem('gamepad') == undefined) localStorage.setItem('gamepad', false)
if (localStorage.getItem('singleplayer') == undefined) localStorage.setItem('singleplayer', false)
if (localStorage.getItem('allowcustom') == undefined) localStorage.setItem('allowcustom', true)
if (localStorage.getItem('mouse') == undefined) localStorage.setItem('mouse', (isMobile) ? 50 : 15)


game.allowCustom = (localStorage.getItem('allowcustom') == 'true')

// Default actions


const options = new URLSearchParams(window.location.search)

if (!!options.get('server')) { startGame(localStorage.getItem('nickname'), options.get('server'), null) }


// Main menu

var menuScreen = document.createElement('div') // Background
menuScreen.id = 'menu_screen'
menuScreen.style['background-image'] = 'url(gui/menu.jpg)'

var menuContainer = document.createElement('div') // Container
menuContainer.id = 'menu_container'

menuScreen.appendChild(menuContainer)


var menuLogo = document.createElement('img') // Logo
menuLogo.id = 'menu_logo'
menuLogo.src = 'gui/logo.png'
menuLogo.style.width = '70%'
menuLogo.style.height = '70%'
menuContainer.appendChild(menuLogo)

/*var p = document.createElement('a')
p.innerHTML="Loading..."
p.id='texter'
p.style.color = "blue";
menuContainer.appendChild(p)*/

/*var num=0
setInterval(function() {
	num++
		p.innerHTML="Loading goodies :"+num+"%"
			}, 100);*/
var multiplayerWindow = createMultiplayerWindow() // Creates and sets multiplayerWindow
multiplayerWindow.style.display = 'none'
menuScreen.appendChild(multiplayerWindow)

/*var singleplayerWindow = createSingleplayerWindow()
singleplayerWindow.style.display = 'none'
menuScreen.appendChild(singleplayerWindow)*/

var settingsWindow = createSettingsWindow() // Creates and sets settingsWindow
settingsWindow.style.display = 'none'
menuScreen.appendChild(settingsWindow)

// Menu options

var menuOptions = document.createElement('ul')
menuOptions.id = 'menu_options'
menuOptions.classList.add('menu_list')


var multiplayerOption = document.createElement('li')
var connectButton = document.createElement('button')
	connectButton.id = 'button'
	connectButton.classList.add('button')
	
	connectButton.innerHTML = 'Multiplayer'
	
	
	connectButton.onclick = function() { 
		multiplayerWindow.style.display = 'initial'
		}
		menuOptions.appendChild(multiplayerOption)
		multiplayerOption.appendChild(connectButton)
		
		
		
		var singleplayerOption = document.createElement('li')
		var singleButton = document.createElement('button')
	singleButton.id = 'button'
	singleButton.classList.add('button')
	
	singleButton.innerHTML = 'Singleplayer'
	
	menuOptions.appendChild(singleButton)
	singleButton.onclick = function() { 
		//singleplayerWindow.style.display = 'initial'
		var nick = localStorage.getItem('nickname')
		startGame(nick, 'localhost:3000', null)
		}
	singleplayerOption.appendChild(singleButton)
	menuOptions.appendChild(singleplayerOption)
	
	
	
	
	
	var settingsOption = document.createElement('li')
	var setButton = document.createElement('button')
	setButton.id = 'button'
	setButton.classList.add('button')
	
	setButton.innerHTML = 'Settings'
	
	
	setButton.onclick = function() { 
		settingsWindow.style.display = 'initial'
		}
		settingsOption.appendChild(setButton)
	menuOptions.appendChild(settingsOption)
	
	
	
	
	
	var githubOption = document.createElement('li')
	var gitButton = document.createElement('button')
	gitButton.id = 'button'
	gitButton.classList.add('button')
	
	gitButton.innerHTML = 'Github'
	
	gitButton.onclick = function() { 
		window.open('https://github.com/levlups/Galactica-Source', '_blank') 
		}
	githubOption.appendChild(gitButton)
	menuOptions.appendChild(githubOption)
	
	
	
	
	var discordOption = document.createElement('li')
	var discButton = document.createElement('button')
	discButton.id = 'button'
	discButton.classList.add('button')
	
	discButton.innerHTML = 'Official Discord'
	
	menuOptions.appendChild(discButton)
	discButton.onclick = function() { 
	 window.open('https://discord.gg/k6Tcbf4gck', '_blank')
		}
	menuOptions.appendChild(discordOption)
		discordOption.appendChild(discButton)
	
	
	
	
	var endOption = document.createElement('li')
	var endButton = document.createElement('button')
	endButton.id = 'button'
	endButton.classList.add('button')
	
	endButton.innerHTML = 'End Game'
	
	menuOptions.appendChild(endButton)
	endButton.onclick = function() { 
	 window.open('https://discord.gg/k6Tcbf4gck', '_blank')
		}
	endOptions.appendChild(endOption)
		endOption.appendChild(endButton)
	

/*var multiplayerOption = document.createElement('li')
multiplayerOption.innerHTML = 'Multiplayer'
multiplayerOption.onclick = function() { multiplayerWindow.style.display = 'initial'}
menuOptions.appendChild(multiplayerOption)*/

/*if (localStorage.getItem('singleplayer') == 'true') {
	var singleplayerOption = document.createElement('li')
	singleplayerOption.innerHTML = 'Singleplayer (Experimental)'
	singleplayerOption.onclick = function() { singleplayerWindow.style.display = 'initial'}
	menuOptions.appendChild(singleplayerOption)
//}*/

/*var settingsOption = document.createElement('li')
settingsOption.innerHTML = 'Settings'
settingsOption.onclick = function() { settingsWindow.style.display = 'initial'}
menuOptions.appendChild(settingsOption)*/

/*var githubOption = document.createElement('li')
githubOption.innerHTML = 'Github'
githubOption.onclick = function() { window.open('https://github.com/levlups/Galactica-Source', '_blank') }
menuOptions.appendChild(githubOption)*/

/*var discordOption = document.createElement('li')
discordOption.innerHTML = 'Official discord'
discordOption.onclick = function() { window.open('https://discord.gg/k6Tcbf4gck', '_blank') }
menuOptions.appendChild(discordOption)*/

menuContainer.appendChild(menuOptions)

// Version

var menuVersion = document.createElement('div')
menuVersion.id = 'menu_version'
menuVersion.innerHTML = game.name + ' ' + game.version

menuScreen.appendChild(menuVersion)


// Mobile css 

if (isMobile) {
	var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'mobile.css'
	document.head.appendChild(link)
	document.documentElement.addEventListener('click', function() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()
		}
	})
}


window.onload = function() { document.body.appendChild(menuScreen) }
