let reg=document.getElementById('reg');
reg.addEventListener('click',(event)=>{
    event.preventDefault();
    let username_element=document.querySelector('input[type="text"]');
    let password_element=document.querySelector('input[type="password"]');
    let email_element=document.querySelector('input[type="email"]');
    let email_check=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid=true;

    let username=username_element.value.trim();
    if(username===''){
        valid=false;
        displayError('Username is required');
        return;
    }

    let email=email_element.value.trim();
    if(email===''){
        valid = false;
        displayError('Email is required');
        return;
    }
    else if(!email_check.test(email)) {
        valid = false;
        displayError('Invalid email format');
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