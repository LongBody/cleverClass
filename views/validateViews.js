view.setText = function(id, text) {
    document.getElementById(id).innerText = text
}
view.allPassed = function(validateResult) {
    for (let result of validateResult) {
        if (!result) {
            return false
        }
    }
    return true
}
view.validate = function(idErrorTag, validateInfos) {
    for (let i = 0; i < validateInfos.length; i += 2) {
        let condition = validateInfos[i]
        let message = validateInfos[i + 1]
        if (!condition) {
            view.setText(idErrorTag, message)
            return false
        }
    }
    view.setText(idErrorTag, '')
    return true
}

view.disable = function(id) {
    document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id) {
    document.getElementById(id).removeAttribute('disabled')
}