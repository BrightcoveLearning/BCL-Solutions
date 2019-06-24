;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/review/devstatus-panel-review.soy' */
// This file was automatically generated from devstatus-panel-review.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Review.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Review == 'undefined') { JIRA.Templates.DevStatus.Review = {}; }


JIRA.Templates.DevStatus.Review.summaryPanel = function(opt_data, opt_ignored) {
  return '<dl><dt>' + JIRA.Templates.DevStatus.transitionContainer({content: '<div class="summary-content"><a class="summary" href="#" title="' + soy.$$escapeHtml(AJS.format("Reviews related to {0}",opt_data.issueKey)) + '">' + JIRA.Templates.FusionWidget.Common.reviewsText(opt_data) + '</a> ' + JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue(opt_data) + '</div>'}) + '</dt>' + JIRA.Templates.DevStatus.Review.reviewDate(soy.$$augmentMap(opt_data, {showUpdatedText: true})) + '</dl>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Review.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.Review.summaryPanel';
}


JIRA.Templates.DevStatus.Review.reviewDate = function(opt_data, opt_ignored) {
  return '' + ((opt_data.dueDate && ! opt_data.completed) ? JIRA.Templates.DevStatus.lastUpdated({text: "Due", lastUpdated: opt_data.dueDate, extraClass: opt_data.overDue ? 'overdue' : undefined, datetimeFormat: 'fullAge'}) : (opt_data.lastUpdated) ? JIRA.Templates.DevStatus.lastUpdated({text: opt_data.showUpdatedText ? "Updated" : '', lastUpdated: opt_data.lastUpdated, datetimeFormat: 'fullAge'}) : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Review.reviewDate.soyTemplateName = 'JIRA.Templates.DevStatus.Review.reviewDate';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/pullrequest/devstatus-panel-pullrequest.soy' */
// This file was automatically generated from devstatus-panel-pullrequest.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.PullRequest.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.PullRequest == 'undefined') { JIRA.Templates.DevStatus.PullRequest = {}; }


JIRA.Templates.DevStatus.PullRequest.summaryPanel = function(opt_data, opt_ignored) {
  return '<dl><dt>' + JIRA.Templates.DevStatus.transitionContainer({content: '<div class="summary-content"><a class="summary" href="#" title="' + soy.$$escapeHtml(AJS.format("Pull requests related to {0}",opt_data.issueKey)) + '">' + JIRA.Templates.FusionWidget.Common.pullRequestsText(opt_data) + '</a> ' + JIRA.Templates.FusionWidget.Common.pullRequestsStateViewIssue(opt_data) + '</div>'}) + '</dt>' + JIRA.Templates.DevStatus.lastUpdated({text: "Updated", lastUpdated: opt_data.lastUpdated, datetimeFormat: 'fullAge'}) + '</dl>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.PullRequest.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.PullRequest.summaryPanel';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/devstatus-panel.soy' */
// This file was automatically generated from devstatus-panel.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }


JIRA.Templates.DevStatus.connectionProblemAsInfoWithoutIcon = function(opt_data, opt_ignored) {
  return '' + aui.message.info({content: '' + JIRA.Templates.DevStatus.connectionAndConfigErrorsMessages({errorInstances: opt_data.instances, notConfiguredInstances: opt_data.notConfiguredInstances, showContactAdminForm: opt_data.showContactAdminForm})});
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblemAsInfoWithoutIcon.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblemAsInfoWithoutIcon';
}


JIRA.Templates.DevStatus.connectionProblemAsWarning = function(opt_data, opt_ignored) {
  return '' + aui.message.warning({content: '' + JIRA.Templates.DevStatus.connectionAndConfigErrorsMessages({errorInstances: opt_data.instances, notConfiguredInstances: opt_data.notConfiguredInstances, showContactAdminForm: opt_data.showContactAdminForm})});
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblemAsWarning.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblemAsWarning';
}


JIRA.Templates.DevStatus.connectionAndConfigErrorsMessages = function(opt_data, opt_ignored) {
  return '' + (((! opt_data.errorInstances || opt_data.errorInstances.length == 0) && (! opt_data.notConfiguredInstances || opt_data.notConfiguredInstances.length == 0)) ? '<p class="connection-error">' + soy.$$filterNoAutoescape("Jira is having difficulty contacting the applications that supply development status information.") + ' ' + JIRA.Templates.DevStatus.contactAdmin(opt_data) + '</p>' : ((opt_data.errorInstances.length > 0) ? '<p class="connection-error">' + JIRA.Templates.DevStatus.connectionProblemMultipleInstances({instances: opt_data.errorInstances}) + ' ' + JIRA.Templates.DevStatus.contactAdmin(opt_data) + '</p>' : '') + ((opt_data.notConfiguredInstances && opt_data.notConfiguredInstances.length > 0) ? '<p class="config-errors">' + JIRA.Templates.DevStatus.configProblem(opt_data) + '</p>' : ''));
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionAndConfigErrorsMessages.soyTemplateName = 'JIRA.Templates.DevStatus.connectionAndConfigErrorsMessages';
}


JIRA.Templates.DevStatus.contactAdmin = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + soy.$$filterNoAutoescape(AJS.format("If this condition persists, please contact your {0}Jira administrators{1}.",opt_data.showContactAdminForm ? '<a id="contact-admin" href="' + "" + '/secure/ContactAdministrators!default.jspa">' : '',opt_data.showContactAdminForm ? '</a>' : ''));
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.contactAdmin.soyTemplateName = 'JIRA.Templates.DevStatus.contactAdmin';
}


JIRA.Templates.DevStatus.connectionProblem = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.adminError) {
    output += JIRA.Templates.DevStatus.connectionProblemAdminError(opt_data);
  } else {
    output += '<p class="connection-error">' + ((! opt_data.instances || opt_data.instances.length == 0) ? soy.$$filterNoAutoescape("Jira is having difficulty contacting the applications that supply development status information.") : JIRA.Templates.DevStatus.connectionProblemMultipleInstances(opt_data)) + ' ';
    var contactAdminAnchor__soy57 = '<a id="contact-admin" href="' + soy.$$escapeHtml("") + '/secure/ContactAdministrators!default.jspa">';
    output += soy.$$filterNoAutoescape(AJS.format("If this condition persists, please contact your {0}Jira administrators{1}.",opt_data.showContactAdminForm ? contactAdminAnchor__soy57 : '',opt_data.showContactAdminForm ? '</a>' : '')) + '</p>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblem.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblem';
}


JIRA.Templates.DevStatus.connectionProblemAdminError = function(opt_data, opt_ignored) {
  var output = '<p class="connection-error admin-error">' + soy.$$escapeHtml(opt_data.adminError.message) + '</p><p class="configure-applinks-link"><a href="' + soy.$$escapeHtml("") + '/plugins/servlet/applinks/listApplicationLinks">' + soy.$$escapeHtml("Configure Application Links") + '</a></p>';
  if (opt_data.adminError.details) {
    output += '<p class="connection-error"><a id="replace-text-trigger" data-replace-text="' + soy.$$escapeHtml("Hide error details") + '" class="aui-expander-trigger" aria-controls="expander-with-replace-text-content">' + soy.$$escapeHtml("Show error details") + '</a></p><div id="expander-with-replace-text-content" class="aui-expander-content admin-error-details"><ul>';
    var detailList79 = opt_data.adminError.details;
    var detailListLen79 = detailList79.length;
    for (var detailIndex79 = 0; detailIndex79 < detailListLen79; detailIndex79++) {
      var detailData79 = detailList79[detailIndex79];
      output += '<li>' + soy.$$escapeHtml(detailData79) + '</li>';
    }
    output += '</ul></div>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblemAdminError.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblemAdminError';
}


JIRA.Templates.DevStatus.configProblem = function(opt_data, opt_ignored) {
  var output = '';
  var servers__soy86 = opt_data.notConfiguredInstances;
  output += '<span class="description">';
  var server0__soy88 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: servers__soy86[0]});
  if (servers__soy86.length == 1) {
    output += soy.$$filterNoAutoescape(AJS.format("Couldn\x27\x27t read data from {0}.",server0__soy88));
  } else {
    var server1__soy96 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: servers__soy86[1]});
    if (servers__soy86.length == 2) {
      output += soy.$$filterNoAutoescape(AJS.format("Couldn\x27\x27t read data from {0} and {1}.",server0__soy88,server1__soy96));
    } else {
      var server2__soy104 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: servers__soy86[2]});
      output += (servers__soy86.length == 3) ? soy.$$filterNoAutoescape(AJS.format("Couldn\x27\x27t read data from {0}, {1}, and {2}.",server0__soy88,server1__soy96,server2__soy104)) : soy.$$filterNoAutoescape(AJS.format("Couldn\x27\x27t read data from {0}, {1}, {2}, and {3} other {3,choice,1#application|1\x3capplications}.",server0__soy88,server1__soy96,server2__soy104,servers__soy86.length - 3));
    }
  }
  output += '</span> <span class="hints">';
  var helpUrl__soy115 = ({"alt":"Get help!","title":"Jira Application Development panel displays error - Couldn''t read data","url":"https://confluence.atlassian.com/display/JIRAKB/JIRA+Application+Development+panel+displays+error+-+Couldn%27t+read+data"});
  output += soy.$$filterNoAutoescape(AJS.format("Learn {0}about this issue{1} or go to {2}application links{3} to fix it.",'<a href="' + helpUrl__soy115.url + '" target="_blank">','</a>','<a href="' + "" + '/plugins/servlet/applinks/listApplicationLinks">','</a>')) + '</span>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.configProblem.soyTemplateName = 'JIRA.Templates.DevStatus.configProblem';
}


JIRA.Templates.DevStatus.connectionProblemMultipleInstances = function(opt_data, opt_ignored) {
  var output = '';
  var instance0__soy120 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: opt_data.instances[0]});
  if (opt_data.instances.length == 1) {
    output += soy.$$filterNoAutoescape(AJS.format("Jira is having difficulty contacting {0}.",instance0__soy120));
  } else {
    var instance1__soy128 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: opt_data.instances[1]});
    if (opt_data.instances.length == 2) {
      output += soy.$$filterNoAutoescape(AJS.format("Jira is having difficulty contacting {0} and {1}.",instance0__soy120,instance1__soy128));
    } else {
      var instance2__soy136 = '' + JIRA.Templates.DevStatus.connectionProblemSingleInstance({instance: opt_data.instances[2]});
      output += soy.$$filterNoAutoescape(AJS.format("Jira is having difficulty contacting {0}, {1}, {3,choice,0#and {2}|1#{2}, and another application|1\x3c{2}, and {3} more applications}.",instance0__soy120,instance1__soy128,instance2__soy136,opt_data.instances.length - 3));
    }
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblemMultipleInstances.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblemMultipleInstances';
}


JIRA.Templates.DevStatus.connectionProblemSingleInstance = function(opt_data, opt_ignored) {
  return '<span class="instance" data-name="' + soy.$$escapeHtml(opt_data.instance.name) + '"><a href="' + soy.$$escapeHtml(opt_data.instance.baseUrl) + '" title="' + soy.$$escapeHtml(opt_data.instance.name) + '">' + soy.$$escapeHtml(opt_data.instance.name) + '</a></span>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.connectionProblemSingleInstance.soyTemplateName = 'JIRA.Templates.DevStatus.connectionProblemSingleInstance';
}


JIRA.Templates.DevStatus.labsOnOff = function(opt_data, opt_ignored) {
  return '' + ((! opt_data.isOptedInByAdmin && ! opt_data.isOptedIn) ? '<div class="on-off-panel aui-message closeable"><h2 class="title">' + soy.$$escapeHtml("Jira Labs") + '</h2><p>' + soy.$$escapeHtml("The new way to see your related commits and pull requests as they occur.") + '</p><span class="aui-icon icon-close labs-close" role="button" tabindex="0" title="' + soy.$$escapeHtml("Close the Jira Labs panel") + '"></span><div class="aui-group"><div class="aui-item"><button class="toggle-labs aui-button" title="' + soy.$$escapeHtml("Enable Jira Labs for development panel") + '">' + soy.$$escapeHtml("Enable Labs") + '</button></div></div>' : '<div class="on-off-panel opted-in">' + ((! opt_data.isOptedInByAdmin) ? ' | <span class="disable-labs"><a class="toggle-labs" href="#" title="' + soy.$$escapeHtml("Disable Jira Labs for the development panel") + '">' + soy.$$escapeHtml("Disable Labs") + '</span></span>' : '') + '</div>');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.labsOnOff.soyTemplateName = 'JIRA.Templates.DevStatus.labsOnOff';
}


JIRA.Templates.DevStatus.tryLabs = function(opt_data, opt_ignored) {
  return '<span href="#" class="try-labs" title="' + soy.$$escapeHtml("Show the Jira Labs panel") + '">' + soy.$$escapeHtml("Try Labs") + '</span>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.tryLabs.soyTemplateName = 'JIRA.Templates.DevStatus.tryLabs';
}


JIRA.Templates.DevStatus.lastUpdated = function(opt_data, opt_ignored) {
  return '' + ((opt_data.lastUpdated) ? '<dd class="sub-text' + ((opt_data.extraClass) ? ' ' + soy.$$escapeHtml(opt_data.extraClass) : '') + '">' + JIRA.Templates.DevStatus.transitionContainer({content: '<div>' + soy.$$escapeHtml(opt_data.text) + ' <time class="livestamp date user-tz allow-future" ' + ((opt_data.datetimeFormat) ? 'data-datetime-format="' + soy.$$escapeHtml(opt_data.datetimeFormat) + '" ' : '') + 'datetime="' + soy.$$escapeHtml(opt_data.lastUpdated) + '">$' + soy.$$escapeHtml(opt_data.lastUpdated) + '</time></div>'}) + '</dd>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.lastUpdated.soyTemplateName = 'JIRA.Templates.DevStatus.lastUpdated';
}


JIRA.Templates.DevStatus.transitionContainer = function(opt_data, opt_ignored) {
  return '<div class="rolling-container sliding-container"><div class="rolling-content">' + soy.$$filterNoAutoescape(opt_data.content) + '</div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.transitionContainer.soyTemplateName = 'JIRA.Templates.DevStatus.transitionContainer';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/devstatus-cta-tooltips.soy' */
// This file was automatically generated from devstatus-cta-tooltips.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Tooltip.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Tooltip == 'undefined') { JIRA.Templates.DevStatus.Tooltip = {}; }


JIRA.Templates.DevStatus.Tooltip.createBranch = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.DevStatus.Tooltip.tooltipLayout({extraClasses: 'create-branch', content: '<span class="branch-illustration"></span><div class="branch-text"><p>' + soy.$$escapeHtml("Create a branch for this issue in your source repository") + '.<br /> <a class="cta-learn-more-link" href="https://www.atlassian.com/git/workflows" target="_blank">' + soy.$$escapeHtml("Learn more about branching strategies") + '.</a></p></div>'});
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Tooltip.createBranch.soyTemplateName = 'JIRA.Templates.DevStatus.Tooltip.createBranch';
}


JIRA.Templates.DevStatus.Tooltip.automaticTransitions = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.DevStatus.Tooltip.tooltipLayout({extraClasses: 'dev-summary-automatic-transitions', content: '<p>' + soy.$$escapeHtml("Now Jira can automatically update your issue status when pull requests and other actions occur.") + '</p><p><a href="' + soy.$$escapeHtml(opt_data.aitHelpLinkUrl.url) + '" id="trigger-docs-link" target="_blank" title="' + soy.$$escapeHtml("Learn about automating your workflow") + '">' + soy.$$escapeHtml("Learn about automating your workflow") + '</a></p>'});
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Tooltip.automaticTransitions.soyTemplateName = 'JIRA.Templates.DevStatus.Tooltip.automaticTransitions';
}


JIRA.Templates.DevStatus.Tooltip.tooltipLayout = function(opt_data, opt_ignored) {
  return '<div class="cta-tooltip' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '">' + soy.$$filterNoAutoescape(opt_data.content) + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Tooltip.tooltipLayout.soyTemplateName = 'JIRA.Templates.DevStatus.Tooltip.tooltipLayout';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/deployment/devstatus-panel-deployment.soy' */
// This file was automatically generated from devstatus-panel-deployment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Deployment.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Deployment == 'undefined') { JIRA.Templates.DevStatus.Deployment = {}; }


JIRA.Templates.DevStatus.Deployment.summaryPanel = function(opt_data, opt_ignored) {
  return '<dl><dd>' + JIRA.Templates.DevStatus.transitionContainer({content: '<div class="summary-content" title="' + soy.$$escapeHtml(AJS.format("Deployments related to {0}",opt_data.issueKey)) + '">' + ((opt_data.topEnvironments.length) ? JIRA.Templates.FusionWidget.Common.deployments({anchorStart: '<a class="summary">', anchorEnd: '</a>', showProjects: opt_data.showProjects, successfulCount: opt_data.successfulCount, topEnvironments: opt_data.topEnvironments}) : soy.$$escapeHtml("No deployments contain latest commits")) + '</div>'}) + '</dd></dl>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Deployment.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.Deployment.summaryPanel';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/commit/devstatus-panel-commit.soy' */
// This file was automatically generated from devstatus-panel-commit.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Commit.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Commit == 'undefined') { JIRA.Templates.DevStatus.Commit = {}; }


JIRA.Templates.DevStatus.Commit.summaryPanel = function(opt_data, opt_ignored) {
  return '<dl><dt>' + JIRA.Templates.DevStatus.transitionContainer({content: '<div class="summary-content"><a class="summary" href="#" title="' + soy.$$escapeHtml(AJS.format("Commits related to {0}",opt_data.issueKey)) + '">' + JIRA.Templates.FusionWidget.Common.commits(opt_data) + '</a></div>'}) + '</dt>' + JIRA.Templates.DevStatus.lastUpdated({text: "Latest", lastUpdated: opt_data.lastUpdated, datetimeFormat: 'fullAge'}) + '</dl>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Commit.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.Commit.summaryPanel';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/build/devstatus-panel-build.soy' */
// This file was automatically generated from devstatus-panel-build.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Build.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Build == 'undefined') { JIRA.Templates.DevStatus.Build = {}; }


JIRA.Templates.DevStatus.Build.summaryPanel = function(opt_data, opt_ignored) {
  var output = '<dl><dt>';
  var param4 = '<div class="summary-content"><a class="summary" href="#" title="' + soy.$$escapeHtml(AJS.format("Builds related to {0}",opt_data.issueKey)) + '">';
  var countText__soy8 = '' + JIRA.Templates.FusionWidget.Common.buildsText(opt_data);
  param4 += soy.$$filterNoAutoescape(countText__soy8) + '</a> ' + JIRA.Templates.DevStatus.Build.statusIcon(opt_data) + '</div>';
  output += JIRA.Templates.DevStatus.transitionContainer({content: param4});
  output += '</dt>' + JIRA.Templates.DevStatus.lastUpdated({text: "Latest", lastUpdated: opt_data.lastUpdated, datetimeFormat: 'fullAge'}) + '</dl>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Build.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.Build.summaryPanel';
}


JIRA.Templates.DevStatus.Build.statusIcon = function(opt_data, opt_ignored) {
  var output = '';
  var iconClass__soy27 = '' + JIRA.Templates.FusionWidget.Common.buildsIconClass(opt_data);
  output += '<span class="aui-icon aui-icon-small ' + soy.$$escapeHtml(iconClass__soy27) + '">' + soy.$$escapeHtml(opt_data.iconText) + '</span>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Build.statusIcon.soyTemplateName = 'JIRA.Templates.DevStatus.Build.statusIcon';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/viewissue/branch/devstatus-panel-branch.soy' */
// This file was automatically generated from devstatus-panel-branch.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.Branches.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.Branches == 'undefined') { JIRA.Templates.DevStatus.Branches = {}; }


JIRA.Templates.DevStatus.Branches.summaryPanel = function(opt_data, opt_ignored) {
  return '<dl><dt>' + JIRA.Templates.DevStatus.transitionContainer({content: '<div class="summary-content"><a class="summary" href="#" title="' + soy.$$escapeHtml(AJS.format("Branches related to {0}",opt_data.issueKey)) + '">' + JIRA.Templates.FusionWidget.Common.branches(opt_data) + '</a></div>'}) + '</dt>' + JIRA.Templates.DevStatus.lastUpdated({text: "Updated", lastUpdated: opt_data.lastUpdated, datetimeFormat: 'fullAge'}) + '</dl>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.Branches.summaryPanel.soyTemplateName = 'JIRA.Templates.DevStatus.Branches.summaryPanel';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'templates/fusion-widget/fusion-widget-common.soy' */
// This file was automatically generated from fusion-widget-common.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.FusionWidget.Common.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.FusionWidget == 'undefined') { JIRA.Templates.FusionWidget = {}; }
if (typeof JIRA.Templates.FusionWidget.Common == 'undefined') { JIRA.Templates.FusionWidget.Common = {}; }


JIRA.Templates.FusionWidget.Common.branches = function(opt_data, opt_ignored) {
  return '' + soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#branch|1\x3cbranches}",'<span class="count">',opt_data.count,'</span>'));
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.branches.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.branches';
}


JIRA.Templates.FusionWidget.Common.buildsText = function(opt_data, opt_ignored) {
  var output = '';
  var tagStart__soy6 = '<span class="count">';
  var tagEnd__soy7 = '</span>';
  output += (opt_data.successfulBuildCount > 0) ? (opt_data.failedBuildCount > 0) ? soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds} failing",tagStart__soy6,opt_data.failedBuildCount,tagEnd__soy7)) : (opt_data.unknownBuildCount > 0) ? soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds}",tagStart__soy6,opt_data.successfulBuildCount,tagEnd__soy7)) : soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds}",tagStart__soy6,opt_data.count,tagEnd__soy7)) : (opt_data.failedBuildCount > 0) ? (opt_data.unknownBuildCount > 0) ? soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds} failing",tagStart__soy6,opt_data.failedBuildCount,tagEnd__soy7)) : soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds} failing",tagStart__soy6,opt_data.count,tagEnd__soy7)) : soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#build|1\x3cbuilds} incomplete",tagStart__soy6,opt_data.count,tagEnd__soy7));
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.buildsText.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.buildsText';
}


JIRA.Templates.FusionWidget.Common.buildsIconClass = function(opt_data, opt_ignored) {
  return '' + ((opt_data.failedBuildCount > 0) ? 'aui-iconfont-error' : (opt_data.successfulBuildCount > 0) ? 'aui-iconfont-approve' : (opt_data.unknownBuildCount > 0) ? 'aui-iconfont-devtools-task-cancelled' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.buildsIconClass.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.buildsIconClass';
}


JIRA.Templates.FusionWidget.Common.commits = function(opt_data, opt_ignored) {
  return '' + soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#commit|1\x3ccommits}",'<span class="count">',opt_data.count,'</span>'));
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.commits.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.commits';
}


JIRA.Templates.FusionWidget.Common.deployments = function(opt_data, opt_ignored) {
  var output = '';
  var instanceOne__soy43 = '' + JIRA.Templates.FusionWidget.Common.deploymentsInstance({environment: opt_data.topEnvironments[0], showProjects: opt_data.showProjects});
  var instanceTwo__soy47 = '' + JIRA.Templates.FusionWidget.Common.deploymentsInstance({environment: opt_data.topEnvironments[1], showProjects: opt_data.showProjects});
  var instanceThree__soy51 = '' + JIRA.Templates.FusionWidget.Common.deploymentsInstance({environment: opt_data.topEnvironments[2], showProjects: opt_data.showProjects});
  output += soy.$$filterNoAutoescape(AJS.format("{5}Deployed{6} to {0,choice,1#{1}|2#{1} and {2}|3#{1}, {2} and {3}|3\x3c{1}, {2}, {3}, and {4} more}",opt_data.successfulCount,instanceOne__soy43,instanceTwo__soy47,instanceThree__soy51,opt_data.successfulCount - 3,opt_data.anchorStart,opt_data.anchorEnd));
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.deployments.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.deployments';
}


JIRA.Templates.FusionWidget.Common.deploymentsInstance = function(opt_data, opt_ignored) {
  return '' + ((opt_data.environment) ? '<span class="environment" ' + ((opt_data.showProjects) ? 'title="' + soy.$$escapeHtml(AJS.format("Project: {0}",opt_data.environment.project)) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.environment.title) + '</span>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.deploymentsInstance.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.deploymentsInstance';
}


JIRA.Templates.FusionWidget.Common.pullRequestsText = function(opt_data, opt_ignored) {
  return '' + soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#pull request|1\x3cpull requests}",'<span class="count">',opt_data.stateCount,'</span>'));
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.pullRequestsText.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.pullRequestsText';
}


JIRA.Templates.FusionWidget.Common.reviewsText = function(opt_data, opt_ignored) {
  return '' + soy.$$filterNoAutoescape(AJS.format("{0}{1}{2} {1,choice,1#review|1\x3creviews}",'<span class="count">',opt_data.stateCount,'</span>'));
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.reviewsText.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.reviewsText';
}


JIRA.Templates.FusionWidget.Common.reviewsState = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.stateLozenge({isSubtle: opt_data.isSubtle, lozengeClass: opt_data.stateClasses[opt_data.state], text: opt_data.stateText[opt_data.state], classes: opt_data.classes, tooltip: opt_data.tooltip, tooltipClass: opt_data.tooltipClass, tooltipText: opt_data.tooltipText});
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.reviewsState.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.reviewsState';
}


JIRA.Templates.FusionWidget.Common.pullRequestsStateViewIssue = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.reviewsState({isSubtle: true, state: opt_data.state, stateClasses: {OPEN: 'aui-lozenge-complete', MERGED: 'aui-lozenge-success', DECLINED: 'aui-lozenge-error'}, stateText: {OPEN: "OPEN", MERGED: "MERGED", DECLINED: "DECLINED"}, classes: 'pullrequest-state'});
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.pullRequestsStateViewIssue.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.pullRequestsStateViewIssue';
}


JIRA.Templates.FusionWidget.Common.pullRequestsStateReleaseReport = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.reviewsState({isSubtle: true, state: opt_data.state, stateClasses: {OPEN: 'aui-lozenge-complete', MERGED: 'aui-lozenge-success', DECLINED: 'aui-lozenge-error'}, stateText: {OPEN: "Under Review", MERGED: "MERGED", DECLINED: "DECLINED"}, tooltip: true, tooltipClass: 'fusion-widget-tooltip', tooltipText: opt_data.tooltipText});
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.pullRequestsStateReleaseReport.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.pullRequestsStateReleaseReport';
}


JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.reviewsState({isSubtle: true, state: opt_data.state, stateClasses: {REVIEW: 'aui-lozenge-complete', CLOSED: 'aui-lozenge-success', DRAFT: 'aui-lozenge-complete', DEAD: 'aui-lozenge-error', REJECTED: 'aui-lozenge-error', UNKNOWN: 'aui-lozenge-error', APPROVAL: 'aui-lozenge-current', SUMMARIZE: 'aui-lozenge-complete'}, stateText: {REVIEW: "Open", CLOSED: "Closed", DRAFT: "Draft", DEAD: "Abandoned", REJECTED: "Rejected", UNKNOWN: "Unknown", APPROVAL: "Approval", SUMMARIZE: "Summarize"}});
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue';
}


JIRA.Templates.FusionWidget.Common.reviewsStateReleaseReport = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.reviewsState({isSubtle: true, state: opt_data.state, stateClasses: {REVIEW: 'aui-lozenge-complete', CLOSED: 'aui-lozenge-success', DRAFT: 'aui-lozenge-complete', DEAD: 'aui-lozenge-error', REJECTED: 'aui-lozenge-error', UNKNOWN: 'aui-lozenge-error', APPROVAL: 'aui-lozenge-complete', SUMMARIZE: 'aui-lozenge-complete'}, stateText: {REVIEW: "Under Review", CLOSED: "Closed", DRAFT: "Draft", DEAD: "Abandoned", REJECTED: "Rejected", UNKNOWN: "Unknown", APPROVAL: "Under Review", SUMMARIZE: "Under Review"}, tooltip: true, tooltipClass: 'fusion-widget-tooltip', tooltipText: opt_data.tooltipText});
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.reviewsStateReleaseReport.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.reviewsStateReleaseReport';
}


JIRA.Templates.FusionWidget.Common.stateLozenge = function(opt_data, opt_ignored) {
  return '<span class="aui-lozenge aui-lozenge-overflow ' + ((opt_data.isSubtle) ? 'aui-lozenge-subtle' : '') + ' ' + soy.$$escapeHtml(opt_data.lozengeClass) + ' ' + ((opt_data.tooltip) ? soy.$$escapeHtml(opt_data.tooltipClass) : '') + ' ' + ((opt_data.classes) ? soy.$$escapeHtml(opt_data.classes) : '') + '"' + ((opt_data.tooltip) ? 'data-tooltip="' + soy.$$escapeHtml(opt_data.tooltipText) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.text) + '</span>';
};
if (goog.DEBUG) {
  JIRA.Templates.FusionWidget.Common.stateLozenge.soyTemplateName = 'JIRA.Templates.FusionWidget.Common.stateLozenge';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:0', location = 'dist/0.6825172d3de56f8fe75d.js' */
jiraDevelopmentIntegrationPluginJsonp([0],{

/***/ "./js/analytics/AnalyticsModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * The purpose of this model is to keep track of all related analytics data that can be passed around from
 * one module to another
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _) {
    return Backbone.Model.extend({
        /*
        Override for conversion from SummaryModel typeId to analytic key
        */
        TO_ANALYTIC_KEY_OVERRIDE: {
            repository: 'commit'
        },

        properties: [
        /*
        Contains data related to the issue. This currently includes:
        - isAssignee
        - isAssignable
        - issueStatus
        - issueType
        */
        'issue',

        /*
        Contains data related to dev status summary. This includes data on the existence of certain information.
        For example:
        {
        commit: true,
        branch: true,
        pullrequest: true
        }
        Anything that is not included in the above, is considered to be non-existence in the summary panel
        */
        'summary'],

        /**
        * @param options
        * @param options.devStatusContainer {Element} jQuery element for the dev status container
        * @param options.devStatusData {JIRA.DevStatus.DevStatusData}
        *          Analytics model need listen to changes to aggregate data and calculate necessary summary
        */
        initialize: function initialize(options) {
            this.devStatusContainer = options.devStatusContainer;
            this.devStatusData = options.devStatusData;
            this._getAllAnalyticData();
        },

        getIssue: function getIssue() {
            return this.get('issue');
        },

        getSummary: function getSummary() {
            return this.get('summary');
        },

        _getAllAnalyticData: function _getAllAnalyticData() {
            this.set('issue', this._getAnalyticIssueData());
            this._initListenerToData();
        },

        _getAnalyticIssueData: function _getAnalyticIssueData() {
            return {
                isAssignee: this.devStatusContainer.data('is-assignee'),
                isAssignable: this.devStatusContainer.data('is-assignable'),
                issueStatus: this.devStatusContainer.data('issue-status'),
                issueType: this.devStatusContainer.data('issue-type')
            };
        },

        _getAnalyticSummaryData: function _getAnalyticSummaryData(aggregateData) {
            var instance = this;
            var summary = {};
            _.each(aggregateData.summary, function (value, key) {
                // Convert {branch: {overall: {count: 5}}} into {branch: true}
                summary[instance.TO_ANALYTIC_KEY_OVERRIDE[key] || key] = value.overall.count > 0;
            });
            return summary;
        },

        _initListenerToData: function _initListenerToData() {
            var instance = this;
            this.devStatusData.on('requestSuccess', function () {
                instance.set('summary', instance._getAnalyticSummaryData(instance.devStatusData.get('aggregatedData')));
            });
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/analytics/devstatus-analytics.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-global/require('jira/ajs/dark-features')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (DarkFeatures, _, jQuery, require, exports) {
    var Events = __webpack_require__("jira.webresources:jira-events/require('jira/util/events')");
    var Types = __webpack_require__("jira.webresources:jira-events/require('jira/util/events/types')");
    var Meta = __webpack_require__("jira.webresources:jira-metadata/require('jira/util/data/meta')");
    var analytics = __webpack_require__("./js/util/analytics.js");

    var editPermissionLinkSelector = '.edit-permission-link';

    /**
    * @returns {boolean} if analytics is enabled
    */
    function isAnalyticsEnabled() {
        return !DarkFeatures.isEnabled('jira.plugin.devstatus.analytics.disabled');
    }

    exports.Analytics = {
        /**
        * Fires an Atlassian Analytics event. Events will be subject to whitelist filtering as described in
        * <a href="https://extranet.atlassian.com/x/vkOJgw">Tagging & Whitelisting Analytics Events</a>.
        *
        * @param name  a unique name for the event, could be namespaced with ".", e.g., "createbranch.click"
        *              will be prepended with "devstatus."
        * @param data  an object containing any particular properties of relevance for this navigation type.
        */
        fireEvent: function fireEvent(name, data) {
            if (isAnalyticsEnabled()) {
                var eventName = 'devstatus.' + name;

                analytics.sendEvent(eventName, data);
            }
        },
        fireAgileDevStatusLinkClicked: function fireAgileDevStatusLinkClicked() {
            return exports.Analytics.fireEvent('panel.agile.icon.clicked');
        }
    };

    exports.LabsAnalytics = {
        fireLabsEvent: function fireLabsEvent(toggle) {
            var msg = toggle ? 'on' : 'off';
            return exports.Analytics.fireEvent('labs.toggle.' + msg);
        }
    };

    /**
    * Summary shown:
    *   * Current user is assigned: devstatus.summary.shown.assignee
    *   * Current user it NOT assigned: devstatus.summary.shown.nonassignee
    */
    exports.SummaryAnalytics = {
        fireSummaryShownEvent: function fireSummaryShownEvent(isAssignee, issueType, issueStatus, summarisedData) {
            var assigneeText = isAssignee ? 'assignee' : 'nonassignee';
            var opts = _.extend({}, summarisedData);
            return exports.Analytics.fireEvent('summary.shown.' + assigneeText, opts);
        },

        /**
        * Fires a "dev summary clicked event". The events raised will be called <code>"devstatus.&lt;infoType&gt;.summary.clicked"</code>
        * or <code>"devstatus.&lt;infoType&gt;.summary.clicked.newcontext"</code>. The <code>summarisedData</code> param
        * should contain a boolean indicating whether there is summary information for each type, e.g.:
        * <pre>
        * {
        *     "branch": true,
        *     "build": true,
        *     "commit": true,
        *     "deployment-environment": false,
        *     "pullrequest": true,
        *     "review": false
        * }
        * </pre>
        * All information contained in <b>the event must adhere to the <a href="https://extranet.atlassian.com/x/x5Zxgw">Atlassian privacy policy</a></b>.
        *
        * @param {string} infoType the type of summary link clicked
        * @param {object} summarisedData
        * @returns {*}
        */
        fireSummaryClickedEvent: function fireSummaryClickedEvent(infoType, summarisedData) {
            var isNewContext = Meta.get('fusion-analytics-new-context-link');
            var event = '.clicked';
            if (isNewContext) {
                Meta.set('fusion-analytics-new-context-link', undefined);
                event += '.newcontext';
            }
            return exports.Analytics.fireEvent(infoType + '.summary' + event, jQuery.extend({}, summarisedData) // this cleans up undefined attributes and we expect to have not undefined attributes.
            );
        },
        fireDetailTabClicked: function fireDetailTabClicked(applicationType, dataType) {
            return exports.Analytics.fireEvent(dataType + '.detail.' + applicationType + '.tab.clicked');
        }
    };

    exports.BuildsAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('builds', summarisedData);
        },
        fireDetailProjectClicked: function fireDetailProjectClicked() {
            return exports.Analytics.fireEvent('builds.detail.project.clicked');
        },
        fireDetailPlanClicked: function fireDetailPlanClicked() {
            return exports.Analytics.fireEvent('builds.detail.plan.clicked');
        },
        fireDetailBuildClicked: function fireDetailBuildClicked() {
            return exports.Analytics.fireEvent('builds.detail.build.clicked');
        }
    };

    exports.DeploymentsAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('deployments', summarisedData);
        },
        fireDetailProjectClicked: function fireDetailProjectClicked() {
            return exports.Analytics.fireEvent('deployments.detail.project.clicked');
        },
        fireDetailEnvironmentClicked: function fireDetailEnvironmentClicked() {
            return exports.Analytics.fireEvent('deployments.detail.environment.clicked');
        },
        fireDetailReleaseClicked: function fireDetailReleaseClicked() {
            return exports.Analytics.fireEvent('deployments.detail.release.clicked');
        }
    };

    exports.CommitsAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('commits', summarisedData);
        },
        fireDetailRepoClicked: function fireDetailRepoClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.repo.clicked');
        },
        fireDetailCommitClicked: function fireDetailCommitClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.commit.clicked');
        },
        fireDetailTabClicked: function fireDetailTabClicked(type) {
            return exports.SummaryAnalytics.fireDetailTabClicked(type, 'commits');
        },
        fireDetailFileExpandedClicked: function fireDetailFileExpandedClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.file.expanded.clicked');
        },
        fireDetailFilesExpandedClicked: function fireDetailFilesExpandedClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.files.expanded.clicked');
        },
        fireDetailFileClicked: function fireDetailFileClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.file.clicked');
        },
        fireDetailReviewsShown: function fireDetailReviewsShown(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.reviews.shown');
        },
        fireDetailReviewClicked: function fireDetailReviewClicked(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.review.clicked');
        },
        fireDetailBranchesShown: function fireDetailBranchesShown(type) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.branches.shown');
        },
        fireDetailCreateReviewClicked: function fireDetailCreateReviewClicked(type, allCommits) {
            return exports.Analytics.fireEvent('commits.detail.' + type + '.review.create' + (allCommits ? '.all' : ''));
        }
    };

    exports.ReviewsAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('reviews', summarisedData);
        },
        fireDetailReviewClicked: function fireDetailReviewClicked() {
            return exports.Analytics.fireEvent('reviews.detail.review.clicked');
        }
    };

    /**
    * Branches:
    *
    * Summary clicked: devstatus.branches.summary.clicked
    * Detail:
    *   Repo: devstatus.branches.detail.bitbucket.repo.clicked
    *   Branch: devstatus.branches.detail.bitbucket.branch.clicked
    *   PR lozenge: devstatus.branches.detail.bitbucket.pullrequest.lozenge.clicked
    *   Create pull request:
    *     Current user is assigned: devstatus.branches.detail.bitbucket.pullrequest.create.assignee.clicked
    *     Current user is not assigned:
    *        Is assignable: devstatus.branches.detail.bitbucket.pullrequest.create.nonassignee.assignable.clicked
    *        Not assignable: devstatus.branches.detail.bitbucket.pullrequest.create.nonassignee.nonassignable.clicked
    *   Product tab: devstatus.branches.detail.bitbucket.tab.clicked
    *
    * Pull requests:
    * Summary clicked: devstatus.pullrequests.summary.clicked
    * Detail:
    *   Pull request link: devstatus.pullrequests.detail.bitbucket.pullrequest.clicked
    *   Product tab: devstatus.pullrequests.detail.bitbucket.tab.clicked
    *
    */
    exports.BranchesAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('branches', summarisedData);
        },
        _fireDetailClickedEvent: function _fireDetailClickedEvent(applicationType, eventType) {
            return exports.Analytics.fireEvent('branches.detail.' + applicationType + '.' + eventType + '.clicked');
        },
        _fireDetailClickedEventAssignable: function _fireDetailClickedEventAssignable(eventName, type, isAssignee, isAssignable) {
            if (typeof isAssignee !== 'undefined' && typeof isAssignable !== 'undefined') {
                if (isAssignee) {
                    eventName += '.assignee';
                } else {
                    eventName += '.nonassignee';
                    if (isAssignable) {
                        eventName += '.assignable';
                    } else {
                        eventName += '.nonassignable';
                    }
                }
            }
            this._fireDetailClickedEvent(type, eventName);
        },
        fireDetailRepoClicked: function fireDetailRepoClicked(type) {
            this._fireDetailClickedEvent(type, 'repo');
        },
        fireDetailBranchClicked: function fireDetailBranchClicked(type) {
            this._fireDetailClickedEvent(type, 'branch');
        },
        fireDetailPullRequestLozengeClick: function fireDetailPullRequestLozengeClick(type) {
            this._fireDetailClickedEvent(type, 'pullrequest.lozenge');
        },
        fireDetailReviewLozengeClick: function fireDetailReviewLozengeClick(type) {
            this._fireDetailClickedEvent(type, 'review.lozenge');
        },
        fireDetailTabClicked: function fireDetailTabClicked(type) {
            return exports.SummaryAnalytics.fireDetailTabClicked(type, 'branches');
        },
        fireDetailCreatePullRequestClicked: function fireDetailCreatePullRequestClicked(type, isAssignee, isAssignable) {
            this._fireDetailClickedEventAssignable('pullrequest.create', type, isAssignee, isAssignable);
        },
        fireDetailCreateReviewClicked: function fireDetailCreateReviewClicked(type, isAssignee, isAssignable) {
            this._fireDetailClickedEventAssignable('review.create', type, isAssignee, isAssignable);
        }
    };

    exports.PullRequestsAnalytics = {
        fireSummaryClickedEvent: function fireSummaryClickedEvent(summarisedData) {
            return exports.SummaryAnalytics.fireSummaryClickedEvent('pullrequests', summarisedData);
        },
        fireDetailPullRequestClicked: function fireDetailPullRequestClicked(type) {
            return exports.Analytics.fireEvent('pullrequests.detail.' + type + '.pullrequest.clicked');
        },
        fireDetailTabClicked: function fireDetailTabClicked(type) {
            return exports.SummaryAnalytics.fireDetailTabClicked(type, 'pullrequests');
        }
    };

    exports.LearnMoreAnalytics = {
        fireLearnMoreEvent: function fireLearnMoreEvent(name, opts) {
            return exports.Analytics.fireEvent('learnmore.' + name, opts);
        }
    };

    exports.CtaDialogAnalytics = {
        issueDetails: {}, // updated each time the create branch button is clicked

        fireCreateBranchEvent: function fireCreateBranchEvent(name, opts) {
            opts = (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object' ? {} : jQuery.extend({}, opts);

            return exports.Analytics.fireEvent('createbranch.' + name + '.' + (this.issueDetails.isAssignee ? 'assignee' : 'nonassignee'), opts);
        },

        _populateIssueDetails: function _populateIssueDetails(link) {
            this.issueDetails = {
                status: '' + link.data('issueStatus'), // to undo potential type conversion done by .data()
                type: '' + link.data('issueType'),
                isAssignee: link.data('isAssignee')
            };
        },

        /**
        * Pull out the handler as an independent function so that the tests could unbind it in tear down.
        * @param e the event. event.data should contains instance, panelSelector and linkSelector
        * @param context
        * @private
        */
        _initHandler: function _initHandler(e, context, panelSelector, linkSelector) {
            if (panelSelector && context.not(document).is(panelSelector)) {
                var instance = this;
                // Capture clicks on create branch button on view issue page
                context.find(linkSelector).on('simpleClick', function () {
                    var el = jQuery(this);
                    instance._fireCreateBranchEvent(el);
                });
            }
        },

        _fireCreateBranchEvent: function _fireCreateBranchEvent(el) {
            this._populateIssueDetails(el);
            /**
            * Whether the create branch link is being clicked in a new context (ie in a new tab)
            */
            var eventName = 'click';
            var isNewContext = Meta.get('fusion-analytics-new-context-link');
            if (isNewContext) {
                Meta.set('fusion-analytics-new-context-link', undefined);
                eventName += '.newcontext';
            }
            this.fireCreateBranchEvent(eventName);
        },

        initialize: function initialize(panelSelector, linkSelector, dialogId) {
            if (isAnalyticsEnabled()) {
                var instance = this;

                // for issue nav view
                // bind the create branch onclick event each time the panel is re-rendered
                //  if we bind on document, the click event will only be triggered after the dialog.open one.
                Events.bind(Types.NEW_CONTENT_ADDED, _.bind(function (e, context) {
                    this._initHandler(e, context, panelSelector, linkSelector);
                }, this));
                Events.bind('GH.DetailView.updated', _.bind(function (e) {
                    this._initHandler(e, jQuery(panelSelector), panelSelector, linkSelector);
                }, this));

                // for single page view issue page only, bind directly to the links, as the links should be available at this time
                // if it's issue nav, the links would not be available at this time, thus no double binding
                jQuery(linkSelector).on('simpleClick', function () {
                    var el = jQuery(this);
                    instance._fireCreateBranchEvent(el);
                });

                // These three have to be bound on document as the target is outside of the context
                // Capture clicks on an instance in the cta dialog
                jQuery(document).on('click', '#' + dialogId + ' .jira-dialog-content .target', function () {
                    var el = jQuery(this);
                    instance.fireCreateBranchEvent('dialog.click', {
                        title: el.find('.title').attr('title'),
                        applicationType: el.data('applicationType')
                    });
                });

                // Capture clicks on the cancel button in the cta dialog
                jQuery(document).on('click', '#' + dialogId + ' .jira-dialog-content button.cancel', function () {
                    instance.fireCreateBranchEvent('dialog.cancel');
                });

                // Capture clicks on the learn more link in the helptip
                jQuery(document).on('click', '.cta-tooltip .cta-learn-more-link', function () {
                    exports.LearnMoreAnalytics.fireLearnMoreEvent('click.ctahelptipbranching');
                });
            }
        }
    };

    exports.AdminAnalytics = {
        fireAdminEvent: function fireAdminEvent(name, opts) {
            return exports.Analytics.fireEvent('admin.' + name, opts);
        },

        initialize: function initialize() {
            if (isAnalyticsEnabled()) {
                var instance = this;
                var configPanel = jQuery('#project-config-panel-dev-status');
                // Capture clicks on edit permission link
                configPanel.find(editPermissionLinkSelector).on('click', function () {
                    instance.fireAdminEvent('editpermissionlink.config.' + (jQuery('ul.permissions-list li.devstatus-admin-permission-item').length > 0 ? 'withpermissions' : 'nopermissions'));
                });
                // Capture clicks on appvertisement link
                configPanel.find('.learn-more-link').on('click', function () {
                    exports.LearnMoreAnalytics.fireLearnMoreEvent('click.adminappvertisementlink');
                });
                // Capture clicks on the conenct button dropdown
                configPanel.find('#project-config-applinks-connect').on('click', function () {
                    instance.fireAdminEvent('connect');
                });
                // Capture clicks on the individual connect buttons
                configPanel.find('.devstatus-admin-connect-button-option').on('click', function () {
                    var key = jQuery(this).data('key') || 'unknown';
                    instance.fireAdminEvent('connect.' + key);
                });
            }
        }
    };

    exports.AdminSummaryAnalytics = {
        initialize: function initialize() {
            if (isAnalyticsEnabled()) {
                // Capture clicks on edit permission link
                // always no permission, because the link would only appear when no permissions
                jQuery('#project-config-webpanel-devstatus-admin-summary-panel').find(editPermissionLinkSelector).on('click', function () {
                    exports.AdminAnalytics.fireAdminEvent('editpermissionlink.summary.nopermissions');
                });
            }
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/DateUtils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
    // TODO: this shared global state is just bad
    // May be overridden for tests
    var format = 'LLL';
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("jira.webresources:momentjs/require('jira/moment')")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, moment) {
        return {
            addTooltip: function addTooltip($el) {
                var $timestamp = $el.find('time.livestamp');
                $timestamp.livestamp(); // show relative time
                // set tooltip like in issue Created/Updated timestamp. not very i18n, should try to reuse what java uses
                $timestamp.each(function () {
                    var $time_el = $(this);
                    var $time_val = $time_el.attr('datetime');
                    var fixed_time = isNaN($time_val) ? $time_val : +$time_val;
                    var fixedMoment = moment(fixed_time).zone(fixed_time);
                    if (!fixedMoment.isValid()) {
                        fixedMoment = moment(fixed_time);
                    }
                    $time_el.attr('title', fixedMoment.format(format));
                });
            },

            setFormat: function setFormat(newFormat) {
                format = newFormat;
            }
        };
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})();

/***/ }),

/***/ "./js/util/EventPublisher.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    'use strict';

    return {
        trigger: AJS.trigger
    };
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/Listeners.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
/**
 * Keeps track of registered listeners for easy cleanup.
 *
 * @class JIRA.DevStatus.Util.Listeners
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("jira.webresources:jira-base-control/require('jira/lib/class')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Class) {
    return Class.extend({
        init: function init() {
            this._listening = [];
        },

        /**
        * Registers <code>callback</code> to listen to <code>event</code> on <code>other</code>.
        *
        * @param {Backbone.Events} other the instance to listen to
        * @param {String} event the name of the event
        * @param {Function} callback the callback
        * @param {object} context the 'this' to use for <code>callback</code>
        */
        startListening: function startListening(other, event, callback, context) {
            var listener = {
                start: function start() {
                    other.on(event, callback, context);
                    return this;
                },

                stop: function stop() {
                    other.off(event, callback, context);
                    return this;
                }
            };

            this._listening.push(listener.start());
        },

        /**
        * Unregisters listeners for all events.
        */
        stopListening: function stopListening() {
            _.each(this._listening, function (listener) {
                listener.stop();
            });

            this._listening = [];
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/analytics.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/util/EventPublisher.js"), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (eventPublisher, exports) {
    'use strict';

    /**
     * fires an analytics event
     * @param name of event
     * @param data data to be send with it
     */

    exports.sendEvent = function (name) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        eventPublisher.trigger('analyticsEvent', {
            name: name,
            data: data
        });
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/DevStatusApp.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-events/require('jira/util/events/types')"), __webpack_require__("jira.webresources:jira-global/require('jira/ajs/dark-features')"), __webpack_require__("jira.webresources:jira-metadata/require('jira/util/data/meta')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__, exports, __webpack_require__("jira.webresources:jquery/require('jquery')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Types, DarkFeatures, Meta, _, require, exports, jQuery) {
    var devAnalytics = __webpack_require__("./js/analytics/devstatus-analytics.js");
    var Events = __webpack_require__("jira.webresources:jira-events/require('jira/util/events')");

    exports.showTooltip = true;
    exports.showAITTooltip = true;

    var selectors = {
        devStatusContainer: '#devstatus-container',
        parentContainer: "[id$='devstatus-panel']",
        link: '.devstatus-cta-link',
        statusPanel: '.status-panels',
        viewIssueHeader: '.mod-header',
        agileHeader: '.ghx-header',
        agileNavMenuLink: 'a[href="#ghx-tab-com-atlassian-jira-plugins-' + 'jira-development-integration-plugin-greenhopper-devstatus-panel"]'
    };

    function isDashboard(context) {
        return context.find('body').hasClass('page-type-dashboard');
    }

    function isJIRAAgile(context) {
        return context.find('body').hasClass('ghx-agile');
    }

    function isKA(context) {
        return context.find('body').hasClass('ka ajax-issue-search-and-view');
    }

    function isServiceDesk() {
        return Meta.get('is-servicedesk-rendered');
    }

    function initDevStatusPanel(container, headerSelector, visibilityToggler) {
        exports.devStatusModule.initializePanel({
            container: container,
            showTooltip: exports.showTooltip,
            headerSelector: headerSelector,
            devStatusPanelVisibilityToggler: visibilityToggler,
            phaseTwoDisabled: !DarkFeatures.isEnabled('jira.plugin.devstatus.phasetwo.enabled')
        });
    }

    function toggleDevStatusPanelVisibilityOnViewIssue(container, visible, animate, callback) {
        _.defer(function () {
            var animateDuration = animate ? 1000 : 0;

            var animationParam = {
                duration: animateDuration,
                complete: callback
            };
            if (visible) {
                container.slideDown(animationParam);
            } else {
                container.slideUp(animationParam);
            }
        });
    }

    // JIRA Document ready
    // We want to do 2 things:
    // 1. Always initialise the first portion of DevStatusModule for the create branch link and cta dialog
    // 2. Initialise the full DevStatusModule if it is server rendered view issue
    // 3. Always load the devstatus detail dialog resources after DomContentLoaded asynchronously
    exports.documentReadyInit = function (context) {
        var JIRADevStatusDevStatusModule = __webpack_require__("./js/viewissue/DevStatusModule.js");
        exports.devStatusModule = new JIRADevStatusDevStatusModule({
            parentContainerSelector: selectors.parentContainer,
            linkSelector: selectors.link,
            panelSelector: selectors.devStatusContainer,
            statusPanelSelector: selectors.statusPanel,
            shouldShowAITTooltip: function shouldShowAITTooltip() {
                return exports.showAITTooltip;
            }
        });

        if (isDashboard(context) || isJIRAAgile(context)) {
            // Note: This binds to the click event for scrolling to the dev status panel.
            // Jira Agile do not publish events for these clicks.
            // It isn't pretty, but it works.
            context.find('body').on('click', selectors.agileNavMenuLink, devAnalytics.Analytics.fireAgileDevStatusLinkClicked);
            exports.showTooltip = false;
            exports.showAITTooltip = false;
        } else if (isKA(context)) {
            // its kind of unpredictable and random when
            // "JIRA.Issues.Api.isFullScreenIssueVisible()"
            // is available - yay
            jQuery(function () {
                if (JIRA.Issues.Api.isFullScreenIssueVisible()) {
                    var container = jQuery(selectors.devStatusContainer);
                    if (container.length > 0) {
                        initDevStatusPanel(container, selectors.viewIssueHeader, toggleDevStatusPanelVisibilityOnViewIssue);
                    }
                }
            });
        } else if (jQuery(selectors.parentContainer).length) {
            initDevStatusPanel(context.find(selectors.devStatusContainer), selectors.viewIssueHeader, toggleDevStatusPanelVisibilityOnViewIssue);
            exports.showTooltip = false;
        }

        if (isServiceDesk()) {
            exports.showTooltip = false;
            exports.showAITTooltip = false;
        }

        // JIRA View Issue
        Events.bind(Types.NEW_CONTENT_ADDED, function (e, context) {
            if (context.not(document).is(selectors.parentContainer)) {
                initDevStatusPanel(context.find(selectors.devStatusContainer), selectors.viewIssueHeader, toggleDevStatusPanelVisibilityOnViewIssue);
                exports.showTooltip = false;
                return true;
            }
            return false;
        });

        // JIRA Agile Detail View
        Events.bind('GH.DetailView.updated', function (e, data) {
            // no visibility toggler on jira agile. both the panel and the nav menu icon will always be shown.
            initDevStatusPanel(jQuery(selectors.devStatusContainer), selectors.agileHeader);
        });
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/DevStatusData.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:wrm-context-path/require('wrm/context-path')"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (wrmContextPath, Backbone, $, _) {
    return Backbone.Model.extend({
        properties: ['aggregatedData'],

        namedEvents: ['beforeRequest', 'requestFail', 'requestSuccess'],

        /**
        * @param options
        * @param options.issueId Id of the currently visible issue
        */
        initialize: function initialize(options) {
            this.issueId = options.issueId;
            this.issueKey = options.issueKey;
        },

        retrieveAggregateData: function retrieveAggregateData() {
            var url = wrmContextPath() + '/rest/dev-status/1.0/issue/summary?issueId=' + this.issueId;

            this.trigger('beforeRequest');
            return $.ajax(url).done(_.bind(this.setAggregateData, this)).fail(_.bind(this.setAggregateDataError, this)).promise();
        },

        /**
        * @param {object} aggregateData the aggregated data to be rendered
        * @param {boolean} isCache indicates whether the aggregated data is from cache
        * @param {boolean} isFinal indicates whether this update is final, useful to determine whether the panel will be changed again
        * @return {*}
        */
        setAggregateData: function setAggregateData(aggregateData, isCache, isFinal) {
            this.set('aggregatedData', aggregateData);
            // when calling from ajax.done() callback,
            //  isCache would be the statusText "success": we always want it to be false
            //  isFinal would be the xhr object: we always want it to be true
            this.trigger('requestSuccess', this, isCache === true, !!isFinal);
        },

        /**
        * @param {jqXHR} jqXhr the jqXHR
        * @param {string} status the error text status
        * @return {*}
        */
        setAggregateDataError: function setAggregateDataError(jqXhr, status) {
            this.set('aggregatedData', undefined);
            this.trigger('requestFail', this, jqXhr);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/DevStatusModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(21);
// @formatter:off
/**
 * @class JIRA.DevStatus.DevStatusModule
 * @extends Backbone.Model
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-formatter/require('jira/util/formatter')"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__, __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("jira.webresources:jira-metadata/require('jira/util/data/meta')"), __webpack_require__("./js/util/analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (formatter, Backbone, $, require, _, Meta, analytics) {
    var devStatusURL = __webpack_require__("./js/util/DevStatusURLUtils.js");
    var devAnalytics = __webpack_require__("./js/analytics/devstatus-analytics.js");
    var HelpTip = __webpack_require__("com.atlassian.plugins.helptips.jira-help-tips:help-tip/require('jira-help-tips/feature/help-tip')");
    var HelpTipManager = __webpack_require__("com.atlassian.plugins.helptips.jira-help-tips:help-tip-manager/require('jira-help-tips/feature/help-tip-manager')");

    var JIRADevStatusAnalyticsModel = __webpack_require__("./js/analytics/AnalyticsModel.js");
    var JIRADevStatusUtilListeners = __webpack_require__("./js/util/Listeners.js");
    var JIRADevStatusSummaryErrorModule = __webpack_require__("./js/viewissue/summary/SummaryErrorModule.js");
    var JIRADevStatusDevStatusData = __webpack_require__("./js/viewissue/DevStatusData.js");
    var JIRADevStatusLabsLabsOptInModel = __webpack_require__("./js/viewissue/labs/LabsOptInModel.js");
    var JIRADevStatusLabsLabsOptInView = __webpack_require__("./js/viewissue/labs/LabsOptInView.js");
    var JIRADevStatusLabsTryLabsView = __webpack_require__("./js/viewissue/labs/TryLabsView.js");

    var BranchModule = __webpack_require__("./js/viewissue/summary/branch/BranchModule.js");
    var BuildModule = __webpack_require__("./js/viewissue/summary/build/BuildModule.js");
    var CommitModule = __webpack_require__("./js/viewissue/summary/commit/CommitModule.js");
    var DeploymentModule = __webpack_require__("./js/viewissue/summary/deployment/DeploymentModule.js");
    var PullRequestModule = __webpack_require__("./js/viewissue/summary/pullrequest/PullRequestModule.js");
    var ReviewModule = __webpack_require__("./js/viewissue/summary/review/ReviewModule.js");

    var CreateBranchView = __webpack_require__("./js/viewissue/summary/CreateBranchView.js");
    var CreateBranchFormDialog = __webpack_require__("./js/viewissue/dialog/CreateBranchFormDialog.js");

    /**
    * Do not refresh more often than every MAX_REFRESH_WINDOW milliseconds.
    */
    var MAX_REFRESH_WINDOW = 30000;

    var DevStatusModule = Backbone.Model.extend({
        initialize: function initialize(options) {
            _.defaults(this, options);

            this._listeners = new JIRADevStatusUtilListeners();

            this.createBranchFormDialog = new CreateBranchFormDialog(options);

            this.devSummaryJson = null;
            this.triggerHelpTipShown = false;
            this.aitHelptip = null;
            this._initFocusHandler();
        },

        /**
        *
        * @param options
        * @return {JIRA.DevStatus.DevStatusModule} this
        */
        initializePanel: function initializePanel(options) {
            // stop listening to any events that this module has registered for (before they become garbage)
            this._listeners.stopListening();

            /** the last summary data that was rendered (null if nothing was ever rendered) */
            this._renderedData = null;

            this._getContainers(options);
            this.labsOptIn = JIRADevStatusLabsLabsOptInModel.createFromDOM(this.parentContainer);
            // On page load, only show tooltip if it hasn't been shown & the opt in to labs panel
            // is not going be shown.
            options.showTooltip = options.showTooltip && !(this.labsOptIn.isAllowed() && !(this.labsOptIn.isOptedIn() || this.labsOptIn.isDismissed()));
            this._createCreateBranchView(options);

            this.devSummaryJson = this.devStatusContainer.find('.dev-summary.json-blob').data('json');
            this._initLabsOptInView();
            this._initTryLabsView();

            this._createDevStatusData(options);
            this._createAnalyticsModel(options);
            this._createSummaryViews(options, DevStatusModule.moduleMap);

            this._setupDataEventHandlers();

            this.devStatusPanelVisibilityToggler = options.devStatusPanelVisibilityToggler;

            if (!options.phaseTwoDisabled) {
                // only show cached summary or start to fetch summary when phase 2 is enabled
                this._startDevStatus(); // kick start phase 2 features
            } else {
                // if phase 2 is not enabled, finish the show/hide check immediately
                //  no animation, and is final
                this._postRender(false, true);
            }
            this.labsOptIn.on('change:optedIn', this._onChangeLabsOptIn, this);
            if (this.labsOptIn.isAllowed() && this.labsOptIn.isOptedIn()) {
                this._onChangeLabsOptIn(this.labsOptIn, true);
            }

            return this;
        },

        _createCreateBranchView: function _createCreateBranchView(options) {
            this.createBranchView = new CreateBranchView({
                el: this.createBranchContainer,
                showTooltip: options.showTooltip
            });
        },

        _createDevStatusData: function _createDevStatusData(options) {
            this.devStatusData = new JIRADevStatusDevStatusData({
                issueId: this.devStatusContainer.data('issue-id'),
                issueKey: this.devStatusContainer.data('issue-key')
            });
        },

        _createSummaryViews: function _createSummaryViews(options, moduleMap) {
            var that = this;
            var dataAttrs = this.devStatusContainer.data();
            this._summaryModules = _.clone(this.statusPanelContainer.find('.status-panel').map(function () {
                var $el = $(this);
                var ModuleCtor = moduleMap[$el.data('module')];
                return new ModuleCtor({
                    dataAttrs: dataAttrs, // pass all top level data attributes for dev status
                    el: $el,
                    labsOptIn: that.labsOptIn,
                    analyticsModel: that.analyticsModel
                });
            }));

            this._errorModule = new JIRADevStatusSummaryErrorModule({
                el: this.messagePanelContainer,
                dataAttrs: dataAttrs
            });
        },

        _createAnalyticsModel: function _createAnalyticsModel(options) {
            this.analyticsModel = new JIRADevStatusAnalyticsModel({
                devStatusContainer: this.devStatusContainer,
                devStatusData: this.devStatusData
            });
        },

        _getContainers: function _getContainers(options) {
            this.devStatusContainer = options.container;
            this.parentContainer = options.container.closest(this.parentContainerSelector);
            this.createBranchContainer = options.container.find(this.linkSelector);
            this.statusPanelContainer = options.container.find(this.statusPanelSelector);
            this.headerContainer = this.parentContainer.find(options.headerSelector);
            this.messagePanelContainer = options.container.find('.message-panel');
        },

        _onLoadingStarted: function _onLoadingStarted() {
            this._startLoadingModuleData();
        },

        _onLoadingSuccess: function _onLoadingSuccess(devStatusData, isCache, isFinal) {
            var aggregatedData = this.devStatusData.get('aggregatedData');
            this._renderModules({
                success: true,
                renderData: aggregatedData
            });
            this._postRender(!isCache, isFinal, aggregatedData);
        },

        _onLoadingFailure: function _onLoadingFailure() {
            this._renderModules({ success: false });
            this._postRender(false, true);
        },

        /**
        * Current model is have a single spinner controlled by DevStatusModule.
        *
        * When data comes back from DevStatusData, pass it along from one view to the next.
        * The order of calling these view is hardcoded
        */
        _setupDataEventHandlers: function _setupDataEventHandlers() {
            this._listeners.startListening(this.devStatusData, 'beforeRequest', this._onLoadingStarted, this);
            this._listeners.startListening(this.devStatusData, 'requestSuccess', this._onLoadingSuccess, this);
            this._listeners.startListening(this.devStatusData, 'requestFail', this._onLoadingFailure, this);
        },

        /**
        * Kick start the data fetching from rest end point.
        * Result will be handled by the event handlers configured in _setupDataEventHandlers.
        * @private
        */
        _startDevStatus: function _startDevStatus() {
            var needAjax = !this.devSummaryJson || this.devSummaryJson.isStale === true;
            // always update the page with the cached summary if it is there
            if (this.devSummaryJson) {
                this.devStatusData.setAggregateData(this.devSummaryJson.cachedValue, true, !needAjax);
            }

            if (needAjax) {
                this._startLoadingModuleData();
                this.devStatusData.retrieveAggregateData();
            }
        },

        /**
        * Adds a listener that refreshes this panel when the window is focused.
        *
        * @private
        */
        _initFocusHandler: function _initFocusHandler() {
            // throttle refreshes so they don't occur too often when switching
            // between windows or tabs.
            $(window).on('focus', _.throttle(_.bind(this.refreshSummaryData, this), MAX_REFRESH_WINDOW, {
                trailing: false
            }));
        },

        /**
        * Refreshes this module's DevStatusData, updating all views to reflect the new data.
        */
        refreshSummaryData: function refreshSummaryData() {
            this.devStatusData && this.devStatusData.retrieveAggregateData();
        },

        _onChangeLabsOptIn: function _onChangeLabsOptIn(model, labsOptedIn) {
            if (labsOptedIn === true) {
                // enable labs features
            } else {
                    // hide labs features
                }
        },

        _initLabsOptInView: function _initLabsOptInView() {
            this.labsOptInView = new JIRADevStatusLabsLabsOptInView({
                el: this.parentContainer.find('.labs-on-off-container'),
                labsOptIn: this.labsOptIn
            }).render();
        },

        _initTryLabsView: function _initTryLabsView() {
            // slightly hackish, but this part of JIRA is not pluggable so we need
            // to append our own container here so we can then keep the view clean
            var tryLabsContainer = $('<div class="try-labs-container"></div>').appendTo(this.headerContainer);

            new JIRADevStatusLabsTryLabsView({
                el: tryLabsContainer,
                labsOptIn: this.labsOptIn
            }).render();
        },

        /**
        * Hide or show the dev status panel depending on if there is no visible data. Fires analytics events.
        *
        * @private
        */
        _postRender: function _postRender(animateToggling, isFinal, aggregatedData) {
            var isAnythingSummaryRendered = this._isAnySummaryViewVisibleOnPanel() || this._isAnyErrorViewVisible();
            var self = this;
            if (isAnythingSummaryRendered) {
                var issueAnalytic = this.analyticsModel.getIssue();
                devAnalytics.SummaryAnalytics.fireSummaryShownEvent(issueAnalytic.isAssignee, issueAnalytic.issueType, issueAnalytic.issueStatus, this.analyticsModel.getSummary());
                this._openDetailDialogUrlLink();
            }

            this._togglePanelEmptyStatus(!this._isAnySummaryViewVisibleOnPanel());

            var container = this.parentContainer;
            function markPanelAsFinal() {
                if (isFinal) {
                    // used by test to be certain that the panel is done with animation and good for assertThis assertThat
                    container.addClass('js-animation-completed');
                    self._attachAutomaticTransitionsHelpTip(aggregatedData);
                }
            }
            // check if anything is rendered on the panel, including any summary view or cta (e.g., create branch)
            var isAnythingRendered = isAnythingSummaryRendered || this.createBranchContainer.size() > 0;
            if (this.devStatusPanelVisibilityToggler && container.is(':visible') !== isAnythingRendered) {
                // toggle the visibility of the dev status panel, animate it if not cache
                this.devStatusPanelVisibilityToggler(this.parentContainer, isAnythingRendered, animateToggling, markPanelAsFinal);

                // AIT helptip should be shown if DevStatus panel is hidden
                if (!isAnythingRendered && this.aitHelptip && this.aitHelptip.isVisible()) {
                    this.aitHelptip.hide();
                }
            } else {
                markPanelAsFinal();
            }
        },

        _attachAutomaticTransitionsHelpTip: function _attachAutomaticTransitionsHelpTip(aggregatedData) {
            var isDevStatusVisible = this.parentContainer.is(':visible');
            var shouldRenderAITTooltip = this._shouldRenderAITTooltip(aggregatedData);

            if (!shouldRenderAITTooltip && this.aitHelptip && this.aitHelptip.isVisible()) {
                this.aitHelptip.hide();
            } else if (shouldRenderAITTooltip && !this.triggerHelpTipShown && this.shouldShowAITTooltip() && isDevStatusVisible) {
                _.defer(_.bind(function () {
                    this.aitHelptip = new HelpTip({
                        id: 'automaticTransitionDevSummaryTooltip',
                        title: "Automate your status updates",
                        bodyHtml: JIRA.Templates.DevStatus.Tooltip.automaticTransitions({
                            aitHelpLinkUrl: this.devStatusContainer.data('ait-help-url-json')
                        }),
                        anchor: '#viewissue-devstatus-panel_heading .toggle-title',
                        isSequence: true,
                        callbacks: {
                            init: function init() {
                                $('#trigger-docs-link').on('click', function () {
                                    analytics.sendEvent('devstatus.automatic.transitions.learn.more.clicked');
                                });
                            }
                        },
                        inlineDialogOpts: {
                            width: 400
                        }
                    });
                    HelpTipManager.showSequences();
                }, this));
                this.triggerHelpTipShown = true;
            }
        },

        _shouldRenderAITTooltip: function _shouldRenderAITTooltip(aggregatedData) {
            if (aggregatedData) {
                return aggregatedData.summary.branch.overall.count > 0 || aggregatedData.summary.repository.overall.count > 0 || aggregatedData.summary.pullrequest.overall.count > 0 || aggregatedData.summary.review.overall.count > 0;
            }
            return false;
        },

        _getModuleByType: function _getModuleByType(dialogToOpen) {
            return _.find(this._summaryModules, function (module) {
                return module.data && module.data.getType && _.isEqual(module.data.getType(), dialogToOpen);
            });
        },

        _openDetailDialogUrlLink: function _openDetailDialogUrlLink() {
            var dialogToOpen = Meta.get('fusion-open-detail-dialog');
            if (dialogToOpen) {
                var moduleToClick;
                if (devStatusURL.isCreateReviewDetailDialogLink(dialogToOpen)) {
                    // preserve META so the commit dialog can continue with creating the review
                    moduleToClick = this._getModuleByType('repository');
                } else {
                    moduleToClick = this._getModuleByType(dialogToOpen);
                    if (moduleToClick) {
                        Meta.set('fusion-open-detail-dialog', undefined);
                    }
                }

                if (moduleToClick) {
                    var summaryViewToClick = moduleToClick.view;
                    if (summaryViewToClick && summaryViewToClick.isVisible()) {
                        Meta.set('fusion-analytics-new-context-link', true);
                        summaryViewToClick.getSummaryLink().click();
                    }
                }
            }
        },

        /**
        * Toggle the empty-status class on the status panel container to indicate whether anything is being rendered into
        * the status panel
        *
        * @param toggle flag to set
        */
        _togglePanelEmptyStatus: function _togglePanelEmptyStatus(toggle) {
            if (this.statusPanelContainer) {
                this.statusPanelContainer.toggleClass('empty-status', toggle);
            }
        },

        /**
        * Returns whether any summary module is rendered in the development panel.
        *
        * @return {boolean}
        * @private
        */
        _isAnySummaryViewVisibleOnPanel: function _isAnySummaryViewVisibleOnPanel() {
            // return true if any of the summary views is visible
            return !!_.find(this._summaryModules, function (module) {
                return module.isViewVisible();
            });
        },

        /**
        * Returns whether any errors are visible in the development panel.
        *
        * @returns {boolean}
        * @private
        */
        _isAnyErrorViewVisible: function _isAnyErrorViewVisible() {
            return this._errorModule.isViewVisible();
        },

        /**
        * Calls <code>render</code> on each of of this DevStatusModule's summary modules, passing in
        * <code>fetchResult.summaryData</code>. Use <code>fetchResult.success</code> to signal that there was an error
        * fetching data from the server.
        *
        * @param {object}  fetchResult
        * @param {boolean} fetchResult.success if the fetch operation was successful
        * @param {object}  [fetchResult.renderData] optional summary data to render (undefined to reuse data from the previous call)
        * @return {*}
        * @private
        */
        _renderModules: function _renderModules(fetchResult) {
            // FUSE-1026: when there's no new renderData it's always better to keep whatever is already on
            // screen than to blank it out.
            var renderData = this._renderedData = fetchResult.renderData || this._renderedData;

            _.each(this._summaryModules, function (module) {
                module.render(renderData);
            });

            this._errorModule.render(fetchResult.success ? renderData : undefined);
        },

        /**
        * Calls <code>startLoading()</code> on each module.
        *
        * @private
        */
        _startLoadingModuleData: function _startLoadingModuleData() {
            _.each(this._summaryModules, function (module) {
                module.startLoading();
            });
        }
    }, {
        moduleMap: {
            BranchModule: BranchModule,
            BuildModule: BuildModule,
            CommitModule: CommitModule,
            DeploymentModule: DeploymentModule,
            PullRequestModule: PullRequestModule,
            ReviewModule: ReviewModule
        }
    });
    return DevStatusModule;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/dialog/CreateBranchFormDialog.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("jira.webresources:dialogs/require('jira/dialog/form-dialog')"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, $, JIRAFormDialog, devAnalytics) {
    return Backbone.View.extend({
        initialize: function initialize(options) {
            this.parentContainerSelector = options.parentContainerSelector;
            this.panelSelector = options.panelSelector;
            this.linkSelector = options.linkSelector;
            this.dialogId = 'devstatus-cta-dialog';

            /**
            * Initialise analytics before form dialog to explicitly put analytics event in front of the form dialog events in the queue
            */
            devAnalytics.CtaDialogAnalytics.initialize(this.parentContainerSelector, this.linkSelector, this.dialogId);
            this._initFormDialog();
        },

        _initFormDialog: function _initFormDialog() {
            var instance = this;
            var dialog = new JIRAFormDialog({
                id: this.dialogId,
                width: 560,
                content: function content(ready) {
                    var theDialog = this;
                    __webpack_require__.e/* require */(8).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/InstancePickerView.js")]; (function (InstancePickerView) {
                        theDialog.pickerView = new InstancePickerView({
                            el: theDialog.$popup,
                            activeTrigger: theDialog.$activeTrigger,
                            cta: instance._getCta(theDialog.$activeTrigger)
                        });
                        theDialog.pickerView.render().always(function (content) {
                            ready(content);
                            $(dialog.$popup).find('.target').eq(0).focus();
                            //analytics event about the opening of the cta dialog
                            devAnalytics.CtaDialogAnalytics.fireCreateBranchEvent('dialog.open');
                        });
                    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
                },
                trigger: this.linkSelector,
                autoClose: true
            });
        },

        _getCta: function _getCta(link) {
            /**
             * Look for cta key in the element data first because the URL in IE8/9 contains a '#' for both view issue and agile
             */
            var ctaData = link.data('cta');
            if (ctaData) {
                return ctaData;
            } else {
                var url = link.attr('href');
                var m = url && /\#([a-zA-Z\.]+)/.exec(url);
                return m && m[1];
            }
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/labs/LabsOptInModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
/**
 * Model for the labs opt-in.
 *
 * @type JIRA.DevStatus.Labs.LabsOptInModel
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:wrm-context-path/require('wrm/context-path')"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__], __WEBPACK_AMD_DEFINE_RESULT__ = function (wrmContextPath, Backbone, $, require) {
    var devAnalytics = __webpack_require__("./js/analytics/devstatus-analytics.js");
    var JIRADevStatusLabsLabsOptInModel = Backbone.Model.extend({
        defaults: {
            allowed: false,
            optedIn: false,
            optedInByAdmin: false,
            dismissed: false,
            id: 1 // no need to use ids as this is a singleton
        },

        /**
        * Whether Labs opt in is allowed or not.
        *
        * @returns {boolean}
        */
        isAllowed: function isAllowed() {
            return this.get('allowed');
        },

        /**
        * Gets the Labs opted in status.
        *
        * @returns {boolean}
        */
        isOptedIn: function isOptedIn() {
            return this.get('optedIn');
        },

        /**
        * Gets the admin opt-in status for labs.
        *
        * @returns {boolean} whether labs has been globally opted-in by an admin
        */
        isOptedInByAdmin: function isOptedInByAdmin() {
            return this.get('optedInByAdmin');
        },

        /**
        * Sets the Labs opted in status.
        *
        * @param optedIn {boolean} whether to opt in or out
        * @returns {jqXHR} a jQuery XHR Object
        */
        setOptedIn: function setOptedIn(optedIn) {
            return this.save({ optedIn: optedIn }, { wait: true }).done(function () {
                // fire analytics with on or off
                devAnalytics.LabsAnalytics.fireLabsEvent(optedIn);
            });
        },

        /**
        * Toggles the Labs opted in status.
        *
        * @returns {jqXHR} a jQuery XHR Object
        */
        toggleOptedIn: function toggleOptedIn(optedIn) {
            var isOptedIn = this.isOptedIn();

            return this.setOptedIn(!isOptedIn);
        },

        /**
        * Marks the "labs info" as dismissed or not.
        */
        setDismissed: function setDismissed(dismissed) {
            return this.save({ dismissed: dismissed }, { wait: true });
        },

        /**
        * Whether the Labs info box has been dismissed.
        *
        * @returns {boolean}
        */
        isDismissed: function isDismissed() {
            return this.get('dismissed');
        },

        /**
        * Returns the URL for the LabsOptIn REST resource.
        *
        * @returns {string}
        */
        url: function url() {
            return wrmContextPath() + '/rest/dev-status/1.0/labs-opt-in/';
        }
    }, {
        /**
        * Creates a new LabsOptInModel, populating it with data from the given DOM element.
        *
        * @param el {Element} an element with a data-labs-json attr containing JSON
        */
        createFromDOM: function createFromDOM(el) {
            var $el = $(el).find('#devstatus-container');

            return new JIRADevStatusLabsLabsOptInModel($el.data('labs-json'));
        }
    });
    return JIRADevStatusLabsLabsOptInModel;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/labs/LabsOptInView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
// @formatter:off
/**
 * View for the Labs on/off links.
 *
 * @type JIRA.DevStatus.Labs.LabsOptInView
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone) {
    return Backbone.View.extend({
        events: {
            'click .toggle-labs': '_onClickToggle',
            'click .labs-close': '_onClickDismiss'
        },

        /**
        * Creates a new LabsOptInView.
        *
        * @param options
        * @param options.labsOptIn {JIRA.DevStatus.Labs.LabsOptInModel}
        */
        initialize: function initialize(options) {
            this.labsOptIn = options.labsOptIn;
            this.labsOptIn.on('change', this.render, this);
            this.labsOptIn.on('change:optedIn', this._onChangeOptedIn, this);
        },

        render: function render() {
            var labs = this.labsOptIn;
            if (labs.isAllowed() && (labs.isOptedInByAdmin() || !labs.isDismissed())) {
                this._show();
            } else {
                this._hide();
            }

            return this;
        },

        /**
        * Toggles labs on and off.
        *
        * @returns {*}
        * @private
        */
        _onClickToggle: function _onClickToggle(e) {
            e.preventDefault();
            this.labsOptIn.toggleOptedIn();
        },

        /**
        * Marks the info box as "dismissed".
        *
        * @returns {*}
        * @private
        */
        _onClickDismiss: function _onClickDismiss(e) {
            e.preventDefault();
            this.labsOptIn.setDismissed(true);
        },

        _show: function _show() {
            this.$el.html(JIRA.Templates.DevStatus.labsOnOff({
                isOptedIn: this.labsOptIn.isOptedIn(),
                isOptedInByAdmin: this.labsOptIn.isOptedInByAdmin()
            }));
            this.$el.removeClass('hidden');
        },

        _hide: function _hide() {
            this.$el.empty();
            this.$el.addClass('hidden');
        }
    }, {
        /**
        * The unique id of the issue collector used for JIRA Labs feedback.
        */
        COLLECTOR_ID: 'effe8b72'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/labs/TryLabsView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
// @formatter:off
/**
 * View for the "Try labs" link. This is just an inconspicuous link allows you to "un-dismiss" the LabsOptInView.
 *
 * @type JIRA.DevStatus.Labs.TryLabsView
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone) {
    return Backbone.View.extend({
        events: {
            'click .try-labs': '_onClickTryLabs'
        },

        /**
        * Creates a new LabsOptInView.
        *
        * @param options
        * @param options.labsOptIn {JIRA.DevStatus.Labs.LabsOptInModel}
        */
        initialize: function initialize(options) {
            this.labsOptIn = options.labsOptIn;
            this.labsOptIn.on('change:dismissed', this.render, this);
        },

        render: function render() {
            // only show the Try Labs span when labs is allowed, user has not opted in and info is dismissed
            if (!this.labsOptIn.isAllowed() || this.labsOptIn.isOptedIn() || !this.labsOptIn.isDismissed()) {
                this.$el.empty();
            } else {
                this.$el.html(JIRA.Templates.DevStatus.tryLabs());
            }

            return this;
        },

        /**
        * Resets the LabsOptInModel's dismissed state.
        *
        * @returns {*}
        * @private
        */
        _onClickTryLabs: function _onClickTryLabs(e) {
            e.preventDefault();
            this.labsOptIn.setDismissed(false);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/BasePanelModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
//noinspection JSUnusedGlobalSymbols
/**
 * A base implementation for modules of summary panels and the error panel.
 *
 * @class JIRA.DevStatus.BasePanelModule
 * @extends Backbone.Model
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _) {
    return Backbone.Model.extend({
        initialize: function initialize(options) {
            this.options = _.defaults({}, options);
            this.data = this.createModel();
        },

        /**
        * Renders the aggregated data. If aggregated data is not provided, renders nothing.
        * @param data Aggregated data. Undefined if there was an error in getting data.
        */
        render: function render(data) {
            this.startViews();
            this.data.updateData(data);
            this.view.render();
        },

        /**
        * Sets this module's loading status.
        */
        startLoading: function startLoading() {
            this.data.startLoadingData && this.data.startLoadingData();
        },

        /**
        * Initialises this module's views.
        */
        startViews: function startViews() {
            if (!this.view) {
                this.view = this.createView();
            }
        },

        /**
        * Stops this module's views.
        */
        stopViews: function stopViews() {
            if (this.view) {
                this.view.undelegateEvents();
                this.view.$el.empty();
                this.view.hide();
                this.view = null;
            }
        },

        isViewVisible: function isViewVisible() {
            return this.view && this.view.isVisible();
        },

        // ==== to be implemented by sub-classes ===
        /**
        * Create a view specific to the implementation of the sub-module.
        */
        createView: function createView() {},

        /**
        * Create a model specific to the implementation of the sub-module.
        * The model created should support a updateData(data) method that
        *  updates the data into its internal properties to be used for rendering the view later.
        */
        createModel: function createModel() {}
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/BaseSummaryModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone) {
    return Backbone.Model.extend({
        // Child models need to set the typeId
        typeId: undefined,

        properties: ['byInstanceType', 'overall', 'previousOverall', 'hasData', 'dataLoading'],

        /**
        * Sets this model's <code>dataLoading</code> attribute to true.
        */
        startLoadingData: function startLoadingData() {
            this.set('dataLoading', true);
        },

        /**
        * @param aggregatedData Data, or undefined if no data is available.
        */
        updateData: function updateData(aggregatedData) {
            this.set('hasData', aggregatedData !== undefined);
            this.set('dataLoading', false);
            this.set('previousOverall', this.getOverall());

            if (aggregatedData && aggregatedData.summary && aggregatedData.summary[this.typeId]) {
                var summary = aggregatedData.summary[this.typeId];
                this.set('byInstanceType', summary.byInstanceType);
                this.set('overall', summary.overall);
            } else {
                this.set('byInstanceType', {});
                this.set('overall', { count: 0 });
            }
        },

        // Needed by the detail dialog
        getType: function getType() {
            return this.typeId;
        },

        getOverall: function getOverall() {
            return this.get('overall');
        },

        /**
        * Retrieves the previous overall values before being replaced by, for example, an ajax update.
        */
        getPreviousOverall: function getPreviousOverall() {
            return this.get('previousOverall');
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/BaseSummaryModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class JIRA.DevStatus.BaseSummaryModule
 * @extends JIRA.DevStatus.BasePanelModule
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BasePanelModule.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BasePanelModule) {
    return BasePanelModule.extend({
        // Child modules need to set model
        model: undefined,
        viewType: undefined,

        createModel: function createModel() {
            return new this.model({});
        },

        createView: function createView() {
            // pass all options to the view, together with the model
            return new this.viewType(_.extend(_.clone(this.options), {
                model: this.data
            }));
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/BaseSummaryView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
/**
 * @class JIRA.DevStatus.BaseSummaryView
 * @extends Backbone.View
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-logger/require('jira/util/logger')"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__], __WEBPACK_AMD_DEFINE_RESULT__ = function (logger, Backbone, $, _, require) {
    var devStatusDate = __webpack_require__("./js/util/DateUtils.js");
    var devStatusURL = __webpack_require__("./js/util/DevStatusURLUtils.js");

    var JIRADevStatusSummaryTransitionView = __webpack_require__("./js/viewissue/summary/SummaryTransitionView.js");
    return Backbone.View.extend({
        // Child views must implement template
        template: undefined,

        events: {
            'simpleClick .summary': '_onSummaryLinkClick'
        },

        initialize: function initialize(options) {
            this.options = _.clone(options);
            this.model.on('change:hasData', this._addOrRemoveHasDataClass, this);
            this.model.on('change:dataLoading', this._addOrRemoveDataLoadingClass, this);
            this.transitionView = new JIRADevStatusSummaryTransitionView({
                model: this.model,
                el: this.$el
            });
        },

        render: function render() {
            var visible = this.isVisible();
            if (visible) {
                var content = $(this.template(_.extend({
                    issueKey: this.options.dataAttrs['issueKey']
                }, this.model.getOverall())));

                if (this._shouldAnimateDataTransition()) {
                    this.transitionView.renderVisible(content);
                } else {
                    this.$el.html(content);
                    devStatusDate.addTooltip(content);
                }

                this._renderNavigableSummaryLink();
                this.show();
            } else if (!this._isHidden()) {
                // if no summary information hide this view completely
                if (this._shouldAnimateDataTransition()) {
                    this.transitionView.renderHidden(_.bind(this.hide, this));
                } else {
                    this.hide();
                }
            }

            this._addOrRemoveDataLoadingClass();
            this._addOrRemoveHasDataClass();
        },

        /**
        * Generate default parameters that would be useful to all views.
        */
        getDefaultDetailDialogParameters: function getDefaultDetailDialogParameters() {
            return {
                issueKey: this.options.dataAttrs['issueKey'],
                issueId: this.options.dataAttrs['issueId'],
                tabs: this.model.get('byInstanceType'),
                dataType: this.model.getType(),
                showContactAdminForm: this.options.dataAttrs && this.options.dataAttrs['showContactAdminForm']
            };
        },

        /**
        * Returns the summary link for this sub-panel
        */
        getSummaryLink: function getSummaryLink() {
            return this.$el.find('a.summary');
        },

        /**
        * Indicate whether the view should be visible.
        */
        isVisible: function isVisible() {
            return this.model.getOverall().count > 0;
        },

        /**
        * Sets this view's <code>js-has-data</code> and <code>data-loading</code> classes depending on the model's state.
        *
        * @return {*}
        * @private
        */
        _addOrRemoveHasDataClass: function _addOrRemoveHasDataClass() {
            var hasData = this.model.get('hasData');

            this.$el.toggleClass('js-has-data', hasData);
        },

        _renderNavigableSummaryLink: function _renderNavigableSummaryLink() {
            this.getSummaryLink().attr('href', devStatusURL.getUrlWithDetailDialogParam(this.model.getType()));
        },

        /**
        * Sets this view's <code>js-has-data</code> and <code>data-loading</code> classes depending on the model's state.
        * These are used in WebDriver tests to determine if there is any data and if there are further data loads in
        * progress.
        *
        * @return {*}
        * @private
        */
        _addOrRemoveDataLoadingClass: function _addOrRemoveDataLoadingClass() {
            var dataLoading = this.model.get('dataLoading');

            this.$el.toggleClass('data-loading', dataLoading);
        },

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            logger.log('Summary view not supported: ', this);
        },

        _shouldAnimateDataTransition: function _shouldAnimateDataTransition() {
            //Whether there are previous data
            return !!this.model.getPreviousOverall();
        },

        _isHidden: function _isHidden() {
            return this.$el.hasClass('hidden');
        },

        show: function show() {
            this.$el.removeClass('hidden');
        },

        hide: function hide() {
            this.$el.addClass('hidden');
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/CreateBranchView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(21);
// @formatter:off
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-formatter/require('jira/util/formatter')"), __webpack_require__("com.atlassian.plugins.helptips.jira-help-tips:help-tip/require('jira-help-tips/feature/help-tip')"), __webpack_require__("com.atlassian.plugins.helptips.jira-help-tips:help-tip-manager/require('jira-help-tips/feature/help-tip-manager')"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("jira.webresources:jira-metadata/require('jira/util/data/meta')"), __webpack_require__], __WEBPACK_AMD_DEFINE_RESULT__ = function (formatter, HelpTip, HelpTipManager, Backbone, _, Meta, require) {
    var devStatusURL = __webpack_require__("./js/util/DevStatusURLUtils.js");
    return Backbone.View.extend({
        /**
        * @param options
        * @param options.showTooltip
        */
        initialize: function initialize(options) {
            this.tooltipShown = !options.showTooltip;

            this.linkTextSelector = '.devstatus-cta-link-text';
            this.issueContainer = '.issue-container';

            this._processLinkForNavigableURL();
            this._initTooltip();
            // Open the create branch dialog if instructed to do so from the URL
            _.defer(_.bind(this._openCreateBranchDialog, this));
        },

        getCreateBranchLink: function getCreateBranchLink() {
            return this.$el;
        },

        /**
        * Swap the 'href' of this link into a navigable link, that is, a link that can be opened via meta/ctr + click or middle click
        */
        _processLinkForNavigableURL: function _processLinkForNavigableURL() {
            /**
            * Some history and why I wrote the code below:
            *
            * In Fusion phase 1, we store the call-to-action key of a link in the url via a hash (ie #devstatus.cta.createbranch) in atlassian-plugin.xml
            * Then we subsequently use regex to extract the key out of the link to display the correct detail dialog.
            * We did this because the create-branch link needs to appear in multiple places
            *    (cog menu from dashboard/issue navigator, more dropdown in view issue and dot dialog).
            * We had 2 options at the time, to use the 'class' attribute or the above.
            * Using the URL via hash method was decided to be the best at the time
            *
            * In order to automatically open the detail dialog when opening the link in a new context,
            *    I had to append a 'devStatusDetailDialog=create-branch' param to the url.
            *
            * In the process, I have to extract the cta key first and destroy the hash data in the URL. Why? because
            * 1. Including the hash in the URL breaks the link in IE for issue navigator/view issue
            *       (because KA uses the i# prefix for IE8/9. Multiple hash in the url will break everything)
            * 2. JIRA Agile for some reason pulls forward anything in the hash into part of the URL, essentially breaking the URL
            *       (ie /RapidBoard.jspa?id=foo#devstatus.cta.createbranch becomes /devstatus.cta.createbranch?id=foo)
            *
            * So I'm doing a little switcharoo here and store cta key in the element data
            */

            // Store the cta key into element data
            var cta = this._getCta(this.$el);
            if (cta) {
                this.getCreateBranchLink().data('cta', cta);
            }

            // Swap the URL of the link
            this.getCreateBranchLink().attr('href', devStatusURL.getUrlWithDetailDialogParam('create-branch'));
        },

        _openCreateBranchDialog: function _openCreateBranchDialog() {
            var dialogToOpen = Meta.get('fusion-open-detail-dialog');
            if (dialogToOpen === 'create-branch') {
                Meta.set('fusion-open-detail-dialog', undefined);
                Meta.set('fusion-analytics-new-context-link', true);
                this.getCreateBranchLink().click();
            }
        },

        _initTooltip: function _initTooltip() {
            if (!this.tooltipShown && this.$el.length > 0) {
                /**
                * Wrapping this in a defer because timing might be tricky when interacting with KA components and as a result
                * we might be rendering the tooltip when there's nothing on the screen.
                *
                * This allow KA components to complete its process before running ours.
                */
                _.defer(_.bind(function () {
                    var cta = this.$el.data('cta');
                    if (cta) {
                        new HelpTip({
                            id: cta + '.tooltip',
                            title: "Start development",
                            bodyHtml: JIRA.Templates.DevStatus.Tooltip.createBranch(),
                            anchor: this.$el.find(this.linkTextSelector),
                            isSequence: true,
                            inlineDialogOpts: {
                                //Manually specify the container so the helptip can be positioned correctly
                                container: this.issueContainer,
                                width: 400
                            }
                        });
                        this.tooltipShown = true;
                        HelpTipManager.showSequences();
                    }
                }, this));
            }
        },

        _getCta: function _getCta(link) {
            var url = link.attr('href');
            var m = url && /\#([a-zA-Z\.]+)/.exec(url);
            return m && m[1];
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/SummaryErrorModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// @formatter:off
/**
 * @class JIRA.DevStatus.SummaryErrorModel
 * @extends Backbone.Model
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _) {
    return Backbone.Model.extend({
        properties: ['hasErrors', // whether there are error(s) from the REST api call or not
        'errorInstances', // transient errors,
        'configInstances'],

        defaults: function defaults() {
            return {
                hasErrors: false,
                errorInstances: [],
                configInstances: []
            };
        },

        /**
        * Extract error information, if any, from the aggregatedData.
        * @param {object} aggregatedData the data to extract errors from, or undefined if
        *                       no data was returned.
        * @param {object} [aggregatedData.errors] the data to extract errors from, or undefined
        * @param {object} [aggregatedData.configErrors] the data to extract configuration errors from, or undefined
        */
        updateData: function updateData(aggregatedData) {
            var errorInstances = this._extractErrors(aggregatedData && aggregatedData.errors);
            var configInstances = this._extractErrors(aggregatedData && aggregatedData.configErrors);

            // no data indicates an error in the ajax call
            this.set('hasErrors', !aggregatedData || !_.isEmpty(errorInstances) || !_.isEmpty(configInstances));
            this.set('errorInstances', errorInstances);
            this.set('configInstances', configInstances);
        },

        /**
        * Extracts the instance error data from an errors array.
        *
        * @param {Array} instances the array of instances to extract
        * @returns {Array} an array of instances
        */
        _extractErrors: function _extractErrors(instances) {
            if (!instances) {
                return [];
            }

            return _.map(_.filter(instances, function (dataWithInstance) {
                return dataWithInstance.error; // keep it if it has an "error" field
            }), function (errorWithInstance) {
                // ignore the actual error message
                return errorWithInstance.instance;
            });
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/SummaryErrorModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class JIRA.DevStatus.SummaryErrorModule
 * @extends JIRA.DevStatus.BasePanelModule
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BasePanelModule.js"), __webpack_require__], __WEBPACK_AMD_DEFINE_RESULT__ = function (BasePanelModule, require) {
    var JIRADevStatusSummaryErrorModel = __webpack_require__("./js/viewissue/summary/SummaryErrorModel.js");
    var JIRADevStatusSummaryErrorView = __webpack_require__("./js/viewissue/summary/SummaryErrorView.js");

    return BasePanelModule.extend({
        createModel: function createModel() {
            return new JIRADevStatusSummaryErrorModel({});
        },

        createView: function createView() {
            // pass all options to the view, together with the model
            var showContactAdminForm = this.options.dataAttrs && this.options.dataAttrs['showContactAdminForm'];
            return new JIRADevStatusSummaryErrorView({
                model: this.data,
                el: this.options.el,
                showContactAdminForm: showContactAdminForm
            });
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/SummaryErrorView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
/**
 * @class JIRA.DevStatus.SummaryErrorView
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryView) {
    return BaseSummaryView.extend({
        /**
        * @constructs
        * @extends JIRA.DevStatus.BaseSummaryView
        * @param {object} options
        * @param {boolean} [options.showContactAdminForm] whether to show "contact admin" link
        */
        initialize: function initialize(options) {
            this.showContactAdminForm = options.showContactAdminForm;
        },

        /**
        * @returns {JIRA.DevStatus.SummaryErrorView}
        */
        render: function render() {
            if (this.isVisible()) {
                this.$el.html(JIRA.Templates.DevStatus.connectionProblemAsInfoWithoutIcon({
                    instances: this.model.get('errorInstances'),
                    notConfiguredInstances: this.model.get('configInstances'),
                    showContactAdminForm: this.showContactAdminForm
                }));
                this.show();
            } else {
                // if no errors, hide this view
                this.hide();
            }

            return this;
        },

        isVisible: function isVisible() {
            return this.model.get('hasErrors');
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/SummaryTransitionView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class JIRA.DevStatus.SummaryTransitionView
 * @extends Backbone.View
 *
 * A generic view used for applying transition to any summary data
 * Currently supports:
 * 1. Rolling transition from the top for update
 * 2. Sliding down for new data
 * 3. Sliding up for deleted data
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/util/DateUtils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, $, _, DevStatusDate) {
    return Backbone.View.extend({
        slideTransitionTime: 500,
        initialize: function initialize() {},

        renderVisible: function renderVisible(content) {
            /**
            * Check whether the container is in the DOM
            */
            var lateStartTransition = !$.contains(document, this.$el[0]);

            if (this._hasPreviousData()) {
                // Previous data exist, perform a roll transition if data has changed
                if (this._hasDataChanged()) {
                    this._prepareContentsForTransition(content, this.$el);
                    this.$el.addClass('roll-transition');
                }
            } else {
                // Previous data doesn't exist, perform a slide down transition
                this._preStartSlideTransition();
                this.$el.addClass('slide-down-transition');
                lateStartTransition = true;
            }

            this.$el.html(content);
            /**
            * Adding tooltip needs to happen after element has been rendered into $el (DOM), otherwise nothing will happen
            */
            DevStatusDate.addTooltip(content);

            if (lateStartTransition) {
                /**
                * Elements have to be in the DOM and have their dimensions calculated by the browser before starting the animation.
                * Otherwise, animation may start too early and it doesn't look nice
                */
                _.defer(_.bind(this._initiateTransition, this));
            } else {
                this._initiateTransition();
            }
        },

        renderHidden: function renderHidden(callback) {
            var instance = this;
            this.$el.slideUp(this.slideTransitionTime, function () {
                /**
                * slideUp set display:none on element. Removing the none value to display because it overrides .show()
                * (in other words .show() won't show element that has been display:none)
                * Passing an empty string will remove the css attribute
                */
                instance.$el.css('display', '');
                callback();
            });
        },

        _initiateTransition: function _initiateTransition() {
            if (this.$el.hasClass('slide-down-transition')) {
                this._postStartSlideTransition();
                this.$el.removeClass('slide-down-transition');
                this._startSlideDownTransition(this.$el, 0);
            } else {
                if (this.$el.hasClass('roll-transition')) {
                    this.$el.removeClass('roll-transition');
                    this._startRollTransition();
                }

                /**
                * Find any sliding containers and transition those as well
                */
                var slidingContainers = this.$el.find('.sliding-container');
                if (slidingContainers.length > 0) {
                    var instance = this;
                    slidingContainers.each(function (index, container) {
                        var $container = $(container);
                        var prevHeight = $container.data('prevHeight');
                        instance._startSlideDownTransition($container, prevHeight);
                    });
                }
            }
        },

        _startSlideDownTransition: function _startSlideDownTransition(element, previousHeight) {
            var currentHeight = element.height();
            /**
            * Animate the height if the content height is different between 2 different (previous and current) renderings
            */
            if (previousHeight !== currentHeight) {
                element.height(previousHeight).animate({ height: currentHeight }, this.slideTransitionTime, function () {
                    //Setting height back to auto to prevent any dangling old values
                    element.css('height', 'auto');
                    element.find('.rolling-content').removeClass('transit');
                });
            }
        },

        _startRollTransition: function _startRollTransition() {
            /**
            * Find each rolling-container and animate them independently.
            */
            this.$el.find('.rolling-container').each(_.bind(function (index, container) {
                var $container = $(container);
                var rollingContent = $container.find('.rolling-content');
                var summaryContent = rollingContent.find(':not(.old-content)');
                var contentHeight = summaryContent.height();

                $container.height(contentHeight);
                rollingContent.addClass('transit');

                summaryContent.css('margin-top', '-' + contentHeight + 'px').animate({ 'margin-top': '0' }, this.slideTransitionTime, function () {
                    $container.css('height', 'auto');
                    $container.find('.old-content').remove();

                    rollingContent.removeClass('transit');
                    summaryContent.css('margin-top', ''); //Removing the CSS on element
                });
            }, this));
        },

        _prepareContentsForTransition: function _prepareContentsForTransition(newContent, oldContainer) {
            /**
            * Append content into a container, so we don't need to make the distinction between .find and .filter
            */
            newContent = $('<div></div>').append(newContent);

            /**
            * Calculate the height of the old content so it can be animated to the new height
            */
            var newSlideContainers = newContent.find('.sliding-container');
            var oldSlideContainers = oldContainer.find('.sliding-container');
            newSlideContainers.each(function (index, content) {
                var oldSlideContainer = oldSlideContainers.get(index);
                if (oldSlideContainer) {
                    var oldContainer = $(oldSlideContainer);
                    $(content).data('prevHeight', oldContainer.height());
                }
            });

            /**
            * Animation works by basically appending the old content as sibling of the new content in the DOM tree.
            * It's done by matching/pairing elements at the same index.
            *
            * These makes the assumption that between 2 different renderings, elements are in the same order.
            * This should be OK because we can control it in soy.
            *
            * The number of elements between 2 different renderings can be different, which is fine. The following logic
            * will simply match up what is available and ignore the rest.
            */
            var newRollContainers = newContent.find('.rolling-container');
            var oldRollContainers = oldContainer.find('.rolling-container');
            newRollContainers.each(function (index, content) {
                var newContainer = $(content).find('.rolling-content');
                var oldRollContainer = oldRollContainers.get(index);
                if (oldRollContainer) {
                    var oldContents = $(oldRollContainer).find('.rolling-content').children();
                    oldContents.addClass('old-content');
                    newContainer.append(oldContents);
                }
            });
        },

        _hasPreviousData: function _hasPreviousData() {
            var prevData = this.model.getPreviousOverall();
            return prevData && prevData.count > 0;
        },

        _hasDataChanged: function _hasDataChanged() {
            return !_.isEqual(this.model.getOverall(), this.model.getPreviousOverall());
        },

        /**
        * The following 2 methods are a slight hack. Reasons:
        * 1. Slide down animation is basically done by setting height to 0 then set it back to the actual height.
        * 2. In order to get the actual height, elements have to be already rendered in the DOM and shown
        * 3. This produces a quick 'flash' when elements have the full height before being set to 0
        * 4. To counteract the effect, height and opacity is set to 0 here before being shown
        *    then immediately remove them before starting a slide down animation
        */
        _preStartSlideTransition: function _preStartSlideTransition() {
            this.$el.css('height', '0');
            this.$el.css('opacity', '0');
        },

        _postStartSlideTransition: function _postStartSlideTransition() {
            this.$el.css('height', '');
            this.$el.css('opacity', '');
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/branch/BranchModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'branch'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/branch/BranchModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/branch/BranchModel.js"), __webpack_require__("./js/viewissue/summary/branch/BranchView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, BranchModel, BranchView) {
    return BaseSummaryModule.extend({
        model: BranchModel,
        viewType: BranchView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/branch/BranchView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(22);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.Branches.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(13).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogBranchView.js")]; (function (DetailDialogBranchView) {
                self.detailDialogBranchView = new DetailDialogBranchView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-branch-detail-dialog',
                    count: self.model.getOverall().count,
                    analyticIssueData: self.options.analyticsModel.getIssue()
                }));
                devAnalytics.BranchesAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogBranchView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/build/BuildModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'build'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/build/BuildModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/build/BuildModel.js"), __webpack_require__("./js/viewissue/summary/build/BuildView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, BuildModel, BuildView) {
    return BaseSummaryModule.extend({
        model: BuildModel,
        viewType: BuildView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/build/BuildView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(23);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.Build.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(12).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/build/DetailDialogBuildView.js")]; (function (DetailDialogBuildView) {
                self.detailDialogBuildView = new DetailDialogBuildView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-build-detail-dialog',
                    count: self.model.getOverall().count
                }));
                devAnalytics.BuildsAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogBuildView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/commit/CommitModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'repository'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/commit/CommitModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/commit/CommitModel.js"), __webpack_require__("./js/viewissue/summary/commit/CommitView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, CommitModel, CommitView) {
    return BaseSummaryModule.extend({
        model: CommitModel,
        viewType: CommitView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/commit/CommitView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(24);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.Commit.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(14).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogCommitView.js")]; (function (DetailDialogCommitView) {
                self.detailDialogCommitView = new DetailDialogCommitView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-commit-detail-dialog',
                    count: self.model.getOverall().count
                }));
                devAnalytics.CommitsAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogCommitView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/deployment/DeploymentModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'deployment-environment'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/deployment/DeploymentModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/deployment/DeploymentModel.js"), __webpack_require__("./js/viewissue/summary/deployment/DeploymentView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, DeploymentModel, DeploymentView) {
    return BaseSummaryModule.extend({
        model: DeploymentModel,
        viewType: DeploymentView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/deployment/DeploymentView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(26);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.Deployment.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(11).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/deployment/DetailDialogDeploymentView.js")]; (function (DetailDialogDeploymentView) {
                self.detailDialogDeploymentView = new DetailDialogDeploymentView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-deployment-detail-dialog',
                    count: self.model.getOverall().count
                }));
                devAnalytics.DeploymentsAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogDeploymentView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/pullrequest/PullRequestModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'pullrequest'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/pullrequest/PullRequestModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/pullrequest/PullRequestModel.js"), __webpack_require__("./js/viewissue/summary/pullrequest/PullRequestView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, PullRequestModel, PullRequestView) {
    return BaseSummaryModule.extend({
        model: PullRequestModel,
        viewType: PullRequestView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/pullrequest/PullRequestView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(27);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.PullRequest.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(10).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogPullRequestView.js")]; (function (DetailDialogPullRequestView) {
                self.detailDialogPullRequestView = new DetailDialogPullRequestView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-pullrequest-detail-dialog',
                    count: self.model.getOverall().count,
                    reviewersThreshold: 2
                }));
                devAnalytics.PullRequestsAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogPullRequestView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/review/ReviewModel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModel.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModel) {
    return BaseSummaryModel.extend({
        typeId: 'review'
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/review/ReviewModule.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/viewissue/summary/BaseSummaryModule.js"), __webpack_require__("./js/viewissue/summary/review/ReviewModel.js"), __webpack_require__("./js/viewissue/summary/review/ReviewView.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseSummaryModule, ReviewModel, ReviewView) {
    return BaseSummaryModule.extend({
        model: ReviewModel,
        viewType: ReviewView
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/viewissue/summary/review/ReviewView.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(17);

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("./js/viewissue/summary/BaseSummaryView.js"), __webpack_require__("./js/analytics/devstatus-analytics.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, BaseSummaryView, devAnalytics) {
    return BaseSummaryView.extend({
        template: JIRA.Templates.DevStatus.Review.summaryPanel,

        _onSummaryLinkClick: function _onSummaryLinkClick(e) {
            e.preventDefault();
            var self = this;

            __webpack_require__.e/* require */(9).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogReviewView.js")]; (function (DetailDialogReviewView) {
                self.detailDialogReviewView = new DetailDialogReviewView(_.extend(self.getDefaultDetailDialogParameters(), {
                    id: 'devstatus-review-detail-dialog',
                    count: self.model.getOverall().count,
                    reviewersThreshold: 2,
                    completed: self.model.getOverall().completed
                }));
                devAnalytics.ReviewsAnalytics.fireSummaryClickedEvent(self.options.analyticsModel.getSummary());
                self.detailDialogReviewView.show();
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ "com.atlassian.plugins.helptips.jira-help-tips:help-tip-manager/require('jira-help-tips/feature/help-tip-manager')":
/***/ (function(module, exports) {

module.exports = require('jira-help-tips/feature/help-tip-manager');

/***/ }),

/***/ "com.atlassian.plugins.helptips.jira-help-tips:help-tip/require('jira-help-tips/feature/help-tip')":
/***/ (function(module, exports) {

module.exports = require('jira-help-tips/feature/help-tip');

/***/ }),

/***/ "jira.webresources:ajs-backbone-amd-shim/require('backbone')":
/***/ (function(module, exports) {

module.exports = require('backbone');

/***/ }),

/***/ "jira.webresources:dialogs/require('jira/dialog/form-dialog')":
/***/ (function(module, exports) {

module.exports = require('jira/dialog/form-dialog');

/***/ }),

/***/ "jira.webresources:jira-base-control/require('jira/lib/class')":
/***/ (function(module, exports) {

module.exports = require('jira/lib/class');

/***/ }),

/***/ "jira.webresources:jira-events/require('jira/util/events')":
/***/ (function(module, exports) {

module.exports = require('jira/util/events');

/***/ }),

/***/ "jira.webresources:jira-events/require('jira/util/events/types')":
/***/ (function(module, exports) {

module.exports = require('jira/util/events/types');

/***/ }),

/***/ "jira.webresources:jira-formatter/require('jira/util/formatter')":
/***/ (function(module, exports) {

module.exports = require('jira/util/formatter');

/***/ }),

/***/ "jira.webresources:jira-global/require('jira/ajs/dark-features')":
/***/ (function(module, exports) {

module.exports = require('jira/ajs/dark-features');

/***/ }),

/***/ "jira.webresources:jira-logger/require('jira/util/logger')":
/***/ (function(module, exports) {

module.exports = require('jira/util/logger');

/***/ }),

/***/ "jira.webresources:momentjs/require('jira/moment')":
/***/ (function(module, exports) {

module.exports = require('jira/moment');

/***/ })

});
//# sourceMappingURL=0.6825172d3de56f8fe75d.js.map;