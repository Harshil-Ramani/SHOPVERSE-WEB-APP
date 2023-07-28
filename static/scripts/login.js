let log=document.getElementById('login');
log.addEventListener('click',(event)=>{
    event.preventDefault();
    let username_element=document.querySelector('input[type="text"]');
    let password_element=document.querySelector('input[type="password"]');
    let valid=true;

    let username=username_element.value.trim();
    if(username===''){
        valid=false;
        displayError('Username is required');
        return;
    }

    let password=password_element.value.trim();
    if (password==='') {
        valid = false;
        displayError('Password is required');
        return;
    }
    if(valid)
    {
        form=document.querySelector('form');
        form.submit();
    }
    function displayError(err){
        alert(err);
    }
});