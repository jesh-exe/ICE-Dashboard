<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        ${msg("loginAccountTitle")}
    <#elseif section = "form">

    <form id="kc-form-login" class="auth-login-form mt-2"  onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">

        <div class="mb-1">
            <label for="username" class="form-label"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>

            <#if usernameEditDisabled??>
                <input tabindex="1" id="username" style="height:40px" class="form-control" name="username" value="${(login.username!'')}" type="text" disabled />
            <#else>
                <input tabindex="1" id="username"  style="height:40px"  class="form-control" placeholder="ice@email.com" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off"
                        aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                />

                <#if messagesPerField.existsError('username','password')>
                <div class="alert alert-danger" role="alert">
                    <span id="input-error"   aria-live="polite">
                            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                    </span>
                </div>
                </#if>
            </#if>
        </div>
        <div class="mb-1">
            <div class="d-flex justify-content-between">
              <label for="password" class="form-label">${msg("password")}</label>
            </div>
            <div>
                <input tabindex="2" id="password" class="form-control"  style="height:40px"  name="password" type="password" placeholder="············" autocomplete="off"
                           aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                    />
            </div>
        </div>       

        <div class="mb-1">
            <div id="kc-form-options">
                <#if realm.rememberMe && !usernameEditDisabled??>
                    <div class="form-check">
                        <label>
                            <#if login.rememberMe??>
                                <input tabindex="3" id="rememberMe"  class="form-check-input" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                            <#else>
                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                            </#if>
                        </label>
                    </div>
                </#if>
            </div>
            <div>
                    <#if realm.resetPasswordAllowed>
                        <span><a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
                    </#if>
            </div>
        </div>

        
                      <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                      <input tabindex="4" class="btn btn-primary w-100" style="background-image: none;" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
    </form>

    
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6"
                                                 href="http://ice-dev.bio.pune.cdac.in/register">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    </#if>

</@layout.registrationLayout>
