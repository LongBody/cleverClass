// Show modal of Sign-in or Sign-up
function showTap(tapName) {
    let signInTap = document.getElementById('sign-in')
    let signUpTap = document.getElementById('sign-up')
    switch (tapName) {
        case 'sign in':
            {

                signInTap.style.display = 'block'
                signUpTap.style.display = 'none'
                break
            }
        case 'sign up':
            {
                signUpTap.style.display = 'block'
                signInTap.style.display = 'none'
                break
            }
    }
}