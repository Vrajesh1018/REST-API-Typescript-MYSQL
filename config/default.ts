export default{
    port : 3000,
    dbUri:"sql URL",

    // for SQL
    dbUser: "root",
    dbPassword: "xxxxxx",
    dbName: "typescript_rest_api",
    dbHost: "localhost",

    acessTokenTtl:"15m",
    refreshTokenTtl:"1y",
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Do not use it with config.ts file it's litterally not working and we get tired actually why it's not working !!!! 
    // instead stored it in file and read from there ...
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    privateKey : `-----BEGIN PRIVATE KEY-----
    -----END PRIVATE KEY-----`,

    publicKey:`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
    4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
    +qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
    kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
    0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
    cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
    mwIDAQAB
    -----END PUBLIC KEY-----`

}