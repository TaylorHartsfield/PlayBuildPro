var checkPasswordMatch = function() {
    if(document.getElementById('createPassword').value === document.getElementById('confirmPassword').value){
            document.getElementById('submitUser').removeAttribute('disabled');
            document.getElementById('submitUser').classList.add('submitBio');

        } else if (document.getElementById('createPassword').value != document.getElementById('confirmPassword').value) {
            document.getElementById('submitUser').setAttribute('disabled', '');
            document.getElementById('submitUser').classList.remove('submitBio');

        } 
}


