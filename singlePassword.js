
function ClearServicePassword()
{
    document.forms['passwordForm'].elements['generatedPassword'].value = '';
}


function SetServicePassword()
{
    var single_password;
    var service_name;
    var service_password;
    var digest;
    var pwchars = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    // Get form field data
    single_password = 
        document.forms['passwordForm'].elements['password'].value;
    service_name =
        document.forms['passwordForm'].elements['serviceName'].value;

    // Require a password, otherwise just return
    if ((single_password.length) == 0 || (service_name.length == 0))
    {
        // Empty the service password field
        ClearServicePassword();
        return;
    }

    // Create string over which to compute a hash
    service_password = single_password + ":" + service_name;
    // Convert the string to UTF-8
    service_password = unescape(encodeURIComponent(service_password));

    // Compute the SHA-256 hash, returning an array of 32 bytes
    sha256_init();
    sha256_update(service_password, service_password.length);
    sha256_final();
    digest = sha256_encode_bytes();

    // Produce 16-character password using the hash bytes
    service_password = "";
    for(var i=0; i < 16 ; i++)
    {
        service_password = service_password + pwchars[digest[i] % 62];
    }

    // Put the hash into the password field
    document.forms['passwordForm'].elements['generatedPassword'].value = service_password;
}
