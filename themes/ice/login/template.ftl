<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="blank-page">
<div class="app-content content ">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body" style="background-position: center;background-repeat: no-repeat;background-size: cover;background-image: url('${url.resourcesPath}/images/ice-login-pg-bg.png');">
                <div class="auth-wrapper auth-cover">
                    <div class="auth-inner row m-0">

  
                        <!-- Brand logo-->
                        <a class="brand-logo" href="index.html">
                            <#--  <img src="${url.resourcesPath}/images/bio-braf-logos.png" style="width: 28px;" />  -->

                             <div class="w-100 d-lg-flex align-items-left justify-content-left px-5">
                                <img class="img-fluid" src="${url.resourcesPath}/images/bio-braf-logos.png"  alt="Login V2" />
                            </div>
                        </a>
                        <!-- /Brand logo-->
                        <!-- Left Text-->
                        <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
                            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                            <img class="img-fluid" src="${url.resourcesPath}/images/center-logos.png" alt="Login V2" /></div>
                        </div>
                        <!-- /Left Text-->
                        <!-- Login-->
                        <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                            <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">

                                <h2 class="card-title fw-bold mb-1"> <#nested "header"> </h2>
                                <p class="card-text mb-2">Please sign-in to your account and start the adventure</p>
                                

                                <#-- App-initiated actions should not see warning messages about the need to complete the action -->
                                <#-- during login.                                                                               -->
                                <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                                    <div class="alert alert-${message.type} ${properties.kcAlertClass!} pf-m-<#if message.type = 'error'>danger<#else>${message.type}</#if>">
                                        <div class="pf-c-alert__icon">
                                            <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                                            <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                                            <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                                            <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                                        </div>
                                            <span class="${properties.kcAlertTitleClass!}">${kcSanitize(message.summary)?no_esc}</span>
                                    </div>
                                </#if>
                                
                                <#nested "form">


                                 <#if auth?has_content && auth.showTryAnotherWayLink() && showAnotherWayIfPresent>
                                    <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                                        <div class="${properties.kcFormGroupClass!}">
                                            <input type="hidden" name="tryAnotherWay" value="on"/>
                                            <a href="#" id="try-another-way"
                                            onclick="document.forms['kc-select-try-another-way-form'].submit();return false;">${msg("doTryAnotherWay")}</a>
                                        </div>
                                    </form>
                                </#if>

                               <#if displayInfo>
                                    <div id="kc-info" class="${properties.kcSignUpClass!}">
                                        <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                                            <#nested "info">
                                        </div>
                                    </div>
                                </#if>
                               
                            </div>
                        </div>
                        <!-- /Login-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Content-->



    <script>
        $(window).on('load', function() {
            if (feather) {
                feather.replace({
                    width: 14,
                    height: 14
                });
            }
        })
    </script>
</body>
</html>
</#macro>
