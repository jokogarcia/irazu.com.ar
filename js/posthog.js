!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    (window.posthog && window.posthog.__loaded) ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split(".");
        2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          });
      }
      ((p = t.createElement("script")).type = "text/javascript"),
        (p.crossOrigin = "anonymous"),
        (p.async = !0),
        (p.src =
          s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
          "/static/array.js"),
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = "posthog";
            return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
          },
          u.people.toString = function () {
            return u.toString(1) + ".people (stub)";
          },
          o =
            "init Ce Ds js Te Os As capture Ye calculateEventProperties Us register register_once register_for_session unregister unregister_for_session Hs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty qs Ns createPersonProfile Bs Cs Ws opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ls debug L zs getPageViewId captureTraceFeedback captureTraceMetric".split(
              " "
            ),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);

// Initialize PostHog based on cookie consent
function initPostHog() {
  posthog.init("phc_V3eGR3ABCp85aLQfHsx22X8DhgkDpMtwzmYrC9X58lp", {
    api_host: "https://us.i.posthog.com",
    defaults: "2025-05-24",
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
    // Disable analytics by default until we get consent
    loaded: function(posthog) {
      const cookieConsent = localStorage.getItem('cookie_consent');
      if (cookieConsent === 'rejected') {
        posthog.opt_out_capturing();
      }
    }
  });
  console.log("PostHog analytics initialized");
}

function stopPostHog() {
  if (window.posthog && window.posthog.opt_out_capturing) {
    window.posthog.opt_out_capturing();
    console.log("PostHog analytics disabled");
  }else{
    console.log("PostHog not initialized, nothing to disable");
  }
}

// Handle cookie consent events
document.addEventListener('DOMContentLoaded', function() {
  // Check existing cookie consent
  const cookieConsent = localStorage.getItem('cookie_consent');
  
  if (cookieConsent === 'accepted') {
    initPostHog();
  } else if (cookieConsent === 'rejected') {
    // Don't initialize, or opt out if already loaded
    stopPostHog();
  } else {
    // No consent yet, PostHog shouldn't be initialized
    // We'll wait for the user to make a choice
  }
  
  // Listen for cookie consent changes
  document.addEventListener('cookie-consent-changed', function(event) {
    const consent = event.detail.consent;
    
    if (consent === 'accepted') {
      initPostHog();
    } else if (consent === 'rejected') {
      stopPostHog();
    }
  });
});