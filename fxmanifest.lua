fx_version  'cerulean'
game        'gta5'
lua54       'yes'

resource_type 'gametype' { name = 'Test MiniGame' }

client_scripts {
    'client/client.lua',
}

ui_page 'nui/nui.html'

files {
    'nui/nui.html',
    'nui/*.js',
    'nui/main.css',
}