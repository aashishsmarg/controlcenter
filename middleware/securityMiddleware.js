const securtiyMiddleware = (req,res,next) => {
    // Set HTTP security headers

    // Strict-Transport-Security (HSTS) Header: Enforce HTTPS connection
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // X-XSS-Protection: Enable browser XSS protection (legacy support)
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // X-Content-Type-Options: Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // X-Frame-Options: Prevent the page from being embedded in an iframe (clickjacking protection)
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Content-Security-Policy (CSP): Define which resources the browser is allowed to load
    // res.setHeader('Content-Security-Policy', "default-src 'self'");  //currelty we have to diable it because of push notificationn becasue it is usind some online api's

    // Referrer-Policy: Control how much referrer information is sent with requests
    res.setHeader('Referrer-Policy', 'no-referrer');

    // Permissions-Policy (formerly Feature-Policy): Control which browser features can be used
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');

    res.header("Access-Control-Allow-Headers", "Authorization,Content-Type");

    next()
    
}
export default securtiyMiddleware;