local display = false

RegisterCommand('mg_show', function()
    Citizen.CreateThread(function()
        TriggerEvent("mg:show", true)
    end)
end)

RegisterCommand('mg_hide', function()
    Citizen.CreateThread(function()
        TriggerEvent("mg:hide", true)
    end)
end)

RegisterNetEvent("mg:show")
AddEventHandler("mg:show", function(value)
    SendNUIMessage({
        type = "ui",
        display = true
    })
    SetNuiFocus(true, true)
end)

RegisterNetEvent("mg:hide")
AddEventHandler("mg:hide", function(value)
    SendNUIMessage({
        type = "ui",
        display = false
    })
    SetNuiFocus(false, false)
end)

RegisterNUICallback('endgame', function(data, cb)
    display = false
    SetNuiFocus(false, false)
    if data.win then
        showNotiftication('You have hacked the code.', 130, true, true)
    else
        showNotiftication('Hacking attemp failed. Police have been alerted.', 130, true, true)
    end
    cb({display = false})
end)

RegisterNUICallback('exitgame', function(data, cb)
    Citizen.CreateThread(function()
        TriggerEvent("mg:hide", true)
    end)
end)


function showNotiftication(message, color, flash, saveToBrief)
    BeginTextCommandThefeedPost('STRING')
    AddTextComponentSubstringPlayerName(message)
    ThefeedNextPostBackgroundColor(color)
    EndTextCommandThefeedPostTicker(flash, saveToBrief)
end